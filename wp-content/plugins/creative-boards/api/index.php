<?php

require('../../../../wp-blog-header.php');

header("Status Code: 200 OK");
header("HTTP/1.1 200 OK");
header('Content-type: application/json');

$path = str_replace('/wp-content/plugins/creative-boards/api/','',$_SERVER['REQUEST_URI']);
$segments = explode('/', $path);

switch ($segments[count($segments)-1])
{
	case 'item_data.json' :
		require('data.php');
		echo post_data('product');
	break;
}

?>
