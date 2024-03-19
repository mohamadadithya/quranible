<script lang="ts">
	import { clickOutside } from '@lib/actions/click-outside';
	import { mainLinks } from '@data/links';
	import NavList from './NavList.svelte';
	import Icon from '@iconify/svelte';

	export let isOpen = false;
</script>

<aside
	class="h-screen w-3/4 md:w-1/4 py-10 fixed bg-gray-800 left-0 top-0 container mx-auto px-5 -translate-x-full opacity-0 transition-all duration-500 menu-panel flex flex-col justify-between pt-20"
	class:opened={isOpen}
	use:clickOutside={() => (isOpen = false)}
>
	<nav class="text-white">
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
	</nav>
</aside>

<style>
	.menu-panel {
		&:is(.opened) {
			@apply translate-x-0 opacity-100;
		}
	}
</style>
