<script>
    import { sum } from "d3-array";
    import { writable } from "svelte/store";
    import config from "$lib/../../config.js";
    import { formatDollar, formatGenerated } from "$lib/format.js";
    import Legislator from "$lib/Legislator.svelte";
    import OfficialsCard from "$lib/OfficialsCard.svelte";

    export let data = {};

    // totals raised
    const { generated, totals } = data;
    const total = sum(totals, (d) => d.total);

    const blocks = totals.map((b) => {
        return {
            label: b.name,
            href: `/body/${b.body}`,
            value: b.total,
        };
    });

    //browse officials
    const officialsData = [
        { name: "Darrell Steinberg", role: "Mayor", link: "" },
        { name: "Lisa Kaplan", role: "District 1", link: "" },
    ];
    const officalsBlocks = "";
</script>

<div class="hero-tagline">
    <h1 class="tagline">Campaign Finance Data<br /> in Sacramento</h1>
</div>
<div class="hero">
    <!-- total amount raised -->
    <div class="total-raised-container">
        <p class="total-raised-amount">
            {formatDollar(total)}
        </p>
        <p class="total-raised-label">
            Total amount reported by local officials
        </p>
    </div>
    <!-- council/baord block container -->
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
<!-- browse by official boxes -->
<div>
    <div class="browse-tagline">
        <h1>Browse by Official</h1>
        <div class="dropdown browse-dropdown">
            <a href="#" class="btn dropdown-toggle" data-bs-toggle="dropdown"
                >City Council</a
            >
            <div class="dropdown-menu">
                <!-- can have both options OR state manage which option to
                show depending on what's currently selected -->
                <a class="dropdown-item" href="#">Board of Supervisors</a>
                <a class="dropdown-item" href="#">City Council</a>
            </div>
        </div>
    </div>
    <!-- blocks begin -->
    <div class="officials-container">
        <OfficialsCard />
        <OfficialsCard />
        <OfficialsCard />
        <OfficialsCard />
        <OfficialsCard />
        <OfficialsCard />
        <OfficialsCard />
        <OfficialsCard />
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
    \ html,
    body,
    div.content {
        width: 100%;
        height: 100%;
        margin: 0;
    }
    .hero {
        --column-gutter: 1rem;
        display: grid;
        grid-template-columns:
            var(--column-gutter) 2fr var(--column-gutter) 1fr var(
                --column-gutter
            )
            1fr var(--column-gutter);
        grid-template-rows: var(--column-gutter) 1fr var(--column-gutter) 1fr var(
                --column-gutter
            );
        min-height: 50vh;
        padding-top: 2rem;
        padding-bottom: 2rem;
    }
    .hero-tagline {
        padding-left: 40px;
        padding-top: 80px;
        padding-bottom: 35px;
        background: #09447c;
        color: #fff;
        width: 100%;
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
    .browse-tagline {
        display: flex;
        justify-content: left;
    }
    .browse-dropdown {
        // justify-self: right;
        margin-left: auto;
    }

    .officials-container {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        gap: 40px;
    }
</style>
