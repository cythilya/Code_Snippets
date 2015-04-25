(function($) {
	$.fn.submitData = function(opts) {
		// default configuration
		var config = $.extend({}, { opt1: null }, opts);
		// main function
		function init(obj) {
			var dForm = $(obj);
			var dElements = dForm.find('.item');
			var formDataArray = [];

			//get data
			dElements.each(function(i){
				var ele = $(this);
				var type = ele.attr('class');
				var item = { "ColumnName": "", "ColumnValue": "" };
				if(type.match(/item-text/g)){
					var dThisField = ele.find('input[type="text"]');
                    item.ColumnName = dThisField.data('title');
                    item.ColumnValue = dThisField.val();
				}
				else if(type.match(/item-multiline/g)){
					var dThisField = ele.find('textarea');
                    item.ColumnName = dThisField.data('title');
                    item.ColumnValue = dThisField.val();
				}
				else if(type.match(/item-radio/g)){
					var dRadioButtonGroup = ele.find('input[type="radio"]');
                    dRadioButtonGroup.each(function(i){
                        var dThisItem = $(this);
                        if(dThisItem.attr('checked') == 'checked'){
                        	item.ColumnName = dThisItem.data('title');
                            item.ColumnValue = dThisItem.attr('value');
                        }
                    });
				}
				else if(type.match(/item-checkbox/g)){
					var dCheckboxGroup = ele.find('input[type="checkbox"]');
					var arr = [];
                    var title = "";
                    var value = "";
                    dCheckboxGroup.each(function(i){
                        var dThisItem = $(this);
                        if(dThisItem.attr('checked') == 'checked'){
                        	title = dThisItem.data('title');
                        	arr.push(dThisItem.attr('value'));
                        }
                    });
                    value = arr.join(',');
                    item.ColumnName = title;
                    item.ColumnValue = value;
				}
				else if(type.match(/item-select/g)){
					var dThisField = ele.find('select');
                    dThisField.find('option').each(function(i){
                        dThisOption = $(this);
                        if(dThisOption.attr('selected') == 'selected') {
                            item.ColumnName = dThisOption.data('title');
                            item.ColumnValue = dThisOption.attr('value');
                        }
                    });
				}
				else if(type.match(/item-file/g)){
					var dThisField = ele.find('input[type="file"]');
                    item.ColumnName = dThisField.data('title');
                    item.ColumnValue = dThisField.val();					
				}
				formDataArray.push(item);
			});

			//submit form data
            $.ajax({
                url: '',
                type: 'post',
                dataType: 'json',
                data: JSON.stringify({
                    "Data": formDataArray
                }),
                traditional: true,
                contentType: "application/json; charset=utf-8",
                error: function (xhr) {
                	//alert('Error! Please try again later.');
                },
                success: function (response) {
                    if (response.IsSuccess) {
                        alert('Success!');
                        location.reload();
                    }
                    else {
                        alert('Error! Please try again later.');
                    }
                }
            });

            //for demo
            alert(JSON.stringify({"Data": formDataArray}));
        }
		// initialize every element
		this.each(function() {
			init($(this));
		});
		return this;
	};
	// start
	$(function() {
		$('.submit').click(function(){
			$('.form').submitData();	
		});
	});
})(jQuery);