/**
 * Returns a slugified version of the given text, with spaces replaced with dashes and special characters removed.
 *
 * @param text - The text to slugify.
 * @returns The slugified text.
 */
const slugify = (text: string): string => {
	return text
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^\w-]+/g, '')
		.replace(/--+/g, '-')
		.replace(/^-+|-+$/g, '');
};

export { slugify };
