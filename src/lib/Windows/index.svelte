<script>
	import { isMobile } from '$lib/store/media-store';

	import DesktopTabs from './_DesktopTabs.svelte';
	import MobileTabs from './_MobileTabs.svelte';
	console.log($isMobile);
</script>

<!-- strict boolean check -->
{#if $isMobile === true}
	<MobileTabs />
{:else if $isMobile === false}
	<DesktopTabs />
{/if}
