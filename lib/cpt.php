<?php

if ( ! function_exists('testimonials_cpt') ) {

// Register Custom Post Type
function testimonials_cpt() {

	$labels = array(
		'name'                  => _x( 'Testimonials', 'Post Type General Name', '_vt' ),
		'singular_name'         => _x( 'Testimonial', 'Post Type Singular Name', '_vt' ),
		'menu_name'             => __( 'Testimonials', '_vt' ),
		'name_admin_bar'        => __( 'Testimonials', '_vt' ),
		'archives'              => __( 'Testimonial Archives', '_vt' ),
		'attributes'            => __( 'Item Attributes', '_vt' ),
		'parent_item_colon'     => __( 'Parent Item:', '_vt' ),
		'all_items'             => __( 'All Items', '_vt' ),
		'add_new_item'          => __( 'Add New Item', '_vt' ),
		'add_new'               => __( 'Add New', '_vt' ),
		'new_item'              => __( 'New Testimonial', '_vt' ),
		'edit_item'             => __( 'Edit Testimonial', '_vt' ),
		'update_item'           => __( 'Update Testimonial', '_vt' ),
		'view_item'             => __( 'View Testimonial', '_vt' ),
		'view_items'            => __( 'View Testimonial', '_vt' ),
		'search_items'          => __( 'Search Testimonials', '_vt' ),
		'not_found'             => __( 'Not found', '_vt' ),
		'not_found_in_trash'    => __( 'Not found in Trash', '_vt' ),
		'featured_image'        => __( 'Featured Image', '_vt' ),
		'set_featured_image'    => __( 'Set featured image', '_vt' ),
		'remove_featured_image' => __( 'Remove featured image', '_vt' ),
		'use_featured_image'    => __( 'Use as featured image', '_vt' ),
		'insert_into_item'      => __( 'Insert into item', '_vt' ),
		'uploaded_to_this_item' => __( 'Uploaded to this item', '_vt' ),
		'items_list'            => __( 'Items list', '_vt' ),
		'items_list_navigation' => __( 'Items list navigation', '_vt' ),
		'filter_items_list'     => __( 'Filter items list', '_vt' ),
	);
	$args = array(
		'label'                 => __( 'Testimonial', '_vt' ),
		'description'           => __( 'Testimonials', '_vt' ),
		'labels'                => $labels,
		'supports'              => array( 'title', 'editor', 'thumbnail' ),
		'hierarchical'          => false,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'menu_position'         => 20,
		'menu_icon'             => '/wp-content/plugins/vt_testimonials/assets/images/icon.svg',
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => false,
		'can_export'            => true,
		'has_archive'           => false,
		'exclude_from_search'   => true,
		'publicly_queryable'    => true,
		'capability_type'       => 'page',
		'show_in_rest'          => true,
		'template'              => [
			[ 'testimonials/editableblock', [] ]
		],
		'template_lock'        => 'all',
	);
	register_post_type( 'vt_testimonials', $args );

}
add_action( 'init', 'testimonials_cpt', 0 );

}