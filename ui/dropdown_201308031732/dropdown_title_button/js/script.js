(function($) {
	$.fn.dropdown = function(opts) {
		// default configuration
		var config = $.extend({}, {
			opt1: null
		}, opts);
		// main function
		function init(obj) {
            var dDropdown = obj;
            var dDropdownBox = dDropdown.find('.dropdown-box');
            var dDropdownContent = dDropdown.find('.dropdown-content');
            var dDropdownListItem = dDropdownContent.find('.dropdown-menu-item');
            var dToggle = dDropdownBox.find('.dropdown-toggle');
            
            dToggle.click(function(e){
                e.preventDefault();
                if(!dToggle.hasClass('focus')){
                    dToggle.addClass('focus');
                    dDropdownContent.show();
                }
                else{
                    dToggle.removeClass('focus');
                    dDropdownContent.hide();
                }
            });
            
            dDropdownListItem.click(function(){
                if(dToggle.hasClass('focus')){
                    dToggle.removeClass('focus');
                    dDropdownContent.hide();
                }
            });
            
            dDropdownContent.click(function(){
                if(dThisToggle.hasClass('focus')){
                    dThisToggle.removeClass('focus');
                    dThisDropDownContent.hide();                
                }
            });
            
            $(document).click(function(e) {
                e.stopPropagation();

                var dThisToggle = dDropdownBox.find('.dropdown-toggle');
                var dThisDropDownContent = dDropdown.find('.dropdown-content');

                if (!dDropdown.has(e.target).length) {
                    if(dThisToggle.hasClass('focus')){
                        dThisToggle.removeClass('focus');
                        dThisDropDownContent.hide();
                    }
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
		$('.dropdown').dropdown();
	});
})(jQuery);