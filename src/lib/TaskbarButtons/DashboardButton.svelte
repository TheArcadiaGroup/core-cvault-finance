<script lang="ts">
	import { isMobile } from '$lib/store/media-store';

	import { activeAppId } from '$lib/store/tab-store';

	export let onClick: (e: MouseEvent) => void;
</script>

<button class="win-button" on:click={onClick}>
	<img height="24" width="24" src="/images/png/dashboard.png" alt="Dashboard" />
	{$isMobile && $activeAppId !== 'dashboard' ? '' : 'Dashboard'}
</button>

<style lang="postcss">
	button {
		@apply font-win inline-flex gap-2 text-black
			border-2 p-1 sm:pl-5 sm:pr-5;
	}
</style>
