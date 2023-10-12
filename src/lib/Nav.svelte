<script>
  import { writable } from "svelte/store";

  const langs = [
    {
      id: 'en',
      label: 'English'
    },
    {
      id: 'es',
      label: 'Español'
    }
  ]
  const lang = writable('en')

</script>

<nav>
  <h1>Sacramento Campaign Cash</h1>
  <ul>
    <li>
      <a href="/">Home</a>
    </li>
    <li>
      <a href="/election/2024" target="_self">Upcoming election</a>
    </li>
    <li>
      <a href="/body/sac-city" target="_self">City Council</a>
    </li>
    <li>
      <a href="/body/sac-county" target="_self">Board of Supervisors</a>
    </li>
  </ul>
  <div class="select-container">
    <!-- <select bind:value={$lang}>
      {#each langs as l}
        <option value={l.id}>{l.label}</option>
      {/each}
    </select> -->
  </div>
</nav>

<style lang="scss">
  nav {
    display: grid;
    grid-template-columns: 150px 1fr 40%;
  }
  h1 {
    grid-column: 1 / 2;
    font-size: 1rem;
    line-height: 1.2rem;
    max-width: 150px;
    width: 150px;
  }
  ul {
    display: flex;
    grid-column: 2/3;
    justify-content: space-around;
    list-style-type: none;
    padding: 0;
    width: 100%;

  }
  .select-container {
    display: flex;
    justify-content: flex-end;
    grid-column: 3;
  }
</style>