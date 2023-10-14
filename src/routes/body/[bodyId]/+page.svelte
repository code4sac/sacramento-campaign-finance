<script>
    import { sum } from "d3-array";
    import { formatDollar, formatGenerated } from "$lib/format";
    import Legislator from "$lib/Legislator.svelte";

    export let data = {};

    const { bodyId, generated, legislators } = data;

    $: contributions = legislators.map((d) => d.contributors).flat();
    $: total = sum(contributions, (d) => d.amount);

    let name = "";

    if (bodyId === "sac-city") {
        name = "City Council";
    } else if (bodyId === "sac-county") {
        name = "Board of Supervisors";
    }
</script>

    <section class="container-xl">
        <div class="page-header">
          <div class="row">
            <div class="col">
              <div class="page-pretitle">Elected representatives</div>
              <h1 class="page-title">{name}</h1>
            </div>
            <p>
                The {legislators.length} members of the {name} have reported fundraising
                {formatDollar(total)} in filings submitted to local officials.
            </p>
            <p>
                Below is each elected representative and all of the people and
                organizations who contributed to their campaigns for local elected office.
            </p>
            <p>
                The data was retrieved on {formatGenerated(generated)}. Download it
                <a
                    href="/body/{bodyId}/download.csv"
                    download="{bodyId}-{generated}.csv">here</a
                >.
            </p>
          </div>
        </div>
    
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
</section>

<style lang="scss">
    ul {
        list-style-type: none;
        padding-left: 0;
    }
</style>
