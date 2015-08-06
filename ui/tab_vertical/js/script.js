(function($) {
	$.fn.tabsVertical = function(opts) {
		// default configuration
		var config = $.extend({}, { 
			activeTabNumber: 0 
		}, opts);
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
			
			//init
			dTabNav.eq(config.activeTabNumber).click();
        }
		// initialize every element
		this.each(function() {
			init($(this));
		});
		return this;
	};
	// start
	$(function() {
		$('.js-tabs').tabsVertical();
	});
})(jQuery);