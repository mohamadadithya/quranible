import { getSurahs } from '@lib/handlers';

export const load = async () => {
	const surahsData = getSurahs();
	const surahs = surahsData.map((surah) => {
		return {
			id: surah.number,
			name: surah.name.transliteration.id,
			translation: surah.name.translation.id,
			total_verses: surah.numberOfVerses
		};
	});

	return {
		surahs
	};
};
