import * as d3 from 'd3-dsv'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function createRaceKey(committee) {
    const { Office: office, District: district, Measure: measure, Position: position } = committee;
    let raceKey = null;

    if (measure.trim() !== '') {
        raceKey = `Measure ${measure}`;
    } else if (district.trim() === "") {
        raceKey = office;
    } else {
        raceKey = `${office} ${district}`;
    }

    return raceKey;
}

function formatGeneratedAt(generatedAt) {
    const d = new Date(generatedAt);
    const dateGeneratedAt = d.toLocaleString(undefined, {
        hour: "numeric",
        minute: "numeric",
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "America/Los_Angeles"
    });
    return dateGeneratedAt;
}

async function fetchCommitteesFromCsv() {
    const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vSlCZ299Wbp8_9NpBCt5kjC9sQPPIikn5Rr3lFC0HadLGyW2_NgJebIDN3rMQG23gIbCLxZSByWIm-Y/pub?gid=0&single=true&output=csv')
    const text = await response.text()
    const csv = d3.csvParse(text)
    return csv
}

async function fetchIEs() {
    const expenditures = await prisma.independentExpenditure.findMany({
        include: {
            filer: true
        }
    })
    const normalized = expenditures.map(expenditure => {
        const { candidateLastName } = expenditure
        let normalizedCandidateLastName = candidateLastName

        if (candidateLastName === 'PATRICK HUME') {
            normalizedCandidateLastName = 'Pat Hume'
        }

        return {
            ...expenditure,
            candidateLastName: normalizedCandidateLastName
        }
    })

    return normalized
}

async function aggregateContributorsByCommittee(committeeId) {
    const scheduleA = await prisma.scheduleAContribution.findMany({
        where: {
            filer: {
                id: committeeId
            }
        }
    })
    const late = await prisma.lateContribution.findMany({
        where: {
            filer: {
                id: committeeId
            }
        }
    })
    const results = [
        ...scheduleA
    ]

    late.forEach(lateContribution => {
        const scheduleAMatch = scheduleA.find(d => d.transactionId === lateContribution.transactionId)
        if (scheduleAMatch) return

        results.push(lateContribution)
    })

    function slimContributor(contributor) {
        const {
            date,
            amount,
            contributorCommitteeId,
            contributorFirstName,
            contributorLastName,
            contributorCity,
            contributorState,
            contributorZip,
        } = contributor
        return {
            date,
            amount,
            contributorCommitteeId,
            contributorFirstName,
            contributorLastName,
            contributorCity,
            contributorState,
            contributorZip,
        }
    }

    const totalByContributor = results.reduce((accum, next) => {
        const key = next.contributorFirstName !== '' ? `${next.contributorFirstName}-${next.contributorLastName}-${next.contributorZip}` : `${next.contributorLastName}-${next.contributorZip}`
        const match = accum[key]

        if (match) {
            match.total = match.total + next.amount
            match.contributions.push(slimContributor(next))
        } else {
            accum[key] = {
                total: next.amount,
                contributions: [slimContributor(next)]
            }
        }

        return accum
    }, {})

    const aggregated = []

    Object.keys(totalByContributor).forEach(key => {
        const value = totalByContributor[key]
        const { contributorFirstName, contributorLastName, contributorCity, contributorState } = value.contributions[0]
        aggregated.push({
            contributor: contributorFirstName === '' ? contributorLastName : `${contributorFirstName} ${contributorLastName}`,
            contributorCity,
            contributorState,
            ...value,
        })
    })

    const sorted = aggregated.sort((a, b) => {
        return b.total - a.total
    })

    return sorted
}

export async function load({ params }) {
    const { electionId } = params
    const races = {};
    const allCommittees = await fetchCommitteesFromCsv()
    const committees = allCommittees.filter(d => d.Election === electionId)
    committees.forEach(committee => {
        const raceKey = createRaceKey(committee);

        races[raceKey] = races[raceKey] || []
    })
    const ies = await fetchIEs()
    const queryPromises = committees.map(async(committee) => {
        const raceKey = createRaceKey(committee);
        const fppcId = committee['FPPC ID']
        committee.contributors = await aggregateContributorsByCommittee(fppcId)
        committee.total = committee.contributors.reduce((accum, next) => {
            return accum + next.total
        }, 0)

        function filterMatchCandidateName(d) {
            return d.candidateLastName === committee['name']
        }

        function transformCandidateCommittee(d) {
            const { amount, date, description, position, candidateLastName: candidate } = d
            const { name: spenderName, id: spenderId } = d.filer

            return {
                spenderName,
                spenderId,
                amount,
                date,
                candidate,
                position,
                description,
            }
        }

        function aggregateContributors(accum, next) {
            const {
                spenderName,
                spenderId,
                amount,
                position,
            } = next
            const match = accum.find(d => d.spenderId === spenderId)

            if (match) {
                match.total += amount
            } else {
                accum.push({
                    spenderId,
                    spenderName,
                    position,
                    total: amount
                })
            }

            return accum
        }

        committee.ie = ies.filter(filterMatchCandidateName)
            .map(transformCandidateCommittee)
            .reduce(aggregateContributors, [])

        races[raceKey].push(committee);
    });

    await Promise.all(queryPromises)

    function groupByRace(r) {
        const array = [];
        Object.keys(r).forEach((raceKey) => {
            const committees = races[raceKey];
            const race = {
                race: raceKey,
                committees,
            };

            if (raceKey.includes("Measure")) {
                const supporters = committees.filter((d) => {
                    return d.Position === "Support" && createRaceKey(d) === raceKey
                });
                const opponents = committees.filter((d) => {
                    return d.Position === "Oppose" && createRaceKey(d) === raceKey
                });

                race.committees = [{
                        "FPPC ID": "",
                        Name: "Support",
                        total: supporters.reduce((accum, next) => accum + next.total, 0),
                        contributors: supporters
                            .map((d) => d.contributors)
                            .flat()
                            .sort((a, b) => b.amount - a.amount),
                        ie: supporters.map((d) => d.ie).flat(),
                    },
                    {
                        "FPPC ID": "",
                        Name: "Oppose",
                        total: opponents.reduce((accum, next) => accum + next.total, 0),
                        contributors: opponents
                            .map((d) => d.contributors)
                            .flat()
                            .sort((a, b) => b.amount - a.amount),
                        ie: opponents.map((d) => d.ie).flat(),
                    },
                ];
            }

            array.push(race);
        });

        const sortedRaces = array.sort((a, b) => {
            if (a.race > b.race) return 1
            if (a.race < b.race) return -1
            return 0
        })

        return sortedRaces
    }

    const groupedRaces = groupByRace(races)

    const { createdAt: firstFilerCreatedAt } = await prisma.filer.findFirst()

    return {
        dateGeneratedAt: formatGeneratedAt(firstFilerCreatedAt),
        races: groupedRaces,
    };
}

export const prerender = 'auto';