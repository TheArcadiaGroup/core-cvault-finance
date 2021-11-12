<script>
	import OsRenderer from '$lib/Os.svelte';
</script>

<main>
	<section>
		<h1>Next Generation Smart Contract Governance</h1>
		<p>
			coreDAO is a fully decentralized autonomous organization which is using a combination of
			governance systems to achieve its on-chain governance and execution.
		</p>
	</section>
	<OsRenderer />
	<slot />
</main>

<style lang="postcss">
	* {
		@apply text-white;
	}
	section {
		@apply m-auto text-center;
		max-width: 90ch;
	}
	p {
		@apply text-xl opacity-80;
	}
	main {
		@apply flex text-center font-win  md:mt-20 md:block h-screen w-screen md:h-auto md:w-auto justify-center items-center flex-col;
	}
	h1 {
		@apply text-3xl;
	}
</style>
