<script>
	import OsRenderer from '$lib/Os.svelte';
</script>

<OsRenderer />
<slot />

<style lang="postcss">
	* {
		@apply text-center;
		font-family: 'Inter', sans-serif;
	}
</style>
