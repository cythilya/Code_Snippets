(function($) {
	$.fn.carousel = function(opts) {
		// default configuration
		var config = $.extend({}, {
			rotateTime: 2000,
			senceWidth: 960 //每次移動的距離
		}, opts);
		// main function
		function init(obj) {
        var dCarousele = $(obj);
        var dBanner = dCarousele.find('.jsBannerGroup');
        var dList = dBanner.find('.jsBannerList');
		
        var imgGroup = dList.find('.jsBannerItem');
		var dPagination = dCarousele.find('.jsBtnGroup');
        var pageCount = Math.floor(imgGroup.length/4);
        var dBtn = {};
        var queue = new Array();
        var queueIndex = 0;
        var btnTigger = false;
        var rotatorTime = config.rotateTime;
        var senceWidth = config.senceWidth;

        /*init*/
        imgGroup.each(function(index,item){
            $(this).addClass('jsItem'+index+'');
            //dPagination.append('<li rel="'+index+'" class="jsItem'+index+'"><a href="#" title=""><i class="icon"></i></a></li>');
        });

        for (var i = 0; i < pageCount; i++) {
            dPagination.append('<li rel="'+i+'" class="pagerItem page'+i+'" data-count="'+i+'"><a class="link" href="#" title=""><i class="icon"></i></a></li>');
        };

        dBtn = dPagination.find('li');

        dList.find('.jsBannerItem:first-child').show();
        dPagination.find('li:first-child').addClass('on');
        dList.find('li:first-child').addClass('active');
        

        var renderSence = function (_btn,callBack){
            if((!_btn.hasClass('on')) && (!_btn.hasClass('disable'))){
                var dNextPageCount = _btn.data('count');

                dBtn.addClass('disable');
                _btn.siblings().removeClass('on');
                _btn.addClass('on');
                
                //var moveUnit = Math.max(dNextPageCount,dNowPageCount)- Math.min(dNextPageCount,dNowPageCount);

                dList.animate({
                    left: 0-(dNextPageCount*senceWidth)
                },800,'easeInOutCubic',function(){
                    dBtn.removeClass('disable');
                    queueIndex++
                    if(callBack){
                        callBack(); 
                    }
                });

            }   
        };

        /*按鈕*/
        dBtn.click(function(e){
            e.preventDefault();
            renderSence($(this));
            if(queue && !queue.length)
            {
                queue.push($(this));
            }
        });

        var autoRunSence = function(){
            //get queue data and remove it
            var manualAction = queue.pop();
            
            //get the next button
            var currentBtn = dPagination.find('li.on');
            var nextBtn = {};
            
            if(currentBtn.next().length)
            {
                nextBtn = currentBtn.next();
            }
            else
            {
                nextBtn = dPagination.find('li').first();
            }
            
            //if queue then wait
            if(manualAction)
            {
                //run user action
                setTimeout(autoRunSence,rotatorTime*2);
            }
            //if not queue then run autorun
            else
            {
                //run auto run
                if(!dPagination.find('.disable').length)
                {
                    //run
                    renderSence(nextBtn,function(){setTimeout(autoRunSence,rotatorTime);});
                }
                else
                {
                    //because runngin, wait for
                    setTimeout(autoRunSence,rotatorTime);
                }
            }
        };
        //auto run
        setTimeout(autoRunSence,rotatorTime); 
        }
		// initialize every element
		this.each(function() {
			init($(this));
		});
		return this;
	};
	// start
	$(function() {
		$('.carousel').carousel();
	});
})(jQuery);