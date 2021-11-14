<script lang="ts">
	import { tabStore } from '$lib/store';
	import CoreDao from '$lib/Tabs/CoreDao.svelte';
	import Stats from '$lib/Tabs/Stats.svelte';
	import type { TabIds, TabStore } from 'src/global';
	// ONLY ONE tab on mobile
	let activeTab: TabIds;
	let store: TabStore;
	tabStore.subscribe((tabs) => {
		store = tabs;
		activeTab = Object.entries(tabs).sort(function (a, b) {
			return b[1].position - a[1].position;
		})[0][0] as any;
	});
</script>

{#if activeTab === 'stats'}<Stats state={store.stats} />
{:else if activeTab === 'coreDao' || activeTab === 'connect'}<CoreDao state={store.coreDao} />
{:else if activeTab === 'dashboard'}<span />
{:else if activeTab === 'governance'}<span />
{/if}
