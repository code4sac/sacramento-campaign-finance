<script>
  import Candidate from './Candidate.svelte'
  export let data = []
</script>

<div>
  <h1>
    <a id={`${data.title}-${data.district}`}>
      {data.title}
      {#if data.district}{data.district}{/if}
    </a>
  </h1>

  <ul class="candidates">
    {#each data.candidates as candidate}
      <li class="candidate">
        <Candidate {...candidate} />
      </li>
    {/each}
  </ul>
</div>

<style lang="scss">
  
  ul.candidates {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: space-around;
    list-style-type: none;
    padding-left: 0;

    @media screen and (min-width: 700px) {
      flex-direction: row;      
    }
  }

  .candidate {
    background: #ffffff;
    flex: 1;
    margin-top: 0.5rem;
    min-width: 30%;

    @media screen and (min-width: 700px) {
      max-width: 50%;
    }
  }  
  </style>