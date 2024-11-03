<script>
    import _ from 'lodash'
    import Candidate from '$lib/Candidate.svelte';
    export let data = [];
</script>

<h2 class="mt-2 text-xl font-semibold">
    {data.title}
    {#if data.district}, District {data.district}{/if}
</h2>

<div class="items-start justify-center gap-6 rounded-lg p-8 grid grid-cols-1 md:grid-cols-2">
    {#each _.orderBy(data.candidates, ['total'], ['desc']) as candidate}
        <Candidate {...candidate} />
    {/each}
</div>
