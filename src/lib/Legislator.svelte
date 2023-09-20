<script>
  import { orderBy } from 'lodash'
  import { sum } from "d3-array";
  import { formatDollar } from "./format";
  import Contributors from "./Contributors.svelte";
  export let name = "";
  export let title = "";
  export let contributors = [];
  export let committees = [];

  function filterOutZeros(contributors) {
    return contributors.filter((d) => d.amount !== 0).filter((d) => d.amount > 0);
  }

  let sortKey = 'amount'
  $: sortOrder = sortKey === 'amount' ? 'desc' : 'asc'
  $: filtered = filterOutZeros(contributors)
  $: sortKeys = sortKey === 'amount' ? ['amount', 'contributorLastName'] : [sortKey]
  $: sorted = orderBy(filtered, sortKeys, [sortOrder])
  $: total = sum(contributors, (d) => d.amount);
</script>

<div class="legislator">
  <div class="name-and-title">
    <div class="name">{name}</div>
    <div class="title">{title}</div>
  </div>
  <div class="totals">
    <p>
      Raised {formatDollar(total)} from {contributors.length.toLocaleString(
        "en-US"
      )} contributors.
    </p>
    <div>
      <label for="sort-by">
        Sort by
      </label>
      <select id="sort-by" name="sort-by" bind:value={sortKey}>
        <option value="amount">Amount</option>
        <option value="contributorLastName">Name</option>
      </select>
    </div>
  </div>
  <div class="contributors">
    <Contributors data={sorted} />
  </div>
  <div class="committees">
    This data came from the following committees:
    <ul>
      {#each committees as committee, i}
        <li>
          <a
            href={`https://cal-access.sos.ca.gov/Campaign/Committees/Detail.aspx?id=${committee.id}`}
          >
            {committee.name}
          </a>
        </li>
      {/each}
    </ul>
  </div>
</div>

<style lang="scss">
  .legislator {
    border: 1px solid black;
    margin-bottom: 1rem;
    padding: 1rem;
  }
  .name-and-title {
    display: flex;
    justify-content: space-between;
  }
  .totals {
    align-items: center;
    display: flex;
    font-size: 1rem;
    justify-content: space-between;
    margin-top: 1rem;

    label, select {
      font-size: .75rem;
    }
  }
  .committees {
    font-size: 0.9rem;
    margin-top: 0.5rem;
  }
  ul {
    padding-left: 1rem;
  }
  li {
    padding-right: 0.2rem;
  }

</style>
