<script>
	import Container from '@lib/components/Container.svelte';
	import Header from '@lib/components/Header.svelte';
	import { afterUpdate } from 'svelte';
	import { Toaster } from 'svelte-sonner';
	import { theme } from '@lib/stores/settings';
	import Sidebar from '@lib/components/Sidebar.svelte';

	afterUpdate(() => {
		if ($theme) document.documentElement.setAttribute('data-theme', $theme);
	});

	let isOpen = false;
</script>

<Toaster richColors position="top-right" />
<Header on:click-menu={() => (isOpen = !isOpen)} />
<Sidebar bind:isOpen />
<Container class="overflow-hidden">
	<slot />
</Container>
