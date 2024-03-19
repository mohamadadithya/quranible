import { getSurahById, getSurahs } from '@lib/handlers';
import type { Surah } from '@types';

export const load = async ({ params: { id } }) => {
	const surah = getSurahById(+id);
	const surahs = getSurahs();

	const nextSurahData = surahs.find((surah) => surah.number === +id + 1);
	const prevSurahData = surahs.find((surah) => surah.number === +id - 1);

	const filterSurahProps = (surah: Surah | undefined) => {
		if (!surah) return undefined;

		return {
			id: surah.number,
			name: surah.name.transliteration.id,
			translation: surah.name.translation.id,
			total_verses: surah.numberOfVerses
		};
	};

	return {
		surah,
		nextSurah: filterSurahProps(nextSurahData),
		prevSurah: filterSurahProps(prevSurahData)
	};
};
