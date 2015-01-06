<?php
/*
Template Name: Single Post
*/
?>

<?php

/* preg_match('/alexa|bot|crawl(er|ing)|pinterest|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex|^$/i', $_SERVER['HTTP_USER_AGENT'], $matches);

if (!$matches) {

*/
	get_template_part( 'index' );

/*
} else {

?>

<!DOCTYPE html>
<html lang="en">
<head>

<?php while(have_posts()) : the_post(); ?>

	<meta http-equiv="content-type" content="text/html; charset=utf-8">
  <title><?php wp_title('&nbsp;&#124;&nbsp;', true, 'right'); ?> <?php bloginfo('name'); ?></title>
  <meta property="og:title" content="<?php echo trim(wp_title('', false)); ?>"/>
  <meta property="og:type" content="article"/>
  <meta property="og:description" content="<?php echo get_the_excerpt(); ?>"/>
  <?php
  $postid = get_the_ID();
  $images = get_children(array('post_parent' => $postid, 'post_type' => 'attachment', 'numberposts' => -1, 'orderby' => 'menu_order', 'post_mime_type' => 'image'));
  foreach($images as $image) {
    $attachmenthumb = wp_get_attachment_image_src($image->ID, 'full'); ?>
    <meta property="og:image" content="<?php echo $attachmenthumb[0]; ?>"/>
  <?php } ?>
  <meta property="og:url" content="<?php the_permalink(); ?>"/>
  <meta property="og:site_name" content="Lay Baby Lay"/>
  <meta property="fb:app_id" content="179291298758035"/>
  <meta property="article:author" content="https://www.facebook.com/joni.h.lay"/>
  <meta property="article:publisher" content="https://www.facebook.com/laybabylay" />
  <?php
  $categories = get_the_category();
  if($categories){
  	foreach($categories as $category) { ?>
  		<meta property="article:section" content="<?php echo $category->cat_name ?>"/>
  	<?php }
  } ?>
  <?php
  $posttags = get_the_tags();
  if ($posttags) {
    foreach($posttags as $tag) { ?>
    <meta property="article:tag" content="<?php echo $tag->name ?>"/>
    <?php }
  }
  wp_head(); ?>

</head>

<div id="wrapper">

	<div class="container">

 		<div class="row overflow-v">

			<div id="main_entries" class="overflow-v">

				<div id="panel0" class="main_data">

					<div class="span8 offset2">

						<article class="entry">

							<header class="align-center">

								<h1><small><?php the_title(); ?></small></h1>

								<span class="post_date"><?php the_time('l, F j, Y'); ?></span>

							</header>

							<?php the_content(); ?>

							<div class="categories">

								<?php
								$separator = ' ';
								$output = '';
								if($categories){
									foreach($categories as $category) {
										$output .= '<a href="'.get_category_link( $category->term_id ).'" title="' . esc_attr( sprintf( __( "View all posts in %s" ), $category->name ) ) . '">'.$category->cat_name.'</a>'.$separator;
									}
									echo trim($output, $separator);
								} ?>

							</div>

							<p><?php the_tags(); ?></p>

							<?php

							comments_template();

							?>

						</article>

					</div>

				</div>

			</div>

		</div>

	</div>

<?php endwhile; ?>

	<!-- 4 Random Posts -->

	<div class="container">

		<div class="row">

			<div class="span8 offset2">

				<div id="recent_posts" class="additional_posts">

					<h2 class="align-center"><small>Check Out These Similar Posts</small></h2>

					<div class="row">

					<?php

						$args = array(
							'posts_per_page' => 4,
							'orderby' => 'rand'
						);

						$loop = new WP_query($args);

						while($loop->have_posts()) : $loop->the_post(); ?>

						<div class="span2">

							<div class="related-entry">

								<a href="<?php the_permalink(); ?>">
									<span class="related-title"><?php the_title(); ?></span>
								</a>

							</div>

						</div>

					<?php endwhile; ?>

					</div>

				</div>

			</div>

		</div>

	</div>

</div>

  <?php wp_footer(); ?>

</body>
</html>

<?php }  */ ?>