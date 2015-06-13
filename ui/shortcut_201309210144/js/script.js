(function($) {
	$.fn.shortcut = function(opts) {
		// default configuration
		var config = $.extend({}, { 
            defaultStatus: open //open or close 
        }, opts);
		// main function
		function init(obj) {
            var dShortcut = $(obj);
            var dToggle = dShortcut.find('.js-toggle');
            var dContent = dShortcut.find('.js-content');
            var first = true;
            
            //init
            if(config.defaultStatus == 'open'){
                if(!dToggle.hasClass('open')){
                    dToggle.addClass('open');
                }
                dContent.slideDown();
            }
            else if(config.defaultStatus == 'close'){
                if(dToggle.hasClass('open')){
                    dToggle.removeClass('open');
                }
                dContent.slideUp();           
            }
            
            //scroll
            $(window).scroll(function(){
                var dWindow = $(this);
                
                if(config.defaultStatus == 'close'){
                    if(first){
                        if((dWindow).scrollTop() > 100){
                            if(!dToggle.hasClass('open')){
                                dToggle.addClass('open');
                            }
                            dContent.slideDown();
                            first = false;
                        }
                    }
                }
            });
            
            //toggle
            dToggle.click(function(e){
                e.preventDefault();
                
                dThisToggle = $(this);
                
                if(dThisToggle.hasClass('open')){
                    dThisToggle.removeClass('open');
                    dContent.slideUp();
                }
                else{
                    dThisToggle.addClass('open');
                    dContent.slideDown();
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
		$('.shortcut').shortcut({defaultStatus : 'open'});
	});
})(jQuery);