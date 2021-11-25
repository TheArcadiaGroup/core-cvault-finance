<script lang="ts">
	import { onMount } from 'svelte';
	import { isMobile } from './store/media-store';
	import { browser } from '$app/env';
	import Windows from './Windows/index.svelte';

	onMount(() => {
		const IS_MOBILE = '(max-width:600px)';
		const _isMobileQuery = browser && window.matchMedia(IS_MOBILE);
		const HAS_ADD_EVENT_LISTENER = !!_isMobileQuery?.addEventListener;
		const l = (e: MediaQueryListEvent) => isMobile.set(e.matches);
		isMobile.set(_isMobileQuery.matches);
		if (HAS_ADD_EVENT_LISTENER) {
			_isMobileQuery.addEventListener('change', l);
			return () => {
				_isMobileQuery.removeEventListener('change', l);
			};
		} else {
			_isMobileQuery.addListener(l);
			return () => {
				_isMobileQuery.removeListener(l);
			};
		}
	});
</script>

<Windows />
