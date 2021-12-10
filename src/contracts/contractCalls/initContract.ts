import { ethers } from 'ethers';
import CLendingAbi from '$contracts/abis/CLending.json';
import { get } from 'svelte/store';
import { appProvider, appSigner } from '$stores/provider';

/*
  ┌─────────────────┬──────────────────────────────────────────────┐
│     (index)     │                    Values                    │
├─────────────────┼──────────────────────────────────────────────┤
│     CoreDAO     │ '0xdbC43Ba45381e02825b14322cDdd15eC4B3164E6' │
│ CoreDAOTreasury │ '0x1fA02b2d6A771842690194Cf62D91bdd92BfE28d' │
│      Core       │ '0x62359Ed7505Efc61FF1D56fEF82158CcaffA23D7' │
│       Dai       │ '0x6B175474E89094C44Da98b954EedeAC495271d0F' │
│     Lending     │ '0x21dF544947ba3E8b3c32561399E88B52Dc8b2823' │
└─────────────────┴──────────────────────────────────────────────┘
Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/


*/
const CoreAddress = '0x62359Ed7505Efc61FF1D56fEF82158CcaffA23D7';
const DaiAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
const CLendingAddress = '0x21dF544947ba3E8b3c32561399E88B52Dc8b2823';

const CLendContract = (signerOrProvider: ethers.providers.Web3Provider | ethers.Signer) => {
	const CLendContract = new ethers.Contract(CLendingAddress, CLendingAbi, signerOrProvider);

	return CLendContract;
};

// Add Collateral
export const addCollateral = async (amount: number) => {
	// Init Contract
	const lendContract = CLendContract(get(appSigner));

	// Convert Amount to Amount of core
	const coreAmount = ethers.utils.parseEther(amount.toString());

	try {
		console.log(await lendContract.CORE_TOKEN());
		const result = await lendContract.addCollateral(CoreAddress, coreAmount);
		return result;
	} catch (err) {
		console.log(err);
		return null;
	}
};
