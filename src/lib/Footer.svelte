<script lang="ts">
	import type { TabIds, TabStore } from 'src/global';

	import { dispatchTabAction, tabStore } from './store';
	import CoreDao from './TaskbarButtons/CoreDaoButton.svelte';
	import Dashboard from './TaskbarButtons/DashboardButton.svelte';
	import Governance from './TaskbarButtons/GovernanceButton.svelte';
	import StatsButton from './TaskbarButtons/StatsButton.svelte';
	let tabState: TabStore;
	tabStore.subscribe((v) => {
		tabState = v;
	});
	function getDispatcher(d: TabIds) {
		return () => dispatchTabAction(tabState[d].state === 'OPEN' ? 'MINIMIZE' : 'OPEN', d);
	}
</script>

<footer>
	<CoreDao onClick={getDispatcher('coreDao')} />
	<div class="divider" aria-hidden />
	<StatsButton onClick={getDispatcher('stats')} />
	<div class="divider" aria-hidden />
	<Dashboard onClick={getDispatcher('dashboard')} />
	<Governance onClick={getDispatcher('governance')} />
</footer>

<style lang="postcss">
	.divider {
		width: 1px;
		@apply h-4 bg-grey-divider ml-2 mr-2;
	}
	footer {
		border-color: #fefefe;
		@apply border-2 fixed h-footer bottom-0 bg-grey-bg w-screen p-1 text-left flex
			items-center;
	}
</style>
