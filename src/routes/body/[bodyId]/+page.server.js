import { error } from "@sveltejs/kit";
import d from "$lib/data.json";
import config from "$lib/../../config.js";
import { rollup, sum } from "d3-array";

function createContributorId(d) {
  return [
    d.contributorCommitteeId,
    d.contributorLastName,
    d.contributorFirstName,
    d.contributorZip,
  ].join("--");
}

export async function load({ params }) {
  const { bodyId } = params;
  const configBody = config.bodies.find((d) => d.body === bodyId);

  if (!configBody) throw error(404);

  const data = configBody.legislators.map((legislator) => {
    const match = d.data.find((dd) => {
      const doNamesMatch = dd.name === legislator.name;
      const doTitlesMatch = dd.title === legislator.title;
      return doNamesMatch && doTitlesMatch;
    });
    return match;
  });

  const dataAggregatedAcrossCommittees = data.map((d) => {
    const { name, title, body, committees, contributors } = d;
    const rolled = rollup(contributors, (values) => {
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
    rolled.forEach((data, contributorKey) => {
        arr.push(data)
    })

    return {
      name,
      title,
      body,
      committees,
      contributors: arr,
    };
  });

  return {
    bodyId,
    generated: d.generated,
    legislators: dataAggregatedAcrossCommittees,
  };
}
