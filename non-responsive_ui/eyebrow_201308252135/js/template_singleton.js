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
    moduleA: function(dModule){
        var dDIV = $(dModule).find('div').each(function(index,item){
        //var dDIV = $('.moduleA div').each(function(index,item){
            //$(item).html(index+1);
            switch(index+1){
                case 1:
                    $(item).html('a');
                    break;
                case 2:
                    $(item).html('b');
                    break;
                case 3:
                    $(item).html('c');
                    break;
                default:
                    break;
            }
        });
    },
    eyebrow: function(dModule){
        var dEyebrow = $(dModule);
        var dPanel = dEyebrow.find('.panel');
        var dToggle = dPanel.find('.toggle');
        var dTemperature = dPanel.find('.temperature');
        var dLocation = dPanel.find('.options li a');
        var dStyleSettingBar = dEyebrow.find('.style-setting');
        var dStyleSettingItem = dStyleSettingBar.find('a');
        
        //show / hide panel
        dToggle.click(function(e){
            e.preventDefault();

            if(dPanel.hasClass('on')){
                dPanel.removeClass('on');
                dPanel.addClass('off');
            }
            else{
                dPanel.removeClass('off');
                dPanel.addClass('on'); 
            }
        });
        
        //switch the temperature
        dLocation.click(function(e){
            e.preventDefault();
            var dThisLink = $(this);
            var temp = dThisLink.data('temp');
            dTemperature.text(temp);
            
            if(dPanel.hasClass('on')){
                dPanel.removeClass('on');
                dPanel.addClass('off');
            }
            else{
                dPanel.removeClass('off');
                dPanel.addClass('on'); 
            }            
        });
            
        //style setting
        dStyleSettingItem.click(function(e){
            e.preventDefault();
            dThisStyle = $(this);
            
            if(!dThisStyle.parents('li').hasClass('focus')){
                dThisStyle.parents('.style-setting').find('li').removeClass('focus');
                dThisStyle.parents('li').addClass('focus');
            }
        });
        
        $(document).click(function(e){
            e.stopPropagation();
            var dThisToggle = dPanel.find('.toggle');
            if(!dPanel.has(e.target).length){
                dPanel.removeClass('on');
                dPanel.addClass('off');
            } 
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
    doWhileExist('moduleA',SP.module.moduleA);
    doWhileExist('eyebrow',SP.module.eyebrow);
})();