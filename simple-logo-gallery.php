<?php
/**
 * Plugin Name: Simple Logo Gallery
 * Description: A block that displays a row of logos normalized with react-logo-soup, with simple controls for gap and size.
 * Version: 1.0.1
 * Author: Thomas Guillot
 * Author URI: https://thomasguillot.com/
 * License: GPL-2.0-or-later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: simple-logo-gallery
 * Domain Path: /languages
 *
 * @package simple-logo-gallery
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Load plugin text domain.
 */
function simple_logo_gallery_load_textdomain() {
	load_plugin_textdomain( 'simple-logo-gallery', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
}
add_action( 'init', 'simple_logo_gallery_load_textdomain' );

/**
 * Register the block.
 */
function create_simple_logo_gallery_block() {
	register_block_type(
		__DIR__ . '/dist',
		array(
			'render_callback' => 'render_simple_logo_gallery_block',
		)
	);
}
add_action( 'init', 'create_simple_logo_gallery_block' );

/**
 * Render the block on the front-end.
 *
 * Outputs a wrapper with data-logos and data-block-gap for the view script to
 * hydrate with react-logo-soup. Logos are stored as a block attribute.
 *
 * @param array     $attributes Block attributes.
 * @param string    $content    Block content (unused for this dynamic block).
 * @param \WP_Block $block      Block instance (unused here, kept for signature compatibility).
 * @return string Rendered block markup.
 */
function render_simple_logo_gallery_block( $attributes, $content, $block ) { // phpcs:ignore VariableAnalysis.CodeAnalysis.VariableAnalysis.UnusedVariable
	$gap       = isset( $attributes['gap'] ) ? (int) $attributes['gap'] : 16;
	$base_size = isset( $attributes['baseSize'] ) ? (int) $attributes['baseSize'] : 48;

	$logos_attr    = isset( $attributes['logos'] ) && is_array( $attributes['logos'] ) ? $attributes['logos'] : array();
	$logos_for_soup = array();

	foreach ( $logos_attr as $logo ) {
		if ( ! empty( $logo['url'] ) ) {
			$logos_for_soup[] = array(
				'src' => $logo['url'],
				'alt' => isset( $logo['alt'] ) ? sanitize_text_field( $logo['alt'] ) : '',
			);
		}
	}

	$wrapper_extra = array(
		'data-logos'      => wp_json_encode( $logos_for_soup ),
		'data-block-gap'  => $gap,
		'data-base-size'  => $base_size,
	);

	$wrapper_attributes = get_block_wrapper_attributes( $wrapper_extra );

	$inner = '<div class="wp-block-simple-logo-gallery__soup"></div>';

	return sprintf( '<div %1$s>%2$s</div>', $wrapper_attributes, $inner );
}
