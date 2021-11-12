<script>
	import Windows from './Windows/index.svelte';
	import MediaQuery from './MediaQuery.svelte';
	import CoreDao from './TaskbarButtons/CoreDao.svelte';
	import Edit from './TaskbarButtons/Edit.svelte';
	import Dashboard from './TaskbarButtons/Dashboard.svelte';
</script>

<div>
	<MediaQuery query="(max-width:600px)" let:matches>
		<Windows {matches} />
	</MediaQuery>
</div>
<footer>
	<CoreDao />
	<div class="divider" aria-hidden />
	<Edit />
	<div class="divider" aria-hidden />
	<Dashboard />
</footer>

<style lang="postcss">
	.divider {
		width: 1px;
		@apply h-4 bg-grey-divider ml-2 mr-2;
	}
	footer {
		@apply fixed bottom-0 h-10 bg-grey-bg w-screen p-1 text-left flex items-center;
	}
</style>
