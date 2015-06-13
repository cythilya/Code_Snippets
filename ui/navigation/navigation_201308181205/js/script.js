(function($) {
	$.fn.nav = function(opts) {
		// default configuration
		var config = $.extend({}, { opt1: null }, opts);
		// main function
		function init(obj) {
            var dNav = obj;
            var dNavItem = dNav.find('.js-nav-item');
            
            dNav.on('click', '.js-nav-item', function(e){
                e.preventDefault();
                
                var dThisItem = $(this);
                dNavItem.removeClass('selected');
                dThisItem.addClass('selected');
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
		$('.js-nav').nav();
	});
})(jQuery);