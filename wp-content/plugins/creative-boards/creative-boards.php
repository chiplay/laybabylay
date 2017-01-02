<?
/*
Plugin Name: Creative Boards
Plugin URI: http://meethybrid.com/plugins/creative-boards/
Description: Creative Board Layouts Made Simple
Author: Jo Albright
Version: 1.0.0
Author URI: http://jo2.co/
*/

define( 'CBP_FILE', __FILE__);
define( 'CBP_PATH', plugin_dir_path(__FILE__) );

global $cb_db_version;
$cb_db_version = "1.0";

function cbdb_install()
{
	global $wpdb;
	global $cb_db_version;

	$cb_name = $wpdb->prefix . "creative_board";

	$cb_sql = "CREATE TABLE $cb_name (
		post_id mediumint(9) NOT NULL,
		image text NOT NULL,
		colors text NOT NULL,
		number text NOT NULL,
		items text NOT NULL
	);";

	$cbi_name = $wpdb->prefix . "creative_board_item";

	$cbi_sql = "CREATE TABLE $cbi_name (
		post_id mediumint(9) NOT NULL,
		image text NOT NULL,
		colors text NOT NULL,
		url text NOT NULL,
		prli_id mediumint(9) NOT NULL,
		price decimal(10,2),
		alternative_post_ids text NOT NULL
	);";

	require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
	dbDelta($cb_sql);
	dbDelta($cbi_sql);

	add_option("cb_db_version", $cb_db_version);
}

register_activation_hook(__FILE__,'cbdb_install');


add_action( 'init', 'create_post_type' );
function create_post_type()
{


////////////////////////////////////////////////
//////////////////////////////////////////////// CREATIVE BOARD POST TYPE
////////////////////////////////////////////////


	register_post_type( 'styleboard',
		array(
			'labels' => array(
				'name' => __('Style Boards'),
				'singular_name' => __('Style Board')
			),
			'public' => true,
			'has_archive' => true,
			'rewrite' => array('slug'=>'styleboards'),
			'menu_position' => 5,
			'supports' =>  array(
				'title',
				'editor'
			)
		)
	);


////////////////////////////////////////////////
//////////////////////////////////////////////// CREATIVE BOARD TAGS
////////////////////////////////////////////////


	$labels = array(
		'name'                         => _x( 'Board Tags', 'taxonomy general name' ),
		'singular_name'                => _x( 'Board Tag', 'taxonomy singular name' ),
		'search_items'                 => __( 'Search Board Tags' ),
		'popular_items'                => __( 'Popular Board Tags' ),
		'all_items'                    => __( 'All Board Tags' ),
		'parent_item'                  => null,
		'parent_item_colon'            => null,
		'edit_item'                    => __( 'Edit Board Tag' ),
		'update_item'                  => __( 'Update Board Tag' ),
		'add_new_item'                 => __( 'Add New Board Tag' ),
		'new_item_name'                => __( 'New Board Tag Name' ),
		'separate_items_with_commas'   => __( 'Separate board tags with commas' ),
		'add_or_remove_items'          => __( 'Add or remove board tags' ),
		'choose_from_most_used'        => __( 'Choose from the most used board tags' ),
		'menu_name'                    => __( 'Board Tags' )
	);

	$args = array(
		'hierarchical'            => false,
		'labels'                  => $labels,
		'show_ui'                 => true,
		'show_admin_column'       => true,
		'update_count_callback'   => '_update_post_term_count',
		'query_var'               => true,
		'rewrite'                 => array( 'slug' => 'board-tags' )
	);

	register_taxonomy( 'board_tag', 'styleboard', $args );


////////////////////////////////////////////////
//////////////////////////////////////////////// CREATIVE BOARD TYPES
////////////////////////////////////////////////


	$labels = array(
		'name'                => _x( 'Board Types', 'taxonomy general name' ),
		'singular_name'       => _x( 'Board Type', 'taxonomy singular name' ),
		'search_items'        => __( 'Search Board Types' ),
		'all_items'           => __( 'All Board Types' ),
		'parent_item'         => __( 'Parent Board Type' ),
		'parent_item_colon'   => __( 'Parent Board Type:' ),
		'edit_item'           => __( 'Edit Board Type' ),
		'update_item'         => __( 'Update Board Type' ),
		'add_new_item'        => __( 'Add New Board Type' ),
		'new_item_name'       => __( 'New Board Type Name' ),
		'menu_name'           => __( 'Board Types' )
	);

	$args = array(
		'hierarchical'        => true,
		'labels'              => $labels,
		'show_ui'             => true,
		'show_admin_column'   => true,
		'query_var'           => true,
		'rewrite'             => array( 'slug' => 'board-type' )
	);

	register_taxonomy( 'board_type', array( 'styleboard' ), $args );


////////////////////////////////////////////////
//////////////////////////////////////////////// PRODUCT POST TYPE
////////////////////////////////////////////////


	register_post_type( 'product',
		array(
			'labels' => array(
				'name' => __('Products'),
				'singular_name' => __('Product')
			),
			'public' => true,
			'has_archive' => true,
			'rewrite' => array('slug'=>'products'),
			'menu_position' => 5,
			'supports' =>  array(
				'title',
				'editor'
			)
		)
	);


////////////////////////////////////////////////
//////////////////////////////////////////////// PRODUCT TAGS
////////////////////////////////////////////////


	$labels = array(
		'name'                         => _x( 'Product Tags', 'taxonomy general name' ),
		'singular_name'                => _x( 'Product Tag', 'taxonomy singular name' ),
		'search_items'                 => __( 'Search Product Tags' ),
		'popular_items'                => __( 'Popular Product Tags' ),
		'all_items'                    => __( 'All Product Tags' ),
		'parent_item'                  => null,
		'parent_item_colon'            => null,
		'edit_item'                    => __( 'Edit Product Tag' ),
		'update_item'                  => __( 'Update Product Tag' ),
		'add_new_item'                 => __( 'Add New Product Tag' ),
		'new_item_name'                => __( 'New Product Tag Name' ),
		'separate_items_with_commas'   => __( 'Separate product tags with commas' ),
		'add_or_remove_items'          => __( 'Add or remove product tags' ),
		'choose_from_most_used'        => __( 'Choose from the most used product tags' ),
		'menu_name'                    => __( 'Product Tags' )
	);

	$args = array(
		'hierarchical'            => false,
		'labels'                  => $labels,
		'show_ui'                 => true,
		'show_admin_column'       => true,
		'update_count_callback'   => '_update_post_term_count',
		'query_var'               => true,
		'rewrite'                 => array( 'slug' => 'product-tags' )
	);

	register_taxonomy( 'product_tag', 'product', $args );


////////////////////////////////////////////////
//////////////////////////////////////////////// PRODUCT TYPES
////////////////////////////////////////////////

	$labels = array(
		'name'                => _x( 'Product Types', 'taxonomy general name' ),
		'singular_name'       => _x( 'Product Type', 'taxonomy singular name' ),
		'search_items'        => __( 'Search Product Types' ),
		'all_items'           => __( 'All Product Types' ),
		'parent_item'         => __( 'Parent Product Type' ),
		'parent_item_colon'   => __( 'Parent Product Type:' ),
		'edit_item'           => __( 'Edit Product Type' ),
		'update_item'         => __( 'Update Product Type' ),
		'add_new_item'        => __( 'Add New Product Type' ),
		'new_item_name'       => __( 'New Product Type Name' ),
		'menu_name'           => __( 'Product Types' )
	);

	$args = array(
		'hierarchical'        => true,
		'labels'              => $labels,
		'show_ui'             => true,
		'show_admin_column'   => true,
		'query_var'           => true,
		'rewrite'             => array( 'slug' => 'product-type' )
	);

	register_taxonomy( 'product_type', array( 'product' ), $args );

////////////////////////////////////////////////
//////////////////////////////////////////////// COLOR POST TYPE
////////////////////////////////////////////////

	register_post_type( 'color',
		array(
			'labels' => array(
				'name' => __('Colors'),
				'singular_name' => __('Color')
			),
			'public' => true,
			'has_archive' => true,
			'rewrite' => array('slug'=>'color'),
			'menu_position' => 5,
			'supports' =>  array(
				'title'
			)
		)
	);

}

include_once CBP_PATH.'fields/board-builder-field.php';
include_once CBP_PATH.'fields/product-info-field.php';

?>
