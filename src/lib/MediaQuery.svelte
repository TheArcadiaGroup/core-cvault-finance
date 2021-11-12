<script lang="ts">
	import { onMount } from 'svelte';

	export let query;

	let mql;
	let mqlListener;
	let wasMounted = false;
	let matches = false;

	onMount(() => {
		wasMounted = true;
		return () => {
			removeActiveListener();
		};
	});

	$: {
		if (wasMounted) {
			removeActiveListener();
			addNewListener(query);
		}
	}

	function addNewListener(query) {
		mql = window.matchMedia(query);
		mqlListener = (v: MediaQueryListEvent) => (matches = v.matches);
		mql.addEventListener
			? mql.addEventListener('change', mqlListener)
			: mql.addListener(mqlListener);
		matches = mql.matches;
	}

	function removeActiveListener() {
		if (mql && mqlListener) {
			mql.removeListener(mqlListener);
		}
	}
</script>

<slot {matches} />
