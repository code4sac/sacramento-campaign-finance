<script>
  import Candidate from './Candidate.svelte'
  export let data = []
</script>

<div>
  <div class="hr-text">
    {data.title}
    {#if data.district}{data.district}{/if}
  </div>

  <div class="row">
    {#each data.candidates as candidate}
      <div class="candidate col-sm-6 col-lg-4">
        <div class="card">
          <div class="card-body">
            <Candidate {...candidate} />
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
.candidate:nth-child(n+2) {
  
  @media screen and (max-width: 576px) {
    margin-top: 1rem;
    }
}

// .candidate:nth-child(n+3) {
//   @media screen and (min-width: 768px) {
//     margin-top: 1rem;
//   }
// }

.candidate:nth-child(n+4) {
  @media screen and (min-width: 992px) {
    margin-top: 1rem;
  }
}

  
   

</style>