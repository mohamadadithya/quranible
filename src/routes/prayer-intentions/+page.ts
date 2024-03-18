import { getPrayerIntentions } from '@lib/handlers';

export const load = async () => {
	const prayerIntentions = getPrayerIntentions();

	return {
		prayerIntentions
	};
};
