<script>
	import Icon from '@iconify/svelte';
	import NavList from '@components/NavList.svelte';
	import { mainLinks } from '@data/links';

	let isOpen = false;
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
					on:click={() => (isOpen = !isOpen)}
				>
					<Icon class="text-3xl" icon="ic:round-menu" />
				</button>
				<a href="/" title="Quranible" class="text-2xl font-bold">Quranible</a>
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

<nav
	class="h-screen w-3/4 md:w-1/4 py-10 fixed bg-gray-800 left-0 top-0 container mx-auto px-5 -translate-x-full opacity-0 transition-all duration-500 menu-panel flex flex-col justify-between pt-20"
	class:opened={isOpen}
>
	<div>
		<p class="mb-4 font-semibold text-xl">Menu</p>
		<ul>
			{#each mainLinks as link}
				<NavList
					on:click={() => (isOpen = false)}
					name={link.name}
					url={link.url}
					icon={link.icon}
				/>
			{/each}
			<li class="border-b-2 border-gray-600 py-5">
				<a
					class="flex items-center gap-2"
					href="https://saweria.co/mohamadadithya"
					target="_blank"
					title="Donasi"
				>
					<Icon class="text-3xl" icon="bx:donate-heart" />
					Donasi
				</a>
			</li>
		</ul>
	</div>
	<p class="text-xs mb-6">
		&copy; 2024 <a
			href="https://github.com/mohamadadithya"
			aria-label="Web's author link"
			title="Mohamad Adithya">Mohamad Adithya</a
		>
	</p>
</nav>

<style>
	.menu-panel {
		&:is(.opened) {
			@apply translate-x-0 opacity-100;
		}
	}
</style>
