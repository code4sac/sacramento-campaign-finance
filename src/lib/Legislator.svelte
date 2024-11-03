<script>
    import { sum } from 'd3-array';
    import { orderBy } from 'lodash';
    import { formatLegislatorAnchorId } from '$lib/format';
    import * as Card from "$lib/components/ui/card";
    import Contributors from './Contributors.svelte';
    export let name = '';
    export let title = '';
    export let contributors = [];
    export let committees = [];
    function filterOutZeros(contributors) {
        return contributors
            .filter((d) => d.amount !== 0)
            .filter((d) => d.amount > 0);
    }
    let sortKey = 'amount';
    $: sortOrder = sortKey === 'amount' ? 'desc' : 'asc';
    $: filtered = filterOutZeros(contributors);
    $: sortKeys =
        sortKey === 'amount' ? ['amount', 'contributorLastName'] : [sortKey];
    $: sorted = orderBy(filtered, sortKeys, [sortOrder]);
    $: total = sum(contributors, (d) => d.amount);
</script>

<h2
    class="mt-2 mb-2 text-xl font-semibold"
    id={formatLegislatorAnchorId(`${title}`)}
>
    {title}
</h2>

<div class="legislator my-2">
    <Card.Root>
        <Card.Header>
            <Card.Title>{name}</Card.Title>
        </Card.Header>
        <Card.Content>
            <div class="datagrid-item total-received-grid-item">
                <div class="datagrid-title">Total received</div>
                <div class="datagrid-content">
                    ${total.toLocaleString('en-US')}
                </div>
            </div>
            <div class="datagrid-item committees-grid-item">
                <div class="datagrid-title">Committees</div>
                <div class="datagrid-content">
                    <ul class="committees">
                        {#each committees as committee, i}
                            <li>
                                <a
                                    href={`https://cal-access.sos.ca.gov/Campaign/Committees/Detail.aspx?id=${committee.id}`}
                                >
                                    {committee.name}
                                </a>
                            </li>
                        {/each}
                    </ul>
                </div>
            </div>
            <div class="datagrid-item contributors-grid-item">
                <div class="datagrid-title">Contributors</div>
                <div class="datagrid-content contributors">
                    <div class="contributor-count">
                        {contributors.length.toLocaleString('en-US')}
                    </div>

                    {#if contributors.length > 0}
                        <input type="checkbox" id={`${name}`} />
                        <label for={`${name}`}>contributors</label>
                        <div class="contributors-container">
                            <Contributors data={sorted} />
                        </div>
                    {/if}
                </div>
            </div>
        </Card.Content>
    </Card.Root>
</div>

<style lang="scss">
    .legislator {
        margin: 0 auto;
    }
    .contributors {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1em 1fr;
    }

    input {
        left: -9999px;
        position: absolute;
    }

    label:before {
        content: 'Show ';
        display: inline-block;
        margin-right: 4px;
    }

    :global(:checked ~ label:before) {
        content: 'Hide ';
        display: inline-block;
    }

    .contributor-count {
        grid-column-start: 1;
        grid-column-end: 1;
        grid-row-start: 1;
        grid-row-end: 1;
    }

    label {
        grid-column-start: 2;
        grid-column-end: 2;
        grid-row-start: 1;
        grid-row-end: 1;
        text-align: right;
    }

    .contributors-container {
        display: none;
        max-height: 400px;
        margin-top: 1rem;
        overflow-y: scroll;
        grid-column-start: 1;
        grid-column-end: 3;
        grid-row-start: 2;
        grid-row-end: 2;
    }

    :global(:checked ~ .contributors-container) {
        display: block;
    }

    .committees {
        padding-left: 0.8rem;
    }

    .committees-grid-item {
        grid-column: 1;
    }

    .contributors-grid-item {
        grid-column: 1 / 4;
    }
</style>
