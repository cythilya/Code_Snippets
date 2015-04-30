(function($) {
	$.fn.slider = function(opts) {
		// default configuration
		var config = $.extend({}, {
			speed: 1000, //移動速度
            waiting: 2000, //等待時間
            quickSpeed: 1000, //利用prev/next button切換slide的速度
            start: -1140, //起始位置(px)
            imageWidth: 560, //每次移動的距離(px)
            controlBtn: true, //是否開啟左右控制button
            autoRun: true //是否自動執行
		}, opts);
		// main function
		function init(obj) {
            var dSlide = $(obj)
            var dSlider = dSlide.find('.js-slider');
            var dFrame = dSlider.find('.js-sliderList');
            var dItemList = dSlider.find('.js-sliderItem');
            var itemArray = [];
            var dPrevBtn = dSlider.find('.js-btnPrev');
            var dNextBtn = dSlider.find('.js-btnNext');
            var stop = false;
            var reset = false;

            function autoRun(){
                setInterval(function(){
                    if(!stop){
                        if(reset){
                            itemArray = [];
                            dItemList = dSlider.find('.js-sliderItem');
                            $.each( dItemList, function( key, value ) {
                                $(value).clone().appendTo(dFrame);
                                itemArray.push(value);
                            });
                            reset = false;
                        }

                        var dCurrent = $(itemArray.shift());
                        dCurrent.clone().appendTo(dFrame);
                        itemArray.push(dCurrent);
                        dFrame.animate({left: '-=' + config.imageWidth + 'px'}, config.speed, function(){
                            dSlider.find('.js-sliderItem').eq(0).remove();
                            dFrame.css('left', config.start + 'px');
                        });
                    }
                }, config.waiting);
            }

            dSlide.on('mouseover mouseout', function(e){
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
                stop = true;
                reset = true;
                var dThisBtn = $(this);
                if(!dThisBtn.hasClass('disabled')){
                    dThisBtn.addClass('disabled');
                    dFrame.animate({left: '+=' + config.imageWidth + 'px'}, config.quickSpeed, function(){
                        var dLastItem = dSlider.find('.js-sliderItem').last();
                        itemArray.push(dLastItem);
                        dLastItem.remove();
                        dLastItem.prependTo(dFrame);  

                        dFrame.css('left', config.start + 'px');
                        dThisBtn.removeClass('disabled');
                    });
                }
            });

            dNextBtn.click(function(e){
                e.preventDefault();
                stop = true;
                reset = true;
                var dThisBtn = $(this);
                if(!dThisBtn.hasClass('disabled')){
                    dThisBtn.addClass('disabled');
                    var dCurrent =  dSlider.find('.js-sliderItem').eq(0);
                    dCurrent.clone().appendTo(dFrame);
                    itemArray.push(dCurrent);
                    dFrame.animate({left: '-=' + config.imageWidth + 'px'}, config.quickSpeed, function(){
                        dSlider.find('.js-sliderItem').eq(0).remove();
                        dFrame.css('left', config.start + 'px');
                        dThisBtn.removeClass('disabled');
                    });                    
                }
            });            

            //init
            //double slide list
            $.each( dItemList, function( key, value ) {
                $(value).clone().appendTo(dFrame);
                itemArray.push(value);
            });

            //reset frame position
            dFrame.css({ 'left': config.start + 'px' });

            //enable auto run
            if(config.autoRun){
                autoRun();    
            }

            //enable control button: prev and next
            if(!config.controlBtn){
                dPrevBtn.hide();
                dNextBtn.hide();
            }
        }
		// initialize every element
		this.each(function() {
			init($(this));
		});
		return this;
	};
	// start
	$(function() {
		$('.js-slide').slider();
	});
})(jQuery);