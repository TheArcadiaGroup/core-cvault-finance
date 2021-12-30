import { notifyError } from './toastNotification';
import { coinbaseLogo, metamaskLogo } from './../constants/walletImages';
import { get } from 'svelte/store';
import {
	appProvider,
	appSigner,
	externalProvider,
	userWalletAddress,
	web3ModalInstance,
	connectionDetails,
	selectedWalletName
} from '$stores/provider';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';

const infuraId = '456e115b04624699aa0e776f6f2ee65c';
const appName = 'Hinata Marketplace';

// Check if Metamask is Installed
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

// Initialize web3 Modal Instance
export const initWeb3ModalInstance = () => {
	const providerOptions = {
		// Replace Default Metamask Injected Wallet
		'custom-metamask': {
			display: {
				logo: metamaskLogo,
				name: 'MetaMask',
				description: 'Connect to your MetaMask Wallet'
			},
			package: true,
			connector: async () => {
				if (!isMetaMaskInstalled()) {
					notifyError('Please Install the Metamask Browser Extension Before Proceeding');
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

				return provider;
			}
		},

		// WalletConnect
		walletconnect: {
			package: (window as any).WalletConnectProvider.default, // required
			options: {
				infuraId: infuraId // required
			}
		},

		// Coinbase or other WalletLink Wallets
		'custom-coinbase': {
			display: {
				logo: coinbaseLogo,
				name: 'Coinbase',
				description: 'Scan with WalletLink to connect'
			},
			options: {
				appName: appName, // Your app name
				networkUrl: `https://mainnet.infura.io/v3/${infuraId}`,
				chainId: 1,
				network: 'mainnet'
			},
			package: (window as any).WalletLink.default,
			connector: async (_, options) => {
				const { appName, networkUrl, chainId } = options;
				const walletLink = new (window as any).WalletLink.default({
					appName
				});
				const provider = walletLink.makeWeb3Provider(networkUrl, chainId);
				await provider.enable();
				return provider;
			}
		}
	};

	const web3Modal = new Web3Modal({
		// Disabled the default injected Metamask (also launches other injected if enabled + present)
		disableInjectedProvider: true,
		cacheProvider: true,
		providerOptions
	});

	web3ModalInstance.set(web3Modal);

	return web3Modal;
};

// Set the provider
const setProvider = async (provider: ethers.providers.ExternalProvider) => {
	const ethersProvider = new ethers.providers.Web3Provider(provider);

	// Commit values to store
	appProvider.set(ethersProvider ? ethersProvider : null);
	appSigner.set(ethersProvider ? ethersProvider.getSigner() : null);
	const userAddress = ethersProvider ? await ethersProvider.getSigner().getAddress() : null;
	userWalletAddress.set(userAddress);
	connectionDetails.set(await ethersProvider.getNetwork());

	return ethersProvider;
};

// Disconnect Wallet
export const disconnectWallet = () => {
	// Clear the cached provider
	get(web3ModalInstance) && get(web3ModalInstance).clearCachedProvider();
	deregisterEvents();

	// Clear Local Storage
	localStorage.removeItem('walletconnect');

	// Reset App Store
	appSigner.set(null);
	web3ModalInstance.set(null);
	appProvider.set(null);
	selectedWalletName.set(null);
	externalProvider.set(null);
};

// Connect to Wallet (new connection)
export const connectToWallet = async () => {
	// Check if metamask is present
	if (get(selectedWalletName) === 'metamask' && !isMetaMaskInstalled()) {
		notifyError('Please Install the Metamask Browser Extension Before Proceeding');
		return;
	}

	// Initialize web3Modal instance or fetch existing instance
	const web3Modal = get(web3ModalInstance) || initWeb3ModalInstance();

	// If user has a cached provider clear it
	if (web3Modal.cachedProvider) {
		// Clear Cached Provider
		web3Modal.clearCachedProvider();
	}

	// Check the selectedWallet
	triggerSelectedWalletButton(get(selectedWalletName));

	// Connect to wallet
	const provider: ethers.providers.ExternalProvider = await web3Modal.connect();

	if (await isAllowedNetworks(provider)) {
		// Init Provider Events
		initProviderEvents(provider);

		// Add provider to store
		setProvider(provider);
		return;
	} else {
		notifyError('You can only connect to mainnet or Kovan Test Network');
		return;
	}
};

const isAllowedNetworks = async (provider: ethers.providers.ExternalProvider) => {
	const ethersProvider = new ethers.providers.Web3Provider(provider);
	const chainId = (await ethersProvider.getNetwork()).chainId;

	if (chainId === 1 || chainId === 42 || chainId === 31337) {
		// only allow kovan or mainnet
		return true;
	} else {
		return false;
	}
};

// Subscribe to Wallet Events
export const initProviderEvents = (provider: any) => {
	// Subscribe to accounts change
	provider.on('accountsChanged', async (accounts: string[]) => {
		console.log('Account Changed: ', accounts);
		deregisterEvents();
		await refreshConnection();
	});

	// Subscribe to chainId change
	provider.on('chainChanged', async (chainId: number) => {
		console.log('Chain Changed: ', chainId);
		deregisterEvents();
		await refreshConnection();
	});

	// Subscribe to provider connection
	provider.on('connect', (info: { chainId: number }) => {
		console.log('Connect: ', info);
		deregisterEvents();
	});

	// Subscribe to provider disconnection
	provider.on('disconnect', (error: { code: number; message: string }) => {
		console.log('Disconnect', error);

		if (isAllowedNetworks(provider)) {
			notifyError('Wallet Disconnected');
		} else {
			notifyError('You can only connect to mainnet or Kovan Test Network');
		}

		disconnectWallet();
	});

	externalProvider.set(provider);
};

export const deregisterEvents = () => {
	return get(externalProvider).removeAllListeners();
};

export const refreshConnection = async () => {
	// Reset App State
	appSigner.set(null);
	appProvider.set(null);

	const web3Modal = get(web3ModalInstance) || initWeb3ModalInstance();

	// If user has a cached provider prompt for connection
	if (web3Modal.cachedProvider) {
		// Connect to cached wallet
		const provider: ethers.providers.ExternalProvider = await web3Modal.connectTo(
			web3Modal.cachedProvider
		);

		if (await isAllowedNetworks(provider)) {
			// Init Provider Events
			initProviderEvents(provider);

			// Add provider to store
			setProvider(provider);
			return;
		} else {
			notifyError('You can only connect to mainnet or Kovan Test Network');
			return;
		}
	}
};
