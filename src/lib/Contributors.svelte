<script>
  export let data = []

  function getContributorName(contributor) {
    const { contributorFirstName, contributorLastName } = contributor
    const contributorName = contributorFirstName === '' ? contributorLastName : `${contributorFirstName} ${contributorLastName}`
    return contributorName
  }
</script>

<div class="contributors-table-container">
  <table class="table">
    <thead>
      <th>Contributor</th>
      <th>Amount</th>
    </thead>
    <tbody>
      {#each data as contributor, i}
        <tr>
          <td>
            <div class="contributor-name">
              {getContributorName(contributor)}
            </div>
            <div class="contributor-location">
              {contributor.contributorCity}, {contributor.contributorState}
            </div>
          </td>
          <td>${contributor.amount.toLocaleString("en-US")}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style lang="scss">
  .contributors-table-container {
    height: 400px;
    overflow-y: scroll;
  }

  .contributor {
    display: flex;
    justify-content: space-between;
  }

  .contributor-location {
    font-style: italic;
  }
</style>