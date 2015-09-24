(function($) {
    $.fn.smallImageGallery = function(opts) {
        // default configuration
        var config = $.extend({}, {
            opt1: null
        }, opts);
        // main function
        function init(obj) {
           var dModule = $(obj),
                dPreviewArea = dModule.find('.previewArea'),
                dPreviewFrame = dPreviewArea.find('.imageListFrame'),
                dPreviewItems = dPreviewArea.find('.imageItem'),
                dPrevBtn = dPreviewArea.find('.btnPrev'),
                dNextBtn = dPreviewArea.find('.btnNext'),
                countPerRow = 3,
                itemWidth = 106,
                speed = 800,
                leftLimit = 0,
                rightLimit = -(dPreviewItems.length - countPerRow)*itemWidth;
            
            //圖片輪播
            dPrevBtn.click(function(e){
                e.preventDefault();
                var dThisBtn = $(this);
                if(!dThisBtn.hasClass('off') && !dPreviewArea.hasClass('isMove')){
                    dPreviewArea.addClass('isMove');
                    dPreviewFrame.stop().animate({left: '+=' + itemWidth + 'px'}, speed, function(){
                        if(dPreviewFrame.position().left == leftLimit){
                           dThisBtn.addClass('off');
                        }
                        if(dPreviewFrame.position().left != rightLimit){
                           dNextBtn.removeClass('off');
                        }                                 
                        dPreviewArea.removeClass('isMove');
                    });
                }
            });
            
            dNextBtn.click(function(e){
                e.preventDefault();
                var dThisBtn = $(this);

                if(!dThisBtn.hasClass('off') && !dPreviewArea.hasClass('isMove')){
                    dPreviewArea.addClass('isMove');
                    dPreviewFrame.stop().animate({left: '-=' + itemWidth + 'px'}, speed, function(){
                        if(dPreviewFrame.position().left != leftLimit){
                           dPrevBtn.removeClass('off');
                        }                    
                        if(dPreviewFrame.position().left == rightLimit){
                           dNextBtn.addClass('off');
                        }
                        dPreviewArea.removeClass('isMove');
                    });
                }
            });

            //開啟圖片或影片預覽的popup
            dPreviewItems.click(function(){
                var dThisItem = $(this),
                    imageSrc = dThisItem.data('mediasrc');


                if(!dThisItem.hasClass('video') && imageSrc !== ''){
                    var dialogObject =
                        $(['<div class="mainContent">',
                        '   <div class="inner">',
                        '       <div class="panel large">',
                        '           <div class="section">',
                        '               <div class="content">',
                        '                   <img src="' + imageSrc + '">',
                        '               </div>',
                        '           </div>',
                        '       </div>',    
                        '   </div>',
                        '</div>'].join('')).dialog({
                        dialogClass: 'customPopup keystonePopup untitle',
                        modal: true,
                        resizable: false,
                        draggable: false,
                        width: 610,
                        height: 660,
                        title: '',
                        open: function () {
                            var dDialogSelf = $(this);

                            //cancel
                            dDialogSelf.on('click', '.cancel', function (e) {
                                e.preventDefault();
                                dDialogSelf.dialog('close');
                            });
                        },
                        close: function () {
                            var dDialogSelf = $(this);
                            dDialogSelf.hide();
                        }
                    });
                }
                else if(dThisItem.hasClass('video') && imageSrc !== ''){
                var dialogObject =
                        $(['<div class="mainContent">',
                        '   <div class="inner">',
                        '       <div class="panel">',
                        '           <div class="section">',
                        '               <div class="content">',
                        '                   <div>',
                        '                      <iframe width="560" height="315" src="' + imageSrc + '" frameborder="0" allowfullscreen></iframe>',
                        '                   </div>',
                        '               </div>',
                        '           </div>',
                        '       </div>',    
                        '   </div>',
                        '</div>'].join('')).dialog({
                        dialogClass: 'customPopup keystonePopup untitle',
                        modal: true,
                        resizable: false,
                        draggable: false,
                        width: 670,
                        height: 500,
                        title: '',
                        open: function () {
                            var dDialogSelf = $(this);

                            //cancel
                            dDialogSelf.on('click', '.cancel', function (e) {
                                e.preventDefault();
                                dDialogSelf.dialog('close');
                            });
                        },
                        close: function () {
                            var dDialogSelf = $(this);
                            dDialogSelf.hide();
                        }
                    });
                }
                else{
                    alert('資料有誤，請重新再試一次。');
                }

                dialogObject.dialog('open');            
            });

            //init
            if(dPreviewItems.length <= countPerRow){
                dPrevBtn.hide();
                dNextBtn.hide();
            }
            if(dPreviewFrame.position().left == leftLimit){
                dPrevBtn.addClass('off');
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
        $('.smallImageGallery').smallImageGallery();
    });
})(jQuery);