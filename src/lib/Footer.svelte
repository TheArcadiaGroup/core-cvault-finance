<script lang="ts">
	import type { TabIds } from 'src/global';
	import { isMobile } from './store/media-store';

	import { dispatchTabAction, tabStore } from './store/tab-store';
	import CoreDaoButton from './TaskbarButtons/CoreDaoButton.svelte';
	import DashboardButton from './TaskbarButtons/DashboardButton.svelte';
	import GovernanceButton from './TaskbarButtons/GovernanceButton.svelte';
	import StatsButton from './TaskbarButtons/StatsButton.svelte';
	const maxPos = 4;
	function mobileDispatcher(d: TabIds) {
		return () => {
			const isAlreadyOpen = $tabStore[d].state === 'OPEN' && $tabStore[d].position >= maxPos;
			dispatchTabAction(isAlreadyOpen ? 'MINIMIZE' : 'OPEN', d);
		};
	}
	function desktopDispatcher(d: TabIds) {
		return () => {
			const isAlreadyOpen = $tabStore[d].state === 'OPEN';
			if (isAlreadyOpen) {
				return dispatchTabAction($tabStore[d].position >= maxPos ? 'MINIMIZE' : 'OPEN', d);
			}
			return dispatchTabAction('OPEN', d);
		};
	}
	let getDispatcher = $isMobile ? mobileDispatcher : desktopDispatcher;
	$: getDispatcher = $isMobile ? mobileDispatcher : desktopDispatcher;
</script>

<footer>
	<CoreDaoButton />
	<div class="divider" aria-hidden />
	<StatsButton onClick={getDispatcher('stats')} />
	<div class="divider" aria-hidden />
	<DashboardButton onClick={getDispatcher('coreDao')} />
	<GovernanceButton onClick={getDispatcher('governance')} />
</footer>

<style lang="postcss">
	.divider {
		width: 1px;
		@apply h-4 bg-grey-divider ml-2 mr-2;
	}
	footer {
		/**
			we use w-100 instead of w-screen because
			we can make use of the zoom css property which does not work
			well with viewport units
			also, firefox does not support zoom which means this page will be usable
			on firefox but the experience will be much better for smaller screens on other 
			browsers (wider screens are mostly unaffected)
		*/
		border-color: theme('colors.border');
		@apply border-2 fixed h-footer bottom-0 bg-grey-bg w-[100%] p-1 text-left flex
			items-center;
	}
</style>
