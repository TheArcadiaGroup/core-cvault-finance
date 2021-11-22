<script lang="ts">
	import Titlebar from './Titlebar.svelte';
	import type { TabState } from 'src/global';

	import WindowShell from './_WindowShell.svelte';
	import InfoIcon from '$lib/icons/InfoIcon.svelte';
	import { onMount } from 'svelte';
	import { fetchService, responseMap, routes } from '$lib/store/fetch-service';

	export let state: TabState;
	let loanStats: typeof responseMap['/api/loanStats'];
	let positionsSummary: typeof responseMap['/api/summary'];
	onMount(() => {
		fetchService(routes.loanStats)
			.then((x) => x.json())
			.then((r) => (loanStats = r));
		fetchService(routes.positionsSummary)
			.then((x) => x.json())
			.then((r) => (positionsSummary = r));
	});
</script>

<WindowShell {state} target="stats" sectionClass="stats-section">
	<div data-win-tab>
		<Titlebar owner="stats" title="stats.exe" />
	</div>
	<div class="stats">
		<h2>Open Positions Summary:</h2>
		<dl>
			<div class="dt">
				<dt>Collateral Value:</dt>
				<dd>
					<span>${positionsSummary ? positionsSummary.collateralValue : '...'}</span>
					<InfoIcon />
				</dd>
			</div>
			<div class="dt">
				<dt>DAI Borrowed:</dt>
				<dd>
					<span>${positionsSummary ? positionsSummary.daiBorrowed : '...'}</span>
					<InfoIcon />
				</dd>
			</div>
			<div class="dt">
				<dt>Left to Borrow:</dt>
				<dd>
					<span>${positionsSummary ? positionsSummary.leftToBorrow : '...'}</span>
					<InfoIcon />
				</dd>
			</div>
			<div class="dt">
				<dt>Interest Accured:</dt>
				<dd>
					<span>${positionsSummary ? positionsSummary.interestAccured : '...'}</span>
					<InfoIcon />
				</dd>
			</div>
		</dl>
	</div>
	<hr />
	<div class="stats">
		<h2>Loan Stats:</h2>
		<dl>
			<div class="dt">
				<dt>Interest Per Year:</dt>
				<dd>
					<span>${loanStats ? loanStats.interestPerYear : '...'}</span>
					<InfoIcon />
				</dd>
			</div>
			<div class="dt">
				<dt>Liquidation Threshold:</dt>
				<dd>
					<span>${loanStats ? loanStats.liquidationThreshold : '...'}</span>
					<InfoIcon />
				</dd>
			</div>
		</dl>
	</div></WindowShell
>

<style lang="postcss">
	h2 {
		@apply text-black text-xl text-left;
	}
	div.dt {
		@apply flex items-center justify-between;
	}
	div.stats {
		@apply p-5;
	}
	hr {
		@apply block h-[1px] border-0 border-t-[1px] border-border mt-4 mb-4 ml-0 mr-0 p-0;
	}
	dd {
		@apply inline-flex items-center justify-center p-2 gap-1;
	}
</style>
