<script>
	import Container from '@lib/components/Container.svelte';
	import Header from '@lib/components/Header.svelte';
	import { afterUpdate } from 'svelte';
	import { Toaster } from 'svelte-sonner';
	import { theme } from '@lib/stores/settings';

	afterUpdate(() => {
		if ($theme) document.documentElement.setAttribute('data-theme', $theme);
	});
</script>

<Toaster richColors position="top-right" />
<Header />
<Container class="overflow-hidden">
	<slot />
</Container>
