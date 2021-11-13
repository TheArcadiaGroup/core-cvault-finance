<script>
	import CoreDao from './TaskbarButtons/CoreDao.svelte';
	import Dashboard from './TaskbarButtons/Dashboard.svelte';
	import Governance from './TaskbarButtons/Governance.svelte';
	import Stats from './TaskbarButtons/Stats.svelte';
</script>

<footer>
	<CoreDao />
	<div class="divider" aria-hidden />
	<Stats />
	<div class="divider" aria-hidden />
	<Dashboard />
	<Governance />
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
