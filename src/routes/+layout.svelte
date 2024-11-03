<script>
    import '../app.css';
    
    import Nav from '$lib/Nav.svelte';
</script>

<Nav />
<div>
    <main class="p-3">
        <slot />
    </main>
</div>
<footer>
    Made by <a href="https://codeforsacramento.org/">Code for Sacramento</a>
</footer>

<style>
    main {
        margin: 0 auto;
        max-width: 960px;
    }
    footer {
        font-size: 14px;
        padding-top: 1rem;
        padding-bottom: 2rem;
        text-align: center;
        width: 100%;
    }
</style>