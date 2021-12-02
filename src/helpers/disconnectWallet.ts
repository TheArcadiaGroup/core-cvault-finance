import { appProvider, userWalletAddress, web3ModalInstance, appSigner } from '$stores/provider';
import { get } from 'svelte/store';

const disconnectWallet = () => {
	if (get(appProvider) && get(web3ModalInstance)) {
		get(web3ModalInstance).clearCachedProvider();
		web3ModalInstance.set(null);
		appProvider.set(null);
		userWalletAddress.set('');
		appSigner.set(null);
		console.log('Successfully Disconnected From Wallet');
	} else {
		console.log('Failed to Disconnect Wallet');
	}
};

export default disconnectWallet;
