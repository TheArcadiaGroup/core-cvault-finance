<script lang="ts">
	import { tabStore } from '$stores/tab-store';
	import CoreDao from '$lib/Tabs/CoreDao.svelte';
	import Stats from '$lib/Tabs/Stats.svelte';
	import type { TabIds } from 'src/global';
	// ONLY ONE tab on mobile
	// we sort through the open tabs and
	// get the one with the lowest position
	let activeTab: TabIds;
	$: activeTab = Object.entries($tabStore).sort(function ([, a], [, b]) {
		if (a.state !== 'OPEN' && b.state === 'OPEN') return 1;
		if (b.state !== 'OPEN' && a.state === 'OPEN') return -1;
		return b.position - a.position;
	})[0][0] as any;
</script>

<!-- wrap it in a div..otherwise svelte transition 
forgets to unmount the child nodes if we change the width too often
this shouldn't happen but..still very ugly that this bug is seen
-->
<div>
	{#if activeTab === 'stats'}<Stats state={$tabStore.stats} />
	{:else if activeTab === 'coreDao' || activeTab === 'connect'}<CoreDao state={$tabStore.coreDao} />
	{:else if activeTab === 'governance'}<span />
	{/if}
</div>

<style lang="postcss">
	div {
		@apply h-full m-0 p-0 absolute inset-y-0 left-0;
	}
</style>
