(function($) {
	$.fn.matchString = function(opts) {
		//default configuration
		var config = $.extend({}, { opt1: null }, opts);
		//main function
		function init(obj) {
	        /*
	            JavaScript test() Method
	            The test() method tests for a match in a string.
	            This method returns true if it finds a match, otherwise it returns false.

	            Syntax: RegExpObject.test(string);
	                    EX: /^target$/i.test(str);
	                    EX: var pattern = /^target$/i;
	                        pattern.test(str);

	            Ref: http://www.w3schools.com/js/js_obj_array.asp

	            用來檢測字串中是否有符合的字串, 可用來比對參雜大小寫的字串中, 比對忽略大小寫後是否符合
	            EX: 希望找到的字串 "target"
	                比對字串 "Target"(符合), "tarGet"(符合), "tarGET"(符合), "TARGET"(符合), "target"(符合), "targetxyz"(不符合)
	        */

	        var dObj = $(obj);
	        var dOutputArea = dObj.find('ul');
	        var pattern = /^target$/i;
	        var array = ["Target", "tarGet", "tarGET", "TARGET", "target", "targetxyz"];
	        
	        $.each(array, function(index) {
	            var HTML = "";
	            HTML += [
	                '<li>',
	                '    <span class="string">' + array[index] + '</span>:',
	                '    <span class="result">' + pattern.test(array[index]) + '</span>',
	                '</li>'
	            ].join('');
	            dOutputArea.append(HTML);        
	        });			
        }
		//initialize every element
		this.each(function() {
			init($(this));
		});
		return this;
	};
	//start
	$(function() {
		$('.test').matchString();
	});
})(jQuery);