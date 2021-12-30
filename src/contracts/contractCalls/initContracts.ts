import { ethers } from 'ethers';
import CLendingAbi from '$contracts/abis/CLending.json';
import MockAbi from '$contracts/abis/Mock.json';
import { CoreAddress, DaiAddress, CLendingAddress } from './contractAddresses';

// Core Contract
export const getCoreContract = (providerOrSigner: ethers.providers.Provider | ethers.Signer) => {
	const coreContract = new ethers.Contract(CoreAddress, MockAbi, providerOrSigner);
	return coreContract;
};

// Dai Contract
export const getDaiContract = (providerOrSigner: ethers.providers.Provider | ethers.Signer) => {
	const daiContract = new ethers.Contract(DaiAddress, MockAbi, providerOrSigner);
	return daiContract;
};

// CLending Contract
export const getCLendContract = (
	signerOrProvider: ethers.providers.Web3Provider | ethers.Signer
) => {
	const CLendContract = new ethers.Contract(CLendingAddress, CLendingAbi, signerOrProvider);

	return CLendContract;
};
