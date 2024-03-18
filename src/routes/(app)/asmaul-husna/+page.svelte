<script>
	import Heading from '@components/Heading.svelte';
	import { MetaTags } from 'svelte-meta-tags';

	export let data;

	const { allAsmaulHusna } = data;
</script>

<MetaTags title="Asmaul Husna" keywords={['asmaul husna', 'nama nama Allah']} />

<section class="min-h-dvh py-8">
	<Heading title="Asmaul Husna" />
	<div class="grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-3 lg:grid-cols-4 mt-10">
		{#each allAsmaulHusna as goodName}
			<div id="asmaul-husna" class="shadow-xl p-5 rounded-xl">
				<h2 class="arab-font text-3xl md:text-4xl text-right mb-6">{goodName.arab}</h2>
				<p class="text-xs text-gray-500">{goodName.transliteration}</p>
				<p class="text-xs">{goodName.translation}</p>
			</div>
		{/each}
	</div>
</section>
