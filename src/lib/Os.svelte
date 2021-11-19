<script lang="ts">
	import { onMount } from 'svelte';
	import { isMobile } from './store/media-store';

	import Windows from './Windows/index.svelte';
	const IS_MOBILE = '(max-width:600px)';
	const HAS_WIN = typeof window !== 'undefined';
	const _isMobileQuery = HAS_WIN && window.matchMedia(IS_MOBILE);

	const HAS_ADD_EVENT_LISTENER = _isMobileQuery && !!_isMobileQuery.addEventListener;

	onMount(() => {
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

<div>
	<Windows />
</div>
