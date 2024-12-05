<script>
    import { Button } from '$lib/components/ui/button';
    import * as Card from "$lib/components/ui/card";
    import Contributors from '$lib/Contributors.svelte';
    import { formatDollar, formatGenerated } from '$lib/format.js';

    export let data = {};

    // totals raised
    const { contributors, generated, totals } = data;
</script>


<h1 class="text-3xl font-bold">Campaign Finance Data for Sacramento City and County</h1>
<p class="mt-2 text-xl text-neutral-950 dark:text-neutral-50">Regularly updated campaign finance data for elected officials in the City and County of Sacramento, California. We don't manipulate the data except to normalize some name spellings so that our aggregations can be more accurate.</p>

<div class="items-start justify-center gap-6 rounded-lg p-8 grid grid-cols-1 lg:grid-cols-3">
    {#each totals as block}
        <Card.Root>
            <Card.Header>
                <Card.Title>{block.name}</Card.Title>
                <Card.Description>{formatDollar(block.total)}</Card.Description>
            </Card.Header>
            <Card.Content>
                <ul>
                    {#each block.offices as office}
                        <li>{office}</li>
                    {/each}
                    {#if block.offices.length === 1}
                        <br />
                    {/if}
                </ul>
            </Card.Content>
            <Card.Footer>
                <Button
                    class="dark:bg-white bg-slate-800"
                    href={block.href}
                >
                    See More
                </Button>
            </Card.Footer>
        </Card.Root>
    {/each}
</div>

<div class="contributors-container p-8">
    <Card.Root>
        <Card.Header>
            <Card.Title>10 largest contributors since 2014</Card.Title>
        </Card.Header>
        <Card.Content>
            <Contributors data={contributors} />
        </Card.Content>
    </Card.Root>
</div>

<div class="about-container">
    <h2 class="text-xl font-semibold" id="about-the-data">About the data</h2>

    <h3 class="mt-2 text-lg font-semibold">Where does the data come from?</h3>
    <p class="text-lg">The data is scraped from <a href="https://public.netfile.com/pub2/?aid=SAC">the city's financial reports site</a> and <a href="https://public.netfile.com/pub2/?aid=SCO">the county's site</a>. The last time scrape was on {formatGenerated(generated)} California time. The scraper code is <a href="https://github.com/code4sac/sacramento-campaign-finance/blob/main/scripts/index.js">here</a>.</p>

    <h3 class="mt-2 text-lg font-semibold">What years does the data represent?</h3>
    <p class="text-lg">We have scraped all data since 2014, though we only scrape data for the current year regularly.</p>

    <h3 class="mt-2 text-lg font-semibold">Are all contributions included or only those above a certain amount?</h3>
    <p class="text-lg">All contributions reported to the city and county governments should show up here. Large contributions reported on Form 497 reports are only used if they're more recent than the most recent Form 460 report filed by that committee.</p>

    <h3 class="mt-2 text-lg font-semibold">Is the data altered?</h3>
    <p class="text-lg">We only do two things with the data:</p>
    <ol>
        <li class="text-lg">We normalize some of the contributor names to account for slight spelling differences.</li>
        <li class="text-lg">We aggregate the contributors by contributor to show the full amount and not the per transaction amount.</li>
    </ol>

    <h3 class="mt-2 text-lg font-semibold">Are there contribution limits?</h3>
    <p class="text-lg">The Fair Political Practices Commission <a href="https://fppc.ca.gov/learn/Contribution-Limits-City-and-County-Candidates.html">sets the limits for local candidates</a>.</p>

    <h3 class="mt-2 text-lg font-semibold">What if there's a mistake?</h3>
    <p class="text-lg">Please let us know by <a href="https://github.com/code4sac/sacramento-campaign-finance/issues/new">opening an issue on Github</a>.</p>
</div>

<style>
    .contributors-container {
        margin: 0 auto;
        max-width: 600px;
    }
</style>
