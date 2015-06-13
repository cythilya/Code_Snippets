(function($) {
	$.fn.tabs = function(opts) {
		// default configuration
		var config = $.extend({}, { opt1: null }, opts);
		// main function
		function init(obj) {
            var dTab = obj;
            var dTabNav = dTab.find('.js-tab-nav');
            var dTabPanel = dTab.find('.js-tab-panel');
            
            dTab.on('click', '.js-tab-nav', function(e){
                e.preventDefault();
                var dThisTabNav = $(this);
                var target = dThisTabNav.find('a').attr('href');
                target = target.split('#');
                var dThisTabPanel = dThisTabNav.parents('.js-tabs').find('#'+target[1]);
                dTabNav.removeClass('selected');
                dThisTabNav.addClass('selected');
                dTabPanel.hide();
                dThisTabPanel.show();
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
		$('.js-tabs').tabs();
	});
})(jQuery);