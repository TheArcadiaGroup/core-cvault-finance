<script lang="ts">
	import {
		borrow,
		depositAndBorrow,
		depositCollateral
	} from '$contracts/contractCalls/loanOperations';
	import { increaseCoreAllowance } from '$contracts/contractCalls/tokenBalances';

	import { disconnectWallet } from '$helpers/walletConnection';
	import { coreBalance, coreUsageApproved, daiBalance } from '$stores/balances';

	import { appSigner } from '$stores/provider';
	import { tabStore } from '$stores/tab-store';

	import type { TabIds, TabState, TabStore } from 'src/global';
	import Connect from './Connect.svelte';
	import Titlebar from './Titlebar.svelte';

	import WindowShell from './_WindowShell.svelte';

	export let state: TabState;
	let activeTab: 'borrow' | 'repay' = 'borrow';
	let isConnectMode = false;
	let _previousTabStoreState;

	let daiToBorrow = 0;
	let coreForCollateral = 0;
	let collateralToWithdraw = 0;
	let buttonText = 'Disconnect Wallet';

	const useMaxCoreTokens = () => {
		coreForCollateral = +$coreBalance.noExponents();
	};

	const useMaxDaiTokens = () => {
		daiToBorrow = +$daiBalance.noExponents();
	};

	const useMaxCollateralInContract = () => {};

	const connectOrDisconnect = () => {
		if ($appSigner) {
			// Disconnect
			disconnectWallet();
		} else {
			// Connect
			isConnectMode = true;
		}
	};

	const updateButtonText = () => {
		if (coreForCollateral > 0) {
			if (daiToBorrow > 0) {
				buttonText = 'Deposit CORE and Borrow DAI';
			} else {
				buttonText = 'Deposit CORE';
			}
		} else {
			if (daiToBorrow > 0) {
				buttonText = 'Borrow DAI';
			} else {
				buttonText = 'Disconnect Wallet';
			}
		}
	};

	const executeRelevantButtonAction = async () => {
		if ($coreUsageApproved) {
			if (coreForCollateral > 0) {
				if (daiToBorrow > 0) {
					// 'Deposit CORE and Borrow DAI';
					await depositAndBorrow(coreForCollateral, daiToBorrow);
				} else {
					// 'Deposit CORE';
					await depositCollateral(coreForCollateral);
				}
			} else {
				if (daiToBorrow > 0) {
					// 'Borrow DAI';
					await borrow(daiToBorrow);
				} else {
					// 'Disconnect Wallet';
					disconnectWallet();
				}
			}
		} else {
			// Increase Allowance
			await increaseCoreAllowance();
		}
	};

	$: (daiToBorrow || coreForCollateral) && updateButtonText();

	$: if (isConnectMode) {
		tabStore.update((prev): TabStore => {
			const getTState = (x: TabIds): TabState => ({
				position: 0,
				state: prev[x].state === 'CLOSED' ? 'CLOSED' : 'MINIMIZED'
			});
			_previousTabStoreState = prev;
			return {
				connect: getTState('connect'),
				coreDao: getTState('coreDao'),
				governance: getTState('governance'),
				stats: getTState('stats'),
				'connect:children': getTState('connect:children')
			};
		});
	} else {
		if (_previousTabStoreState) tabStore.set(_previousTabStoreState);
	}
</script>

{#if !isConnectMode}
	<WindowShell {state} target="coreDao" sectionClass="core-dao">
		<div data-win-tab>
			<Titlebar noMinimize owner="coreDao" title="coreDAO.exe" />
		</div>
		<div core-dao>
			<div>
				<h2>Ready to farm without inflation?</h2>
			</div>
			<div class="button-container">
				<button class="win-button connect" on:click={connectOrDisconnect}>
					<img height="20" width="20" src="/images/png/connect.png" alt="Connect icon" />
					{#if $appSigner}
						Disconnect Wallet
					{:else}
						Connect Wallet
					{/if}
				</button>
			</div>
			<div class="cvault">
				<span>CORE</span>
				<span>Vault</span>
				<span>v2.31</span>
			</div>
			<div class="abc">
				<button
					class={activeTab === 'borrow' ? 'active tab' : 'tab'}
					on:click={() => (activeTab = 'borrow')}>Borrow</button
				>
				<button
					class={activeTab === 'repay' ? 'active tab' : 'tab'}
					on:click={() => (activeTab = 'repay')}>Repay</button
				>
			</div>
			{#if activeTab === 'borrow'}
				<div class="borrow">
					<div class="borrow-content">
						<div class="float-txt">Deposit Colateral</div>
						<div class="actions">
							<div class="form-field">
								<div class="img-container">
									<img height="20" width="20" src="/images/png/core.png" alt="Core" />
								</div>
								<span>CORE</span>
								<!-- <span class="dropdown">></span> -->
								<input bind:value={coreForCollateral} />
								<button class="win-button max" on:click={useMaxCoreTokens}>Max</button>
							</div>
							<hr />
							<div>Borrow DAI</div>
							<div class="form-field">
								<div class="img-container">
									<img height="20" width="20" src="/images/png/dai.png" alt="Dai" />
								</div>
								<span>DAI</span>
								<!-- <span class="dropdown">></span> -->
								<input bind:value={daiToBorrow} />
								<button class="win-button max" on:click={useMaxDaiTokens}>Max</button>
							</div>
							<div class="button-container bottom">
								<button
									class="win-button connect"
									on:click={() =>
										$appSigner ? executeRelevantButtonAction() : connectOrDisconnect()}
								>
									{#if $appSigner}
										{#if $coreUsageApproved}
											{buttonText}
										{:else}
											Approve
										{/if}
									{:else}
										<img height="20" width="20" src="/images/png/connect.png" alt="Connect icon" />
										Connect Wallet
									{/if}
								</button>
							</div>
						</div>
					</div>
				</div>
			{:else}
				<div class="repay">
					<div class="repay-content">
						<div class="float-txt">Repay</div>
						<div class="actions">
							<div class="form-field">
								<div class="img-container">
									<img height="20" width="20" src="/images/png/core.png" alt="Core" />
								</div>
								<span>CORE</span>
								<!-- <span class="dropdown">></span> -->
								<input bind:value={collateralToWithdraw} />
								<button class="win-button max" on:click={useMaxCollateralInContract}>Max</button>
							</div>
							<div class="button-container bottom" style="margin-top:2rem">
								<button class="win-button connect" on:click={connectOrDisconnect}>
									<img height="20" width="20" src="/images/png/connect.png" alt="Connect icon" />
									{#if $appSigner}
										Disconnect Wallet
									{:else}
										Connect Wallet
									{/if}
								</button>
							</div>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</WindowShell>
{:else if isConnectMode}
	<Connect close={() => (isConnectMode = false)} />
{/if}

<style lang="postcss">
	.button-container.bottom {
		@apply mt-4;
	}
	.max.win-button {
		border-bottom-color: black;
		@apply p-0 w-10 h-6 text-xs -translate-x-14;
	}
	input {
		@apply border-2 border-solid outline-none bg-grey-clicked w-[70%] h-8 p-4;
		border-color: #848584 theme('colors.border') theme('colors.border') #848584;
	}
	.form-field {
		@apply flex gap-3 items-center cursor-pointer;
	}
	hr {
		@apply mt-4 mb-4;
	}
	.img-container {
		@apply bg-white rounded-full p-1;
	}
	.actions {
		@apply border-2 border-solid p-4;
		border-color: theme('colors.border');
		box-shadow: -1px -1px 0px 0px #848584;
	}
	.dropdown {
		@apply rotate-90;
	}
	.abc {
		@apply w-1/2 flex;
	}
	.borrow-content,
	.repay-content {
		@apply text-left pt-0 p-4 text-base text-black;
	}
	.borrow,
	.repay {
		border-color: var(--theme-border);
		@apply border-2 border-solid;
	}
	[core-dao] {
		@apply p-4;
	}
	.button-container {
		@apply flex items-center justify-center;
	}
	button {
		@apply flex items-center justify-center py-1 w-3/4;
		@apply font-win gap-2 text-black;
		@apply border-2 p-1 sm:pl-5 sm:pr-5;
	}

	button.connect {
		@apply max-w-[70%] min-w-[200px];
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
	button.tab {
		@apply h-10 bg-grey-bg translate-y-2.5;
		border-color: var(--theme-border);
		border-bottom-color: theme('colors.border');
	}
	button.tab.active {
		@apply h-12 translate-y-[0.15rem];
		border-bottom-color: transparent;
		z-index: 2;
	}
	.float-txt {
		@apply translate-x-4 translate-y-4 inline-block p-1 bg-grey-bg;
	}
</style>
