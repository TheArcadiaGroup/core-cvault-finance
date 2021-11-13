<script lang="ts">
	import { tabStore } from '$lib/store';
	import Stats from '$lib/Tabs/Stats.svelte';
	import type { TabIds, TabState, TabStore } from 'src/global';
	// ONLY ONE tab on mobile
	let activeTab: TabIds;
	let store: TabStore;
	tabStore.subscribe((tabs) => {
		store = tabs;
		activeTab = Object.entries(tabs).sort(function (a, b) {
			return b[1].position - a[1].position;
		})[0][0] as any;
		console.log(tabs, activeTab, tabs);
	});
	// $: console.log(activeTab);
</script>

{#if activeTab === 'connect'}
	<span />
{:else if activeTab === 'stats'}<Stats state={store.stats} />
{:else if activeTab === 'coreDao'}<span />
{:else if activeTab === 'dashboard'}<span />
{:else if activeTab === 'governance'}<span />
{/if}
