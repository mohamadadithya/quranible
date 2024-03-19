<script>
	import { PUBLIC_SITE_NAME } from '$env/static/public';
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

<header
	class="py-4 bg-gray-800 text-white font-poppins sticky top-0 transition-all duration-500 w-full z-10"
>
	<div class="px-5">
		<ul class="flex justify-between items-center">
			<li class="flex items-center gap-1">
				<button
					type="button"
					class="mr-2"
					aria-label="Menu"
					title="Menu"
					on:click|stopPropagation={() => dispatch('click-menu')}
				>
					<Icon class="text-3xl" icon="ic:round-menu" />
				</button>
				<a href="/" title={PUBLIC_SITE_NAME} class="text-2xl font-bold">{PUBLIC_SITE_NAME}</a>
			</li>
			<li class="flex items-center gap-2">
				<a
					href="/bookmarks"
					role="button"
					aria-label="Bookmarks"
					class="text-xl"
					title="Penanda Surah"
				>
					<Icon class="text-3xl" icon="ph:bookmark-simple" />
				</a>
				<a href="/settings" role="button" aria-label="Settings" class="text-xl" title="Pengaturan">
					<Icon class="text-3xl" icon="ep:setting" />
				</a>
			</li>
		</ul>
	</div>
</header>
