<script>
	import { slugify } from '@lib/helpers';
	import { MetaTags } from 'svelte-meta-tags';

	export let data;

	let intention = data.prayerIntention,
		otherIntentions = data.otherIntentions;

	$: {
		intention = data.prayerIntention;
		otherIntentions = data.otherIntentions;
	}
</script>

<MetaTags title={intention.name} />

<section class="min-h-dvh py-5">
	<h1 class="text-2xl md:text-3xl font-bold mb-10 capitalize">{intention.name}</h1>
	<p class="text-3xl md:text-4xl arab-font text-right mb-10 leading-extra">{intention.arab}</p>
	<p class="text-gray-500 text-sm mb-2">{intention.transliteration}</p>
	<p>{intention.translation}</p>

	<div class="flex items-center mb-5 mt-14">
		<h2 class="text-2xl font-semibold">Doa Harian Lainnya</h2>
		<div class="w-full h-0.5 bg-gray-300 flex-1 ml-3" />
	</div>
	<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
		{#each otherIntentions as intention, index}
			<a
				href="/prayer-intentions/{intention.id}/{slugify(intention.name)}"
				class="block p-5 shadow-xl border border-gray-700 rounded-xl hover:bg-gray-800 duration-300 text-sm"
			>
				<p>{index + 1}. {intention.name}</p>
			</a>
		{/each}
	</div>
</section>
