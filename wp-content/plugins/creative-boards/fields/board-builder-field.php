<?


////////////////////////////////////////////////
//////////////////////////////////////////////// BOARD BUILDER FIELD
////////////////////////////////////////////////


add_action( 'add_meta_boxes', 'style_board_add_custom_box' );
add_action( 'save_post', 'style_board_save_postdata' );

function style_board_add_custom_box() 
{ 
	add_meta_box( 'style_board', __( 'Board Builder', 'style_board_textdomain' ), 'style_board_box', 'style_board'); 
	add_meta_box( 'post', __( 'Board Builder', 'style_board_textdomain' ), 'style_board_box', 'post'); 
}

function style_board_box($post) 
{
	wp_nonce_field( plugin_basename( __FILE__ ), 'style_board_noncename' );
	
	wp_register_style( 'board-builder-style', plugins_url('/includes/css/board-builder.css', CBP_FILE) );
	wp_enqueue_style( 'board-builder-style' );

	//////// ITEM INFO
	$item_type = get_post_type_object( 'product' );
	$item_category = get_taxonomy('product-type');
	$item_tags = get_taxonomy('product-tag');

	//////// CHECK FOR PRETTY LINK
	$pretty_link = is_plugin_active('pretty-link/pretty-link.php');
	
	//////// GET POST ID
	$post_ID = $post->ID;

	//////// QUERIES BELOW
	global $wpdb;

	//////// BOARD INFO
	$creative_board = $wpdb->get_row("SELECT * FROM wp_creative_board WHERE post_id = $post_ID");

	$image = $creative_board->image;
	
	?>
  
	<div class="board_builder vertical_split">
	
		<div class="layout">
			<a href="#" class="add_layout_image button"><?php if($image) { ?>Edit<? } else { ?>Add<? } ?> Image</a>
			
			<img src="<?php echo $image; ?>" class="layout_image hidden" />
			<input type="hidden" id="style_board_image" name="style_board_image" value="<?php echo $image; ?>" style="width:98%;" />
			
			<div class="layout_items"></div>
		</div>
		
		<div class="items">
			<ul class="chosen_items">
				
			</ul>
			<div class="newitem">
				<input type="text" name="findornew" class="findornew" value="" placeholder="Find or Create New <?php echo $item_type->labels->singular_name; ?>" />
				<input type="button" name="addnewitem" class="addnewitem button" style="display: none;" value="Add New <?php echo $item_type->labels->singular_name; ?>" />
			</div>
			<ul class="found_items">
				
			</ul>
		</div>
		
		<div class="clear"></div>
	
	</div>
	

	<div tabindex="0" class="supports-drag-drop board-builder-create-item" style="display: none;">
		<div class="media-modal wp-core-ui">
			<a class="media-modal-close" href="#" title="Close"><span class="media-modal-icon"></span></a>
			<div class="media-modal-content">
				<div class="media-frame wp-core-ui hide-menu" id="__wp-uploader-id-0">
					<div class="media-frame-menu">
						<div class="media-menu">
							<a href="#" class="media-menu-item active">Create a New <?php echo $item_type->labels->singular_name; ?></a>
						</div>
					</div>
					<div class="media-frame-title"><h1>Create a New <?php echo $item_type->labels->singular_name; ?></h1></div>
					
					<div class="media-frame-router">
						<div class="media-router">
						</div>
					</div>
				
					<div class="media-frame-content">
						<div class="attachments-browser">
							<div class="media-sidebar">
								<ul>
									<li><a href="#" class="item_grouping selected_grouping">General<span class="arrow"><span class="arrow-inner"></span></span></a></li>
									<li><a href="#" class="item_grouping">URL &amp; Pretty Link</a></li>
									<li><a href="#" class="item_grouping">Image &amp; Colors</a></li>
									<li><a href="#" class="item_grouping">Category &amp; Tags</a></li>
									<li><a href="#" class="item_grouping">Alternate <?php echo $item_type->labels->name; ?></a></li>
								</ul>
							</div>

							<div class="item-section section-general">
								<input type="text" name="title" value="" class="item-title" placeholder="Title" />
								<textarea name="description" placeholder="Description"></textarea>
								<input type="text" name="price" class="price" value="" placeholder="Price" />
							</div>

							<div class="item-section section-url" style="display: none;">
								<input type="text" name="url" value="" placeholder="URL" />
								<?php if($pretty_link) { ?>
								<div class="row-wrap">
									<div class="span50 left">
										<input type="text" name="pretty_slug" value="" placeholder="Pretty Link Slug" />
									</div>
									<div class="span50 right">
										<input type="text" name="pretty_title" value="" placeholder="Pretty Link Title" />
									</div>
								</div>
								<?php } else { ?>
									Go grab <a href="http://blairwilliams.com/pretty-link/">Pretty Link</a> to extend the functionality of this plugin.
								<?php } ?>
							</div>

							<div class="item-section section-image" style="display: none;">
							</div>

							<div class="item-section section-tags" style="display: none;">
								<div class="row-wrap">
									<div class="span50 postbox left">
										<h3><?php echo $item_category->labels->singular_name; ?></h3>
										<div class="inside">
											<div id="taxonomy-product-type" class="categorydiv">
												<ul id="product-type-tabs" class="category-tabs">
													<li class="tabs"><a href="#product-type-all"><?php echo $item_category->labels->all_items; ?></a></li>
													<li class="hide-if-no-js"><a href="#product-type-pop">Most Used</a></li>
												</ul>

												<div id="product-type-pop" class="tabs-panel" style="display: none;">
													<ul id="product-typechecklist-pop" class="categorychecklist form-no-clear">
													</ul>
												</div>

												<div id="product-type-all" class="tabs-panel">
													<input type="hidden" name="tax_input[product-type][]" value="0">			
													<ul id="product-typechecklist" data-wp-lists="list:product-type" class="categorychecklist form-no-clear">
													</ul>
												</div>
												
												<div id="product-type-adder" class="wp-hidden-children">
													<h4>
														<a id="product-type-add-toggle" href="#product-type-add" class="hide-if-no-js">+ <?php echo $item_category->labels->add_new_item; ?></a>
													</h4>
													<p id="product-type-add" class="category-add wp-hidden-child">
														<label class="screen-reader-text" for="newproduct-type"><?php echo $item_category->labels->add_new_item; ?></label>
														<input type="text" name="newproduct-type" id="newproduct-type" class="form-required form-input-tip" value="New Product Type Name" aria-required="true">
														<label class="screen-reader-text" for="newproduct-type_parent"><?php echo $item_category->labels->parent_item_colon; ?></label>
														<select name="newproduct-type_parent" id="newproduct-type_parent" class="postform">
															<option value="-1" selected="selected">— <?php echo $item_category->labels->parent_item; ?> —</option>
														</select>
														<input type="button" id="product-type-add-submit" data-wp-lists="add:product-typechecklist:product-type-add" class="button category-add-submit" value="Add New Product Type">
														<input type="hidden" id="_ajax_nonce-add-product-type" name="_ajax_nonce-add-product-type" value="5a9a4eb0e0"><span id="product-type-ajax-response"></span>
													</p>
												</div>
											</div>
										</div>
									</div>
									<div class="span50 postbox right">
										<h3><?php echo $item_tags->labels->name; ?></h3>
										<div class="inside">
											<div class="tagsdiv" id="product-tag">
												<div class="jaxtag">
												<div class="nojs-tags hide-if-js">
												<p><?php echo $item_tags->labels->add_or_remove_items; ?></p>
												<textarea name="tax_input[product-tag]" rows="3" cols="20" class="the-tags" id="tax-input-product-tag"></textarea></div>
											 		<div class="ajaxtag hide-if-no-js">
													<label class="screen-reader-text" for="new-tag-product-tag"><?php echo $item_tags->labels->name; ?></label>
													<div class="taghint"><?php echo $item_tags->labels->add_new_item; ?></div>
													<p><input type="text" id="new-tag-product-tag" name="newtag[product-tag]" class="newtag form-input-tip" size="16" autocomplete="on" value="">
													<input type="button" class="button tagadd" value="Add"></p>
												</div>
												<p class="howto"><?php echo $item_tags->labels->separate_items_with_commas; ?></p>
													</div>
												<div class="tagchecklist"></div>
											</div>
											<p class="hide-if-no-js"><a href="#titlediv" class="tagcloud-link" id="link-product-tag"><?php echo $item_tags->labels->choose_from_most_used; ?></a></p>
										</div>
									</div>
								</div>

							</div>

							<div class="item-section section-alternates" style="display: none;">
								<div class="alternates">
									<ul class="chosen_alternates">
										
									</ul>
									<input type="text" name="findalternate" class="findalternate" value="" placeholder="Search for Alternate <?php echo $item_type->labels->name; ?>" />
									<ul class="found_alternates">
										
									</ul>
								</div>
							</div>

						</div>
					</div>
					
					<div class="media-frame-toolbar">
						<div class="media-toolbar">
							<div class="media-toolbar-secondary"></div>
							<div class="media-toolbar-primary">
								<a href="#" class="button media-button button-primary button-large media-button-select board-builder-save-item">Submit</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="media-modal-backdrop"></div>
	</div>

	<? /* //////////////////// FOUND ITEMS ////////////////////// */ ?>

	<script type="text/template" id="found-item-template">
		<li><%= post_title %></li>
	</script>

	<?
	
	// wp_register_script( 'board-builder-script',  );
	wp_enqueue_script( 'board-builder-script', plugins_url('/includes/js/board-builder.js', CBP_FILE), array('underscore','backbone') );

	// wp_enqueue_script( 'underscore' );
	// wp_enqueue_script( 'backbone' );
}


function style_board_save_postdata($post_id) 
{
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return;
	if ( !wp_verify_nonce( $_POST['style_board_noncename'], plugin_basename( __FILE__ ) ) ) return;
	if ( !current_user_can( 'edit_page', $post_id ) ) return;
	
	$post_ID = $_POST['post_ID'];

	$image = sanitize_text_field( $_POST['style_board_image'] );

	global $wpdb;

	$creative_board = $wpdb->get_row("SELECT * FROM wp_creative_board WHERE post_id = $post_ID");

	if($creative_board) 
	{

	} else {
		$rows_affected = $wpdb->insert( $wpdb->prefix . "creative_board", array( 'post_id'=> $post_ID, 'image' => $image) );
	}

	// add_post_meta($post_ID, 'style_board_image', $mydata, true) or update_post_meta($post_ID, 'style_board_image', $mydata);
}

?>
