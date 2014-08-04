<?php
/*
Template Name: Product Single
*/
?>

<?php

preg_match('/alexa|bot|crawl(er|ing)|pinterest|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex|^$/i', $_SERVER['HTTP_USER_AGENT'], $matches);

if (!$matches) {

	get_template_part( 'index' );

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

		<div class="product">

	 		<div class="row">

				<div class="span8 offset2">

					<article class="entry">

						<header class="align-center">

							<h1><small><?php the_title(); ?></small></h1>

						</header>

						<div class="align-center">

							<?php

								$attachment_id = get_field('product_image');
								$image_url = wp_get_attachment_image_src($attachment_id);

							?>

							<img src="<?php echo $image_url ?>">

						</div>

						<div class="entry_palette align-center">

							<?php if(get_field('product_color')) { ?>

								<div class="swatch" style="background-color: <?php the_field('product_color') ?>;"></div>

							<?php } ?>

						</div>

						<?php if(get_field('product_description')) { ?>

							<?php the_field('product_description'); ?>

						<?php } ?>

						<div class="tag_list search_categories align-center">

							<span class="section_label">Categories</span>




						</div>

						<div class="align-center">

							<span class="entry_price"><?php the_field('product_price'); ?> (est.)</span>

							<div class="product_btns">

								<?php if(get_field('product_link')) { ?>

								<a href="<?php the_field('product_link'); ?>" class="purchase_btn" target="_blank">Purchase</a>

								<?php } ?>

							</div>

						</div>

					</article>

				</div>

			</div>

			<!-- Alternates -->

			<?php

				$alternateList = get_field('product_alternates');
				$alternateCount = count($alternateList);

				if($alternateList){ ?>

				<h2 class="align-center"><small>Suggested Alternates</small></h2>

				<div class="row">

					<div class="span8<?php if($alternateCount == '1') { echo ' offset5'; } else if($alternateCount == '2') { echo ' offset4'; } else if($alternateCount == '3') { echo ' offset3'; } else { echo ' offset2'; } ?>">

						<div class="product_alternates additional_posts">

							<div class="row">

								<?php foreach($alternateList as $post) { ?>

								<div class="span2">

									<div class="related-entry">

										<a href="<?php the_permalink(); ?>">

											<img src="<?php echo get_stylesheet_directory_uri(); ?>/php/timthumb.php?src=<?php the_field('product_image'); ?>&w=170&h=170&q=85" alt="<?php the_title(); ?>">

											<span class="related-title"><?php the_title(); ?></span>
										</a>

										<span class="entry_price"><?php the_field('product_price'); ?> (est.)</span>

									</div>

								</div>

								<?php } ?>

							</div>

						</div>

					</div>

				</div>

				<?php wp_reset_postdata(); ?>

			<?php } ?>

			<!-- Found in These Boards -->

			<?php

				$boardsList = get_field('product_boards');
				$boardsCount = count($boardsList);

				if($boardsList){ ?>

				<h2 class="align-center"><small>Found in These Boards</small></h2>

				<div class="row">

					<div class="span8<?php if($boardsCount == '1') { echo ' offset5'; } else if($boardsCount == '2') { echo ' offset4'; } else if($boardsCount == '3') { echo ' offset3'; } else { echo ' offset2'; } ?>">

						<div class="product_boards additional_posts">

							<div class="row">

								<?php foreach($boardsList as $post) { ?>

								<div class="span2">

									<div class="related-entry">

										<a href="<?php the_permalink(); ?>">

											<img src="<?php echo get_stylesheet_directory_uri(); ?>/php/timthumb.php?src=<?php echo catch_that_image(); ?>&w=170&h=170&q=85" alt="<?php the_title(); ?>">

											<span class="related-title"><?php the_title(); ?></span>
										</a>

									</div>

								</div>

								<?php } ?>

							</div>

						</div>

					</div>

				</div>

				<?php wp_reset_postdata(); ?>

			<?php } ?>

		</div>

	</div>

</div>

<?php endwhile; ?>

 <?php wp_footer(); ?>

</body>
</html>

<?php } ?>