/**
 * External dependencies
 */
import { LogoSoup } from 'react-logo-soup';

/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	BlockControls,
	InspectorControls,
	MediaPlaceholder,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToolbarButton,
	ToolbarGroup,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { SVG, Path } from '@wordpress/primitives';

/**
 * Internal dependencies
 */
import {
	clampNumber,
	defaultBaseSize,
	defaultGap,
	mapLogosForSoup,
} from './helpers';
import metadata from './block.json';

const icon = (
	<SVG viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
		<Path d="M21.501 10.5L21.486 11.066C21.191 16.878 16.385 21.501 10.5 21.501L9.935 21.486C8.538 21.415 7.212 21.078 6 20.534V18.868C7.34 19.59 8.872 20.001 10.5 20.001C15.747 20.001 20.001 15.747 20.001 10.5C20.001 9.633 19.875 8.798 19.657 8H21.204C21.391 8.804 21.501 9.639 21.501 10.5ZM6.014 16.5C5.44 16.07 4.931 15.561 4.5 14.986C3.562 13.734 3 12.184 3 10.5C3 8.816 3.562 7.266 4.5 6.014C4.93 5.44 5.439 4.931 6.014 4.5C7.266 3.562 8.816 3 10.5 3C12.184 3 13.734 3.562 14.986 4.5C15.56 4.93 16.07 5.439 16.5 6.014C17.438 7.266 18 8.816 18 10.5C18 12.184 17.438 13.734 16.5 14.986C16.07 15.56 15.561 16.07 14.986 16.5C13.734 17.438 12.184 18 10.5 18C8.816 18 7.266 17.438 6.014 16.5ZM7.359 11.339C7.463 11.283 7.579 11.252 7.697 11.25C7.815 11.248 7.932 11.272 8.039 11.323L10.423 12.465L13.313 10.391C13.44 10.3 13.593 10.25 13.75 10.25C13.907 10.25 14.06 10.299 14.187 10.391L16.323 11.924C16.435 11.467 16.5 10.992 16.5 10.5C16.5 7.186 13.814 4.5 10.5 4.5C7.186 4.5 4.5 7.186 4.5 10.5C4.5 11.262 4.648 11.989 4.907 12.66L7.359 11.339ZM5.618 13.98C6.706 15.503 8.485 16.5 10.5 16.5C12.773 16.5 14.75 15.236 15.768 13.372L13.75 11.923L10.937 13.943C10.828 14.021 10.7 14.069 10.566 14.08C10.432 14.092 10.298 14.067 10.177 14.01L7.733 12.84L5.618 13.98Z" />
	</SVG>
);

const Edit = ( { attributes, setAttributes } ) => {
	const {
		logos = [],
		gap: gapAttr,
		baseSize: baseSizeAttr,
	} = attributes;

	const gap = clampNumber( gapAttr, 0, 128, defaultGap );
	const baseSize = clampNumber( baseSizeAttr, 8, 256, defaultBaseSize );
	const blockProps = useBlockProps();

	const logosForSoup = mapLogosForSoup( logos );

	const onSelectMedia = ( media ) => {
		if ( ! media ) {
			return;
		}
		const mediaArray = Array.isArray( media ) ? media : [ media ];
		const newLogos = mediaArray
			.filter( ( item ) => {
				if ( ! item ) {
					return false;
				}
				// Handle different media object structures
				const url = item.url || item.source_url || item.sizes?.full?.url;
				return !!url;
			} )
			.map( ( item ) => {
				// Handle different media object structures
				const url = item.url || item.source_url || item.sizes?.full?.url;
				const alt = item.alt || item.alt_text || '';
				return {
					id: item.id,
					url,
					alt,
				};
			} );

		setAttributes( { logos: newLogos } );
	};

	return (
		<>
			<BlockControls>
				{ logosForSoup.length > 0 && (
					<ToolbarGroup>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ onSelectMedia }
								allowedTypes={ [ 'image' ] }
								multiple
								gallery
								value={ logos.map( ( logo ) => logo.id ).filter( Boolean ) }
								render={ ( { open } ) => (
									<ToolbarButton onClick={ open }>
										{ __( 'Edit', 'simple-logo-gallery' ) }
									</ToolbarButton>
								) }
							/>
						</MediaUploadCheck>
					</ToolbarGroup>
				) }
			</BlockControls>
			<InspectorControls>
				<PanelBody
					title={ __( 'Dimensions', 'simple-logo-gallery' ) }
					initialOpen={ true }
				>
					<RangeControl
						label={ __( 'Block spacing', 'simple-logo-gallery' ) }
						value={ gap }
						onChange={ ( value ) =>
							setAttributes( {
								gap: clampNumber( value, 0, 128, defaultGap ),
							} )
						}
						min={ 0 }
						max={ 128 }
						step={ 1 }
						__next40pxDefaultSize
					/>
					<RangeControl
						label={ __( 'Size', 'simple-logo-gallery' ) }
						value={ baseSize }
						onChange={ ( value ) =>
							setAttributes( {
								baseSize: clampNumber( value, 8, 256, defaultBaseSize ),
							} )
						}
						min={ 8 }
						max={ 256 }
						step={ 1 }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				{ logosForSoup.length === 0 ? (
					<MediaPlaceholder
						icon={ icon }
						labels={ {
							title: __( 'Simple Logo Gallery', 'simple-logo-gallery' ),
							instructions: __(
								'Drag and drop logos, upload, or choose from your library.',
								'simple-logo-gallery'
							),
						} }
						onSelect={ onSelectMedia }
						accept="image/*"
						multiple
						allowedTypes={ [ 'image' ] }
					/>
				) : (
					<div className="wp-block-simple-logo-gallery__preview">
						<LogoSoup logos={ logosForSoup } gap={ gap } baseSize={ baseSize } cropToContent />
					</div>
				) }
			</div>
		</>
	);
};

registerBlockType( metadata, {
	icon: {
		src: icon,
	},
	edit: Edit,
	save: () => null,
} );
