var validator = {
	types: {}, //all available checks
	messages: [], //error messages in the current validation session
	config: {}, //current validation config name: validation type
	validate: function (data) { // the interface method 'data' is key => value pairs
		var i, 
			msg, 
			type, 
			checker, 
			result_ok;
		this.messages = []; //reset all messages

		for(i in data) {
			if(data.hasOwnProperty(i)) {
				type = this.config[i];
				checker = this.types[type];
				if(!type) {
					continue; //no need to validate
				}
				if(!checker) { 
					throw {
						name: "ValidationError",
						message: "No handler to validate type " + type
					};
				}
				result_ok = checker.validate(data[i]);
				if(!result_ok) {
					msg = "Invalid value for *" + i + "*, " + checker.instructions;
					this.messages.push(msg);
				}
			}
		}
		return this.hasErrors();
	},
	//helper
	hasErrors:function () {
		return this.messages.length !== 0;
	}
};

//checks for non-empty values
validator.types.isNonEmpty = {
	validate:function (value) {
		return value !== "";
	},
	instructions: "the value cannot be empty"
};

//checks if a value is a number
validator.types.isNumber = {
	validate:function (value) {
		return !isNaN(value);
	},
	instructions: "the value can only be a valid number, e.g. 1, 3.14 or 2010"
};

//checks if the value contains only letters and numbers
validator.types.isAlphaNum = {
	validate:function (value) {
		return !/[^a-z0-9]/i.test(value);
	},
	instructions: "the value can only contain characters and numbers, no special symbols"
};

validator.types.isEmail = {
	validate: function(value){
		var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    	return re.test(value);		
	},
	instructions: 'use valid email format, e.g. @'
};

validator.types.minSize = {
	validate: function(value){
    	return value.length >= 3;		
	},
	instructions: 'min size is 3 characters'
};

validator.types.maxSize = {
	validate: function(value){
		return value.length <= 10;
	},
	instructions: 'max size is 10 characters'
};

/***
validate types:
	- isNonEmpty
	- isNumber
	- isAlphaNum
	- isEmail
	- minSize
	- maxSize
***/
//test
var data = {
	first_name: 'Super',
	last_name: 'Man',
	age: 'unknown',
	username: 'o_O',
	email: 'example@gmail.com',
	confirm_email: 'invalid_email_sample',
	password: '12'
};

validator.config = {
	first_name: 'isNonEmpty',
	last_name: 'maxSize',
	age: 'isNumber',
	username: 'isAlphaNum',
	email: 'isEmail',
	confirm_email: 'isEmail',
	password: 'minSize'	
};

validator.validate(data);
if (validator.hasErrors()) {
	console.log(validator.messages.join("\n"));
}