/**
 * External dependencies
 */
import { createRoot } from 'react-dom/client';
import { createElement } from 'react';
import { LogoSoup } from 'react-logo-soup';

/**
 * Internal dependencies
 */
import {
	clampNumber,
	defaultBaseSize,
	defaultGap,
	mapLogosForSoup,
} from './helpers';

function initBlock( blockEl ) {
	const container = blockEl.querySelector( '.wp-block-simple-logo-gallery__soup' );
	if ( ! container ) {
		console.warn( 'Simple Logo Gallery: Container not found', blockEl );
		return;
	}

	const dataLogos = blockEl.getAttribute( 'data-logos' );
	const dataGap = blockEl.getAttribute( 'data-block-gap' );
	const dataBaseSize = blockEl.getAttribute( 'data-base-size' );

	let logos = [];
	try {
		const parsed = dataLogos ? JSON.parse( dataLogos ) : [];
		logos = mapLogosForSoup( parsed );
	} catch ( e ) {
		console.error( 'Simple Logo Gallery: Failed to parse logos data', e, dataLogos );
		return;
	}

	if ( logos.length === 0 ) {
		console.warn( 'Simple Logo Gallery: No logos found', { dataLogos, blockEl } );
		return;
	}

	// Gap comes from a simple numeric attribute.
	const parsedGap = dataGap !== null && dataGap !== '' ? parseInt( dataGap, 10 ) : NaN;
	const gap = clampNumber( parsedGap, 0, 128, defaultGap );

	// Determine base size from data attribute, with sane defaults and clamping.
	const parsedBase = dataBaseSize ? parseInt( dataBaseSize, 10 ) : NaN;
	const baseSize = clampNumber( parsedBase, 8, 256, defaultBaseSize );
	
	try {
		const root = createRoot( container );
		root.render( createElement( LogoSoup, { logos, gap, baseSize, cropToContent: true } ) );
	} catch ( error ) {
		console.error( 'Simple Logo Gallery: Failed to render LogoSoup', error );
	}
}

function init() {
	const selector = '.wp-block-simple-logo-gallery-logo-gallery';
	const blocks = document.querySelectorAll( selector );
	
	if ( blocks.length === 0 ) {
		console.warn( 'Simple Logo Gallery: No blocks found with selector', selector );
		return;
	}
	
	blocks.forEach( initBlock );
}

// Run on DOMContentLoaded or immediately if already loaded
if ( document.readyState === 'loading' ) {
	document.addEventListener( 'DOMContentLoaded', init );
} else {
	init();
}

// Also run after a short delay to catch dynamically loaded content
setTimeout( init, 100 );
