<script>
	import Windows from './Windows/index.svelte';
	import MediaQuery from './MediaQuery.svelte';
</script>

<div>
	<MediaQuery query="(max-width:600px)" let:matches>
		<Windows {matches} />
	</MediaQuery>
</div>
