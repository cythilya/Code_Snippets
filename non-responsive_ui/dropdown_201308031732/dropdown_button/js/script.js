(function($) {
	$.fn.dropdown = function(opts) {
		// default configuration
		var config = $.extend({}, { opt1: null }, opts);
		// main function
		function init(obj) {
            var dDropdown = obj;
            var dDropdownToggle = dDropdown.find('.js-toggle');
            var dDropdownContent = dDropdown.find('.js-content');
            var dDropdownListItem = dDropdown.find('.js-item');
            
            dDropdownToggle.click(function(e){
                e.preventDefault();

                if(dDropdownToggle.hasClass('focus')){
                    dDropdownContent.hide();
                    dDropdownToggle.removeClass('focus');
                }
                else{
                    dDropdownContent.show();
                    dDropdownToggle.addClass('focus');
                }
            });
            
            dDropdownListItem.click(function(e){
                if(dDropdownToggle.hasClass('focus')){
                    dDropdownContent.hide();
                    dDropdownToggle.removeClass('focus'); 
                }
            });            
            
            $(document).click(function(e){
                e.stopPropagation();
                
                var dThisToggle = dDropdown.find('.js-toggle');
                var dThisContent= dDropdown.find('.js-content');
                
                if(!dDropdown.has(e.target).length){
                    dThisContent.hide();
                    dThisToggle.removeClass('focus');
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
		$('.js-dropdown').dropdown();
	});
})(jQuery);