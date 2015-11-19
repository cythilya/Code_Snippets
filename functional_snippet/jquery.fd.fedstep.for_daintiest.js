//plugin mission 內頁的后塊 收合
(function ($) {
    $.fn.blockBox = function (opts) {
        // default configuration
        var config = $.extend({}, {
            initStatus: 'on'
        }, opts);
        // main function
        function initBox(object) {
            var dObj = $(object);
            var dBoxContent = dObj.find('.js_boxContent');
            var dBoxSwitch = dObj.find('.js_switchBox');
            var isBoxOpen = function () {
                if (dBoxContent && (dObj.find('.js_boxContent').is(":visible") == true)) {
                    config.initStatus = 'on';
                }
                else {
                    config.initStatus = 'off';
                }
            };

            dBoxSwitch.on('click', function (e) {
                e.preventDefault();
                isBoxOpen();
                var dThisBtn = $(this);
                if (!dThisBtn.hasClass('disabled')) {
                    dThisBtn.addClass('disabled');
                    if (config.initStatus == 'on') {
                        dBoxContent.slideUp(1000, function () {
                            dThisBtn.removeClass('disabled')
                            dThisBtn.removeClass('on').addClass('off');
                        });
                    }
                    else {
                        dBoxContent.slideDown(1000, function () {
                            dThisBtn.removeClass('disabled');
                            dThisBtn.removeClass('off').addClass('on');

                        });
                    }
                }
            });
        }
        // initialize every element
        this.each(function () {
            initBox($(this));
        });
        return this;
    };
    // start
    $(function () {
        $(".js_box").blockBox();
    });
})(jQuery); //end blockBox

var missionDaintiest = {};
missionDaintiest.module = {
    version: '0.1',
    namespace: function (ns_string) {
        var parts = ns_string.split('.'),
            parent = missionDaintiest,
            i;
        if (parts[0] === 'missionDaintiest') {
            parts = parts.slice(1);
        }
        for (i = 0; i < parts.length; i += 1) {
            if (typeof parent[parts[i]] === 'undefined') {
                parent[parts[i]] = {};
            }
            parent = parent[parts[i]];
        }
        return parent;
    },
    inherit: function (Child, Parent) {
        Child.prototype = new Parent();
    },
    secretGeneratorExecution: function (dModule) {
        var dModule = $(dModule);
        // slot
        var dSlotMc = dModule.find('.slotMc');
        var dRedBall = dSlotMc.find('.redBall');
        var dSlotBox = dSlotMc.find('ul.wheel');

        var dSend = dModule.find('.btnFormSubmit');
        var dShare = dModule.find('.btnFormShare');
        var dTabs = dModule.find('.stepList');
        // setting data
        var friendsArr = [];
        var imagesArr = JSON.parse(dModule.find('input.imageData').val() || [])
        // 從facebook取回來的朋友上限
        var FRIENDS_FACEBOOK_MAX = 300;
        // { 1: 文字, 2: 朋友 }
        var OPTION_TEXT = '1';
        var OPTION_FACEBOOK_FRIENDS = '2';
        // 要拉霸的朋友數量
        var FRIENDO_SLOT_MAX = 50;
        // 要存檔的資料
        var resultData = [];
        // jSlots的結束方式與我們不一樣，要自己控制結束。
        var slotCounts = 0;

        // function
        // get Friendos random list for next friends slot
        var getRandomList = function (maxLength) {
            //進來的list長度跟朋友清單的總長度相較之下 取小值
            var maxCount = Math.min(maxLength, friendsArr.length);
            var shuffleFriendList = friendsArr.slice();
            shuffle(shuffleFriendList);
            var randomFriendsDatas = shuffleFriendList.slice(0, maxCount);
            return randomFriendsDatas;
        };

        //洗牌
        var shuffle = function (array) {
            var counter = array.length, temp, index;

            // While there are elements in the array
            while (counter > 0) {
                // Pick a random index
                index = Math.floor(Math.random() * counter);

                // Decrease counter by 1
                counter--;

                // And swap the last element with it
                temp = array[counter];
                array[counter] = array[index];
                array[index] = temp;
            }

            return array;
        };

        var setTab = function (stepNumber) {
            dTabs.find('li').removeClass('active');
            dTabs.find('.step' + stepNumber).addClass('active');
        };

        var initSlotMc = function () {

            // 呼叫 jSlots 前，要先初始化 li 個數
            $.each(dSlotBox.filter('[data-optiontype="' + OPTION_FACEBOOK_FRIENDS + '"]'), function (index, item) {
                var dSelf = $(this);
                var len = Math.min(FRIENDO_SLOT_MAX, friendsArr.length);
                var i;
                var slotHtml = '';
                dSelf.empty();
                for (i = 0; i < len; i++) {
                    slotHtml += '<li data-value="" data-index=""><p class="imgBox"><img src="" alt=""><span class="name"></span></p></li>';
                }
                dSelf.append(slotHtml);
            });

            //bind slotbar animate and link true button
            dRedBall.click(function (e) {
                var dSelf = $(this);
                var dSlotMc = dSelf.closest('.slotMc');
                var dDefaultLogo = dSlotMc.find('.defaultLogo');
                var dArrows = dSlotMc.find('.arrows');
                var dBarBtn = dSlotMc.find('.barBlock');
                var dPlayFancy = dSlotMc.find('.playFancy');

                if (dSelf.hasClass('disabled')) {
                    return false;
                }
            
                dSelf.addClass('disabled');

                if (dDefaultLogo.length > 0) {
                    dDefaultLogo.slideDown(400, function () {
                        dDefaultLogo.remove();
                    });
                    //isFirstTurn = false;
                }

                if (dArrows.is(":visible")) {
                    dArrows.fadeOut();
                }

                dBarBtn.animate({ 'height': '200' }, 500, 'easeInOutElastic')
                        .animate({ 'height': '310' }, 1800, 'easeOutBounce');

                dRedBall.animate({ 'width': '120' }, 500, 'easeInOutElastic')
                        .animate({ 'width': '80' }, 1800, 'easeOutBounce', function () {
                    dRedBall.removeClass('disabled');
                });

                //click the true slot button
                dPlayFancy.delay(700).click();

            });

            dSend.on('mission/completeCollectionDone', function () {});
            dSend.on('mission/completeCollectionFail', function () {}); 
            
            var shareContent = function(callback) {
                var dFacebookRoot = $('#fb-root');
                var isFeed = !dFacebookRoot.hasClass('processing');

                if (!isFeed) { return false; }
                dFacebookRoot.addClass('processing');

                var shareAnswer = {
                    Description: $.map(resultData, function (item, index) {
                        return item.data('value') || '';
                    }).join(' '),
                    PicURL: shuffle(imagesArr)[0]
                };
                var scroll = $(window).scrollTop();
                FBUtil.after(function (FB) {
                    FB.ui({
                        method: 'feed',
                        message: shareAnswer.Description,
                        name: shareAnswer.Description,
                        link: location.href,
                        caption: '原味千尋　炭燒辣味乳酪絲是重口味秘密的最佳拍檔。你想跟誰說祕密？',
                        description: '跟知心好友無話不談嗎?是否有些話對朋友說不出口?讓粉多進入你的潛意識，挖掘你埋藏已久的小秘密!勇敢對朋友說出秘密，就有機會抽中最強乾杯零食 - 原味千尋炭燒辣味酪絲。原味千尋用16倍的真心，換1份乾杯的感動。',
                        picture: shareAnswer.PicURL
                    }, 
                    function(response) {
                        if(typeof(callback)=='function'){   
                            callback();   
                        };

						if ($(window).scrollTop() != scroll && $(window).scrollTop() == 0) {
							$(window).scrollTop(scroll);
						}						
						
                        dFacebookRoot.removeClass('processing');
                    });     
                });
                $(window).one('scroll',function () {
                    if ($(window).scrollTop() != scroll) {
                        $(window).scrollTop(scroll);
                    }
                });
            };
            
            //sumbit button
            dModule.on('click', '.btnFormSubmit.fd-btn-enter', function (e) {
                e.preventDefault();
                var dSelf = $(this);
                var contentGeneratorAnswer = {
                    ResultUrl: null,
                    MimeType: null,
                    Description: $.map(resultData, function (item, index) {
                        return item.data('value') || '';
                    }).join(' '),
                    PicURL: shuffle(imagesArr)[0],
                    Answers: $.map(resultData, function (item, index) {
                        var dSelfBox = item.closest('ul');
                        return {
                            QuestionID: dSelfBox.data('questionid') || '',
                            QType: dSelfBox.data('questiontype') || '',
                            Answer: item.data('value') || '',
                            Question: ''
                        };
                    }),
                    ExecuteType: "ContentGenerator"
                    /*[
                        {
                            QuestionID: 100,
                            QType: 1,
                            Answer: "Amelie Chen",
                            Question: ''
                        }
                    ]*/
                };
                
				$.event.trigger("mission/completeCollection", contentGeneratorAnswer);
				
                //shareContent(function(){
                //    $.event.trigger("mission/completeCollection", contentGeneratorAnswer);
                //});
                
                /*
                var isPublic = dModule.find('#formCheckingRead').is(":checked");
                if (isPublic) {
                    FBUtil.after(function (FB) {
                        FB.api('/me/feed', 'post', {
                            //message:  contentGeneratorAnswer.Description,
                            description: contentGeneratorAnswer.Description,
                            link: location.href,
                            picture: contentGeneratorAnswer.PicURL,
                            name: '原味千尋　炭燒辣味乳酪絲是重口味秘密的最佳拍檔。你想跟誰說祕密？'
                        }, function (response) {
                            if (!response || response.error) {
                                alert('發文失敗！ \n請稍後嘗試或聯繫客服人員。');
                            }
                            $.event.trigger("mission/completeCollection", contentGeneratorAnswer);
                        });
                    });
                } else {
                    $.event.trigger("mission/completeCollection", contentGeneratorAnswer);
                }
                */
            });

            //share button
            dModule.on('click', '.btnFormShare.fd-btn-enter', function (e) {
                e.preventDefault();
                shareContent();
            });
            
            //slot init
            dSlotBox.jSlots({
                number: 1,
                spinner: '.playFancy',
                easing: 'easeOutSine',
                time: 2000, //轉多久
                loops: 2, //轉幾圈
                onStart: function () {
                    var dSelf = $(this);
                    var dSlot = dSelf.find('ul');
                    var dSlotItem = dSelf.find('li');
                    // 有幾個li就取幾筆，幾個li由初始化那邊決定
                    var randomFriendsArr = getRandomList(dSlotItem.length);
                    // 清空結果
                    resultData = [];
                    // 初始化次數
                    slotCounts = 0;
                    // disabled button
                    dSend.removeClass('fd-btn-enter').addClass('fd-btn-disabled');
                    dShare.removeClass('fd-btn-enter').addClass('fd-btn-disabled');

                    if (dSlot.data('optiontype') == OPTION_FACEBOOK_FRIENDS) {
                        $.each(dSelf.find('li'), function (index, item) {
                            var friendsItem;
                            // 多的li，帶入第一筆資料，讓第一筆與最後一筆都是同一個資料(遵循plugin的方式)'
                            if (index >= randomFriendsArr.length) {
                                friendsItem = randomFriendsArr[0];
                            } else {
                                friendsItem = randomFriendsArr[index];
                            }
                            $(item).data('value', friendsItem.friendName || '')
                                   .data('index', friendsItem.dataIndex || '')
                                   .find('img')
                                   .attr('src', friendsItem.friendoImgUrl || '')
                                   .end()
                                   .find('span.name')
                                   .html(friendsItem.friendName || '');
                        });
                    }
                },
                onWin: function (winCount, winners, finalNumbers) { },
                onEnd: function (finalNumbers) {
                    //this不是ul,是上一層element???
                    var dSelf = $(this);
                    var dSlot = dSelf.find('ul.wheel');
                    var dSlotItem = dSlot.find('li');

                    // 取得選項位置 
                    var optionIndex = dModule.find('ul.wheel').index(dSlot);
                    // 取得答案內容
                    resultData[optionIndex] = dSelf.find('li').eq(finalNumbers - 1)

                    slotCounts++;
                    if (slotCounts === dSlotBox.length) {
                        setTab(2);
                        dSend.removeClass('fd-btn-disabled').addClass('fd-btn-enter');
                        dShare.removeClass('fd-btn-disabled').addClass('fd-btn-enter');

                        setTimeout(function () {
                            dShare.click();
                            //shareContent();
                        }, 2000);
                        
                    }
                }
            });
        };

        // run
        FBUtil.after(function (FB) {
            FB.getLoginStatus(function (response) {
                if (response.status === 'connected') {
                    FB.api('/me/friends', function (response) {
                        var friendData = response.data;
                        
                        if (friendData && friendData.length > 0) {
                            $.each(friendData, function (index, value) {
                                if (index <= FRIENDS_FACEBOOK_MAX) {
                                    friendsArr.push({
                                        dataIndex: index,
                                        friendName: value.name,
                                        friendID: value.id,
                                        friendoImgUrl: 'http://graph.facebook.com/' + value.id + '/picture?width=140&height=140'
                                    });
                                } else {
                                    return false;
                                }
                            }); 
                        }
                        else {
                            friendsArr.push({
                                dataIndex: 0,
                                friendName: '原味千尋',
                                friendID: 0,
                                friendoImgUrl: 'http://friendoprod.blob.core.windows.net/ipage/mission/collecttemplate/daintiest/images/logo_daintiest.png'
                            }); 
                        }
                        
                        // init slot
                        initSlotMc();
                    });
                } else {
                    //(friendo not login) or (fb not login)
                    FB.login(function () { }, { scope: 'public_profile,email,user_friends,publish_actions,publish_stream' });
                }
            });
        });

        //scroll this block to top
        $('body,html').animate({ scrollTop: dModule.offset().top });

    },
    secretGeneratorResult: function (dModule) {
        var dModule = $(dModule);
        var dBtnGoLettory = dModule.find('.btnGoLettory');
        
        dBtnGoLettory.click(function (e) {
            e.preventDefault();
            
            if ($('a[name="missionLottery"]')) {
                $('body,html').animate({ scrollTop: $('a[name="missionLottery"]').offset().top - 50 });
			}
        });

    },
    secretGeneratorSummary: function (dModule) {
        var dModule = $(dModule);
        // slot
        var dSlotMc = dModule.find('.slotMc');
        var dRedBall = dSlotMc.find('.redBall');
        var dSlotBox = dSlotMc.find('ul.wheel');

        //var dSend = dModule.find('.btnFormSubmit');
        var dShare = dModule.find('.btnFormShare');
        var dTabs = dModule.find('.stepList');
        // setting data
        var friendsArr = [];
        var imagesArr = JSON.parse(dModule.find('input.imageData').val() || [])
        // 從facebook取回來的朋友上限
        var FRIENDS_FACEBOOK_MAX = 300;
        // { 1: 文字, 2: 朋友 }
        var OPTION_TEXT = '1';
        var OPTION_FACEBOOK_FRIENDS = '2';
        // 要拉霸的朋友數量
        var FRIENDO_SLOT_MAX = 50;
        // 要存檔的資料
        var resultData = [];
        // jSlots的結束方式與我們不一樣，要自己控制結束。
        var slotCounts = 0;

        // function
        // get Friendos random list for next friends slot
        var getRandomList = function (maxLength) {
            //進來的list長度跟朋友清單的總長度相較之下 取小值
            var maxCount = Math.min(maxLength, friendsArr.length);
            var shuffleFriendList = friendsArr.slice();
            shuffle(shuffleFriendList);
            var randomFriendsDatas = shuffleFriendList.slice(0, maxCount);
            return randomFriendsDatas;
        };

        //洗牌
        var shuffle = function (array) {
            var counter = array.length, temp, index;

            // While there are elements in the array
            while (counter > 0) {
                // Pick a random index
                index = Math.floor(Math.random() * counter);

                // Decrease counter by 1
                counter--;

                // And swap the last element with it
                temp = array[counter];
                array[counter] = array[index];
                array[index] = temp;
            }

            return array;
        };

        var setTab = function (stepNumber) {
            dTabs.find('li').removeClass('active');
            dTabs.find('.step' + stepNumber).addClass('active');
        };

        var initSlotMc = function () {

            // 呼叫 jSlots 前，要先初始化 li 個數
            $.each(dSlotBox.filter('[data-optiontype="' + OPTION_FACEBOOK_FRIENDS + '"]'), function (index, item) {
                var dSelf = $(this);
                var len = Math.min(FRIENDO_SLOT_MAX, friendsArr.length);
                var i;
                var slotHtml = '';
                dSelf.empty();
                for (i = 0; i < len; i++) {
                    slotHtml += '<li data-value="" data-index=""><p class="imgBox"><img src="" alt=""><span class="name"></span></p></li>';
                }
                dSelf.append(slotHtml);
            });

            //bind slotbar animate and link true button
            dRedBall.click(function (e) {
                var dSelf = $(this);
                var dSlotMc = dSelf.closest('.slotMc');
                var dDefaultLogo = dSlotMc.find('.defaultLogo');
                var dArrows = dSlotMc.find('.arrows');
                var dBarBtn = dSlotMc.find('.barBlock');
                var dPlayFancy = dSlotMc.find('.playFancy');

                if (dSelf.hasClass('disabled')) {
                    return false;
                }
            
                dSelf.addClass('disabled');

                if (dDefaultLogo.length > 0) {
                    dDefaultLogo.slideDown(400, function () {
                        dDefaultLogo.remove();
                    });
                    //isFirstTurn = false;
                }

                if (dArrows.is(":visible")) {
                    dArrows.fadeOut();
                }

                dBarBtn.animate({ 'height': '200' }, 500, 'easeInOutElastic')
                        .animate({ 'height': '310' }, 1800, 'easeOutBounce');

                dRedBall.animate({ 'width': '120' }, 500, 'easeInOutElastic')
                        .animate({ 'width': '80' }, 1800, 'easeOutBounce', function () {
                    dRedBall.removeClass('disabled');
                });

                //click the true slot button
                dPlayFancy.delay(700).click();

            });

            var shareContent = function(callback) {
                var dFacebookRoot = $('#fb-root');
                var isFeed = !dFacebookRoot.hasClass('processing');

                if (!isFeed) { return false; }
                dFacebookRoot.addClass('processing');

                var shareAnswer = {
                    Description: $.map(resultData, function (item, index) {
                        return item.data('value') || '';
                    }).join(' '),
                    PicURL: shuffle(imagesArr)[0]
                };
                var scroll = $(window).scrollTop();
                FBUtil.after(function (FB) {
                    FB.ui({
                        method: 'feed',
                        message: shareAnswer.Description,
                        name: shareAnswer.Description,
                        link: location.href,
                        caption: '原味千尋　炭燒辣味乳酪絲是重口味秘密的最佳拍檔。你想跟誰說祕密？',
                        description: '跟知心好友無話不談嗎?是否有些話對朋友說不出口?讓粉多進入你的潛意識，挖掘你埋藏已久的小秘密!勇敢對朋友說出秘密，就有機會抽中最強乾杯零食 - 原味千尋炭燒辣味酪絲。原味千尋用16倍的真心，換1份乾杯的感動。',
                        picture: shareAnswer.PicURL
                    }, 
                    function(response) {
                        if (typeof(callback)=='function') {   
                            callback();   
                        };
						
						if ($(window).scrollTop() != scroll && $(window).scrollTop() == 0) {
							$(window).scrollTop(scroll);
						}
						
                        dFacebookRoot.removeClass('processing');
                    });     
                });
                $(window).one('scroll',function () {
                    if ($(window).scrollTop() != scroll) {
                        $(window).scrollTop(scroll);
                    }
                });
            };

            //share button
            dModule.on('click', '.btnFormShare.fd-btn-enter', function (e) {
                e.preventDefault();
                shareContent();
            });
            
            //slot init
            dSlotBox.jSlots({
                number: 1,
                spinner: '.playFancy',
                easing: 'easeOutSine',
                time: 2000, //轉多久
                loops: 2, //轉幾圈
                onStart: function () {
                    var dSelf = $(this);
                    var dSlot = dSelf.find('ul');
                    var dSlotItem = dSelf.find('li');
                    // 有幾個li就取幾筆，幾個li由初始化那邊決定
                    var randomFriendsArr = getRandomList(dSlotItem.length);
                    // 清空結果
                    resultData = [];
                    // 初始化次數
                    slotCounts = 0;
                    // disabled button
                    //dSend.removeClass('fd-btn-enter').addClass('fd-btn-disabled');
                    dShare.removeClass('fd-btn-enter').addClass('fd-btn-disabled');

                    if (dSlot.data('optiontype') == OPTION_FACEBOOK_FRIENDS) {
                        $.each(dSelf.find('li'), function (index, item) {
                            var friendsItem;
                            // 多的li，帶入第一筆資料，讓第一筆與最後一筆都是同一個資料(遵循plugin的方式)'
                            if (index >= randomFriendsArr.length) {
                                friendsItem = randomFriendsArr[0];
                            } else {
                                friendsItem = randomFriendsArr[index];
                            }
                            $(item).data('value', friendsItem.friendName || '')
                                   .data('index', friendsItem.dataIndex || '')
                                   .find('img')
                                   .attr('src', friendsItem.friendoImgUrl || '')
                                   .end()
                                   .find('span.name')
                                   .html(friendsItem.friendName || '');
                        });
                    }
                },
                onWin: function (winCount, winners, finalNumbers) { },
                onEnd: function (finalNumbers) {
                    //this不是ul,是上一層element???
                    var dSelf = $(this);
                    var dSlot = dSelf.find('ul.wheel');
                    var dSlotItem = dSlot.find('li');

                    // 取得選項位置 
                    var optionIndex = dModule.find('ul.wheel').index(dSlot);
                    // 取得答案內容
                    resultData[optionIndex] = dSelf.find('li').eq(finalNumbers - 1)

                    slotCounts++;
                    if (slotCounts === dSlotBox.length) {
                        setTab(2);
                        //dSend.removeClass('fd-btn-disabled').addClass('fd-btn-enter');
                        dShare.removeClass('fd-btn-disabled').addClass('fd-btn-enter');

                        setTimeout(function () {
                            dShare.click();
                            //shareContent();
                        }, 2000);
                        
                    }
                }
            });
        };

        // run
        FBUtil.after(function (FB) {
            FB.getLoginStatus(function (response) {
                if (response.status === 'connected') {
                    FB.api('/me/friends', function (response) {
                        var friendData = response.data;
                        
                        if (friendData && friendData.length > 0) {
                            $.each(friendData, function (index, value) {
                                if (index <= FRIENDS_FACEBOOK_MAX) {
                                    friendsArr.push({
                                        dataIndex: index,
                                        friendName: value.name,
                                        friendID: value.id,
                                        friendoImgUrl: 'http://graph.facebook.com/' + value.id + '/picture?width=140&height=140'
                                    });
                                } else {
                                    return false;
                                }
                            }); 
                        }
                        else {
                            friendsArr.push({
                                dataIndex: 0,
                                friendName: '原味千尋',
                                friendID: 0,
                                friendoImgUrl: 'http://friendoprod.blob.core.windows.net/ipage/mission/collecttemplate/daintiest/images/logo_daintiest.png'
                            }); 
                        }
                        
                        // init slot
                        initSlotMc();
                    });
                } else {
                    //(friendo not login) or (fb not login)
                    FB.login(function () { }, { scope: 'public_profile,email,user_friends,publish_actions,publish_stream' });
                }
            });
        });
    }
};

(function () {
    var doWhileExist = function (ModuleID, objFunction) {
        var dTarget = document.getElementById(ModuleID);
        if (dTarget) {
            objFunction(dTarget);
        }
    };
    $.when(
        $.getScript('http://friendoprod.blob.core.windows.net/ipage/mission/content_generator/daintiest/lib/jquery.easing.1.3.js'),
        $.getScript('http://friendoprod.blob.core.windows.net/ipage/mission/content_generator/daintiest/lib/jquery.jSlots.custom.js')
    ).done(function () {
        //place your code here, the scripts are all loaded
        doWhileExist('suitID_secretGeneratorExecution', missionDaintiest.module.secretGeneratorExecution);
        doWhileExist('suitID_secretGeneratorResult', missionDaintiest.module.secretGeneratorResult);
        doWhileExist('suitID_secretGeneratorSummary', missionDaintiest.module.secretGeneratorSummary);
    }).fail(function () {
        alert('任務腳本載入失敗！ \n請稍後嘗試或聯繫客服人員。');
    });
})();