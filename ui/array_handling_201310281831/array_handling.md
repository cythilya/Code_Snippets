##JavaScript Array Handling

###Array
- Zero-indexed
- Ordered lists of values
- A set of related items of the same type
***
###Create an array
宣告一個空陣列，再加入值 -- object constructor or literal declaration

	//create empty array
	var arr1 = new Array(); //use the object constructor to create array
	var arr2 = []; //use literal declaration to create array

output:  
arr1 = []  
arr2 = []	
 
宣告一個有初始值的陣列

	//create array with initial value
	var arr3 = new Array(1, 2, 3, 4, 5);
	var arr4 = [1, 2, 3, 4, 5];

output:  
arr3 = [1, 2, 3, 4, 5]   
arr4 = [1, 2, 3, 4, 5] 

[Note] The literal declaration is generally preferred. See the [Google Coding Guidelines](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml#Array_and_Object_literals) for more information.
***
###Add value 
設值 -- 使用push或指定index

	//add value to empty array
	arr1.push("apple", "boy"); //add value by "push"
	arr2[0] = "cat"; //add value by index
	arr2[2] = "doll"

	//add value to initialed array
	arr3.push(6, 7, 8);
	arr4.push(9);
	arr4[7] = 10;

output:  
arr1 = ["apple", "boy"]   
arr2 = ["cat", undefined × 1, "doll"]   
arr3 = [1, 2, 3, 4, 5, 6, 7, 8]   
arr4 = [1, 2, 3, 4, 5, 9, undefined × 1, 10]  

[Note]  
Add values by 

- .push(): add an element on the end of the array
- add items by index (missing indices will be filled with **undefined**, see example above)

###Access an array by index
	//access an array by index
	console.log("array[1] = " + arr1[1]);

output:  
array[1] = boy 
***
###Array methods and properties
####.length
用來取得陣列中的元素個數。

	//.length
	var arr5 = ["elephant", "friend", "giant", "hat", "ice"];
	console.log("amount of items in arr5 = " + arr5.length); 

output:  
amount of items in arr5 = 5

[Note] print all elements in array: using for/in loops  
	
	//for loop
	for(var i = 0 ; i < arr5.length ; i++){
		console.log("arr5[" + i + "] = " + arr5[i]);
	}

	//use "in" in for loop 
	for(var i in arr5){
		console.log("arr5[" + i + "] = " + arr5[i]);
	}

output:  
arr5[0] = elephant  
arr5[1] = friend  
arr5[2] = giant  
arr5[3] = hat  
arr5[4] = ice 
***
####.concat()
用來連接兩個以上的陣列，回傳一個新陣列儲存結合的結果，不影響原先輸入的陣列。

	//concat
	var arr6 = ["jacket", "kite", "lion"];
	var arr7 = ["monkey", "nine", "orange"];
	var arr8 = ["pie"];
	var joinResult1 = [];
	var joinResult2 = [];
	var joinResult3 = [];

	joinResult1 = arr6.concat(arr7);
	joinResult2 = arr7.concat(arr6);
	joinResult3 = joinResult1.concat(arr8);

	console.log("concat arr6 and arr7 = " + joinResult1);
	console.log("concat arr7 and arr6 = " + joinResult2);
	console.log("concat arr6, arr7 and arr8 = " + joinResult3);

output:  
concat arr6 and arr7 = jacket,kite,lion,monkey,nine,orange  
concat arr7 and arr6 = monkey,nine,orange,jacket,kite,lion  
concat arr6, arr7 and arr8 = jacket,kite,lion,monkey,nine,orange,pie  
***
####.join()
- return array content in string format
- be called with argument as seperator 

	`console.log("arr6 seperates with comma: " + arr6.join(",")); `

output:  
arr6 seperates with comma: jacket,kite,lion 
***
####.pop()
- remove the last element of an array
- opposite method: .push()  

    	//pop the last element "ticket"
    	var arr9 = ["queen", "rabbit", "super", "ticket"];
   		console.log("before pop: " + arr9);
   		arr9.pop();
   		console.log("after pop: " + arr9);
   		arr9.pop();

output:  
before pop: queen,rabbit,super,ticket  
after pop: queen,rabbit,super  
***
####.reverse()
陣列中的元素順序反轉。(The elements of the array are in reverse order after calling this method.)

	//.reverse()
	console.log("arr5 bofore reverse: " + arr5);
	arr5.reverse();
	console.log("arr5 after reverse: " + arr5);

output:  
arr5 bofore reverse: elephant,friend,giant,hat,ice  
arr5 after reverse: ice,hat,giant,friend,elephant 
***
####.shift()
- removes the first element of an array
- recreate the method of a queue with .push() and .shift()

    	//.shift()
    	console.log("arr6 before shift: " + arr6);
    	arr6.shift();
    	console.log("arr6 after shift: " + arr6);

output:  
arr6 before shift: jacket,kite,lion  
arr6 after shift: kite,lion 
***
####.slice()
切割陣列，輸入欲切割的起始點，回傳切割後的陣列。
不破壞原本輸入的陣列。

	//.slice()
	var arr10 = ["under", "visa", "window", "x-men", "yoyo", "zip"];
	var sliceResult = [];
	console.log("arr10 before slice: " + arr10);
	sliceResult = arr10.slice(3);
	console.log("arr10 after slice: " + arr10);
	console.log("slice result: " + sliceResult);

output:  
arr10 before slice: under,visa,window,x-men,yoyo,zip  
arr10 after slice: under,visa,window,x-men,yoyo,zip  
slice result: x-men,yoyo,zip  
***
####.splice()
- removes a certain amount of elements and adds new ones at the given index
- at least three parameters, EX: myArray.splice( index, length, values, ... );

		console.log("arr10 before splice: " + arr10);
		console.log("amount of arr10: " + arr10.length);
		arr10.splice(2, 2, "splice-apple", "splice-boy", "splice-cat", "splice-dog", "splice-elephant");
		console.log("arr10 after splice: " + arr10);
		console.log("amount of arr10: " + arr10.length);

output:  
arr10 before splice: under,visa,window,x-men,yoyo,zip  
amount of arr10: 6  
arr10 after splice: under,visa,splice-apple,splice-boy,splice-cat,splice-dog,splice-elephant,yoyo,zip  
amount of arr10: 9   

[Note]

- 第一個參數2從陣列的第幾個開始(在此是第二個)
- 第二個參數2是刪除原本陣列中的幾個元素,在此刪掉兩個(window,x-men)
- 後方接的是插入陣列的元素值 "splice-apple", "splice-boy", "splice-cat", "splice-dog", "splice-elephant" 共5個
***
####.sort()
對陣列做排序。

	//預設是升冪排序
	var arr11 = ["boy", "apple", "zip", "cat", "goat", "window"];
	console.log("arr11 before sort: " + arr11);
	arr11.sort();
	console.log("arr11 after sort: " + arr11);

output:  
arr11 before sort: boy,apple,zip,cat,goat,window  
arr11 after sort: apple,boy,cat,goat,window,zip  

	//降冪排序
	//sort with comparing function
	function descending(a, b){
	    return b-a;
	}

	var arr12 = [2, 1, 6, 3, 4, 10];
	arr12.sort(descending);
	console.log("arr12 after sort(descending): " + arr12);

output:  
arr12 after sort(descending): 10,6,4,3,2,1  
***
####.unshift()
在陣列中的第一個位子插入元素。

	//.unshift()
	var arr13 = [1, 2, 3];
	arr13.unshift(5);
	console.log("arr13 unshift 5: " + arr13);
	arr13.unshift(10);
	console.log("arr13 unshift 10: " + arr13);

利用.shift()和.unshift()可實作stack

	//implement a stack: FILO
	var stack = [];
	
	//push elements into stack
	stack.unshift("apple"); //1st
	stack.unshift("boy"); //2en
	stack.unshift("cat"); //3rd

	//pop elements from stack
	console.log("stack content: " + stack);
	stack.shift(); //pop "cat"
	console.log("stack content: " + stack);
	stack.shift(); //pop "boy"
	console.log("stack content: " + stack);

output:  
stack content: cat,boy,apple  
stack content: boy,apple  
stack content: apple  
***
####.forEach()
對陣列中的每個元素執行.forEach()中的method一次。

	// native .forEach()
	function printWithStar(element){
		console.log("*" + element);
	}
	 
	var arr14 = [ 1, 2, 3, 4, 5 ];
	arr14.forEach(printWithStar);

output:  
*-1  
*-2  
*-3  
*-4  
*-5   
***
###jQuery.each()
	//$.each()
	$.each(arr11, function(index, value){
		console.log("arr11[" + index + "]: " + value);
	});

output:  
arr11[0]: apple  
arr11[1]: boy  
arr11[2]: cat  
arr11[3]: goat  
arr11[4]: window  
arr11[5]: zip  

[Note] 使用對象

 - $.each(collection, function(index, value){}): 物件或陣列，Ref: [.each()](http://api.jquery.com/jQuery.each/)
 - collection.each(function(index, value){}): 物件，Ref: [jQuery.each()](http://api.jquery.com/jQuery.each/)
***
More Info:  
[JavaScript Array Handling Demo](http://codepen.io/cythilya/full/uJHkp)  
[JavaScript Array Handling Source Code](http://codepen.io/cythilya/pen/uJHkp)
***
Ref:

- [Arrays](http://learn.jquery.com/javascript-101/arrays/)
- [JavaScript Array Object](http://www.w3schools.com/js/js_obj_array.asp)