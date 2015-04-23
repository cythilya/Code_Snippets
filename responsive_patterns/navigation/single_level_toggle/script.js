(function($) {
	$.fn.singleLevelToggle = function(opts) {
		// default configuration
		var config = $.extend({}, {
			opt1: null
		}, opts);
		// main function
		function init(obj) {
            var dNav = $(obj);
            var dMenu = dNav.find('#menu');
            var dMenuLink = dNav.find('.menu-link');

            dNav.addClass('on');

            dMenuLink.click(function(e){
            	var dThisBtn = $(this);
            	dThisBtn.toggleClass('active');
				dMenu.toggleClass('active');
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
		$('.navigation-area').singleLevelToggle();
	});
})(jQuery);