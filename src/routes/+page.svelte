<script>
    import { sum } from "d3-array";
    import { writable } from "svelte/store";
    import config from "$lib/../../config.js";
    import { formatDollar, formatGenerated } from "$lib/format.js";
    import Legislator from "$lib/Legislator.svelte";
    import OfficialsCard from "$lib/OfficialsCard.svelte";
    import { IconArrowNarrowRight } from "@tabler/icons-svelte";

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

    //browse officials data, manually putting info here until automated
    //links should go to each official's page once theyre created
    //This data should really go into another file,
    export const ccData = [
        { name: "Darrell Steinberg", title: "Mayor", link: "" },
        { name: "Lisa Kaplan", title: "City Council, District 1", link: "" },
        { name: "Sean Loloee", title: "City Council, District 2", link: "" },
        {
            name: "Karina Talamantes",
            title: "City Council, District 3",
            link: "",
        },
        {
            name: "Katie Valenzuela",
            title: "City Council, District 4",
            link: "",
        },
        { name: "Caity Maple", title: "City Council, District 5", link: "" },
        { name: "Eric Guerra", title: "City Council, District 6", link: "" },
        { name: "Rick Jennings", title: "City Council, District 7", link: "" },
        { name: "Mai Vang", title: "City Council, District 8", link: "" },
    ];

    export const bosData = [
        { name: "Phil Sterna", title: "Supervisor, District 1", link: "" },
        { name: "Patrick Kennedy", title: "Supervisor, District 2", link: "" },
        { name: "Rich Desmond", title: "Supervisor, District 3", link: "" },
        { name: "Sue Frost", title: "Supervisor, District 3", link: "" },
        { name: "Pat Hume", title: "Supervisor, District 4", link: "" },
    ];
    let officialsData = [];
    let officialDrop = "";
    function dropdownData(num) {
        if (num === 2) {
            officialDrop = "City Council";
            officialsData = ccData;
        } else if (num === 1) {
            officialDrop = "Board of Supervisors";
            officialsData = bosData;
        } else {
            officialDrop = "All Officials";
            officialsData = ccData.concat(bosData);
        }
    }
    //defaults data to show all officials
    dropdownData();
</script>

<div class="hero-tagline">
    <h1 class="tagline">Campaign Finance Data<br /> in Sacramento</h1>
</div>
<div class="hero">
    <!-- total amount raised -->
    <div class="total-raised-container">
        <h2 class="total-raised-amount">
            {formatDollar(total)}
        </h2>
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
                    <a href={block.href} class="btn btn-primary"
                        >Learn More <IconArrowNarrowRight /></a
                    >
                </div>
            </div>
        {/each}
        <p>Last updated on {formatGenerated(generated)}</p>
    </div>
</div>
<!-- browse by official boxes -->
<div class="browse-container">
    <div class="browse-tagline">
        <h1>Browse by Official</h1>
        <div class="dropdown browse-dropdown">
            <a href="#" class="btn dropdown-toggle" data-bs-toggle="dropdown"
                >{officialDrop}</a
            >
            <div class="dropdown-menu">
                <!-- can have both options OR state manage which option to
                show depending on what's currently selected -->
                <a
                    class="dropdown-item"
                    href="#"
                    on:click={() => dropdownData(0)}>All Officials</a
                >
                <a
                    class="dropdown-item"
                    href="#"
                    on:click={() => dropdownData(1)}>Board of Supervisors</a
                >
                <a
                    class="dropdown-item"
                    href="#"
                    on:click={() => dropdownData(2)}>City Council</a
                >
            </div>
        </div>
    </div>
    <!-- blocks begin -->
    <div class="officials-container">
        {#each officialsData as card}
            <OfficialsCard {...card} />
        {/each}
    </div>

    <div class="about-container">
        <h2 id="about">About the data</h2>
      
        <h3>Where does the data come from?</h3>
        <p>The data is scraped from <a href="https://public.netfile.com/pub2/?aid=SAC">the city's financial reports site</a> and <a href="https://public.netfile.com/pub2/?aid=SCO">the county's site</a>. The last time scrape was on {formatGenerated(generated)} California time. The scraper code is <a href="https://github.com/code4sac/sacramento-campaign-finance/blob/main/scripts/index.js">here</a>.</p>
        
        <h3>What years does the data represent?</h3>
        <p>We have scraped all data since 2014, though we only scrape data for the current year regularly.</p>
      
        <h3>Are all contributions included or only those above a certain amount?</h3>
        <p>All contributions reported to the city and county governments should show up here.</p>

        
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
</div>

<style lang="scss">
    // trying to get body to fill viewport, did not work
    // \ html,
    // body,
    // div.content {
    //     width: 100%;
    //     height: 100%;
    //     margin: 0;
    // }
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
        position: relative;
    }

    .tagline {
        color: #fff;
        font-family: Inter;
        font-size: 36px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        grid-column: 2/2;
        grid-row: 2/2;
        line-height: 1.1em;
        margin: 0;
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
