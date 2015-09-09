<?php
/*
Template Name: Single Post
*/
?>

<?php get_header(); ?>

<?php while(have_posts()) : the_post(); ?>

<div id="main">

  <article class="post">

    <div class="container">

	<header class="align-center">

	<h1><small><?php the_title(); ?></small></h1>

	<span class="post_date"><?php the_time('l, F j, Y'); ?></span>

	</header>

      <div class="content">

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

      </div>

      <?php endwhile; ?>

      <!-- 4 Random Posts -->

      <div class="related-posts-region">

        <h2 class="align-center"><small>Check Out These Similar Posts</small></h2>

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

	</article>

</div>

<?php get_footer(); ?>
