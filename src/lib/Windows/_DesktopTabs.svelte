<script lang="ts">
	import { tabStore } from '$lib/store';
	import CoreDao from '$lib/Tabs/CoreDao.svelte';
	import Dashboard from '$lib/Tabs/Dashboard.svelte';
	import Governance from '$lib/Tabs/Governance.svelte';
	import Stats from '$lib/Tabs/Stats.svelte';
</script>

<div>
	{#if $tabStore.stats.state !== 'CLOSED'}
		<Stats state={$tabStore.stats} />
	{/if}
	{#if $tabStore.dashboard.state !== 'CLOSED'}
		<Dashboard state={$tabStore.dashboard} />
	{/if}
	{#if $tabStore.coreDao.state !== 'CLOSED' || $tabStore.connect.state === 'OPEN'}
		<CoreDao state={$tabStore.coreDao} />
	{/if}
	{#if $tabStore.governance.state !== 'CLOSED'}
		<Governance state={$tabStore.governance} />
	{/if}
</div>

<style lang="postcss">
	div {
		@apply mt-6 flex-row flex;
	}
</style>
