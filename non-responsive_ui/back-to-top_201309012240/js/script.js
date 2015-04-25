(function($) {
	$.fn.backToTop = function(opts) {
		var config = $.extend({}, { opt1: null }, opts);
		function init(obj) {
            var dBackToTop = obj;
            
            $(window).scroll(function(){
                var dWindow = $(this);
                if((dWindow).scrollTop() > 100){
                    dBackToTop.fadeIn();
                }
                else{
                    dBackToTop.fadeOut();
                }
            });
            
            dBackToTop.click(function(e){
                e.preventDefault();
                $('html, body').animate({scrollTop:0}, 1000);
            });
        }
		this.each(function() {
			init($(this));
		});
		return this;
	};
	$(function() {
		$('.back-to-top').backToTop();
	});
})(jQuery);