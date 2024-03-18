import { getDailyPrayers } from '@lib/handlers';

export const load = async () => {
	const dailyPrayers = getDailyPrayers();

	return {
		dailyPrayers
	};
};
