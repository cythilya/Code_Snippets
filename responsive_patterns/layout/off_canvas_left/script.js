(function($) {
	$.fn.offCanvasLeft = function(opts) {
		var config = $.extend({}, {
			opt: ''
		}, opts);
		function init(obj) {
			var dObj = $(obj);
			var dWrap = dObj.find('.wrap');
			var dMenu = dObj.find('.menu'); 
		    var dMenulink = dObj.find('.menuLink');

		    $('body').addClass('on');
		  
			dMenulink.click(function(e) {
				e.preventDefault();
				dMenulink.toggleClass('active');
				dWrap.toggleClass('active');
			});	
        }
		this.each(function() {
			init($(this));
		});
		return this;
	};
	$(function() {
		$('.pattern').offCanvasLeft();
	});
})(jQuery);