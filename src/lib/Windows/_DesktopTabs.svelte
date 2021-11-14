<script lang="ts">
	import { tabStore } from '$lib/store';
	import CoreDao from '$lib/Tabs/CoreDao.svelte';
	import Dashboard from '$lib/Tabs/Dashboard.svelte';
	import Governance from '$lib/Tabs/Governance.svelte';
	import Stats from '$lib/Tabs/Stats.svelte';
	import type { TabStore } from 'src/global';
	let store: TabStore;
	tabStore.subscribe((tabs) => {
		store = tabs;
	});
</script>

<div>
	{#if store.stats.state !== 'CLOSED'}
		<Stats state={store.stats} />
	{/if}
	{#if store.dashboard.state !== 'CLOSED'}
		<Dashboard state={store.dashboard} />
	{/if}
	{#if store.coreDao.state !== 'CLOSED' || store.connect.state === 'OPEN'}
		<CoreDao state={store.coreDao} />
	{/if}
	{#if store.governance.state !== 'CLOSED'}
		<Governance state={store.governance} />
	{/if}
</div>

<style lang="postcss">
	div {
		@apply mt-6 flex-row flex;
	}
</style>
