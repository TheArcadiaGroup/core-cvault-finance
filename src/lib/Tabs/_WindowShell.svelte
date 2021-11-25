<script lang="ts">
	import type { TabIds, TabState } from 'src/global';
	import { scale } from 'svelte/transition';
	import { sineInOut } from 'svelte/easing';
	import { draggable } from 'svelte-drag';
	import { activeAppId, activeAppIndex, dispatchTabAction } from '$lib/store/tab-store';
	import { isMobile } from '$lib/store/media-store';
	let offsetX: number;
	let offsetY: number;
	export let state: TabState;
	export let target: TabIds;
	export let sectionClass: string = '';

	function windowCloseTransition(el: HTMLElement, { duration = 300 }: SvelteTransitionConfig) {
		const existingTransform = getComputedStyle(el).transform;
		return {
			duration,
			easing: sineInOut,
			css: (t) => `opacity: ${t}; transform: ${existingTransform} scale(${t})`
		};
	}
</script>

{#if state.state === 'OPEN'}
	{#if $isMobile === true}
		<section transition:scale data-win-tab data-mob-tab class={sectionClass}>
			<slot />
		</section>
	{:else if $isMobile === false}
		<section
			in:scale
			out:windowCloseTransition
			data-win-tab
			class={sectionClass}
			style="z-index:{$activeAppId == target ? $activeAppIndex : '1'}"
			use:draggable={{
				handle: '.drag-handle',
				position: { x: offsetX, y: offsetY }
			}}
			on:svelte-drag={({ detail }) => {
				offsetX = detail.offsetX;
				offsetY = detail.offsetY;
			}}
			on:svelte-drag:start={() => {
				dispatchTabAction('OPEN', target);
			}}
			on:click={() => {
				dispatchTabAction('OPEN', target);
			}}
		>
			<slot />
		</section>
	{/if}
{/if}

<style lang="postcss">
	* {
		@apply text-grey-fg text-[1.2rem];
	}
	section {
		@apply sm:ml-6;
	}
	section[data-win-tab][data-mob-tab] {
		@apply m-0 h-full;
	}
</style>
