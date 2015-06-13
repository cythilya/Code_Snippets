(function($) {
	$.fn.tinyNav = function(opts) {
		// default configuration
		var config = $.extend({}, {
			active: 'selected', //String: Set the "active" class
			header: false //Boolean: Show header instead of the active item
		}, opts);
		// main function
		function init(obj) {
            var dNav = $(obj);
            var dNavList = dNav.find('.nav-list');
            var dNavListItems = dNavList.find('.item');
            var optionArray = [];
            var selectHTML = '';
            var HTML = '';

            dNavListItems.each(function(index, value){
            	var dLink = $(this).find('.link');
	            var option = {
	            	"title" : $(this).text(),
	            	"link" : dLink.attr('href')
	            };
	            optionArray.push(option);
            });

            $.each(optionArray, function(index, value){
            	selectHTML = selectHTML + '<option value="' + optionArray[index].link + '">' + optionArray[index].title + '</option>'
            });

			HTML += [
			    '<select class="tinynav">' + selectHTML + '</select>'
			].join('');

            var dSelectNav = $(HTML);
            dNav.append(dSelectNav);

            dSelectNav.change(function(){
            	location.href = $(this).val();
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
		$('.navigation-area').tinyNav();
	});
})(jQuery);

/*
$(document).ready(function() {
    (function($, window, i) {
        $.fn.tinyNav = function(options) {

            // Default settings
            var settings = $.extend({
                'active': 'selected', // String: Set the "active" class
                'header': false // Boolean: Show header instead of the active item
            }, options);

            return this.each(function() {

                // Used for namespacing
                i++;

                var $nav = $(this),
                    // Namespacing
                    namespace = 'tinynav',
                    namespace_i = namespace + i,
                    l_namespace_i = '.l_' + namespace_i,
                    $select = $('<select/>').addClass(namespace + ' ' + namespace_i);

                if ($nav.is('ul,ol')) {

                    if (settings.header) {
                        $select.append(
                            $('<option/>').text('Navigation')
                        );
                    }

                    // Build options
                    var options = '';

                    $nav
                        .addClass('l_' + namespace_i)
                        .find('a')
                        .each(function() {
                            options +=
                                '<option value="' + $(this).attr('href') + '">' +
                                $(this).text() +
                                '</option>';
                        });

                    // Append options into a select
                    $select.append(options);

                    // Select the active item
                    if (!settings.header) {
                        $select
                            .find(':eq(' + $(l_namespace_i + ' li')
                                .index($(l_namespace_i + ' li.' + settings.active)) + ')')
                            .attr('selected', true);
                    }

                    // Change window location
                    $select.change(function() {
                        window.location.href = $(this).val();
                    });

                    // Inject select
                    $(l_namespace_i).after($select);

                }

            });

        };
    })(jQuery, this, 0);

    $(".nav-list").tinyNav();
});
*/