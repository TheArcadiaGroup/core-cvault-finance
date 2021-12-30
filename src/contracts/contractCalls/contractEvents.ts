import { appProvider, userWalletAddress } from '$stores/provider';
import { get } from 'svelte/store';
import { getCLendContract } from './initContracts';
import { getAllBalances } from './tokenBalances';

export default () => {
	const provider = get(appProvider);
	const clendContract = getCLendContract(provider);

	if (provider) {
		// Loan Taken/Borrow
		clendContract.on('LoanTaken', async (userAddress, _poolId, _amount) => {
			if (userAddress === get(userWalletAddress)) {
				try {
					await getAllBalances(userAddress);
				} catch (err) {
					console.log(err);
				}
			}
		});

		// Collateral Provided
		clendContract.on('CollateralAdded', async (userAddress, _poolId, _amount) => {
			if (userAddress === get(userWalletAddress)) {
				try {
					await getAllBalances(userAddress);
				} catch (err) {
					console.log(err);
				}
			}
		});

		// Interest Paid
		clendContract.on('InterestPaid', async (userAddress, _poolId, _amount) => {
			if (userAddress === get(userWalletAddress)) {
				try {
					await getAllBalances(userAddress);
				} catch (err) {
					console.log(err);
				}
			}
		});

		// Loan Repayment
		clendContract.on('Repayment', async (userAddress, _poolId, _amount) => {
			if (userAddress === get(userWalletAddress)) {
				try {
					await getAllBalances(userAddress);
				} catch (err) {
					console.log(err);
				}
			}
		});
	}
};
