import { error } from "@sveltejs/kit";
import { rollup, sum } from "d3-array";

import createContributorId from "$lib/contributorId.js";
import config from "$lib/../../config.js";
import { generated, data } from "$lib/data.json";

export function load({ params }) {
  const { bodyId } = params;
  const configBody = config.bodies.find((d) => d.body === bodyId);

  if (!configBody) throw error(404);

  const legislators = configBody.legislators.map((legislator) => {
    const legislatorCommitteeIds = legislator.committees.map(d => d.id)
    const contributionsToLegislator = data.filter(d => {
      return legislatorCommitteeIds.includes(d.fppcId)
    });

    const rolled = rollup(contributionsToLegislator, (values) => {
      const {
        contributorCommitteeId,
        contributorFirstName,
        contributorLastName,
        contributorCity,
        contributorZip,
        contributorState,
      } = values[0];
      const amount = sum(values, (d) => d.amount);
      const dates = values.map((d) => d.dates).flat();

      return {
        contributorCommitteeId,
        contributorFirstName,
        contributorLastName,
        contributorZip,
        contributorCity,
        contributorState,
        amount,
        dates,
      };
    }, createContributorId);

    const arr = []
    rolled.forEach(d => {
        arr.push(d)
    })

    return {
      ...legislator,
      contributors: arr
    };
  });


  return {
    bodyId,
    generated,
    legislators,
  };
}
