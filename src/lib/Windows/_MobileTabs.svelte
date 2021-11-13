<script lang="ts">
	import { tabStore } from '$lib/store';
	import Stats from '$lib/Tabs/Stats.svelte';
	import type { TabIds } from 'src/global';
	// ONLY ONE tab on mobile
	let activeTab: TabIds;
	tabStore.subscribe((tabs) => {
		activeTab = tabs[tabs.length - 1];
	});
</script>

{#if activeTab === 'connect'}
	<span />
{:else if activeTab === 'stats'}<Stats />
{:else if activeTab === 'coreDao'}<span />
{:else if activeTab === 'dashboard'}<span />
{:else if activeTab === 'governance'}<span />
{/if}
