(function($) {
	$.fn.alertMessage = function(opts) {
		// default configuration
		var config = $.extend({}, { 
			'hideAction': 'default' // default, fadeOut 
		}, opts);
		// main function
		function init(obj) {
			var dAlertMessage = $(obj);
			var dClose = dAlertMessage.find('.close');

			dClose.click(function(e){
				e.preventDefault();

				if(config.hideAction == 'fadeOut'){
					dAlertMessage.fadeOut(function(){
						dAlertMessage.remove();
					});
				}
				else{
					dAlertMessage.remove();
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
		$('.js-alert').alertMessage({'hideAction': 'fadeOut'});
	});
})(jQuery);