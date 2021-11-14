<script lang="ts">
	import type { TabIds, TabState } from 'src/global';
	import { scale } from 'svelte/transition';
	import { sineInOut } from 'svelte/easing';
	import { draggable } from 'svelte-drag';
	import { activeAppId, activeAppIndex, dispatchTabAction } from '$lib/store';
	import MediaQuery from '$lib/MediaQuery.svelte';
	let appIndex: number;
	let activeId: TabIds;
	activeAppIndex.subscribe((x) => (appIndex = x));
	activeAppId.subscribe((x) => void (activeId = x));

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
	windowCloseTransition;
</script>

{#if state.state === 'OPEN'}
	<MediaQuery query="(max-width:600px)" let:matches>
		{#if matches}
			<section transition:scale data-win-tab class={sectionClass}>
				<slot />
			</section>
		{:else}
			<section
				in:scale
				out:windowCloseTransition
				data-win-tab
				class={sectionClass}
				style="z-index:{activeId == target ? appIndex : '1'}"
				use:draggable={{
					handle: '.drag-handle',
					position: { x: offsetX, y: offsetY },
					bounds: ':root'
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
	</MediaQuery>
{/if}

<style lang="postcss">
	* {
		@apply text-grey-fg text-[1.2rem];
	}
	section {
		@apply sm:ml-6;
	}
</style>
