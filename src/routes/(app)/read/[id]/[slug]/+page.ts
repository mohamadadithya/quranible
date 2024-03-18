import { getSurahById, getSurahs } from '@lib/handlers';

export const load = async ({ params: { id } }) => {
	const surah = getSurahById(+id);
	const surahs = getSurahs();

	const nextSurah = surahs.find((surah) => surah.number === +id + 1);
	const prevSurah = surahs.find((surah) => surah.number === +id - 1);

	return {
		surah,
		nextSurah,
		prevSurah
	};
};
