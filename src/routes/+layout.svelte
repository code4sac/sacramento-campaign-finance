<script>
	import Footer from '$lib/Footer.svelte';
	import Nav from '$lib/Nav.svelte';
</script>

<Nav />
<div>
	<main class="container">
		<slot />
	</main>
</div>
<Footer />
