import { notifyError, notifySuccess } from '$helpers/toastNotification';
import { appSigner } from '$stores/provider';
import { ethers } from 'ethers';
import { get } from 'svelte/store';
import { CoreAddress, DaiAddress } from './contractAddresses';
import { getCLendContract } from './initContracts';

// Deposit Collateral (CORE)
export const depositCollateral = async (amount: number) => {
	try {
		const cLendContract = getCLendContract(get(appSigner)); // Need signer to sign transaction

		const coreAmount = ethers.utils.parseEther(amount.toString());

		const tx = await cLendContract.addCollateral(CoreAddress, coreAmount);

		// Wait for tx confirmations (just one)
		tx.wait(1);

		// Notify User
		notifySuccess(`Successfully Supplied ${amount} CORE as Collateral`);

		return true;
	} catch (error) {
		console.log(error);

		notifyError('Failed to Perform Transaction');

		return false;
	}
};

// Borrow (DAI)
export const borrow = async (amount: number) => {
	try {
		const cLendContract = getCLendContract(get(appSigner)); // Need signer to sign transaction

		const daiAmount = ethers.utils.parseEther(amount.toString());

		const tx = await cLendContract.borrow(daiAmount);

		// Wait for tx confirmations (just one)
		tx.wait(1);

		// Notify User
		notifySuccess(`Successfully Borrowed ${amount} DAI`);

		return true;
	} catch (error) {
		console.log(error);

		notifyError('Failed to Perform Transaction');

		return false;
	}
};

// Deposit and Borrow (CORE => DAI)
export const depositAndBorrow = async (collateralAmount: number, borrowAmount: number) => {
	try {
		const cLendContract = getCLendContract(get(appSigner)); // Need signer to sign transaction

		const coreAmount = ethers.utils.parseEther(collateralAmount.toString());
		const daiAmount = ethers.utils.parseEther(borrowAmount.toString());

		const tx = await cLendContract.addCollateralAndBorrow(CoreAddress, coreAmount, daiAmount);

		// Wait for tx confirmations (just one)
		tx.wait(1);

		// Notify User
		notifySuccess(
			`Successfully Supplied ${collateralAmount} CORE as Collateral and borrowed ${borrowAmount} DAI`
		);

		return true;
	} catch (error) {
		console.log(error);

		notifyError('Failed to Perform Transaction');

		return false;
	}
};

// Repay Loan
export const repayLoan = async (amount: number) => {
	try {
		const cLendContract = getCLendContract(get(appSigner)); // Need signer to sign transaction

		const daiAmount = ethers.utils.parseEther(amount.toString());

		const tx = await cLendContract.repayLoan(DaiAddress, daiAmount);

		// Wait for tx confirmations (just one)
		tx.wait(1);

		// Notify User
		notifySuccess(`Successfully Repaid ${amount} DAI`);

		return true;
	} catch (error) {
		console.log(error);

		notifyError('Failed to Perform Transaction');

		return false;
	}
};
