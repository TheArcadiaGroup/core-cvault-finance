import { get } from 'svelte/store';
import { appProvider, appSigner, userWalletAddress, web3ModalInstance } from '$stores/provider';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import { error } from '$helpers/toastNotification';

const triggerSelectedWalletButton = (providerName: string) => {
	const web3ModalWrapper = document.getElementById('WEB3_CONNECT_MODAL_ID');
	web3ModalWrapper && web3ModalWrapper.classList.add('hidden');

	document.querySelectorAll('.web3modal-provider-name').forEach((el) => {
		if (el.textContent.toLocaleLowerCase() === providerName.toLocaleLowerCase()) {
			console.log(el.textContent);
			(el as HTMLDivElement).click();
		}
	});
};

export const freshConnect = async (
	selectedProvider: 'metamask' | 'walletConnect' | 'coinbase',
	web3Modal: Web3Modal
) => {
	// Check if metamask is present
	if (selectedProvider === 'metamask' && !window.ethereum) {
		error('Please Install the Metamask Browser Extension Before Proceeding');
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
		let providerOptions = {};

		if ((window as any).WalletConnectProvider) {
			providerOptions = {
				walletconnect: {
					package: (window as any).WalletConnectProvider.default, // required
					options: {
						infuraId: '456e115b04624699aa0e776f6f2ee65c' // required
					}
				}
			};
		}

		const web3Modal = new Web3Modal({
			// network: 'kovan',
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
