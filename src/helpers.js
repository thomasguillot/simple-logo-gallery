export const defaultGap = 16;
export const defaultBaseSize = 48;

/**
 * Normalize various logo objects into the shape expected by react-logo-soup.
 *
 * Accepts:
 * - Editor attributes: { id, url, alt }
 * - PHP-prepared data: { src, alt }
 *
 * @param {Array} logos
 * @return {Array<{ src: string, alt: string }>}
 */
export function mapLogosForSoup( logos ) {
	return ( logos || [] )
		.filter( ( logo ) => logo && ( logo.url || logo.src ) )
		.map( ( logo ) => ( {
			src: logo.src || logo.url,
			alt: logo.alt || '',
		} ) );
}

/**
 * Clamp a numeric value to a range, with a fallback when invalid.
 *
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @param {number} fallback
 * @return {number}
 */
export function clampNumber( value, min, max, fallback ) {
	if ( typeof value !== 'number' || Number.isNaN( value ) ) {
		return fallback;
	}

	if ( value < min || value > max ) {
		return fallback;
	}

	return value;
}
