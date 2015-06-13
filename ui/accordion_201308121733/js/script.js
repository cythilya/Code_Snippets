(function($) {
	$.fn.dropdown = function(opts) {
		// default configuration
		var config = $.extend({}, { 
            'type': null //showType:slide,easeOutBounce,不填則為預設值show/hide
        }, opts);
		// main function
		function init(obj) {
            var dAccordion = obj;
            var dHeader = dAccordion.find('.js-header');
            
            dHeader.click(function(e){
                e.preventDefault();
                dThisHeader = $(this);
                
                var listShow = function(){
                    if(config.type == 'slide'){
                         dThisHeader.next('ul').slideDown('slow');
                    }
                    else if(config.type == 'easeOutBounce'){
                         dThisHeader.next('ul').animate({height: "show", width: '260px'}, 1500, "easeOutBounce");
                    }
                    else{
                        dThisHeader.next('ul').show();
                    }
                };
                var listHide = function(){
                    if(config.type == 'slide'){
                         dThisHeader.next('ul').slideUp('slow');
                    }
                    else if(config.type == 'easeOutBounce'){
                        dThisHeader.next('ul').animate({height: "hide", width: '260px'}, 1500, "easeOutBounce");
                    }
                    else{
                        dThisHeader.next('ul').hide();
                    }
                };
                
                if(dThisHeader.next('ul').length){
                    if(!dThisHeader.next('ul').hasClass('on')){
                        dThisHeader.next('ul').addClass('on');
                        listShow();
                    }
                    else{
                        dThisHeader.next('ul').removeClass('on');
                        listHide();
                    }
                }
                else{
                    alert('no sub items');
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
		$('.js-accordion').dropdown({'type':'easeOutBounce'});
	});
})(jQuery);