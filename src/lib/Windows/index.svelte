<script>
	import { isMobile } from '$stores/media-store';

	import DesktopTabs from './_DesktopTabs.svelte';
	import MobileTabs from './_MobileTabs.svelte';
</script>

<!-- strict boolean check -->
{#if $isMobile === true}
	<MobileTabs />
{:else if $isMobile === false}
	<DesktopTabs />
{/if}
