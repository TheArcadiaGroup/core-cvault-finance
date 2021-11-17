<script lang="ts">
	import { tabStore } from '$lib/store';
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

{#if activeTab === 'stats'}<Stats state={$tabStore.stats} />
{:else if activeTab === 'coreDao' || activeTab === 'connect'}<CoreDao state={$tabStore.coreDao} />
{:else if activeTab === 'dashboard'}<span />
{:else if activeTab === 'governance'}<span />
{/if}
