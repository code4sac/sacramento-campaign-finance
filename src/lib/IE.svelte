<script>
    import _ from 'lodash';
    export let name = '';
    export let data = [];

    $: total = _.sumBy(data, (d) => d.total);
</script>

<div>
    <h3>Independent expenditures</h3>
    {#if data.length > 0}
        <p>
            <span class="monospace"
                >${Math.floor(total).toLocaleString('en-US')}</span
            >
            from {data.length} spender{#if data.length !== 1}s{/if}{#if data.length !== 0}:{/if}
        </p>
        <ul>
            {#each data as ie}
                <li>
                    <p>
                        <a
                            href="https://cal-access.sos.ca.gov/Campaign/Committees/Detail.aspx?id={ie.spenderId}&view=received"
                            >{ie.spenderName}</a
                        >
                        has spent
                        <span class="monospace"
                            >${ie.total.toLocaleString('en-US')}</span
                        >
                        to {#if ie.position === 'S'}support{:else}oppose{/if}
                        {name}.
                    </p>
                </li>
            {/each}
        </ul>
    {:else}
        <p>No independent spending to support or oppose.</p>
    {/if}
</div>

<style lang="scss">
    ul {
        font-size: 1rem;
        list-style-type: none;
        padding-left: 0;
    }

    li {
        padding: 0.5rem;
    }

    li:nth-child(even) {
        background-color: #ebebeb;
    }

    p {
        font-size: 1rem;
        margin: 0;
    }

    h3 {
        font-size: 1rem;
    }
</style>
