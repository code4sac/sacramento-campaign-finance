import _ from "lodash";
import { rollup, sum } from "d3-array";
import Queue from "p-queue";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function createContributorId(d) {
  return [
    d.contributorCommitteeId,
    d.contributorLastName,
    d.contributorFirstName,
    d.contributorZip,
  ].join("--");
}

export default async function aggregate(legislators, body) {
  const legislatorsWithContributors = [];
  const queue = new Queue({ concurrency: 2 });

  legislators.forEach((legislator) => {
    const { name, title, committees } = legislator;
    const committeeIds = committees.map((d) => d.id);
    queue.add(async () => {
      const scheduleA = await prisma.scheduleA.findMany({
        where: {
          fppcId: { in: committeeIds },
        },
      });

      const rolled = rollup(scheduleA, (contributions) => {
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
        };
      }, createContributorId);

      const contributors = Array.from(rolled).map((d) => d[1]);
      const sorted = _.orderBy(contributors, ["amount"], ["desc"]);

      legislatorsWithContributors.push({
        name,
        title,
        body,
        committees,
        contributors: sorted,
      });
    });
  });

  await queue.onIdle();

  return legislatorsWithContributors;
}
