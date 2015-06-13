(function($) {
	$.fn.offCanvasTop = function(opts) {
		var config = $.extend({}, {
			expandHeight: 120,
			regularHeight: 50
		}, opts);
		function init(obj) {
			dObj = $(obj);
			var dContainer = dObj.find('.offcanvas-top');
			var triggerHtml = '<a href="#" class="trigger">More +</a>';
			dContainer.append(triggerHtml);

			var triggerBtn = dContainer.find('.trigger');
			triggerBtn.click(function(e){
				e.preventDefault();

				if(!dContainer.hasClass('active')){
					dContainer.addClass('active');
					dContainer.height(config.expandHeight);
					triggerBtn.text('Hide -');
				}
				else{
					dContainer.removeClass('active');
					dContainer.height(config.regularHeight);
					triggerBtn.text('More +');
				}
			});
        }
		this.each(function() {
			init($(this));
		});
		return this;
	};
	$(function() {
		$('.pattern').offCanvasTop();
	});
})(jQuery);
