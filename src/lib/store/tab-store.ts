import type { TabIds, TabState, TabStore } from 'src/global';
import { get, writable } from 'svelte/store';

const defaultState: TabState = { position: 0, state: 'CLOSED' };
export const tabStore = writable<TabStore>({
	connect: defaultState,
	coreDao: { position: 3, state: 'OPEN' },
	dashboard: defaultState,
	governance: defaultState,
	stats: { position: 4, state: 'OPEN' },
	'connect:children': defaultState
});
export const activeAppIndex = writable(0);
export const activeAppId = writable<TabIds>('stats');

export type TabAction = 'OPEN' | 'CLOSE' | 'MINIMIZE';
export interface ITab extends TabState {
	name: TabIds;
}
const actionToState: Record<TabAction, TabState['state']> = {
	CLOSE: 'CLOSED',
	MINIMIZE: 'MINIMIZED',
	OPEN: 'OPEN'
};
/**
 * build new tab state `of` based on the next tab
 * @param of
 * @param nextbuildNewState,
 */
export function buildNewState(of: ITab, next: ITab, action: TabAction, maxPos = 4): TabState {
	const { position: previousPosition, name: prevName, state: prevState } = of;
	const { position: nextPosition, name: nextName } = next;
	const acc: TabState = { position: previousPosition, state: prevState };
	if (prevName === nextName) {
		if (
			(action === 'OPEN' && previousPosition == maxPos) ||
			(action !== 'OPEN' && previousPosition == 0)
		) {
			return { position: previousPosition, state: actionToState[action] };
		}
		return { position: action == 'OPEN' ? maxPos : 0, state: actionToState[action] };
	}

	if (action === 'OPEN') {
		if (previousPosition > nextPosition) {
			// this tab was higher than the other tab.. move it lower
			acc.position = previousPosition - 1;
		}
	} else if (action === 'CLOSE' || action === 'MINIMIZE') {
		if (previousPosition < nextPosition && previousPosition !== 0) {
			// this tab was lower than the other tab, move it higher
			// unless if its at pos 0 then let it be
			acc.position = previousPosition + 1;
		}
	}
	return acc;
}

export function dispatchTabAction(action: TabAction, target: TabIds) {
	if (action === 'OPEN' && get(activeAppId) !== target) {
		activeAppIndex.update((x) => x + 2);
		activeAppId.update(() => target);
	}
	tabStore.update((prev) => {
		const _nextTabsCurrentState = { name: target, ...prev[target] };
		const next: TabStore = {
			connect: buildNewState({ name: 'connect', ...prev.connect }, _nextTabsCurrentState, action),
			coreDao: buildNewState({ name: 'coreDao', ...prev.coreDao }, _nextTabsCurrentState, action),
			dashboard: buildNewState(
				{ name: 'dashboard', ...prev.dashboard },
				_nextTabsCurrentState,
				action
			),
			governance: buildNewState(
				{ name: 'governance', ...prev.governance },
				_nextTabsCurrentState,
				action
			),
			stats: buildNewState({ name: 'stats', ...prev.stats }, _nextTabsCurrentState, action),
			'connect:children': buildNewState(
				{ name: 'connect:children', ...prev['connect:children'] },
				_nextTabsCurrentState,
				action
			)
		};
		return next;
	});
}
