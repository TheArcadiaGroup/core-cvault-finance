/// <reference types="@sveltejs/kit" />

declare global {
	interface Number {
		noExponents: () => string;
	}
}

export type TabIds = 'coreDao' | 'stats' | 'connect' | 'governance' | 'connect:children';
interface TabState {
	position: number;
	state: 'MINIMIZED' | 'OPEN' | 'CLOSED';
}
export type TabStore = Record<TabIds, TabState>;
