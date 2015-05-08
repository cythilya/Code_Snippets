(function($) {
    $.fn.scrollEffect = function(opts) {
        // default configuration
        var config = $.extend({}, {
            speed: 1000,
            start: 0       
        }, opts);
        // main function
        function init(obj) {
            var dObj = $(obj);
            var dFrame = dObj.find('.frame');
            var dNavLink = dObj.find('.navLink');
            var startOrder = 1;

            var eBookData = [
                {
                    "id": "1",
                    "title": "It's PARTY RUN",
                    "image": "css/dummy_768x1024_pink.png"
                }                                             
            ];
            
            var navHTMLResult = '';
            var order = 1;
            $.each(eBookData, function(index, value){
                var navHTML = '';
                navHTML += [
                    '<li class="navItem">',
                    '    <a class="navLink" href="#" data-order="' + order + '">' + value.title +'</a>',
                    '</li>'
                ].join('');
                order++;
                navHTMLResult = navHTMLResult + navHTML;
            })

            /*
            var frameHTML = '';
            frameHTML += [
                '<div class="image-upload-item clearfix">',
                '    <img src="' + response + '" alt="上傳圖片">',
                '    <div class="info">',
                '        <div class="file-name">'+ $('.file-upload').val() +'</div>',
                '    </div>',
                '</div>'
            ].join(''); 
            */       

            dObj.on('click', '.navLink', function(e){
                e.preventDefault();
                var nowOrder = $(this).data('order');
                var length = -(nowOrder - startOrder)*1024;
                dFrame.animate({top: length + 'px'}, config.speed); 

            });


            /*
            $(window).resize(function(){
                if(window.innerWidth < 768){
                }
                else{
                }               
            });
            */
        }
        // initialize every element
        this.each(function() {
            init($(this));
        });
        return this;
    };
    // start
    $(function() {
        $('.ebook').scrollEffect();
    });
})(jQuery);







var SP = {};
SP.module = {
    version: '0.1',
    namespace: function(ns_string){
        var parts = ns_string.split('.'),
            parent = SP,
            i;
        if (parts[0] === 'SP'){
            parts = parts.slice(1);
        }
        for (i = 0; i < parts.length; i += 1){
            if (typeof parent[parts[i]] === 'undefined') {
                parent[parts[i]] = {};
            }
            parent = parent[parts[i]];
        }
        return parent;
    },
    inherit: function(Child, Parent){
        Child.prototype = new Parent();
    },
    eBookNav: function(dModule){
        var responsiveNav = document.getElementById('eBookNav');
        //var responsiveNavBreakpoint = 2000000;

        responsiveNav.addEventListener('click', function(){
            responsiveNav.classList.toggle("is-open");
            /*
            if(window.innerWidth < responsiveNavBreakpoint){
                responsiveNav.classList.toggle("is-open");
            }
            */
        });
    }
};
(function(){
    var doWhileExist = function(ModuleID,objFunction){
        var dTarget = document.getElementById(ModuleID);
        if(dTarget){
            objFunction(dTarget);
        }                
    };
    doWhileExist('eBookNav',SP.module.eBookNav);
})();