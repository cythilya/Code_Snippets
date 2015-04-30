(function($) {
	$.fn.slider = function(opts) {
		// default configuration
		var config = $.extend({}, {
			speed: 1000, //移動速度
            waiting: 2000, //等待時間
            start: -1140, //起始位置
            distance: 560, //每次移動的距離(px)
            pagination: false, //是否開啟pagination
            controlBtn: true, //是否開啟左右控制button
            autoRun: true,
            quickSpeed: 400
		}, opts);
		// main function
		function init(obj) {
            var dHero = $(obj)
            var dSlider = dHero.find('.slider');
            var dFrame = dSlider.find('.sliderList');
            var dItemList = dSlider.find('.sliderItem');
            var itemArray = [];
            var dPrevBtn = dSlider.find('.btnPrev');
            var dNextBtn = dSlider.find('.btnNext');
            var dMask = dHero.find('.mask');
            var stop = false;

            function autoRun(){
                dFrame.css({ 'left': config.start + 'px' });

                //enable auto run
                setInterval(function(){
                    if(config.autoRun && !stop){
                        var dCurrent = $(itemArray.shift());
                        dCurrent.clone().appendTo(dFrame);
                        itemArray.push(dCurrent);
                        dFrame.animate({left: '-=' + config.distance + 'px'}, config.speed, function(){
                            dSlider.find('.sliderItem').eq(0).remove();
                            dFrame.css('left', config.start + 'px');
                        });
                    }
                }, config.waiting);
            }

            dMask.on('mouseover mouseout', function(e){
                var dThisWrapper = $(this);
                if(e.type == 'mouseover') {
                    stop = true;
                } 
                else{ //mouseout
                    stop = false;
                }
            });            

            dPrevBtn.click(function(e){
                e.preventDefault();
                var dThisBtn = $(this);
                if(!dThisBtn.hasClass('disabled')){
                    dThisBtn.addClass('disabled');
                    stop = true;
                    var dCurrent =  dSlider.find('.sliderItem').eq(0);
                    dCurrent.clone().appendTo(dFrame);
                    itemArray.push(dCurrent);
                    dFrame.animate({left: '-=' + config.distance + 'px'}, config.quickSpeed, function(){
                        dSlider.find('.sliderItem').eq(0).remove();
                        dFrame.css('left', config.start + 'px');
                        dThisBtn.removeClass('disabled');
                    });                    
                }
            });

            dNextBtn.click(function(e){
                e.preventDefault();
                var dThisBtn = $(this);
                if(!dThisBtn.hasClass('disabled')){
                    dThisBtn.addClass('disabled');
                    stop = true;

                    dFrame.animate({left: '+=' + config.distance + 'px'}, config.quickSpeed, function(){
                        var dLastItem = dSlider.find('.sliderItem').last();
                        itemArray.push(dLastItem);
                        dLastItem.remove();
                        dLastItem.prependTo(dFrame);  

                        dFrame.css('left', config.start + 'px');
                        dThisBtn.removeClass('disabled');
                    });
                }
            });            

            //init
            $.each( dItemList, function( key, value ) {
                $(value).clone().appendTo(dFrame);
                itemArray.push(value);
            });

            autoRun();

        }
		// initialize every element
		this.each(function() {
			init($(this));
		});
		return this;
	};
	// start
	$(function() {
		$('.hero').slider();
	});
})(jQuery);