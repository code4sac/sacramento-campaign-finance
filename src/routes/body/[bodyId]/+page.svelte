<script>
    import { sum } from 'd3-array';
    import { formatDollar, formatGenerated, formatLegislatorAnchorId } from '$lib/format';
    import Legislator from '$lib/Legislator.svelte';

    export let data = {};

    const { bodyId, generated, legislators } = data;

    $: contributions = legislators.map((d) => d.contributors).flat();
    $: total = sum(contributions, (d) => d.amount);

    let name = '';

    if (bodyId === 'sac-city') {
        name = 'City Council';
    } else if (bodyId === 'sac-county') {
        name = 'Board of Supervisors';
    }
</script>

<h1 class="text-3xl font-bold">{name}</h1>

<p class="mt-2 text-xl text-neutral-950 dark:text-neutral-50">
    The {legislators.length} members of the {name} have reported fundraising
    {formatDollar(total)} in filings submitted to local officials.
</p>
<p class="mt-2 text-xl text-neutral-950 dark:text-neutral-50">
    Below is each elected representative and all of the people and
    organizations who contributed to their campaigns for local elected office.
</p>
<p class="mt-2 text-xl text-neutral-950 dark:text-neutral-50">
    The data was retrieved on {formatGenerated(generated)}. Download it
    <a
        href="/body/{bodyId}/download.csv"
        download="{bodyId}-{generated}.csv">here</a
    >.
</p>
    
{#if bodyId === "sac-city"}
    <div class="sac-mayor-container row">
        <Legislator {...legislators.find((d) => d.title === "Mayor")} />
    </div>
{/if}
<div>
    {#each legislators.filter((d) => d.title !== "Mayor") as legislator}
        <div class="row">
            <Legislator {...legislator} />
        </div>
    {/each}
</div>
