import { error } from './toastNotification';
import { coinbaseLogo, metamaskLogo } from './../constants/walletImages';
import { get } from 'svelte/store';
import { appProvider, appSigner, userWalletAddress, web3ModalInstance } from '$stores/provider';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';

const infuraId = '456e115b04624699aa0e776f6f2ee65c';
// const defaultChainId = 42;

// Is Metamask Installed
const isMetaMaskInstalled = () => {
	if (window.ethereum) {
		if (window.ethereum.providers) {
			return window.ethereum.providers.find((prov) => prov.isMetaMask);
		} else {
			return window.ethereum?.isMetaMask;
		}
	}
	return false;
};

// Is Coinbase Extension Installed
const isCoinbaseExtensionInstalled = () => {
	if (window.ethereum) {
		if (window.ethereum.providers) {
			return window.ethereum.providers.find((prov) => prov.isWalletLink);
		} else {
			return window.ethereum?.isWalletLink;
		}
	}
	return false;
};

// Trigger the Wallet Connect Button
const triggerSelectedWalletButton = (providerName: string) => {
	const web3ModalWrapper = document.getElementById('WEB3_CONNECT_MODAL_ID');
	// Hide the web3modal and use our UI
	web3ModalWrapper && web3ModalWrapper.classList.add('hidden');

	document.querySelectorAll('.web3modal-provider-name').forEach((el) => {
		if (el.textContent.trim().toLowerCase() === providerName.trim().toLowerCase()) {
			(el as HTMLDivElement).click();
		}
	});
};

// Initialize Connection
export const freshConnect = async (
	selectedProvider: 'metamask' | 'walletConnect' | 'coinbase',
	web3Modal: Web3Modal
) => {
	// Check if metamask is present
	if (selectedProvider === 'metamask' && !isMetaMaskInstalled()) {
		error('Please Install the Metamask Browser Extension Before Proceeding');
		console.log('Please Install the Metamask Browser Extension Before Proceeding');
		return;
	}

	if (selectedProvider === 'coinbase' && !isCoinbaseExtensionInstalled()) {
		error('Please Install the Coinbase Browser Extension Before Proceeding');
		console.log('Please Install the Coinbase Browser Extension Before Proceeding');
		return;
	}

	// Clear Cache since its a fresh Init
	web3Modal.clearCachedProvider();
	// Clear Store
	appProvider.set(null);

	// Check the selectedWallet
	triggerSelectedWalletButton(selectedProvider);

	// Init Provider
	const web3InstanceProvider = await getWeb3ModalProvider(web3Modal);

	return await initProvider(web3InstanceProvider);
};

// Connect using Web3Modal
export const getWeb3ModalProvider = async (web3Modal: Web3Modal) => {
	let provider;
	if (web3Modal?.cachedProvider) {
		provider = await web3Modal.connectTo(web3Modal?.cachedProvider);
	} else {
		// Init New Connection
		provider = await web3Modal.connect();
	}
	return provider;
};

// Initialize web3Modal Instance and set it to store
export const initWeb3ModalInstance = () => {
	const currentWeb3ModalInstance = get(web3ModalInstance);

	if (currentWeb3ModalInstance) {
		return currentWeb3ModalInstance;
	} else {
		const providerOptions = {
			walletconnect: {
				package: (window as any).WalletConnectProvider.default, // required
				options: {
					infuraId: infuraId // required
				}
			},

			// Metamask
			'custom-metamask': {
				display: {
					logo: metamaskLogo,
					name: 'MetaMask',
					description: 'Connect to your MetaMask Wallet'
				},
				package: true,
				connector: async () => {
					if (!isMetaMaskInstalled()) {
						// window.location = "https://metamask.app.link/dapp/www.ethbox.org/app/"; // <-- LOOK HERE
						return;
					}

					let provider = null;
					if (typeof window.ethereum !== 'undefined') {
						if (window.ethereum.providers) {
							let providers = window.ethereum.providers;
							provider = providers.find((prov) => prov.isMetaMask);
						} else {
							provider = window.ethereum;
						}

						try {
							await provider.request({ method: 'eth_requestAccounts' });
						} catch (error) {
							console.log('Wallet Request Cancelled');
							return;
						}
					} else {
						console.log('No MetaMask Wallet found');
						return;
					}

					console.log('MetaMask provider', provider);
					return provider;
				}
			},
			'custom-coinbase': {
				display: {
					logo: coinbaseLogo,
					name: 'Coinbase',
					description: 'Connect to your Coinbase Wallet'
				},
				package: true,
				connector: async () => {
					if (!isCoinbaseExtensionInstalled()) {
						// window.location = "https://metamask.app.link/dapp/www.ethbox.org/app/"; // <-- LOOK HERE
						return;
					}

					let provider = null;
					if (typeof window.ethereum !== 'undefined') {
						if (window.ethereum.providers) {
							let providers = window.ethereum.providers;
							provider = providers.find((prov) => prov.isWalletLink);
						} else {
							provider = window.ethereum;
						}
						try {
							await provider.request({ method: 'eth_requestAccounts' });
						} catch (error) {
							console.log('Wallet Request Cancelled');
							return;
						}
					} else {
						console.log('No Coinbase Wallet found');
						return;
					}

					console.log('Coinbase provider', provider);
					return provider;
				}
			}
		};

		const web3Modal = new Web3Modal({
			// network: 'kovan',
			disableInjectedProvider: true,
			cacheProvider: true,
			providerOptions
		});

		web3ModalInstance.set(web3Modal);

		return web3Modal;
	}
};

// Initialize App Provider
export const initProvider = async (provider: any) => {
	const ethersProvider = new ethers.providers.Web3Provider(provider);
	ethersProvider.on('connect', (e) => console.log(Object.keys(e)));
	appProvider.set(ethersProvider ? ethersProvider : null);
	appSigner.set(ethersProvider ? ethersProvider.getSigner() : null);
	userWalletAddress.set(ethersProvider ? await ethersProvider.getSigner().getAddress() : '');

	console.log(
		'WALLET CONNECTED.\n BALANCE: ',
		ethers.utils.formatEther(
			await ethersProvider.getBalance(await ethersProvider.getSigner().getAddress())
		)
	);

	return ethersProvider;
};
