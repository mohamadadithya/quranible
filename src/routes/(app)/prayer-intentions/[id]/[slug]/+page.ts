import { getPrayerIntentionById, getPrayerIntentions } from '@lib/handlers';
import { error } from '@sveltejs/kit';

export const load = async ({ params: { id } }) => {
	const prayerIntention = getPrayerIntentionById(+id);
	const prayerIntentions = getPrayerIntentions();
	const otherIntentions = prayerIntentions.filter((intention) => intention.id !== +id);

	if (!prayerIntention) error(404, 'Oops, niat solat tidak ditemukan');

	return {
		prayerIntention,
		otherIntentions
	};
};
