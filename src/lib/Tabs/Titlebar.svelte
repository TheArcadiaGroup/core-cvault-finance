<script lang="ts">
	import { dispatchTabAction } from '$stores/tab-store';

	import type { TabIds } from 'src/global';

	export let title: string;
	export let owner: TabIds;
	export let noMinimize = false;
	export let onClose: () => void = null;
</script>

<div class="gradient">
	<div
		on:click|self={() => {
			dispatchTabAction('OPEN', owner);
		}}
		class="title drag-handle"
	>
		{title}
	</div>
	<div>
		{#if !noMinimize}
			<button
				on:click={(e) => {
					e.stopPropagation();
					dispatchTabAction('MINIMIZE', owner);
				}}
				class="win-button"
				aria-label="Minimize"
				title="Minimize">-</button
			>
		{/if}
		<button
			on:click={onClose ||
				((e) => {
					e.stopPropagation();
					dispatchTabAction('CLOSE', owner);
				})}
			class="win-button"
			aria-label="Close"
			title="Close">×</button
		>
	</div>
</div>

<style lang="postcss">
	div.title {
		@apply flex-1 text-left;
	}
	div.gradient {
		@apply text-white flex justify-between p-1 cursor-pointer select-none;
		background-image: theme('customGradient.title');
	}
	button {
		@apply h-6 w-6 active:pt-0 font-bold text-black;
	}
</style>
