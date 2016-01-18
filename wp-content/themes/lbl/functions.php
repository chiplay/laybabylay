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
  $doc->LoadHTML($content);
  $images = $doc->getElementsByTagName('img');
  foreach ($images as $image) {
    $src = $image->getAttribute('src');
    $filename = basename($src);
    $image->setAttribute('src', 'https://res.cloudinary.com/laybabylay/image/upload/q_35,w_1200,f_auto/' . $filename);
  }
  return $doc->saveHTML();
}

?>