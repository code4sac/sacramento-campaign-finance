<script>
    export let data = [];
    function getContributorName(contributor) {
        const { contributorFirstName, contributorLastName } = contributor;
        const contributorName =
            contributorFirstName === ''
                ? contributorLastName
                : `${contributorFirstName} ${contributorLastName}`;
        return contributorName;
    }
</script>

<div class="contributors">
    <table class="table contributors">
        <thead class="sticky-top bg-neutral-50 dark:bg-neutral-950 py-1">
            <tr>
                <th scope="col">Contributor</th>
                <th scope="col">Location</th>
                <th scope="col">Amount</th>
            </tr>
        </thead>
        <tbody>
            {#each data as contributor, i}
                <tr class="contributor" class:odd={i % 2 !== 0}>
                    <td class="contributor-name">
                        {getContributorName(contributor)}
                    </td>
                    <td class="contributor-location">
                        {contributor.contributorCity}, {contributor.contributorState}
                    </td>
                    <td class="contributor-amount">
                        ${contributor.amount.toLocaleString('en-US')}
                    </td>
                </tr>
                <tr class:odd={i % 2 !== 0}>
                    <td colspan="3">
                        <details>
                            <summary>Dates</summary>
                            <div>
                                <ul>
                                    {#each contributor.dates as date}
                                        <li>{date.date} - ${date.amount.toLocaleString('en-US')}</li>
                                    {/each}
                                </ul>
                            </div>
                        </details>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<style>
    :global(table.table tbody tr.odd) {
        background-color: #ccc;
    }

    details {
        font-size: .7em;
        margin-right: .6em;
        text-align: right;
    }

    summary { 
        font-weight: 600;
    }
</style>