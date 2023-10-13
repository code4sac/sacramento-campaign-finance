export default function createContributorId(d) {
  return [
    d.contributorCommitteeId,
    d.contributorLastName,
    d.contributorFirstName,
    d.contributorZip,
  ].join("--");
}