/// <reference types="@sveltejs/kit" />

export type TabIds = 'coreDao' | 'stats' | 'connect' | 'dashboard' | 'governance';
interface TabState {
	position: number;
	state: 'MINIMIZED' | 'OPEN' | 'CLOSED';
}
export type TabStore = Record<TabIds, TabState>;
