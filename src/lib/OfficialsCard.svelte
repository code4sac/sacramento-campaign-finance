<script>
    export let link = '';
    export let name = '';
    export let title = '';
</script>

<div class=" officials-card">
    <div class="">
        <a href={link} style="width: fit-content;">
            <h3 class="headings">{name}</h3>
            <p class="title">{title}</p>
        </a>
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
