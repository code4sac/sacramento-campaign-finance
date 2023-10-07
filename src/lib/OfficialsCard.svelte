<script>
    export let name = "";
    export let title = "";
</script>

<!-- <div class="card officials-card">
    <h3 class="card-title">{name}</h3>
    <div class="card-secondary">
        <p class="title">{title}</p>
    </div>
</div> -->
<div class=" officials-card">
    <div class="">
        <h3 class="headings">{name}</h3>
        <p class="title">{title}</p>
    </div>
</div>

<style lang="scss">
    .officials-card {
        background-color: #09447c;
        padding: 20px;
        border-radius: 3px;
        min-width: 300px;
        max-height: 100px;
        color: #fff;
        text-align: center;
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
    }
    .headings {
        padding: 0px;
        color: #fff;
        text-align: left;
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
    }
    .title {
        color: #fff;
        text-align: left;
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
</style>
