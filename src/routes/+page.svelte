<script>
  import { sum } from 'd3-array'
  import config from '$lib/../../config.js'
  import { formatDollar, formatGenerated } from "$lib/format.js";

  export let data = {};

  const { generated, totals } = data;
  const total = sum(totals, d => d.total)

  const blocks = totals.map(b => {
    return {
      label: b.name,
      href: `/body/${b.body}`,
      value: b.total
    }
  })
</script>

<div class="hero">
  <p class="tagline">
    Ready to use campaign finance data for Sacramento
  </p>
  <div class="total-raised-container">
    <p class="total-raised-amount">
      {formatDollar(total)}
    </p>
    <p class="total-raised-label">
      Total amount reported by local officials
    </p>
  </div>
  <div class="blocks-container">
    {#each blocks as block}
      <div class="block">
        <div class="amount">{formatDollar(block.value)}</div>
        <div class="label">
          <a href={block.href}>{block.label}</a>
        </div>
      </div>
    {/each}
    <p>Last updated on {formatGenerated(generated)}</p>
  </div>
</div>

<style lang="scss">
  h1 {
    line-height: 1.1em;
    text-align: center;
  }

  .hero {
    background-color: blue;
  }

</style>
