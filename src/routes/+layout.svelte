<script>
	import '@fontsource/poppins/400.css';
	import '@fontsource/poppins/600.css';
	import '@fontsource/poppins/800.css';
	import '@lib/app.css';
	import Nprogress from 'nprogress';
	import 'nprogress/nprogress.css';
	import { navigating, updated } from '$app/stores';

	Nprogress.configure({
		minimum: 0.16,
		showSpinner: false
	});

	$: {
		$navigating ? Nprogress.start() : Nprogress.done();

		if ($updated) location.reload();
	}

	$: isUpdated = $updated ? '' : 'off';
</script>

<main class="font-poppins" data-sveltekit-reload={isUpdated}>
	<slot />
</main>

<style>
	:root {
		--progress-color: hsl(215, 28%, 35%);
	}

	:global(#nprogress .bar) {
		background: var(--progress-color);
	}

	:global(#nprogress .peg) {
		box-shadow:
			0 0 10px var(--progress-color),
			0 0 5px var(--progress-color);
	}
</style>
