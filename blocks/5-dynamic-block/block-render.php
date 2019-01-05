<?php

namespace Vt_Gutenberg_Testimonials;


add_action( 'plugins_loaded', __NAMESPACE__ . '\register_dynamic_block' );
/**
 * Register the dynamic block.
 *
 * @since 2.1.0
 *
 * @return void
 */
function register_dynamic_block() {

	// Only load if Gutenberg is available.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	// Hook server side rendering into render callback
	register_block_type( 'testimonials/dynamicblock', [
		'render_callback' => __NAMESPACE__ . '\render_dynamic_block',
	] );

}

/**
 * Server rendering for /blocks/examples/12-dynamic
 */
function render_dynamic_block( $attributes ) {

	$testimonial_id = $attributes['selectControl'];
	$bg_colour = $attributes['colorPalette'] ? $attributes['colorPalette'] : '#FF6F61';
	$block_align = $attributes['blockAlignment'];
	$text_align = $attributes['textAlignment'];

	$testimonial = get_post( $testimonial_id );

	if ( empty( $testimonial ) ) {
		return;
	}

	$markup = '<div class="wp-block-testimonials-dynamicblock txt-align-' . $text_align . ' align' . $block_align . ' " style="background-color: ' . $bg_colour . '; text-align:  ">';
	$markup  .= $testimonial->post_content;
	$markup  .= '</div>';

	return $markup;

	//return print_r( $attributes );
}