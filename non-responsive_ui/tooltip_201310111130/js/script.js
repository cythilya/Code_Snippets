(function($) {
	$.fn.tooltip = function(opts) {
		// default configuration
		var config = $.extend({}, { 
			interval: 400 
		}, opts);
		// main function
		function init(obj) {
			var tooltipArea = $(obj);//使用tooltip的範圍
			var title = "";//暫存title

			tooltipArea.on('mouseenter mouseout', '[title]', function(e){
				var lock = false;
				var timerSetID;
				var timerClearID;

				var thisEle = $(this);
				var HTML = "";
				HTML += [
					'<div class="tooltip">',
					'	<div class="arrow top"></div>',
					'	<div class="content">' + thisEle.attr('title') + '</div>',
					'</div>'			
				].join('');	

				if(e.type == 'mouseenter'){
					if(!lock){
						lock = true;
						timerSetID = setInterval(function(){
							clearInterval(timerSetID);
						}, config.interval);		
					}
					title = thisEle.attr('title');
					thisEle.attr('title', '');
					thisEle.attr('data', title);
					thisEle.after(HTML);
					thisEle.next().css('left', thisEle.offset().left + 10 + 'px');
					thisEle.next().css('top', thisEle.offset().top + 20 +'px');
					thisEle.next().show();							
				}
				else{ //e.type == 'mouseout'
					thisEle.attr('title', thisEle.attr('data'));
					timerClearID = setInterval(function(){
						lock = false;
						clearInterval(timerClearID);
						thisEle.next().remove();
					}, 400);	
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
		$(document).tooltip();
	});
})(jQuery);