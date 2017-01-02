<?php

function post_data($posttype)
{
	global $wpdb;

	$data = array();

	$exclude = isset($_POST['exclude']) ? implode(',',$_POST['exclude']) : 0;
	$search = isset($_POST['search']) ? $_POST['search'] : '';

	$data_total = $wpdb->get_results("SELECT ID FROM wp_posts WHERE post_type = '$posttype' AND post_status = 'publish'");
	$data_items = $wpdb->get_results("SELECT * FROM wp_posts WHERE post_type = '$posttype' AND post_status = 'publish' AND ID NOT IN ($exclude) AND post_title LIKE '%$search%' LIMIT 20");

	$data['data'] = $data_items;
	$data['total'] = count($data_total);

	return json_encode($data);
}

?>
