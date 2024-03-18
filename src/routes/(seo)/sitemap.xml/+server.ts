import { getDailyPrayers, getPrayerIntentions, getSurahs } from '@lib/handlers';
import { slugify } from '@lib/helpers';
import * as sitemap from 'super-sitemap';

export const prerender = true;

const surahsMeta = () => {
	const surahs = getSurahs();
	const surahsMeta = surahs.map((surah) => {
		const meta = {
			id: surah.number,
			slug: slugify(surah.name.transliteration.id)
		};

		return Object.values(meta) as string[];
	});

	return surahsMeta;
};

const dailyPrayersMeta = () => {
	const prayers = getDailyPrayers();
	const prayersMeta = prayers.map((prayer) => {
		const meta = {
			id: prayer.id,
			slug: slugify(prayer.name)
		};

		return Object.values(meta) as string[];
	});

	return prayersMeta;
};

const prayerIntentionsMeta = () => {
	const intentions = getPrayerIntentions();
	const intentionsMeta = intentions.map((intention) => {
		const meta = {
			id: intention.id,
			slug: slugify(intention.name)
		};

		return Object.values(meta) as string[];
	});

	return intentionsMeta;
};

export const GET = async () => {
	return await sitemap.response({
		origin: 'https://quranible-v2.vercel.app',
		paramValues: {
			'/read/[id]/[slug]': surahsMeta(),
			'/daily-prayers/[id]/[slug]': dailyPrayersMeta(),
			'/prayer-intentions/[id]/[slug]': prayerIntentionsMeta()
		},
		changefreq: 'daily',
		priority: 0.7,
		sort: 'alpha'
	});
};
