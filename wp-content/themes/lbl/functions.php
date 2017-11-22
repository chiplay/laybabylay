<?php

function catch_that_image() {
  global $post, $posts;
  $first_img = '';
  ob_start();
  ob_end_clean();
  $output = preg_match_all('/<img.+src=[\'"]([^\'"]+)[\'"].*>/i', $post->post_content, $matches);
  $first_img = $matches [1] [0];
  $first_img = str_replace("laybabylay.com", "babylay.s3.amazonaws.com", $first_img);

  if(empty($first_img)){ //Defines a default image
    $first_img = "/images/default.jpg";
  }
  return $first_img;
}

add_filter( 'allowed_http_origins', 'add_allowed_origins' );
function add_allowed_origins( $origins ) {
    $origins[] = 'https://www.laybabylay.com';
    return $origins;
}

if( !is_admin() ){
	wp_deregister_script('jquery');
}

add_action('send_headers', function() {
	if ( ! did_action('rest_api_init') && $_SERVER['REQUEST_METHOD'] == 'HEAD' ) {
		header( 'Access-Control-Allow-Origin: *' );
		header( 'Access-Control-Expose-Headers: Link' );
		header( 'Access-Control-Allow-Methods: HEAD' );
	}
});

add_filter('show_admin_bar', '__return_false');

function my_attachment_image_thumb($postid=0, $size='full', $attributes='') {
  if ($postid<1) $postid = get_the_ID();
  if ($images = get_children(array('post_parent' => $postid, 'post_type' => 'attachment', 'numberposts' => 1, 'orderby' => 'menu_order', 'post_mime_type' => 'image')))
  foreach($images as $image) {
    $attachmenthumb = wp_get_attachment_image_src($image->ID, $size);
    echo $attachmenthumb[0];
  }
}

add_filter( 'the_content', 'cloudinary_image_transform', 20 );
/**
 * Let's save us some bandwidth
 *
 * @uses is_single()
 */
function cloudinary_image_transform( $content ) {
  $doc = new DOMDocument();
  $doc->LoadHTML(mb_convert_encoding($content, 'HTML-ENTITIES', 'UTF-8'));
  $images = $doc->getElementsByTagName('img');
  foreach ($images as $image) {
    $src = $image->getAttribute('src');
    $filename = basename($src);
    $image->setAttribute('src', 'https://res.cloudinary.com/laybabylay/image/upload/q_60,w_1200/' . $filename);
  }
  return $doc->saveHTML();
}

define( 'ALGOLIA_SPLIT_POSTS', false );

/**
 * Fill out related post content
 */

function get_first_image_from_content( $content ) {
	preg_match_all('/<img.+src=[\'"]([^\'"]+)[\'"].*>/i', $content, $matches);
	$first_img = $matches[1][0];
	return basename($first_img);	
}

function get_related_posts( $field_name, $post ) {
	$updated_posts = array();

	$related_posts = get_field($field_name, $post->ID);
	foreach ( $related_posts as $related_post ) {
		$updated_posts[] = transform_post($related_post);
	}
	return $updated_posts;
}

function transform_post( $related_post ) {
	$new_post = new stdClass();
	$content = $related_post->post_content;
	$new_post->first_image = get_first_image_from_content($content);
	$new_post->excerpt = wp_trim_words($content, 30, '...');
	$new_post->ID = $related_post->ID;
	$new_post->slug = $related_post->post_name;
	$new_post->post_date = $related_post->post_date;
	$new_post->post_title = $related_post->post_title;
	$new_post->related_post = $related_post->related_post;
	$new_post->subtitle = get_field('subtitle', $related_post->ID);
	$new_post->featured_image = get_field('featured_image', $related_post->ID)[url];
	$new_post->taxonomies = new stdClass();
	$new_post->taxonomies->category = array();
	if ($wp_categories = get_the_category($related_post->ID)) {
		foreach ($wp_categories as $wp_category) {
			if ($wp_category->term_id == 1 && $wp_category->slug == 'uncategorized') {
				// Skip the 'uncategorized' category
				continue;
			}
			$new_post->taxonomies->category[] = $wp_category->cat_name;
		}
	}
	return $new_post;
}

/**
 * Add ACF fields to Algolia index
 */
add_filter( 'algolia_searchable_post_shared_attributes', 'acf_post_attributes', 10, 2);
add_filter( 'algolia_post_shared_attributes', 'acf_post_attributes', 10, 2);
/**
 * @param array   $attributes
 * @param WP_Post $post
 *
 * @return array
 */
function acf_post_attributes(array $attributes, WP_Post $post) {
	// Add the post slug
	$attributes['slug'] = $post->post_name;
	
	// Add the post content (with html), and reassign in algolia_post_records
	$attributes['content_full'] = wpautop($post->post_content);
	$attributes['first_image'] = get_first_image_from_content($post->post_content);

	if (get_field('related_posts', $post->ID)) {
		$attributes['related_posts'] = get_related_posts('related_posts', $post);
	}
	if (get_field('featured_image', $post->ID)) {
		$attributes['featured_image'] = get_field('featured_image', $post->ID)[url];
	}
	if (get_field('subtitle', $post->ID)) {
		$attributes['subtitle'] = get_field('subtitle', $post->ID);
	}
	
	// Homepage fields
	if (get_field('featured_posts', $post->ID)) {
		$attributes['featured_posts'] = get_related_posts('featured_posts', $post);
	}
	if (get_field('popular_posts', $post->ID)) {
		$attributes['popular_posts'] = get_related_posts('popular_posts', $post);
	}
	if (get_field('favorite_posts', $post->ID)) {
		$attributes['favorite_posts'] = get_related_posts('favorite_posts', $post);
	}
	if (get_field('sidebar_tiles', $post->ID)) {
		$attributes['sidebar_tiles'] = get_field('sidebar_tiles', $post->ID);
	}
	
	// Product fields
	if (get_field('product_image', $post->ID)) {
		$attributes['product_image'] = get_field('product_image', $post->ID)[url];
	}
	if (get_field('product_description', $post->ID)) {
		$attributes['description'] = get_field('product_description', $post->ID);
	}
	if (get_field('product_price', $post->ID)) {
		$attributes['price'] = get_field('product_price', $post->ID);
	}
	if (get_field('product_vendor', $post->ID)) {
		$attributes['vendor'] = get_field('product_vendor', $post->ID);
	}
	if (get_field('product_link', $post->ID)) {
		$attributes['link'] = get_field('product_link', $post->ID);
	}
	if (get_field('product_color', $post->ID)) {
		$attributes['color'] = get_field('product_color', $post->ID);
	}
	if (get_field('product_alternates', $post->ID)) {
		$attributes['alternates'] = get_field('product_alternates', $post->ID);
	}
	if (get_field('product_boards', $post->ID)) {
		$attributes['found_in'] = get_related_posts('product_boards', $post);
	}
	
	// Search Page
	if (get_field('search_categories', $post->ID)) {
		$attributes['search_categories'] = get_field('search_categories', $post->ID);
	}
	if (get_field('product_categories', $post->ID)) {
		$attributes['product_categories'] = get_field('product_categories', $post->ID);
	}
	
	// cleanup unused props
	unset($attributes['is_sticky']);
	unset($attributes['record_index']);
	unset($attributes['taxonomies_hierarchical']);
	unset($attributes['post_author']);
	unset($attributes['post_modified']);
	unset($attributes['comment_count']);
	unset($attributes['menu_order']);
	unset($attributes['post_mime_type']);
	unset($attributes['permalink']);
	unset($attributes['post_date_formatted']);

	// Always return the value we are filtering.
	return $attributes;
}

function submission_post_attributes( array $records, WP_Post $post ) {
	$updated_records = array();

	foreach ( $records as $record ) {
		
		$record['content'] = $record['content_full'];
		$record['content_full'] = '';
		$updated_records[] = $record;
   	}

   	return $updated_records;
}
add_filter( 'algolia_searchable_post_records', 'submission_post_attributes', 10, 2 );
add_filter( 'algolia_post_records', 'submission_post_attributes', 10, 2);


?>
