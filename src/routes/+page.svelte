<script>
    import { sum } from 'd3-array';
    import { writable } from 'svelte/store';
    import { formatDollar, formatGenerated, formatLegislatorAnchorId } from '$lib/format.js';
    import OfficialsCard from '$lib/OfficialsCard.svelte';
    import { IconArrowNarrowRight } from '@tabler/icons-svelte';

    export let data = {};

    // totals raised
    const { generated, officials, totals } = data;
    const total = sum(totals, (d) => d.total);

    const blocks = totals.map((b) => {
        return {
            label: b.name,
            href: `/body/${b.body}`,
            value: b.total,
        };
    });

    const officialsData = writable(officials);
    let officialDrop = '';
    function dropdownData(num) {
        if (num === 2) {
            officialDrop = 'City Council';
            $officialsData = officials.filter(d => d.link.startsWith('/body/sac-city'));
        } else if (num === 1) {
            officialDrop = 'Board of Supervisors';
            $officialsData = officials.filter(d => d.link.startsWith('/body/sac-county'));
        } else {
            officialDrop = 'All Officials';
            $officialsData = officials;
        }
    }
    //defaults data to show all officials
    dropdownData();
</script>

<div class="hero-tagline">
    <div class="container">
        <h1 class="tagline">Campaign Finance Data for Sacramento City and County</h1>
        <p>Regularly updated campaign finance data for elected officials in the City and County of Sacramento, California. We don't manipulate the data except to normalize some name spellings so that our aggregations can be more accurate. <a href="#about-the-data">Learn more about the data.</a></p>
        <p>The last data update happened on {formatGenerated(generated)}.</p>
    </div>
</div>

<div class="container">
    <div class="row row-cols-1 row-cols-md-3 mb-3 mt-3 text-center">
        {#each totals as block}
            <div class="col">
                <div class="card mb-4 rounded-3 shadow-sm">
                    <div class="card-header py-3">
                        <h3 class="my-0">
                            {block.name}
                        </h3>
                    </div>
                    <div class="card-body">
                    <h1 class="card-title pricing-card-title">
                        {formatDollar(block.total)}
                    </h1>
                    <ul class="list-unstyled mt-3 mb-4">
                        {#each block.offices as office}
                            <li>{office}</li>
                        {/each}
                        {#if block.offices.length === 1}
                            <br />
                        {/if}
                    </ul>
                    <a href={block.href}>
                        Learn More <IconArrowNarrowRight />
                        </a>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>


<!-- <div class="hero">
    <div class="container">
        
            <div class="card">
                <div class="card-body">
                    <div class="block-title"></div>
                    <div class="amount">{formatDollar(block.value)}</div>
                    <div class="amount-label">Raised</div>
                    <div class="block-link">
                        
                    </div>
                </div>
            </div>
        {/each}
        <p>Last updated on {formatGenerated(generated)}</p>
    </div>
</div> -->
<!-- browse by official boxes -->

<div class="about-container container">
    <h2 id="about-the-data">About the data</h2>

    <h3>Where does the data come from?</h3>
    <p>The data is scraped from <a href="https://public.netfile.com/pub2/?aid=SAC">the city's financial reports site</a> and <a href="https://public.netfile.com/pub2/?aid=SCO">the county's site</a>. The last time scrape was on {formatGenerated(generated)} California time. The scraper code is <a href="https://github.com/code4sac/sacramento-campaign-finance/blob/main/scripts/index.js">here</a>.</p>

    <h3>What years does the data represent?</h3>
    <p>We have scraped all data since 2014, though we only scrape data for the current year regularly.</p>

    <h3>Are all contributions included or only those above a certain amount?</h3>
    <p>All contributions reported to the city and county governments should show up here. Large contributions reported on Form 497 reports are only used if they're more recent than the most recent Form 460 report filed by that committee.</p>


    <h3>Is the data altered?</h3>
    <p>We only do two things with the data:</p>
    <ol>
        <li>We normalize some of the contributor names to account for slight spelling differences.</li>
        <li>We aggregate the contributors by contributor to show the full amount and not the per transaction amount.</li>
    </ol>

    <h3>Are there contribution limits?</h3>
    <p>The Fair Political Practices Commission <a href="https://fppc.ca.gov/learn/Contribution-Limits-City-and-County-Candidates.html">sets the limits for local candidates</a>.</p>

    <h3>What if there's a mistake?</h3>
    <p>Please let us know by <a href="https://github.com/code4sac/sacramento-campaign-finance/issues/new">opening an issue on Github</a>.</p>
</div>

<style lang="scss">
    .hero-tagline {
        margin-bottom: 2rem;
    }

    .total-raised-container {
        // border: 1px solid white;
        grid-column: 2/2;
        grid-row: 1/4;
    }

    .total-raised-amount {
        color: #000;
        font-family: Inter;
        font-size: 36px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }

    .total-raised-label {
        color: #000;
        font-family: Inter;
        font-size: 24px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }

    .blocks-container {
        display: grid;
        grid-template-columns: 1fr var(--column-gutter) 1fr;
        grid-template-rows: 1fr var(--column-gutter) 1fr;
        grid-column: 4/7;
        grid-row: 2/5;
        position: absolute;
        top: 90px;
        left: 730px;
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
        padding: 40px;
        flex-direction: column;
        justify-content: flex-end;
        gap: 20px;
        width: 310px;
        height: 310px;
    }

    .block:nth-child(2) {
        grid-column: 3/4;
    }

    .block-title {
        color: #1e1e1e;
        text-align: center;
        font-family: Inter;
        font-size: 28px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }

    .block .amount {
        color: #4299e1;
        text-align: center;
        font-family: Inter;
        font-size: 28px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }

    .block-link > a {
        color: #fff;
    }
    .browse-container {
        padding: 40px;
    }
    .browse-tagline {
        display: flex;
        justify-content: left;
        padding-bottom: 20px;
    }
    .browse-dropdown {
        // justify-self: right;
        margin-left: auto;
        margin-right: 60px;
    }

    .officials-container {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        gap: 40px;
    }

    .about-container {
        margin-top: 20px;
    }
</style>
