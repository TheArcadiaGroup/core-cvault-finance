<script lang="ts">
	import WindowShell from './_WindowShell.svelte';
	import Titlebar from './Titlebar.svelte';
	import Metamask from '$lib/icons/Metamask.svelte';
	import Walletconnect from '$lib/icons/Walletconnect.svelte';
	import Coinbase from '$lib/icons/Coinbase.svelte';
	import { freshConnect, initWeb3ModalInstance } from '$helpers/walletConnection';

	export let close: () => void;

	// Connect to Wallet Functionality
	const connect = async (selectedProvider: 'metamask' | 'walletConnect' | 'coinbase') => {
		const web3Modal = initWeb3ModalInstance();
		const initializedProvider = await freshConnect(selectedProvider, web3Modal);

		if (initializedProvider) {
			// Close modal after successful connection
			close();
		} else {
			// Do something after connection failed
			console.log(initializedProvider);
		}
	};
</script>

<WindowShell state={{ position: 1, state: 'OPEN' }} target="connect" sectionClass="connect">
	<Titlebar owner="connect" noMinimize onClose={close} title="Connect" />
	<div>
		<h2>Connect with.</h2>
		<div class="buttons">
			<button class="win-button" on:click={() => connect('metamask')}>
				<Metamask />
				<span>Metamask</span>
			</button>
			<button class="win-button" on:click={() => connect('walletConnect')}>
				<Walletconnect />
				<span>Walletconnect</span>
			</button>
			<button class="win-button" on:click={() => connect('coinbase')}>
				<Coinbase />
				<span>Coinbase</span>
			</button>
		</div>
	</div>
</WindowShell>

<style lang="postcss">
	.buttons {
		@apply flex flex-col items-center justify-center gap-4 pt-2 pb-8;
	}
	h2 {
		@apply text-black text-xl mt-6 mb-6;
	}
	.win-button {
		border-color: theme('colors.border') #848584 theme('colors.taskbarDark') theme('colors.border');
		@apply p-2 w-[40%] inline-flex flex-col items-center justify-center border-2 border-solid text-black;
	}
	.win-button:active {
		border-color: black theme('colors.border') theme('colors.border') black;
	}
</style>
