<?


////////////////////////////////////////////////
//////////////////////////////////////////////// PRODUCT INFO FIELD
////////////////////////////////////////////////


add_action( 'add_meta_boxes', 'product_add_custom_box' );
add_action( 'save_post', 'product_save_postdata' );

function product_add_custom_box() 
{ 
	add_meta_box( 'product', __( 'Product Data', 'product_textdomain' ), 'product_box', 'product'); 
}

function product_box($post) 
{
  wp_nonce_field( plugin_basename( __FILE__ ), 'product_noncename' );

  $value = get_post_meta( $post->ID, $key = 'product_value', $single = true );
  echo '<input type="text" id="style_board" name="product_field" value="'.$value.'" style="width:98%;" />';
}


function product_save_postdata($post_id) 
{
  if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return;
  if ( !wp_verify_nonce( $_POST['product_noncename'], plugin_basename( __FILE__ ) ) ) return;
  if ( !current_user_can( 'edit_page', $post_id ) ) return;
  
  $post_ID = $_POST['post_ID'];
  $mydata = sanitize_text_field( $_POST['product_field'] );
  add_post_meta($post_ID, 'product_value', $mydata, true) or update_post_meta($post_ID, 'product_value', $mydata);
}


?>
