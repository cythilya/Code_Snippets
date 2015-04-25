(function($) {
	$.fn.imageUploader = function(opts) {
		// default configuration
		var config = $.extend({}, { opt1: null }, opts);
		// main function
		function init(obj) {
			var dUploader = $(obj);
			var dHeader = dUploader.find('.header');
			var dPreview = dUploader.find('.preview');
			var dBtnUpload = dUploader.find('.btn-upload');
			var dBtnConfirm = dUploader.find('.btn-confirm');
			var dFileUpload = dUploader.find('.file-upload');
			var dMessage = dUploader.find('.message');
			var dLoading = dUploader.find('.loading');
			var HTML = "";

			var startLoading = function(){
				dBtnUpload.addClass('disabled');
				dLoading.show();
			};

			var endLoading = function(){
				dBtnUpload.removeClass('disabled');
				dLoading.hide();

				dPreview.append(HTML);
				dPreview.slideDown('slow');

				dBtnUpload.hide();
				dBtnConfirm.show();

				dHeader.html('If this is the right file, click "Confirm". <br />Else click "Remove" to remove it.');
			};			

			dBtnUpload.click(function(e){
				e.preventDefault();
				if(!dBtnUpload.hasClass('disabled')){
					dFileUpload.click();
				}
			});

			dFileUpload.change(function(){
				$.ajax({
					url: '',
					type: 'post',
					data: {},
					dataType: 'json',
					beforeSend: function(){
						startLoading();
					},
					error: function (xhr) {
						//alert('Error! Please try again later.')
					},
					success: function (response) {},
					complete: function(){
						HTML = "";
						HTML += [
							'<div class="item clearfix">',
							'	<div class="thumbnail">',
							'		<img src="http://dummyimage.com/100x80/5cb85c/fff" title="File Name" alt="File Name" />',
							'	</div>',
							'	<div class="info">',
							'		<div class="name">File Name: dummy.png</div>',
							'		<div class="size">File Size: 1.2MB</div>',
							'		<a href="#" class="btn btn-remove">Remove</a>',
							'	</div>',	
							'</div>'
						].join('');

						//endLoading();

						//for demo: upload a file for 2 sec
						setTimeout(function(){
							endLoading();
						}, 2000);
					}
				});						
			});
			
			dPreview.on('click', '.btn-remove', function(e){
				e.preventDefault();

				var dThisRemoveButton = $(this);
				dThisRemoveButton.parents('.item').remove();
				dFileUpload.val('');

				dHeader.text('Click "Select File to Upload" to upload image.');

				dBtnUpload.show();
				dBtnConfirm.hide();				
			});

			dBtnConfirm.click(function(e){
				e.preventDefault();

				if(!dBtnConfirm.hasClass('disabled')){
					dBtnConfirm.addClass('disabled');
					dBtnConfirm.text('Confirming, Please wait...');


					$.ajax({
						url: '',
						type: 'post',
						data: {},
						dataType: 'json',
						error: function (xhr) {
							//alert('Error! Please try again later.')
						},
						success: function (response) {},
						complete: function(){
							/*
							dBtnConfirm.removeClass('disabled');
							dBtnConfirm.hide();
							dUploader.find('.btn-remove').hide();
							dFileUpload.hide();
							dMessage.show();
							dHeader.text('File Upload Success!');
							*/

							//for demo: confirm a file for 2 sec
							setTimeout(function(){
								dBtnConfirm.removeClass('disabled');
								dBtnConfirm.hide();
								dUploader.find('.btn-remove').hide();
								dFileUpload.hide();
								dMessage.show();		
								dHeader.text('File Upload Success!');				
							}, 2000);						
						}
					});
				}
			});

        }
		// initialize every element
		this.each(function() {
			init($(this));
		});
		return this;
	};
	// start
	$(function() {
		$('.js-image-uploader').imageUploader();
	});
})(jQuery);