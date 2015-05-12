(function($) {
	$.fn.scrollToComment = function(opts) {
		// default configuration
		var config = $.extend({}, {
			opt1: null
		}, opts);
		// main function
		function init(obj) {
	        var dObj = $(obj);
	        var dNavMenu = dObj.find('.scrollToComment');

	        //scroll down to content block
	        dNavMenu.click(function(e){
	            e.preventDefault();

	            var clickTraget = $(this).attr('href');
	            var targetObj = dObj.find(clickTraget);
				var objOffset = $(targetObj).offset();
	            var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
	            $body.animate({
	                scrollTop: objOffset.top
	            }, 1000 );
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
		$('.innerContent').scrollToComment();
	});
})(jQuery);
