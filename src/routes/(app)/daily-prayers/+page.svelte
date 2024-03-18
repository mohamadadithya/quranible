<script>
	import Heading from '@components/Heading.svelte';
	import { slugify } from '@lib/helpers';
	import { MetaTags } from 'svelte-meta-tags';

	export let data;

	const { dailyPrayers } = data;
</script>

<MetaTags
	title="Doa Harian"
	description="Kumpulan doa-doa harian lengkap dengan arti"
	keywords={['doa harian', 'doa-doa']}
/>

<section class="min-h-dvh py-8">
	<Heading title="Doa Harian" />
	<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
		{#each dailyPrayers as prayer, index}
			<a
				href="/daily-prayers/{prayer.id}/{slugify(prayer.name)}"
				class="block p-5 shadow-xl border border-gray-700 rounded-xl hover:bg-gray-800 duration-300 text-sm"
			>
				<p>{index + 1}. {prayer.name}</p>
			</a>
		{/each}
	</div>
</section>
