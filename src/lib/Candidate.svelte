<script>
    import { orderBy } from 'lodash';
    import Contributors from './Contributors.svelte';
    import * as Card from "$lib/components/ui/card";
    export let name = '';
    export let total = null;
    export let contributors = [];
    $: sorted = orderBy(
        contributors,
        ['amount', 'contributor'],
        ['desc', 'asc']
    );
</script>

<div class="candidate">
    <Card.Root>
        <Card.Header>
            <Card.Title>{name}</Card.Title>
        </Card.Header>
        <Card.Content>
            <div class="datagrid-item">
                <div class="datagrid-title">Total received</div>
                <div class="datagrid-content">${total.toLocaleString('en-US')}</div>
            </div>

            <div class="datagrid-item">
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
    .datagrid-title {
        font-weight: 600;
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
</style>
