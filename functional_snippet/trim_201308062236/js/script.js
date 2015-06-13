(function($) {
    var _trim = $.trim;
    $.extend({
        trim: function(text, clear){
            if(clear){
                return text.replace(/\s+/g, '');
            }
            return _trim.call(this, text);
        }
    });
})(jQuery);