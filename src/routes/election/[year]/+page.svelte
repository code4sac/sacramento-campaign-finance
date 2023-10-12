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

<section>
  <h1>Local elections in {data.year}</h1>
  <p>The data was retrieved on {generated}.</p>

  <ul class="races">
    {#each races as race}
      <li class="race">
        <Race data={race} />
      </li>
    {/each}
  </ul>
</section>

<style lang="scss">
  ul {
    list-style-type: none;
    padding-left: 0;
  }
</style>
