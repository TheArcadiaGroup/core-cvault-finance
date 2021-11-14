<script lang="ts">
	import Titlebar from './Titlebar.svelte';
	import type { TabState } from 'src/global';

	import WindowShell from './_WindowShell.svelte';

	export let state: TabState;
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
				<dd>$0</dd>
			</div>
			<div class="dt">
				<dt>DAI Borrowed:</dt>
				<dd>$0</dd>
			</div>
			<div class="dt">
				<dt>Left to Borrow:</dt>
				<dd>$0</dd>
			</div>
			<div class="dt">
				<dt>Interest Accured:</dt>
				<dd>$0</dd>
			</div>
		</dl>
	</div>
	<hr />
	<div class="stats">
		<h2>Loan Stats:</h2>
		<dl>
			<div class="dt">
				<dt>Interest Per Year:</dt>
				<dd>$0</dd>
			</div>
			<div class="dt">
				<dt>Liquidation Threshold:</dt>
				<dd>$0</dd>
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
		display: block;
		height: 1px;
		border: 0;
		border-top: 1px solid theme('colors.border');
		margin: 1em 0;
		padding: 0;
	}
</style>
