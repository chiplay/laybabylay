<?php
/*
Template Name: Search
*/
?>

<?php

get_header();

preg_match('/alexa|bot|crawl(er|ing)|pinterest|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex|^$/i', $_SERVER['HTTP_USER_AGENT'], $matches);

if (!$matches) { ?>

  <div id="root"></div>

<?php

} else {

wp_head();

?>
<div id="content" class="narrowcolumn" role="main">

<?php

global $query_string;

$_SERVER['REQUEST_URI_PATH'] = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$segments = explode('/', $_SERVER['REQUEST_URI_PATH']);

$search_query = array();

foreach($segments as $key => $string) {
  $query_split = explode("=", $string);
  if ($query_split[1]) {
    $search_query['s'] = urldecode($query_split[1]);
  }
} // foreach
$search_query['posts_per_page'] = '20';

$search = new WP_Query($search_query);

if ( $search->have_posts()) : ?>

  <h2 class="pagetitle">Search Results</h2>

  <div class="navigation">
    <div class="alignleft"><?php next_posts_link('&laquo; Older Entries') ?></div>
    <div class="alignright"><?php previous_posts_link('Newer Entries &raquo;') ?></div>
  </div>


  <?php while ( $search->have_posts()) : $search->the_post(); ?>

    <div <?php post_class() ?>>
      <h3 id="post-<?php the_ID(); ?>"><a href="<?php the_permalink() ?>" rel="bookmark" title="Permanent Link to <?php the_title_attribute(); ?>"><?php the_title(); ?></a></h3>
      <small><?php the_time('l, F jS, Y') ?></small>

      <p class="postmetadata"><?php the_tags('Tags: ', ', ', '<br />'); ?> Posted in <?php the_category(', ') ?> | <?php edit_post_link('Edit', '', ' | '); ?>  <?php comments_popup_link('No Comments &#187;', '1 Comment &#187;', '% Comments &#187;'); ?></p>
    </div>

  <?php endwhile; ?>

  <div class="navigation">
    <div class="alignleft"><?php next_posts_link('&laquo; Older Entries') ?></div>
    <div class="alignright"><?php previous_posts_link('Newer Entries &raquo;') ?></div>
  </div>

<?php else : ?>

  <h2 class="center">No posts found. Try a different search?</h2>
  <?php get_search_form(); ?>

<?php endif; ?>

</div>

<?php

wp_footer();

} ?>

<?php get_footer(); ?>
