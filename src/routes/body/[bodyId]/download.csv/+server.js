import { rollup, sum } from "d3-array";
import { csvFormat } from "d3-dsv";
import { error } from "@sveltejs/kit";

import createContributorId from "$lib/contributorId.js";
import config from "$lib/../../config.js";
import { data } from "$lib/data.json";

export function GET({ params }) {
  const { bodyId } = params;
  const configBody = config.bodies.find((d) => d.body === bodyId);

  if (!configBody) throw error(404);

  const rows = [];
  configBody.legislators.forEach((legislator) => {
    const { name, committees, title } = legislator;
    const legislatorCommitteeIds = committees.map((d) => d.id);
    const contributionsToLegislator = data.filter((d) => {
      return legislatorCommitteeIds.includes(d.fppcId);
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
      const dates = values.map((d) => d.date).flat().join(',');

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

    rolled.forEach((dd) => {
      rows.push({
        name,
        title,
        ...dd,
      });
    });
  });

  const csv = csvFormat(rows);
  return new Response(csv);
}
