<script lang="ts">
	import { activeAppId } from '$lib/store';

	export let onClick: (e: MouseEvent) => void;
	export let isMobile: boolean;
</script>

<button class="win-button" on:click={onClick}>
	<img height="24" width="24" src="/images/png/governance.png" alt="Governance" />
	{isMobile && $activeAppId !== 'governance' ? '' : 'Governance'}
</button>

<style lang="postcss">
	button {
		border-left-color: theme('colors.taskbarDark');
		border-right-color: theme('colors.taskbarDark');
		@apply font-win inline-flex gap-2 text-black border-2 p-1 sm:pl-5 sm:pr-5;
	}
</style>
