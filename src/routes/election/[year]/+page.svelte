<script>
    import { formatGenerated } from '$lib/format.js';
    import Race from '$lib/Race.svelte';
    export let data = {};
    $: generated = formatGenerated(data.generated);
    $: races = data.races;
</script>

<svelte:head>
    <title>Following the money in Sacramento elections</title>
</svelte:head>


<h1 class="text-3xl font-bold">Most recent election on Nov. 5</h1>
<p class="mt-2 text-xl text-neutral-950 dark:text-neutral-50">The data was retrieved on {generated}.</p>

<section class="container-xl">
    <div class="races">
        {#each races as race}
            <div class="row">
                <div class="race">
                    <Race data={race} />
                </div>
            </div>
        {/each}
    </div>
</section>
