<script lang="ts">
	import { dispatchTabAction } from './store';
	import CoreDao from './TaskbarButtons/CoreDaoButton.svelte';
	import Dashboard from './TaskbarButtons/DashboardButton.svelte';
	import Governance from './TaskbarButtons/GovernanceButton.svelte';
	import StatsButton from './TaskbarButtons/StatsButton.svelte';
</script>

<footer>
	<CoreDao onClick={() => dispatchTabAction('OPEN', 'coreDao')} />
	<div class="divider" aria-hidden />
	<StatsButton onClick={() => dispatchTabAction('OPEN', 'stats')} />
	<div class="divider" aria-hidden />
	<Dashboard onClick={() => dispatchTabAction('OPEN', 'dashboard')} />
	<Governance onClick={() => dispatchTabAction('OPEN', 'governance')} />
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
