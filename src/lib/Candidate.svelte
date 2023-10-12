<script>
  import { orderBy } from 'lodash'
  import Contributors from "./Contributors.svelte";
  // import IE from './IE.svelte'

  export let name = ''
  export let total = null
  export let contributors = []

  $: sorted = orderBy(contributors, ['amount', 'contributor'], ['desc', 'asc'])
</script>

<div class="candidate">
  <div class="candidate-name">{name}</div>
  {#if total > 0}
  <div class="candidate-stats">
    <p>
      <span class="monospace">${total.toLocaleString("en-US")}</span>
      in direct contributions from {contributors.length.toLocaleString(
        "en-US"
      )} people, companies, and organizations.
    </p>
  </div>
  <Contributors data={sorted} />
  {:else}
    <p>Hasn't reported any fundraising yet.</p>
  {/if}
</div>

<style lang="scss">
  .candidate {
    background: #ffffff;
    flex: 1;
  }

  .candidate-name {
    font-weight: 700;
  }
</style>
