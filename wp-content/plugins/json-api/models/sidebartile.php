<?php

class JSON_API_Sidebar_Tile {

  var $index;        // Integer
  var $image;        // Image
  var $link;         // String
  var $link_type;    // String
  var $title;        // String

  function JSON_API_Sidebar_Tile($wp_sidebar_tile = null, $index = 0) {
    if ($wp_sidebar_tile) {
      $this->import_wp_object($wp_sidebar_tile, $index);
    }
  }

  function import_wp_object($wp_sidebar_tile, $index) {
    $this->index = (int) $index;
    $this->title = $wp_sidebar_tile['title'];
    $this->link = $wp_sidebar_tile['link'];
    $this->link_type = $wp_sidebar_tile['link_type'];
    $this->image = $wp_sidebar_tile['image'];
  }

}

?>
