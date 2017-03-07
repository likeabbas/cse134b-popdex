var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('data.json', 'utf8'));
var firebase = require('firebase');


var makeKey = function(str) {
    invalidChars = ["\.", "#", "$", "[", "]"];
    for(var inv in invalidChars) {
        str = str.replace(invalidChars[inv], "");
    }
    str = str.replace(" ", "_");
    return str;
}

var findEdition = function(list) {
    for(var i = 0; i < list.length; i++) {
        var idx;
        if((idx = list[0].indexOf("#")) != -1) {
            return list[0].substring(idx + 1, list[0].length);
        }
    }
    return undefined;
}
var list = [];
for (var i = 0; i < obj.length; i++) {
	elem = obj[i];
	if (!(elem.television in list)) {
		list[elem.television] = [];
	}
	if(!(elem.shows in list[elem.television])) {
		list[elem.television][elem.shows] = [];
	}

	pop = {};
	pop.name = elem.name;
	pop.price = elem.price;
	pop.picture_src = elem['picture-src'];
	pop.attributes = elem.numberinseries.split("\n");
    var edition = undefined;
    if((edition =  findEdition(pop.attributes)) != undefined) {
        pop.edition = edition;
    };

	list[elem.television][elem.shows].push(pop);
	console.log(pop);

}
/*var app = firebase.initializeApp( {
ServiceAccount: {
{	projectID*/

var config = {
apiKey: "AIzaSyB5wB7nH0xRovf3iZ2QnCcF_LAD3mGBE6s",
	authDomain: "popsdex-475f1.firebaseapp.com",
	databaseURL: "https://popsdex-475f1.firebaseio.com",
	storageBucket: "popsdex-475f1.appspot.com",
	messagingSenderId: "388031530033"
};
firebase.initializeApp(config);

var db = firebase.database();
console.log(Object.keys(list));
var keys = Object.keys(list);
for (var brand in list) {
    console.log("for brand " + brand);
	console.log(brand);
	for(var subBrand in list[brand]) {
        console.log("subBrand " + subBrand);
        var key = makeKey('/' + brand + '/' + subBrand);
        console.log(key);
        var ref = db.ref(key);
        var items = list[brand][subBrand];
        for(var i = 0; i < items.length; i++) {
            console.log(items[i]);
            console.log("after item");
            if(items[i].edition != undefined) {
                var specRef = ref.child(items[i].edition);
                specRef.set(items[i]);
            } else {
                ref.push(items[i]);
            }
            
        }
        console.log("after item loop");
		
	}
}
console.log("after all loops");
//console.log(list);
