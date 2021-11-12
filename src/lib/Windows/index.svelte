<script>
	import DesktopTabs from './_DesktopTabs.svelte';
	import MobileTabs from './_MobileTabs.svelte';

	export let matches;
</script>

{#if matches}
	<MobileTabs />
{:else}
	<DesktopTabs />
{/if}
