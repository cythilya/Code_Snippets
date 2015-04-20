(function($) {
	$.fn.offCanvasFullScreenOverlay = function(opts) {
		var config = $.extend({}, {
			opt: ''
		}, opts);
		function init(obj) {
			var dObj = $(obj);
			var dMenuTrigger = dObj.find('.menu-trigger');
			var dMenuCloseBtn = dObj.find('.menu-close');
			var dNav = dObj.find('.navigation');

			dObj.addClass('on');

			dMenuTrigger.click(function(e){
			    e.preventDefault();
			    dNav.toggleClass('off-canvas-hide off-canvas-show');
			});

			dMenuCloseBtn.click(function(e){
			    dNav.toggleClass('off-canvas-hide off-canvas-show');
			});

			$(window).resize(function() {
				if($(window).width() > 640) {
			    	dNav.removeClass('off-canvas-show');
			  	} else {
			    	dNav.addClass('off-canvas-hide');
			  	}
			});
        }
		this.each(function() {
			init($(this));
		});
		return this;
	};
	$(function() {
		$('.header').offCanvasFullScreenOverlay();
	});
})(jQuery);
