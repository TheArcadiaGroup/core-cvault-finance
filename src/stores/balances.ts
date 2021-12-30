import { writable } from 'svelte/store';

export const coreBalance = writable<number>(0);
export const daiBalance = writable<number>(0);
export const coreUsageApproved = writable<boolean>(false);
export const daiUsageApproved = writable<boolean>(false);

// Loan Balances
export const totalCoreCollateral = writable<number>(0);
export const totalUserDebtInDai = writable<number>(0);
export const totalAccruedInterest = writable<number>(0);
