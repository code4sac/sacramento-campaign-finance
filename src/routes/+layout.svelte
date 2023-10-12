<script>
    import "../app.css";

    import Footer from "$lib/Footer.svelte";
    import Nav from "$lib/Nav.svelte";
    // import "@tabler/core";
</script>

<Nav />
<div>
    <main>
        <slot />
    </main>
</div>
<Footer />

<style lang="scss">
    div {
        position: relative;
    }
    main {
        // max-width: 90%;
        margin: 0 auto;
    }

    @media screen and (min-width: 700px) {
        main {
            // max-width: 90%;
        }
    }
</style>
