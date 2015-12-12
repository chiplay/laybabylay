<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="content-type" content="text/html; charset=utf-8">

<?php while (have_posts()) : the_post(); ?>

  <title><?php wp_title('&nbsp;&#124;&nbsp;', true, 'right'); ?> <?php bloginfo('name'); ?></title>
  <meta property="og:title" content="<?php echo trim(wp_title('', false)); ?>"/>
  <meta property="og:type" content="article"/>
  <meta property="og:description" content="<?php echo get_the_excerpt(); ?>"/>
<?php
$postid = get_the_ID();
$images = get_children(array('post_parent' => $postid, 'post_type' => 'attachment', 'numberposts' => -1, 'orderby' => 'menu_order', 'post_mime_type' => 'image'));
foreach ($images as $image) {
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
if ($categories) {
  foreach($categories as $category) {
?>
  <meta property="article:section" content="<?php echo $category->cat_name ?>"/>
<?php
  }
}
?>
<?php
$posttags = get_the_tags();
  if ($posttags) {
    foreach($posttags as $tag) { ?>
    <meta property="article:tag" content="<?php echo $tag->name ?>"/>
    <?php }
  }
?>

<?php endwhile; ?>

  <link rel="stylesheet" href="<?= get_template_directory_uri(); ?>/dist/app.css">

</head>

<body>
