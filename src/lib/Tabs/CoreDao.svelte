<script lang="ts">
	import type { TabState } from 'src/global';
	import Titlebar from './Titlebar.svelte';

	import WindowShell from './_WindowShell.svelte';

	export let state: TabState;
	let active: 'borrow' | 'repay';
</script>

<WindowShell {state} target="coreDao" sectionClass="core-dao">
	<div data-win-tab>
		<Titlebar owner="coreDao" title="coreDAO.exe" />
	</div>
	<div>
		<h2>Ready to farm without inflation?</h2>
	</div>
	<div class="button-container">
		<button class="win-button">
			<img height="20" width="20" src="/images/png/connect.png" alt="Connect icon" />
			Connect Wallet
		</button>
	</div>
	<div class="cvault">
		<span>CORE</span>
		<span>Vault</span>
		<span>v2.31</span>
	</div>
	<div class="button-container">
		<button class={active === 'borrow' ? 'active' : ''} on:click={() => (active = 'borrow')}
			>Borrow</button
		>
		<button class={active === 'repay' ? 'active' : ''} on:click={() => (active = 'repay')}
			>Repay</button
		>
	</div>
</WindowShell>
abc9ab

<style lang="postcss">
	.button-container {
		@apply flex items-center justify-center;
	}
	button {
		@apply flex items-center justify-center pt-1 pb-1 w-[75%] 
		font-win gap-2 text-black
			border-2 p-1 sm:pl-5 sm:pr-5;
	}
	h2 {
		@apply text-black text-xl text-center m-4;
	}
	.cvault {
		@apply mt-5 mb-4 flex gap-3 pl-4;
	}
	.button-container {
		@apply flex;
	}
	button.active {
		transform: translate(0px, -6px);
		border-bottom-color: transparent;
	}
</style>
