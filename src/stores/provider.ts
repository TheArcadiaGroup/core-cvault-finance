import { writable } from 'svelte/store';
import type { ethers } from 'ethers';
import type Web3Modal from 'web3modal';

export const appProvider = writable<ethers.providers.Web3Provider>(null);
export const externalProvider = writable<ethers.providers.Provider>(null);
export const selectedWalletName = writable<'metamask' | 'walletConnect' | 'coinbase'>(null);
export const appSigner = writable<ethers.Signer>(null);
export const userWalletAddress = writable<string>('');
export const web3ModalInstance = writable<Web3Modal>(null);
export const connectionDetails = writable<ethers.providers.Network>(null);
