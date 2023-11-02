/**
 * Create contributor ID.
 * @param {{}} data
 * @returns [committeeId, lastName, firstName, zip] Contributor ID.
 */
export default function createContributorId(d) {
    return [
        d.contributorCommitteeId,
        d.contributorLastName,
        d.contributorFirstName,
        d.contributorZip
    ].join('--');
}
