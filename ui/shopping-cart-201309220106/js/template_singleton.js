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
    sale: function(dModule){
        var dModule = $(dModule);
        var dProductList = dModule.find('.product-list');
        var dShoppingList = dModule.find('.shopping-list');
        var dCart = dModule.find('.cart');
        var dToggle = dCart.find('.toggle');

        dProductList.on('click', '.item .btn-add-to-cart', function(){
            var dThisButton = $(this);
            //var data = dThisButton.attr('data');

            $.ajax({
                url: '',
                type: 'post',
                //data:  JSON.stringify(data),
                dataType: 'json',
                error: function (xhr) {},
                success:function(response){},
                complete: function (response) {
                    //fake data
                    response.IsSuccess = true;//user can buy this item
                    response.ReturnData = {
                        "item1": {
                            "id": "1234",
                            "name": "item-1",
                            "thumbnail": "http://dummyimage.com/50x50/82cdff/fff.png",
                            "price": "10",
                            "quantity": "2"
                        },                        
                        "item2": {
                            "id": "5678",
                            "name": "item-2",
                            "thumbnail": "http://dummyimage.com/50x50/ff82b0/fff.png",
                            "price": "20",
                            "quantity": "3"
                        }
                    };  

                    if(response.IsSuccess){
                        var dataList = response.ReturnData;//get whole data that user buy
                        var resultShoppingHTML = "";
                        var resultCartListHTML = "";

                        $.each(dataList, function(key, value){
                            var HTMLShoppingList = ['<tr><td><a href="#"><img src="' + value.thumbnail + '"></a></td><td><a href="#">' + value.name + '</a></td><td>' + value.quantity + '</td><td>' + value.price + '</td><td>' + value.quantity*value.price + '</td><td><button class="delete">delete</button></td></tr>'].join();
                            resultShoppingHTML = resultShoppingHTML + HTMLShoppingList;

                            var HTMLCartList = ['<li class="cart-item clearfix"><div class="thumbnail"><a href="#"><img src="' + value.thumbnail + '" alt="'+ value.name +'"></a></div><div class="name"><a href="#">' + value.name + '</a></div><div class="quantity"><span>*</span><span class="number">' + value.quantity + '</span><a href="#" class="remove">x</a></div></li>'].join();
                            resultCartListHTML = resultCartListHTML + HTMLCartList;
                        });

                        //render shopping list and cart
                        $(resultShoppingHTML).appendTo(dShoppingList.find('table'));
                        $(resultCartListHTML).appendTo(dCart.find('.cart-list'));
                    }
                }
            }); 
        });

        dToggle.click(function(e){
            e.preventDefault();
            var dThisToggle = $(this);
            var dThisCart = dThisToggle.parents('.cart');

            if(dThisCart.hasClass('hide')){
                dThisCart.removeClass('hide');
                dToggle.html('close');
            }
            else{
                dThisCart.addClass('hide');
                dToggle.html('open');
            }
        });

        dCart.on('click', '.cart-item .remove', function(e){
            e.preventDefault();
            removeItem();
        });
        dShoppingList.on('click', '.delete', function(){
            removeItem();
        });
        
        var removeItem = function(){
            $.ajax({
                url: '',
                type: 'post',
                data:  '',
                dataType: 'json',
                error: function (xhr) {},
                success:function(response){},
                complete: function (response) {
                    //fake data
                    response.IsSuccess = true;//user can buy this item
                    response.ReturnData = {
                        "item1": {
                            "id": "1234",
                            "name": "item-1",
                            "thumbnail": "http://dummyimage.com/50x50/82cdff/fff.png",
                            "price": "10",
                            "quantity": "2"
                        }
                    };  

                    if(response.IsSuccess){
                        var dataList = response.ReturnData;//get whole data that user buy
                        var resultShoppingHTML = "";
                        var resultCartListHTML = "";

                        $.each(dataList, function(key, value){
                            var HTMLShoppingList = ['<tr><td><a href="#"><img src="' + value.thumbnail + '"></a></td><td><a href="#">' + value.name + '</a></td><td>' + value.quantity + '</td><td>' + value.price + '</td><td>' + value.quantity*value.price + '</td><td><button class="delete">delete</button></td></tr>'].join();
                            resultShoppingHTML = resultShoppingHTML + HTMLShoppingList;

                            var HTMLCartList = ['<li class="cart-item clearfix"><div class="thumbnail"><a href="#"><img src="' + value.thumbnail + '" alt="'+ value.name +'"></a></div><div class="name"><a href="#">' + value.name + '</a></div><div class="quantity"><span>*</span><span class="number">' + value.quantity + '</span><a href="#" class="remove">x</a></div></li>'].join();
                            resultCartListHTML = resultCartListHTML + HTMLCartList;
                        });

                        //render shopping list and cart
                        dShoppingList.find('table').html('');//clear table
                        dShoppingList.find('table').append(resultShoppingHTML);
                        dCart.find('.cart-list').html('');//clear cart
                        dCart.find('.cart-list').append(resultCartListHTML);
                    }
                }
            });
        };

    }
};
(function(){
    var doWhileExist = function(ModuleID,objFunction){
        var dTarget = document.getElementById(ModuleID);
        if(dTarget){
            objFunction(dTarget);
        }                
    };
    doWhileExist('sale',SP.module.sale);
})();