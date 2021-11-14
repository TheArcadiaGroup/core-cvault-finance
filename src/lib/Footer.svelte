<script lang="ts">
	import type { TabIds, TabStore } from 'src/global';
	import MediaQuery from './MediaQuery.svelte';

	import { dispatchTabAction, tabStore } from './store';
	import CoreDao from './TaskbarButtons/CoreDaoButton.svelte';
	import Dashboard from './TaskbarButtons/DashboardButton.svelte';
	import Governance from './TaskbarButtons/GovernanceButton.svelte';
	import StatsButton from './TaskbarButtons/StatsButton.svelte';
	let tabState: TabStore;
	tabStore.subscribe((v) => {
		tabState = v;
	});
	const maxPos = 4;
	function getDispatcher(d: TabIds, isMobile: boolean) {
		if (!isMobile)
			return () => {
				const isAlreadyOpen = tabState[d].state === 'OPEN';
				dispatchTabAction(isAlreadyOpen ? 'MINIMIZE' : 'OPEN', d);
			};
		return () => {
			const isAlreadyOpen = tabState[d].state === 'OPEN';
			if (isAlreadyOpen) {
				return dispatchTabAction(tabState[d].position >= maxPos ? 'MINIMIZE' : 'OPEN', d);
			}
			return dispatchTabAction('OPEN', d);
		};
	}
</script>

<MediaQuery query="(max-width:600px)" let:matches>
	<footer>
		<CoreDao onClick={getDispatcher('coreDao', matches)} />
		<div class="divider" aria-hidden />
		<StatsButton onClick={getDispatcher('stats', matches)} />
		<div class="divider" aria-hidden />
		<Dashboard onClick={getDispatcher('dashboard', matches)} />
		<Governance onClick={getDispatcher('governance', matches)} />
	</footer>
</MediaQuery>

<style lang="postcss">
	.divider {
		width: 1px;
		@apply h-4 bg-grey-divider ml-2 mr-2;
	}
	footer {
		border-color: theme('colors.border');
		@apply border-2 fixed h-footer bottom-0 bg-grey-bg w-screen p-1 text-left flex
			items-center;
	}
</style>
