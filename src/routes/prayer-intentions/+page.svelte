<script lang="ts">
	import Heading from '@lib/components/Heading.svelte';
	import { slugify } from '@lib/helpers';
	import { MetaTags } from 'svelte-meta-tags';

	export let data;

	const { prayerIntentions } = data;
</script>

<MetaTags
	title="Niat Sholat"
	description="Kumpulan niat-niat sholat lengkap dengan arti"
	keywords={['niat', 'niat solat', 'niat-niat solat']}
/>

<section class="min-h-dvh py-5">
	<Heading title="Niat Sholat" />
	<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
		{#each prayerIntentions as intention, index}
			<a
				href="/prayer-intentions/{intention.id}/{slugify(intention.name)}"
				class="block p-5 shadow-xl border border-slate-700 rounded-xl hover:bg-slate-800 duration-300 text-sm"
			>
				<p>{index + 1}. {intention.name}</p>
			</a>
		{/each}
	</div>
</section>
