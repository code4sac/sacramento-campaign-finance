<script>
  import { sum } from 'd3-array'
  import config from '$lib/../../config.js'
  import { formatDollar, formatGenerated } from "$lib/format.js";

  export let data = {};

  const { generated, totals } = data;
  const total = sum(totals, d => d.total)

  const blocks = [
    {
      label: "Raised by current local elected officials",
      value: total,
    },
    ...totals.map(b => {
      return {
        label: b.name,
        href: `/body/${b.body}`,
        value: b.total
      }
    })
  ];
</script>

<h1>{config.title}</h1>
<p>
  A regularly updated website that tracks the people and organizations that make
  campaign contributions to elected officials in Sacramento.
</p>

<div class="blocks-and-generated">
  <div class="blocks">
    {#each blocks as block}
      <div class="block">
        <div class="amount">{formatDollar(block.value)}</div>
        <div class="label">
          {#if block.href}
            <a href={block.href}>{block.label}</a>
          {:else}
            {block.label}
          {/if}
        </div>
      </div>
    {/each}
  </div>

  <p>The data was last updated on {formatGenerated(generated)}.</p>
</div>

<style lang="scss">
  h1 {
    line-height: 1.1em;
    text-align: center;
  }

  .blocks-and-generated {
    display: flex;
    flex-direction: column;

    @media screen and (min-width: 700px) {
      flex-direction: column-reverse;
    }
  }

  .block {
    margin: 0.75rem;
    padding: 0.5rem;
    text-align: center;
  }

  .block .amount {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  @media screen and (min-width: 700px) {
    .blocks {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      margin-bottom: 100px;
      margin-top: 100px;
    }

    .block:nth-child(1) {
      grid-column-start: 1;
      grid-column-end: 3;
      grid-row-start: 1;
      grid-row-start: 1;
    }

    .block:nth-child(2),
    .block:nth-child(3) {
      grid-row-start: 2;
      grid-row-start: 2;
    }

    .block:nth-child(2) {
      grid-column-start: 1;
      grid-column-end: 1;
    }
    .block:nth-child(3) {
      grid-column-start: 2;
      grid-column-end: 2;
    }
  }
</style>
