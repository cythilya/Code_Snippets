(function($) {
	$.fn.loading = function(opts) {
		// default configuration
		var config = $.extend({}, { opt1: null }, opts);
		// main function
		function init(obj) {
			var dLoading = $(obj);
			var dLoadingImg = dLoading.find('.js-loading-img');
			var dMsg = dLoading.find('.js-msg');
			var dSubmit = dLoading.find('.js-submit');

			var startLoading = function(){
				dLoadingImg.show();
			};
			var endLoading = function(){
				dLoadingImg.hide();
				dMsg.show();
			};

			dSubmit.click(function(e){
				e.preventDefault();

				var dThisButton = $(this);

				if(!dThisButton.hasClass('disabled')){
					dThisButton.addClass('disabled');
					dThisButton.hide();
					startLoading();

					$.ajax({
						url: '',
						type: 'post',
						data: {},
						dataType: 'json',
						error: function (xhr) {
							//dMsg.text('Error! Please try again later.');
						},
						success: function (response) {},
						complete: function(){
							/*
							dThisButton.removeClass('disabled');
							endLoading();
							*/

							//for demo
							var timer = setInterval(function(){
								dThisButton.removeClass('disabled');
								endLoading();
							}, 3000);
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
		$('.js-loading').loading();
	});
})(jQuery);