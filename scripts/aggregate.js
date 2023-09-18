import _ from "lodash";
import { rollup, sum } from "d3-array";

function createContributorId(d) {
  return [
    d.contributorCommitteeId,
    d.contributorLastName,
    d.contributorFirstName,
    d.contributorZip,
  ].join("--");
}

export default function aggregate(data, legislators, body) {
  const legislatorsWithContributors = [];

  legislators.forEach((legislator) => {
    const { name, title, committees } = legislator;
    const committeeIds = committees.map((d) => d.id);
    const scheduleA = data['schedule-a'].filter((d) => committeeIds.includes(d.fppcId));
    const scheduleC = data['schedule-c'].filter((d) => committeeIds.includes(d.fppcId));
    const scheduleAAndC = [...scheduleA, ...scheduleC]

    const rolled = rollup(scheduleAAndC, (contributions) => {
      const amount = sum(contributions, (d) => d.amount);
      const {
        filerName,
        fppcId,
        contributorCommitteeId,
        contributorFirstName,
        contributorLastName,
        contributorCity,
        contributorState,
        contributorType,
        contributorZip,
      } = contributions[0];
      const dates = contributions.map(d => ({
        date: d.date,
        amount: d.amount
      }))
      return {
        filerName,
        fppcId,
        contributorCommitteeId,
        contributorFirstName,
        contributorLastName,
        contributorCity,
        contributorState,
        contributorType,
        contributorZip,
        amount,
        dates,
      };
    }, createContributorId, d => d.fppcId);

    const contributors = []
    rolled.forEach((d, contributorId) => {
      d.forEach((data, fppcId) => {
        contributors.push(data)
      })
    })
    
    // const contributors = Array.from(rolled).map((d) => d[1]);
    const sorted = _.orderBy(contributors, ["amount"], ["desc"]);

    legislatorsWithContributors.push({
      name,
      title,
      body,
      committees,
      contributors: sorted,
    });
  });

  return legislatorsWithContributors;
}
