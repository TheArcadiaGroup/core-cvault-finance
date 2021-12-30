import {
	coreBalance,
	coreUsageApproved,
	daiBalance,
	daiUsageApproved,
	totalAccruedInterest,
	totalCoreCollateral,
	totalUserDebtInDai
} from '$stores/balances';
import { appProvider, appSigner, userWalletAddress } from '$stores/provider';
import { ethers } from 'ethers';
import { get } from 'svelte/store';
import { CLendingAddress, CoreAddress } from './contractAddresses';
import { getCLendContract, getCoreContract, getDaiContract } from './initContracts';

const ethersAllowance = '999999999999999999999999999999999999000000000000000000';

// Core Balance
export const getCoreBalance = async (userAddress: string) => {
	try {
		const coreContract = getCoreContract(get(appProvider));
		const balanceInEthersBigNo = await coreContract.balanceOf(userAddress);

		// Update Store
		coreBalance.set(+ethers.utils.formatEther(balanceInEthersBigNo));

		return +ethers.utils.formatEther(balanceInEthersBigNo);
	} catch (error) {
		console.log(error);
		return 0;
	}
};

// Dai Balance
export const getDaiBalance = async (userAddress: string) => {
	try {
		const daiContract = getDaiContract(get(appProvider));
		const balanceInEthersBigNo = await daiContract.balanceOf(userAddress);

		// Update Store
		daiBalance.set(+ethers.utils.formatEther(balanceInEthersBigNo));

		return +ethers.utils.formatEther(balanceInEthersBigNo);
	} catch (error) {
		console.log(error);
		return 0;
	}
};

// Loan That Needs to be Repaid

// Amount of Collateral Supplied
export const getTotalCoreCollateralInContract = async (userAddress: string) => {
	try {
		const clendContract = getCLendContract(get(appProvider));
		const collateralArr = await clendContract.userCollaterals(userAddress);

		// Find the collateral item for CORE tokens
		const collateralItem = collateralArr.find(
			(collateralItem: { collateralAddress: string }) =>
				collateralItem.collateralAddress === CoreAddress
		);

		totalCoreCollateral.set(+ethers.utils.formatEther(collateralItem?.amountCollateral) || 0);

		return +ethers.utils.formatEther(collateralItem?.amountCollateral) || 0;
	} catch (error) {
		return 0;
	}
};

// Check Dai Allowance
export const checkDaiAllowance = async (userAddress: string) => {
	try {
		const daiContract = getDaiContract(get(appSigner));
		const daiAllowance = await daiContract.allowance(userAddress, CLendingAddress);

		daiUsageApproved.set(+ethers.utils.formatEther(daiAllowance) > 0);

		return +ethers.utils.formatEther(daiAllowance) > 0;
	} catch (error) {
		console.log(error);
		return false;
	}
};

// Check Core Allowance
export const checkCoreAllowance = async (userAddress: string) => {
	try {
		const coreTokenContract = getCoreContract(get(appSigner));
		const coreAllowance = await coreTokenContract.allowance(userAddress, CLendingAddress);

		coreUsageApproved.set(+ethers.utils.formatEther(coreAllowance) > 0);

		return +ethers.utils.formatEther(coreAllowance) > 0;
	} catch (error) {
		console.log(error);
		return false;
	}
};

// Increase Core Allowance
export const increaseCoreAllowance = async () => {
	try {
		const coreTokenContract = getCoreContract(get(appSigner));
		const coreUsageAllowed = await coreTokenContract.increaseAllowance(
			CLendingAddress,
			ethers.utils.parseEther(ethersAllowance)
		); // returns bool

		coreUsageApproved.set(coreUsageAllowed);

		return coreUsageAllowed;
	} catch (error) {
		console.log(error);
		return false;
	}
};

// Check Core Allowance
export const increaseDaiAllowance = async () => {
	try {
		const daiContract = getDaiContract(get(appSigner));
		const daiUsageAllowed = await daiContract.approve(
			CLendingAddress,
			ethers.utils.parseEther(ethersAllowance)
		); // returns bool

		daiUsageApproved.set(daiUsageAllowed);

		return daiUsageAllowed;
	} catch (error) {
		console.log(error);
		return false;
	}
};

// total debt by user
export const userTotalDebt = async (userAddress: string) => {
	try {
		const cLendContract = getCLendContract(get(appProvider));

		const debtInBigNumber = await cLendContract.userTotalDebt(userAddress);

		const daiDebt = +ethers.utils.formatEther(debtInBigNumber);

		totalUserDebtInDai.set(daiDebt);

		return daiDebt;
	} catch (error) {
		console.log(error);
		return 0;
	}
};

// Accured interest
export const accruedInterest = async (userAddress: string) => {
	try {
		const cLendContract = getCLendContract(get(appProvider));

		const accruedInterestBigNumber = await cLendContract.accruedInterest(userAddress);

		const accruedInterest = +ethers.utils.formatEther(accruedInterestBigNumber);

		totalAccruedInterest.set(accruedInterest);

		return accruedInterest;
	} catch (error) {
		console.log(error);

		return 0;
	}
};

// Get All Balances
export const getAllBalances = async (userAddress: string) => {
	if (userAddress.trim()) {
		await getCoreBalance(userAddress);
		await getDaiBalance(userAddress);

		// Allowances
		await checkDaiAllowance(userAddress);
		await checkCoreAllowance(userAddress);

		// Loan Balances
		await getTotalCoreCollateralInContract(userAddress);
		await userTotalDebt(userAddress);
	}
};
