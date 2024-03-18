<script>
	import { slugify } from '@lib/helpers';
	import { MetaTags } from 'svelte-meta-tags';

	export let data;

	let prayer = data.dailyPrayer,
		otherPrayers = data.otherPrayers;

	$: {
		prayer = data.dailyPrayer;
		otherPrayers = data.otherPrayers;
	}
</script>

<MetaTags title={prayer.name} />

<section class="min-h-dvh py-8">
	<h1 class="text-2xl md:text-3xl font-bold mb-10 capitalize">{prayer.name}</h1>
	<p class="text-3xl md:text-4xl arab-font text-right mb-10 leading-extra">{prayer.arab}</p>
	<p class="text-gray-500 text-sm mb-2">{prayer.transliteration}</p>
	<p>{prayer.translation}</p>

	<div class="flex items-center mb-5 mt-14">
		<h2 class="text-2xl font-semibold">Doa Harian Lainnya</h2>
		<div class="w-full h-0.5 bg-gray-300 flex-1 ml-3" />
	</div>
	<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
		{#each otherPrayers as prayer, index}
			<a
				href="/daily-prayers/{prayer.id}/{slugify(prayer.name)}"
				class="block p-5 shadow-xl border border-gray-700 rounded-xl hover:bg-gray-800 duration-300 text-sm"
			>
				<p>{index + 1}. {prayer.name}</p>
			</a>
		{/each}
	</div>
</section>
