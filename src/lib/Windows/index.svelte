<script>
	import DesktopTabs from './_DesktopTabs.svelte';
	import MobileTabs from './_MobileTabs.svelte';

	export let matches;
</script>

<!-- strict boolean check -->
{#if matches === true}
	<MobileTabs />
{:else if matches === false}
	<DesktopTabs />
{/if}
