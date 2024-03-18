<script lang="ts">
	import { PUBLIC_SITE_NAME } from '$env/static/public';
	import { MetaTags } from 'svelte-meta-tags';
	import Icon from '@iconify/svelte';
	import SurahCard from '@components/SurahCard.svelte';

	export let data;

	const { surahs } = data;

	let keyword = '',
		filteredSurahs = [...surahs];

	const filterSurahs = () =>
		surahs.filter((surah) =>
			surah.name.transliteration.id.toLowerCase().includes(keyword.toLowerCase())
		);

	$: filteredSurahs = keyword ? filterSurahs() : [...surahs];
</script>

<MetaTags title={PUBLIC_SITE_NAME} />

<section class="min-h-dvh py-8">
	<div
		class="flex items-center border-2 border-transparent focus-within:border-gray-700 shadow-lg p-4 rounded-xl"
	>
		<Icon icon="ph:magnifying-glass" class="mr-3 text-gray-400 text-3xl" />
		<input
			type="text"
			class="w-full outline-none bg-transparent"
			placeholder="Ingin baca surah apa hari ini?"
			bind:value={keyword}
		/>
	</div>
	<div class="grid md:grid-cols-2 lg:grid-cols-3 mt-10 gap-6 md:gap-10">
		{#each filteredSurahs as surah}
			<SurahCard {surah} />
		{/each}
	</div>
</section>
