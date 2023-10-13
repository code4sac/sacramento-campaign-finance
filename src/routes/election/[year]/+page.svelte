<script>
  import { formatGenerated } from "$lib/format.js";
  import Race from "$lib/Race.svelte";
  export let data = {}
  
  $: generated = formatGenerated(data.generated)
  $: races = data.races
</script>

<svelte:head>
  <title>Following the money in Sacramento elections</title>
</svelte:head>

<section class="container-xl">
  <div class="page-header">
    <div class="row">
      <div class="col">
        <div class="page-pretitle">{data.year}</div>
        <h1 class="page-title">Upcoming elections</h1>
      </div>
      <p>The data was retrieved on {generated}.</p>
    </div>
  </div>

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

<style lang="scss">
</style>
