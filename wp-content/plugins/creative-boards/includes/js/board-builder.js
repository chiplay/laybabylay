var frame = new Object();
var li_url, li_width, li_height;
var file_frame;

jQuery(function(){
	
	li_url = jQuery('#style_board_image').val();
	jQuery("<img/>").attr("src", li_url).load(function() { li_width = this.width; li_height = this.height; });

	jQuery('.board_builder .layout').each(function(){
		var thisWidth = jQuery(this).width();
		jQuery(this).css({'minHeight':thisWidth+'px'});
		jQuery('img',this).width(thisWidth-40).removeClass('hidden');
	});
	
	jQuery(window).resize(function() {
		
		jQuery('.board_builder .layout').each(function(){
			var thisWidth = jQuery(this).width();
			jQuery(this).css({'minHeight':(thisWidth/2*3)+'px'});
			jQuery('img',this).width(thisWidth-40);
		});
	});
		
	jQuery('.add_layout_image').live('click', function(event){
		event.preventDefault();
		if ( file_frame ) { file_frame.open(); return; }
		
		file_frame = wp.media.frames.file_frame = wp.media({
			title: 'Choose a Style Board Image',
			button: {
			text: jQuery( this ).data( 'uploader_button_text' ),
			},
			multiple: false
		});
		
		file_frame.on( 'select', function() {
			layout_image_attachment = file_frame.state().get('selection').first().toJSON();
		
			jQuery('.add_layout_image').text('Edit Image');
			jQuery('.layout_image').attr('src',layout_image_attachment.url);
			jQuery('#style_board_image').val(layout_image_attachment.url);
		});
		
		file_frame.open();
	});
	
	jQuery('.findornew').live('keyup', function(){
		frame.search_title = jQuery(this).val();

		jQuery('.board-builder-create-item .item-title').val(frame.search_title);

		if(frame.search_title.length == 0)
		{
			jQuery(this).val(' ');
			jQuery(this).val('');
		}

		if(frame.search_title.length > 3)
		{
			jQuery(this).css('paddingRight','150px');
			jQuery('.addnewitem').show();

			if(!frame.loading)
			{
				frame.loading = true;
				frame.all_items.fetch();
			}
			
		} else {
			jQuery(this).css('paddingRight','20px');
			jQuery('.addnewitem').hide();
		}

	});

	jQuery('.addnewitem').live('click', function(){
		create_item();
		return false;
	});

	jQuery('#post').after(jQuery('.board-builder-create-item'));
	jQuery('.item-section').wrapAll('<form id="itemform" action="/wp-content/plugins/creative-boards/new-item.php" method="post" />');

	frame.foundBlock = jQuery('.found_items');
});


////////////////////////////////////////////////
//////////////////////////////////////////////// NEW ITEM
////////////////////////////////////////////////


function create_item()
{
	jQuery('.board-builder-create-item').show();

	jQuery('.board-builder-save-item').live('click', function(){

		return false;
	});

	jQuery('.item_grouping').live('click', function(){
		var index = jQuery('.item_grouping').index(jQuery(this));
		jQuery(this).append(jQuery('.item_grouping .arrow'));
		jQuery('.item_grouping').removeClass('selected_grouping');
		jQuery(this).addClass('selected_grouping');

		jQuery('.item-section').hide();
		jQuery('.item-section:eq('+index+')').show();
		return false;
	});

	jQuery('.board-builder-create-item .media-modal-close').live('click',function(){
		jQuery('.board-builder-create-item').hide();
		frame.foundBlock = jQuery('.found_items');
		return false;
	});

	jQuery('.findalternate').live('keyup', function(){
		frame.search_title = jQuery(this).val();

		if(frame.search_title.length == 0)
		{
			jQuery(this).val(' ');
			jQuery(this).val('');
		}

		if(frame.search_title.length > 3)
		{
			if(!frame.loading)
			{
				frame.loading = true;
				frame.all_items.fetch();
			}
		}

	});

	frame.foundBlock = jQuery('.found_alternates');
}


////////////////////////////////////////////////
//////////////////////////////////////////////// ITEMS COLLECTION
////////////////////////////////////////////////


frame.item_data = Backbone.Model.extend();

frame.item_collection = Backbone.Collection.extend({
	model: frame.item_data,
	parse: function(response) { return response.data; },
	url: function(){ return '/wp-content/plugins/creative-boards/api/item_data.json'; }
});

frame.all_items = new frame.item_collection;

frame.all_items.bind('reset',function(e){
	frame.loading = false;
	show_found_items();
});

function show_found_items()
{
	frame.foundBlock.empty();
	var item_count = 1;
	var filtered_items = frame.all_items.filter(function(item_data){
		var itemJSON = item_data.toJSON();
		if(item_count > 10) return false;

		var item_index = itemJSON.post_title.toLowerCase().indexOf(frame.search_title.toLowerCase());
		if(item_index > -1)
		{
			item_count++;
			return item_index + 10000 + itemJSON.post_title;
		}

		return false;
	});

	template = _.template(jQuery('#found-item-template').html());
	_.each(filtered_items,function(itemJSON){
		frame.foundBlock.append(template(itemJSON.toJSON()));
	});
}


////////////////////////////////////////////////
//////////////////////////////////////////////// UPLOAD MEDIA
////////////////////////////////////////////////


function create_addnew()
{
	var wp_media_post_id = wp.media.model.settings.post.id;
	var set_to_post_id = 10;
	
	jQuery('.upload_image_button').live('click', function( event ){
	
		event.preventDefault();
		
		// If the media frame already exists, reopen it.
		if ( file_frame ) {
			// Set the post ID to what we want
			file_frame.uploader.uploader.param( 'post_id', set_to_post_id );
			// Open frame
			file_frame.open();
			return;
		} else {
			// Set the wp.media post id so the uploader grabs the ID we want when initialised
			wp.media.model.settings.post.id = set_to_post_id;
		}
		
		// Create the media frame.
		file_frame = wp.media.frames.file_frame = wp.media({
			title: jQuery( this ).data( 'uploader_title' ),
			button: {
			text: jQuery( this ).data( 'uploader_button_text' ),
			},
			multiple: false  // Set to true to allow multiple files to be selected
		});
		
		// When an image is selected, run a callback.
		file_frame.on( 'select', function() {
			// We set multiple to false so only get one image from the uploader
			attachment = file_frame.state().get('selection').first().toJSON();
			
			// Do something with attachment.id and/or attachment.url here
			
			// Restore the main post ID
			wp.media.model.settings.post.id = wp_media_post_id;
		});
		
		// Finally, open the modal
		file_frame.open();
	});
	
	// Restore the main ID when the add media button is pressed
	jQuery('a.add_media').on('click', function() {
		wp.media.model.settings.post.id = wp_media_post_id;
	});

}
