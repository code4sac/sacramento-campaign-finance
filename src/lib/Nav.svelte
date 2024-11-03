<script lang="ts">
	import { cn } from "$lib/utils.js";

	let className: string | undefined | null = undefined;
	export { className as class };

    let isDark = true

    function onModeClick() {
        const html = document.querySelector('html')
        if (html.classList.contains('dark')) {
            html.classList.remove('dark')
            isDark = false
        } else {
            html.classList.add('dark')
            isDark = true
        }
    }
</script>

<nav class={cn("container ml-0 my-6 flex flex-col md:flex-row items-center justify-between space-x-4 lg:space-x-6", className)}>
    <a class="m-0 navbar-brand" href="/">Sac Campaign Cash</a>
    <a class="m-0 nav-link" href="/election/2024" target="_self"
        >Upcoming election</a
    >
    <a class="m-0 nav-link" href="/body/sac-city" target="_self"
        >City Council</a
    >
    <a class="m-0 nav-link" href="/body/sac-county" target="_self"
        >Board of Supervisors</a
    >
    <!-- <button on:click={onModeClick}>
        {#if isDark}
            ☀️
        {:else}
            ☽
        {/if}
    </button> -->
</nav>
