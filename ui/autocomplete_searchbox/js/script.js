(function($) {
	$.fn.searchbox = function(opts) {
		// default configuration
		var config = $.extend({}, { opt1: null }, opts);
		// main function
		function init(obj) {
            var dSearchbox = $(obj);
            var dInput = dSearchbox.find('.search-input');
            var dSubmit = dSearchbox.find('.search-submit');
            var dMenu = dSearchbox.find('.menu');
            var counter = 0;//for fake data test
            
            //menu display--------------------------
            dInput.keydown(function(){
                if(!dMenu.hasClass('on')){
                    dMenu.addClass('on');
                }

                //send ajax to get menu content
                /*
                $.ajax({
                    url: 'result',
                    type: 'post',
                    data: {},
                    dataType: 'json',
                    error: function (xhr) {},
                    success: function (response) {
                    }
                });
                */

                //fake data
                counter++;
                var response = {
                    "apple": "apple",
                    "boy": "boy",
                    "cat": "cat",
                    "doll": "doll",
                    "elephant": "elephant"
                };
                
                //clear menu
                dMenu.html('');
                
                //render menu
                $.each(response, function( key, value ) {
                    dMenu.append('<li><a href="#" data="'+ response[key] + counter + '">' + response[key] + counter + '</a></li>');
                });

            });

            $(document).click(function(e){
                e.stopPropagation();
                var dThisMenu= dSearchbox.find('.menu');
                if(!dThisMenu.has(e.target).length){
                     dMenu.removeClass('on');
                }
            });

            //get search target---------------------
            dMenu.on('click', 'li a', function(e){
                e.preventDefault();
                
                var dItem = $(this);
                var target = dItem.attr('data');
                dInput.val(target);
                dInput.attr('data', target);
                
                if(dMenu.hasClass('on')){
                    dMenu.removeClass('on');
                }
            });
            
            //submit--------------------------------
            dSubmit.click(function(e){
                e.preventDefault();

                var target = dInput.attr('data');
                var response = {"target":"result.html"};
                //send ajax to get menu content
                /*
                $.ajax({
                    url: 'result',
                    type: 'post',
                    data: {},
                    dataType: 'json',
                    error: function (xhr) {},
                    success: function (response) {
                    }
                });
                */

                if(dMenu.hasClass('on')){
                    dMenu.removeClass('on');
                } 
                
                //reload result page
                //location.replace(response.target);
                //window.open(response.target);
                window.open('search?target=' + target);
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
		$('.searchbox').searchbox();
	});
})(jQuery);