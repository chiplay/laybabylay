<?php
/*
Template Name: Index
*/

get_header();

?>

<div id="root"></div>

<?php

get_footer();

/* } else { ?>

  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <title>Nursery Decor &amp; Baby Room Ideas &#124; Lay Baby Lay</title>
    <meta property="og:title" content="Lay Baby Lay"/>
    <meta property="og:type" content="website"/>
    <meta property="og:description" content="Nursery Decor &amp; Baby Room Ideas"/>
    <meta property="og:url" content="http://laybabylay.com"/>
    <meta property="og:site_name" content="Lay Baby Lay"/>
    <meta property="fb:app_id" content="179291298758035"/>

    <?php wp_head(); ?>

  </head>

  <header>

    <h1>Welcome to Lay Baby Lay</h1>
    <h2>Nursery Decor &amp; Baby Room Ideas</h2>

  </header>

  <div id="blogContent">

    <?php if (have_posts()) : ?>

      <?php while (have_posts()) : the_post(); //update_post_caches($posts); ?>

      <div class="top"></div>
      <div class="thePost" id="post-<?php the_ID(); ?>">
        <div class="leftSide">
          <div id="postHeader">
            <div id="date">
              <div id="month"><?php the_time('M') ?></div>
              <div id="day"><?php the_time('d') ?></div>
            </div>
            <div id="title">
              <h3><a href="<?php the_permalink() ?>"><?php the_title(); ?></a></h3>
              <span class="topicsTitle"><span>THEMES</span></span>
              <span class="topics"><?php the_tags('','&nbsp;&nbsp;|&nbsp;&nbsp;'); ?></span>
            </div>
          </div>
          <div class="clear"></div>
          <div class="entry">
            <?php the_content('Read more...'); ?>
          </div>
          <div class="clear"></div>
          <div class="commentBreak"></div>
          <div class="commentNumber"><?php comments_popup_link('0 comments', '1 comment', '% comments') ?></div>
        </div>
        <div class="rightSide">
          <div id="links">
            <span class="linksTitle"><span>Links</span></span>
            <?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar("Post-Sidebar") ) : ?>
            <?php endif; ?>
          </div>
          <div id="sidebarComments">
            <span class="commentsTitle"><span>COMMENTS</span></span>
            <?php $comment_array = array_reverse(get_approved_comments($wp_query->post->ID)); $count = 1; if ($comment_array) { foreach($comment_array as $comment) { if ($count++ <= 6) { ?>
            <?php if ($count % 2) { ?>
              <div class="bubbleTop2"></div>
              <div class="bubbleMid2">
            <?php } else { ?>
              <div class="bubbleTop"></div>
              <div class="bubbleMid">
            <?php } ?>
              <p class="commentExcerpt"><span class="commentAuthor"><?php comment_author(); ?></span>"<?php comment_excerpt(); ?>"</p>
            </div>
            <?php if ($count % 2) { ?><div class="bubbleBottomAlt2"></div><?php } else { ?><div class="bubbleBottom"></div><?php } ?>
            <?php } } } ?>
            <span class="commentLink"><?php comments_popup_link('0 comments', '1 comment', '% comments') ?></span>
            <div class="commentAdd"><?php comments_popup_link( __( 'Add a Comment', 'twentyten' ), __( 'Add a Comment', 'twentyten' ), __( 'Add a Comment', 'twentyten' ) ); ?></div>
          </div>

          <div class="clear"></div>
        </div>
      </div>
      <div class="bottom"></div>

      <?php endwhile;  ?>

      <div class="navigation">
        <div class="navleft"><?php next_posts_link('Older Entries') ?></div>
        <div class="navright"><?php previous_posts_link('Newer Entries') ?></div>
      </div>

    <?php else : ?>

      <h2 class="center">Not Found</h2>
      <p class="center">Sorry, but you are looking for something that isn't here.</p>
      <?php get_search_form(); ?>

    <?php endif; ?>

  </div>

  <?php wp_footer(); ?>

</body>
</html>

<?php }  */
