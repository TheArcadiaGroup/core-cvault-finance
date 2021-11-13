<script lang="ts">
	import Titlebar from './Titlebar.svelte';
	import type { TabState } from 'src/global';
	import { dispatchTabAction } from '$lib/store';
	import { scale } from 'svelte/transition';
	export let state: TabState;
</script>

{#if state.state === 'OPEN'}
	<section transition:scale data-win-tab>
		<div data-win-tab>
			<Titlebar
				onClose={() => dispatchTabAction('CLOSE', 'stats')}
				onMinimize={() => dispatchTabAction('MINIMIZE', 'stats')}
				title="stats.exe"
			/>
		</div>
		<div>
			<h2>Open Positions Summary:</h2>
			<dl>
				<dt>Collateral Value:</dt>
				<dd>$0</dd>
				<dt>DAI Borrowed:</dt>
				<dd>$0</dd>
				<dt>Left to Borrow:</dt>
				<dd>$0</dd>
				<dt>Interest Accured:</dt>
				<dd>$0</dd>
			</dl>
		</div>
	</section>
{/if}

<style lang="postcss">
	* {
		@apply text-grey-fg text-[1.2rem];
	}
	h2 {
		@apply text-black text-xl;
	}
	section {
		@apply w-full max-w-xs sm:w-[35vw] origin-bottom-left ml-11;
	}
</style>
