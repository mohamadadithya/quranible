import { getDailyPrayerById, getDailyPrayers } from '@lib/handlers';
import { error } from '@sveltejs/kit';

export const load = async ({ params: { id } }) => {
	const dailyPrayer = getDailyPrayerById(+id);
	const dailyPrayers = getDailyPrayers();
	const otherPrayers = dailyPrayers.filter((item) => item.id !== +id);

	if (!dailyPrayer) error(404, 'Oops, Doa harian tidak ditemukan');

	return {
		dailyPrayer,
		otherPrayers
	};
};
