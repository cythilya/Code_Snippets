(function($) {
	$.fn.gallery = function(opts) {
		// default configuration
		var config = $.extend({}, { 
           interval: 5600,
           text: 'on' ,//or off
           pagination: 'on',//or off
           flip: 'on'//or off
        }, opts);
		// main function
		function init(obj) {
            var dGallery = $(obj);
            var dTabs = dGallery.find('.tab');
            var dText = dGallery.find('.text');
            var dPagination = dGallery.find('.nav');
            var dPageItem = dPagination.find('a');
            var dPrev = dGallery.find('.prev');
            var dNext = dGallery.find('.next');
            
            //init------------------------------------------
            var dCurrent;
            var stop = false;
            
            dTabs.addClass('non-active');
            if(!dTabs.eq(0).hasClass('active')){
                dTabs.eq(0).addClass('active');
            } 
            if(dTabs.eq(0).hasClass('non-active')){
               dTabs.eq(0).removeClass('non-active');
            } 
            
            if(!dPageItem.eq(0).hasClass('active')){
                dPageItem.eq(0).addClass('active');
            }
            
            //text
            if(config.text == 'on'){
               dText.show();
            }
            else{
                dText.hide();
            }
            
            //pagination
            if(config.pagination == 'on'){
                if(dPagination.hasClass('off')){
                    dPagination.removeClass('off');
                }            
               dPagination.addClass('on'); 
            } 
            else{
                if(dPagination.hasClass('on')){
                    dPagination.removeClass('on');
                }            
               dPagination.addClass('off'); 
            }
            
            //flip(prev and next button)
            if(config.flip == 'on'){
                if(dPrev.hasClass('off')){
                    dPrev.removeClass('off');
                }
                dPrev.addClass('on');
                
                if(dNext.hasClass('off')){
                    dNext.removeClass('off');
                }
                dNext.addClass('on');
            }
            else{
                if(dPrev.hasClass('on')){
                    dPrev.removeClass('on');
                }
                dPrev.addClass('off');
                
                if(dNext.hasClass('on')){
                    dNext.removeClass('on');
                }
                dNext.addClass('off');            
            }
            
            //display images--------------------------------
            dTabs.eq(0).addClass('current');
            dTabs.eq(0).show();
            setInterval(function(){
                if(!stop){
                    dCurrent = dGallery.find('.current');
                    dCurrent.fadeOut(config.interval, function(){
                        var id = -1;
                        if(dCurrent.next().length !== 0){
                            //tab
                            dCurrent.removeClass('current');
                            dCurrent.next().addClass('current');
                            dCurrent.next().fadeIn(config.interval);
                            
                            //pagination
                            id = dGallery.find('.view .current').attr('id');//get tab id
                            dPagination.find('a').removeClass('active');
                            dPagination.find('a.tab-'+id).addClass('active');
                        }
                        else{
                            //tab
                            dCurrent.removeClass('current');
                            dTabs.eq(0).addClass('current');
                            dTabs.eq(0).fadeIn(config.interval);

                            //pagination
                            id = dGallery.find('.view .current').attr('id');//get tab id
                            dPagination.find('a').removeClass('active');
                            dPagination.find('a.tab-'+id).addClass('active');                            
                        }
                    });
                }
            }, config.interval);
            
            //click prev or next button to change tab-------
            dPrev.click(function(e){
                e.preventDefault();
                
                var dTab = dGallery.find('.view .current');
                var dPrevTab = dTab.prev();
                var id;
                if(dPrevTab.length !== 0){
                    dGallery.find('.view .tab').stop(true, true);
                    dTab.removeClass('current').removeClass('active').addClass('non-active').hide();
                    dGallery.find('.view .tab').addClass('non-active');    
                    dPrevTab.addClass('current').addClass('active').removeClass('non-active').fadeIn(config.interval);                    
                    id = dPrevTab.attr('id');
                    dPagination.find('a').removeClass('active');
                    dPagination.find('a.tab-'+id).addClass('active');  
                }
            });
            
            dNext.click(function(e){
                e.preventDefault();
                
                var dTab = dGallery.find('.view .current');
                var dNextTab = dTab.next();
                var id;
                if(dNextTab.length !== 0){
                    dGallery.find('.view .tab').stop(true, true);
                    dTab.removeClass('current').removeClass('active').addClass('non-active').hide();
                    dGallery.find('.view .tab').addClass('non-active');    
                    dNextTab.addClass('current').addClass('active').removeClass('non-active').fadeIn(config.interval);                    
                    id = dNextTab.attr('id');
                    dPagination.find('a').removeClass('active');
                    dPagination.find('a.tab-'+id).addClass('active');  
                }           
            });
            
            //click pagination to change tab----------------
            dPagination.on('click', 'a', function(e){
                e.preventDefault();
                
                var dThisPage = $(this);
                var dTab;
                var id;
               
                dPagination.find('a').removeClass('active');
                dThisPage.addClass('active');
                id = dThisPage.attr('id');
                dTab = dGallery.find('.view .'+ id);
                dGallery.find('.view .tab').stop(true, true);
                dGallery.find('.view .current').removeClass('current').removeClass('active').addClass('non-active').hide();
                dGallery.find('.view .tab').addClass('non-active');
                dTab.addClass('current').addClass('active').removeClass('non-active').fadeIn(config.interval);
            });
            
            //stop when mouse over--------------------------
            dGallery.on('mouseover mouseout', function(e){
                if(e.type == 'mouseover'){
                    stop = true;
                }
                else{
                    stop = false;
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
		$('.gallery').gallery({interval: 2000, text: 'on', flip: 'on'});
	});
})(jQuery);