<script lang="ts">
	export let title: string;
	export let onMinimize: () => void;
	export let onClose: () => void;
</script>

<div class="gradient">
	<span>{title}</span>
	<div>
		<button on:click={onMinimize} class="win-button" aria-label="Minimize" title="Minimize"
			>-</button
		>
		<button on:click={onClose} class="win-button" aria-label="Close" title="Close">×</button>
	</div>
</div>

<style lang="postcss">
	div.gradient {
		@apply text-white flex justify-between p-1;
		background-image: theme('customGradient.title');
	}
	button {
		@apply h-6 w-6 active:pt-0 font-bold text-black;
	}
</style>
