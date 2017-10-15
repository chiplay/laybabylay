<?php

define( 'ALGOLIA_SPLIT_POSTS', false );

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

if( !is_admin() ){
	wp_deregister_script('jquery');
}

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

function custom_excerpt_more( $more ) {
  return '...';
}
add_filter( 'excerpt_more', 'custom_excerpt_more' );

function custom_excerpt_length( $length ) {
  return 40;
}
add_filter( 'excerpt_length', 'custom_excerpt_length', 999 );

/**
 * Fill out related post content
 */

function get_related_post( $field_name, $post ) {
	$updated_posts = array();

	$posts = get_field($field_name, $post->ID);
	foreach ( $posts as $post ) {
		$updated_posts[] = transform_post($post);
	}
	return $updated_posts;
}

function transform_post( $post ) {
	$post->post_content = '';
	$post->slug = $post->post_name;
	$post->featured_image = get_field('featured_image', $post->ID)[url];
	$post->category = array();
	if ($wp_categories = get_the_category($post->ID)) {
		foreach ($wp_categories as $wp_category) {
			if ($wp_category->term_id == 1 && $wp_category->slug == 'uncategorized') {
				// Skip the 'uncategorized' category
				continue;
			}
			$post->category[] = $wp_category;
		}
	}
	return $post;
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
	$attributes['content_full'] = $post->post_content;

	// The above could be used for custom shaping of the JSON,
	// but this is much, much simplier and allows for new layouts
	// without having to touch this file
	if (get_field('related_posts', $post->ID)) {
		$attributes['related_posts'] = get_related_post('related_posts', $post);
	}
	if (get_field('featured_image', $post->ID)) {
		$attributes['featured_image'] = get_field('featured_image', $post->ID)[url];
	}
	if (get_field('subtitle', $post->ID)) {
		$attributes['subtitle'] = get_field('subtitle', $post->ID);
	}

	// Homepage fields
	if (get_field('featured_posts', $post->ID)) {
		$attributes['featured_posts'] = get_related_post('featured_post', $post);
	}
	if (get_field('popular_posts', $post->ID)) {
		$attributes['popular_posts'] = get_related_post('popular_posts', $post);
	}
	if (get_field('favorite_posts', $post->ID)) {
		$attributes['favorite_posts'] = get_related_post('favorite_posts', $post);
	}
	if (get_field('sidebar_tiles', $post->ID)) {
		$attributes['sidebar_tiles'] = get_field('sidebar_tiles', $post->ID);
	}

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
