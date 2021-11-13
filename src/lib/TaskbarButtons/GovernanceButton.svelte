<script lang="ts">
	export let onClick: (e: MouseEvent) => void;
</script>

<button class="win-button" on:click={onClick}>
	<img height="24" width="24" src="/images/png/governance.png" alt="Governance" />
	Governance
</button>

<style lang="postcss">
	button {
		border-left-color: theme('colors.taskbarDark');
		border-right-color: theme('colors.taskbarDark');
		@apply font-win inline-flex gap-2 text-black border-2 p-1 sm:pl-5 sm:pr-5;
	}
</style>
