<script lang="ts">
	import Heading from '@components/Heading.svelte';
	import BookmarkList from '@lib/components/BookmarkList.svelte';
	import { savedVerses } from '@lib/stores/bookmarks';
	import { MetaTags } from 'svelte-meta-tags';

	const filteredVerses = $savedVerses
		.filter((verse) => Object.keys(verse).length > 0)
		.sort((a, b) => b.id! - a.id!);
</script>

<MetaTags title="Penanda Surah" />

<section class="min-h-dvh py-8">
	<Heading title="Penanda Surah" />
	{#if filteredVerses.length > 0}
		{#each filteredVerses as verse, index}
			{#if verse.id && verse.surahId}
				<BookmarkList {verse} {index} />
			{/if}
		{/each}
	{:else}
		<p>Belum ada penanda surah...</p>
	{/if}
</section>
