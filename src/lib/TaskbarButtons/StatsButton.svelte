<script lang="ts">
	export let onClick: (e: MouseEvent) => void;
</script>

<button class="win-button" on:click={onClick}>
	<img height={20} width={20} src="/images/png/edit.png" alt="Edit Menu" />
</button>

<style lang="postcss">
	img {
		@apply pointer-events-none;
	}
</style>
