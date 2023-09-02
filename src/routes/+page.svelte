<script>
  import { sum } from 'd3-array'
  import { writable } from 'svelte/store';
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
  <h1 class="tagline">
    Ready to use campaign finance data for Sacramento
  </h1>
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
        <div class="block-title">{block.label}</div>
        <div class="amount">{formatDollar(block.value)}</div>
        <div class="amount-label">Raised</div>
        <div class="block-link">
          <a href={block.href}>Learn more</a>
        </div>
      </div>
    {/each}
    <p>Last updated on {formatGenerated(generated)}</p>
  </div>
</div>

<!-- <div class="browse-officials">
  <div class="browse-officials-header">
    <h2>Browse by official</h2>
    <select>
      <option checked>City Council</option>
    </select>
  </div>
</div> -->

<style lang="scss">
  .hero {
    --column-gutter: 1rem;
    display: grid;
    grid-template-columns: var(--column-gutter) 2fr var(--column-gutter) 1fr var(--column-gutter) 1fr var(--column-gutter);
    grid-template-rows: var(--column-gutter) 1fr var(--column-gutter) 1fr var(--column-gutter);
    min-height: 50vh;
    padding-top: 2rem;
    padding-bottom: 2rem;
  }

  .tagline {
    font-size: 36px;
    grid-column: 2/2;
    grid-row: 2/2;
    line-height: 1.1em;
    margin: 0;
  }

  .total-raised-container {
    border: 1px solid white;
    grid-column: 2/2;
    grid-row: 4/4;
  }

  .total-raised-amount { 
    font-size: 36px;
  }

  .total-raised-label {
    font-size: 24px;
  }

  .blocks-container {
    display: grid;
    grid-template-columns: 1fr var(--column-gutter) 1fr;
    grid-template-rows: 1fr var(--column-gutter) 1fr;
    grid-column: 4/7;
    grid-row: 2/5;
  }

  .blocks-container p {
    font-size: 14px;
    grid-column: 1/4;
    grid-row: 3/4;
    text-align: center;
  }

  .block {
    align-items: center;
    background-color: white;
    border: 1px solid #ebebeb;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  .block:nth-child(2) {
    grid-column: 3/4;
  }

  .block-title {
    font-size: 28px;
    font-weight: 700;
    text-align: center;
  }

  .block .amount {
    font-size: 28px;
    font-weight: 700;
  }

</style>
