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
		<div class="stats">
			<div>
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
		</div>
	</section>
{/if}

<style lang="postcss">
	* {
		@apply text-grey-fg text-[1.2rem];
	}
	h2 {
		@apply text-black text-xl text-left;
	}
	section {
		@apply w-full max-w-xs sm:w-[35vw] origin-bottom-left ml-11;
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
