// Official documentation http://es6-features.org/#Constants
// Babel ES2015 (ES6) introduction  https://babeljs.io/docs/en/learn
// Set up babel transpiler https://hackernoon.com/quickstart-guide-to-using-es6-with-babel-node-and-intellij-a83670afbc49

/** Arrow function */
var createGreeting = function(message, name) {
    return message + name;
}
console.log(createGreeting('Hi ', 'Vanilla function'));

// The function statement basically moves after the arguments and turns into an arrow (From a semantic perspective)
var arrowGreeting = (message, name) => {
    return message + name;
}
console.log(arrowGreeting('Hi ', 'arrow function'));

// This simplified version can be used where the amount of code in the function can be expressed as one single object return
var simplifiedGreeting = (message, name) => message + name;
console.log(simplifiedGreeting('Hi ', 'no curly brackets no return statement function'));

var square = x => x*x;
console.log(square(5)); // 25
console.log('Square function without parenthesis surrounding the param names -- Only applies for one single parameter functions')

// Regular example of how we manage scoping issues pre ES6 (Create a variable that will contain our this reference and use it inside our callbacks)
var deliveryBoy = {
    name: "John",

    handleMessage: function (message, handler) {
        handler(message);
    },

    receive: function () {
        // That needs to be created in order to catch the name from the parent scope
        var that = this;

        this.handleMessage("Hello, ", function(message) {
            that.name //get the proper name
            console.log(message + that.name);
        })
    },

    // The variable *this* now refers to the outer scope outside of this function, avoiding the need to create the *that* variable
    receiveArrow: function () {
        this.handleMessage("Hello arrow, ", message => console.log(message + this.name))
    }

}

deliveryBoy.receive(); // Hello, John
deliveryBoy.receiveArrow(); // Hello arrow, John


/** The let keyword */
var message = "hi";
{
    var message = "bye";
}
console.log(message); // bye

var message = "hi";
function greet(){ // JS scoping will create a new message variable here that has nothing to do with our already existing message variable
    var message = "bye";
}
console.log(message); // hi

let messageLet = "hi";
{
    // In ES6 block scoping was introduced (https://www.w3schools.com/js/js_let.asp)
    let messageLet = "bye";
}
console.log(messageLet); // hi

var fs = [];
for(var i = 0; i < 10; i++) {
    fs.push(function (){
        console.log(i);
    })
}
// You'd think that we'd get zero through 9, but in fact when we run this we'll get 10's, because this i is that same i being used and reassigned each time.
fs.forEach(function (f) {
    f();  // 10 10 10 10 10 10 10 10 10 10
})

/* If I use let instead of var now, and rerun this, you'll see that I get zero through 9, and it stops before getting to 10, because this is creating a new i each time you go through the for loop. */
var fs = [];
for(let i = 0; i < 10; i++) {
    fs.push(function (){
        console.log(i); // 0 1 2 3 4 5 6 7 8 9
    })
}


/** Default arguments */
// For PHP developer this is a very familiar feature
function greet2(greeting, name){
    console.log(greeting + ", " + name);
}
greet2(); // undefined, undefined

function greet3(greeting, name = "John"){
    console.log(greeting + ", " + name);
}
greet3("Hello"); // Hello, John

function receive(complete){
    complete();
}

try {
    receive(); // complete is not a function  - Exception
} catch (e) {
   console.log(e.message);
}

function receive2(complete){
    complete();
}

receive2(function(){
    console.log("complete");
}); // complete

function receive3(complete = () => console.log("complete")){
    complete();
}
receive3(); // complete


/** const declaration */
const VALUE = 'hello world';
try {
    /* In the example if I try to reassign the value to foo bar, we'll see the value is read only error thrown, because we have declared this variable as a constant. It's important to understand
    that what a const is, is not actually a constant variable, but a constant reference. */
    VALUE = 'foo bar'; // exception thrown (Assignment to constant variable.)
} catch (e) {
    console.log(e.message);
}
console.log('value: ', VALUE); // value:  hello world

/* const declarations adhere to block scope. Block scope can simply be understood as anything between two curly brackets. */
if(true){
    const foo = 'bar';
}
try {
    console.log('foo: ', foo); // foo is not defined -- Exception
} catch (e) {
    console.log(e.message);
}

const VALUEOBJ = {};
// In this case only VALUEOBJ = newObject will throw and error, but properties of the object can be modified and added without any problem
VALUEOBJ.foo = 'bar';
console.log('value: ', VALUEOBJ);


/** Shorthand properties */
/* Where destructuring in ES6 allows you to easily get properties out of an object, this shorthand property syntax allows you to easily push properties in. It's like destructuring backwards. */
let firstName = "John";
let lastName = "Lindquist";
let person = {firstName, lastName}
console.log(person); // { firstName: 'John', lastName: 'Lindquist' }

let mascot = "Moose";
let team = {person, mascot};
console.log(team);  /* { person: { firstName: 'John', lastName: 'Lindquist' },
                    mascot: 'Moose' } */


/** Object Enhancements */
var color = "red";
var speed = 10;
var car = {color, speed};
console.log(car.color); // "red"
console.log(car.speed); // 10

// ES6
var car = {color, speed}
// ES5
var car = {color:color, speed:speed};

var color = "red";
var speed = 10;
function go() {
    console.log("vroom");
}
var car = {color, speed, go};
car.go(); // "vroom"

// ES6
var car = {
    color,
    speed,
    go(){ // It's basically a shorthand that saves you some typing.
        console.log("vroom");
    }
};

// ES5
var car = {
    color,
    speed,
    go: function(){
        console.log("vroom");
    }
};

var drive = "go";
var car = {
    color,
    speed,
    [drive]: function(){ /* If you type something like this, you can actually have a computed property where it'll evaluate this. This is pretty much just like if you were to do car["go"] like that,
                         but now you're doing it inline inside of an object declaration. */
        console.log("vroom");
    }
};


/** Spread operator */
console.log([ 1, 2, 3]); // [1, 2, 3]
console.log(...[ 1, 2, 3]) // 1 2 3

let first = [ 1, 2, 3];
let second = [ 4, 5, 6];
first.push(second);
console.log(first); // [ 1, 2, 3, [ 4, 5, 6] ]

first = [ 1, 2, 3];
first.push(...second);
console.log(first); // [1, 2, 3, 4, 5, 6]

/* This even works for doing things like pushing in an array of parameters. If I want to addThreeThings and then push in my first collection there,
hit run, you can see I get six, which is one plus two plus three.*/
function addThreeThings( a, b, c){
    let result = a + b + c;
    console.log(result); // 6
}
addThreeThings(...first);


/** Template literal */
var salutation = "Hello";
var greeting = salutation + ", World";
console.log(greeting); // Hello, World

/* Instead of doing plus and then quote, I'll just surround the whole sentence with a grave, then surround this guy (salutation variable) with the dollar sign, curly brace, and then close curly brace.
You'll see if I rerun this, I'll get Hello , World. */
var greeting = `${salutation}, World`;
console.log(greeting); // Hello, World

// It actually respects white space even across multiple lines.
var greeting = `
${salutation}, 

    World
`;
console.log(greeting);
/*

Hello,

    World
*/

// It's also worth noting that you can do expressions inside of these braces.
var x = 1;
var y = 2;
var equation = `${ x } + ${ y } = ${x + y}`
console.log(equation); // "1 + 2 = 3"

var message = `Its ${new Date().getHours()} Im sleepy`;
console.log(message); // "It's 15 I'm sleepy"

function tag(strings, ...values){
    if(values[0] < 20){
        values[1] = "awake";
    }

    return `${strings[0]}${values[0]}${strings[1]}${values[1]}`
}
// I'm going to create a function called, tag(), and notice I don't put any sort of parameters or anything around this. I just type the function name.
var message = tag`Its ${new Date().getHours()} Im ${""}`;
console.log(message); // "It's 15 I'm awake"


/** Destructing assignment */
/* Typically in JavaScript if you have an object with a property and a value, and you want to log out this value, you would do some sort of assignment.  */
var obj = {
    color: "blue"
}
console.log(obj.color); // blue

/* Destructuring allows you to do this in a little bit different way where, instead of doing this sort of assignment, I would say look up the color property and make that available so that I can just
log out color and when I run this again, I'll just get blue again. */
var {color} = {
    color: "blue"
}
console.log(color); // blue

var {color, position} = {
    color: "blue",
    name: "John",
    state: "New York",
    position: "Forward"
}
console.log(color); // blue
console.log(position); // Forward

function generateObj() {
    return {
        color: "blue",
        name: "John",
        state: "New York",
        position: "Forward"
    }
}
var {name, state} = generateObj();
console.log(name); // John
console.log(state); // New York

// If you want these named something else, you can actually just put a colon in here. I'll say first name and I'll say location.
var {name:firstname, state:location} = generateObj();
console.log(firstname); // John
console.log(location); // New York

var [firstItem,,,,fifthItem] = ["red", "yellow", "green", "blue", "orange"]
console.log(firstItem); // red
console.log(fifthItem); // orange

var people = [
    {
        "firstName": "Skyler",
        "lastName": "Carroll",
        "phone": "1-429-754-5027",
        "email": "Cras.vehicula.alique@diamProin.ca",
        "address": "P.O. Box 171, 1135 Feugiat St."
    },
    {
        "firstName": "Kylynn",
        "lastName": "Madden",
        "phone": "1-637-627-2810",
        "email": "mollis.Duis@ante.co.uk",
        "address": "993-6353 Aliquet, Street"
    },
]
people.forEach(({firstName})=> console.log(firstName))
/*
Skyler
Kylynn
*/

var [,Kylynn] = people;
function logEmail({email}){
    console.log(email);
}
logEmail(Kylynn); // mollis.Duis@ante.co.uk


/** Import and export */
// @see math/addition.js
// export { sumTwo, sumThree }
import {sumTwo,sumThree} from "./math/addition";
console.log(
    "Exporting the functions after declaring them",
    "2 + 3 =",
    sumTwo(2, 3),
    "2 + 3 + 4 =",
    sumThree(2, 3, 4)
);

// export function sumTwoV2(a,b){...
// export function sumThreeV2(a, b =, c){...
import {sumTwoV2, sumThreeV2} from "./math/addition2"
console.log(
    "Exporting the functions directly from their declaration",
    "2 + 3 =",
    sumTwoV2(2, 3),
    "2 + 3 + 4 =",
    sumThreeV2(2, 3, 4)
);

import { sumTwo as addTwoNumbers } from "./math/addition"
console.log(
    "Changing the function name",
    "2 + 3 =",
    addTwoNumbers(2, 3)
);

import * as addition from "./math/addition";
console.log(
  "Importing all functions as an object =",
  "1 + 3",
  addition.sumTwo(1, 3)
);

// Importing a variable that was exported on a different file
import {users} from "./data/users";
console.log(users);


/** Converting an array-like object into an Array with Array.from() */
/*
* Suppose that the query selector returns an array like this:
*   [li.product, li.product,li.product, li.product]
* Where each li.product is an instance of NodeList, and the problem with the NodeList is that it's like an array but it's not an array, so it doesn't have all of the
* typical array methods that we want to use like filter, and forEach, and reduce.
* */
var document = {
    querySelectorAll: () => []
}; // Create a dummy document variable in order to avoid undefined exception

// Array.from() lets you convert an "iterable" object (AKA an array-like object) to an array.
const products =
    Array.from(document.querySelectorAll('.product'));

products
    .filter(product => parseFloat(product.innerHTML) < 10)
    .forEach(product => product.style.color = 'red');


/** Generators */
/* Generators in ECMAscript 6 are first-class co-routines that produce encapsulated suspended execution contexts. Yield values and iterate over them until no more values exist in the generator. */

// You make a generator by adding asterisks right here after the function keyword.
function* greetGen() {
    console.log('You called next()');
}

let greeter = greetGen();
console.log(greeter); // { next: [Function], throw: [Function] }

let next = greeter.next();
console.log(next);


// TODO: Finish this chapter -- At this point we are not using generators -- I think we should! https://egghead.io/courses/write-simple-asynchronous-code-with-javascript-generators

/** Maps and WeakMaps */
/* The map object is just a simple key value map. JavaScript objects and maps are very similar to each other, and before the introduction of maps in ES6, objects were used in order to keep track of different key
value pairs.
However, maps does offer us a few bonuses that we don't get from objects. For example, an object has a prototype, so by default, there are keys in the map whether the user has added them or not. Secondly, an object
key has to be a string, whereas in a map, it can be anything from a function, to an object, to all other types of primitives.
Lastly, maps have methods on them that allow you to easily get the size of and keep track of the size of your map, whereas to objects, there's no innate method that allows you to quickly get those answers. */
let myMap = new Map();
// API
/*
set()
get()
size
clear()
has()
*/
myMap.set('foo', 'bar');
myMap.set('hello', 'world');
console.log(myMap.get('foo')); // bar
console.log(myMap.has('foo')) // true
console.log(myMap.has('qwerty')) // false
/* Map gives us several iterators that we can use to go over our map to access the keys, values, and entries. Those are the keys method, the entries method, and the values method. To get an idea of what that looks
like, let's go ahead and create a for-of loop in here, and we'll do for(var key of = myMap.keys(), and we'll console.log out each key. */
for(var key of myMap.keys()){
    console.log(key)
    // "foo"
    // "hello"
}
for(var value of myMap.values()){
    console.log(value)
    // "bar"
    // "world"
}
for([key, value] of myMap.entries()){
    console.log(key + ' = ' + value);
    // "foo = bar"
    // "hello = world"
}
myMap.clear();
console.log(myMap.size); // 0

var myObj = {};
var myFunc = function(){};
myMap.set(myObj, 'bar');
myMap.set(myFunc, 'world');
console.log(myMap.get(myObj));// "[object Object] = bar"
console.log(myMap.get(myFunc));// "function myFunc() {} = world"

/* What a weakMap means is that no references are held to the keys of the map. With no references being held to the keys of the map, it allows it to be available for automatic garbage collection that's
available to us in JavaScript.
Because no references are kept to the keys, that means that they are innumerable, or we cannot iterate over them. Because of this, the options of what is available for us to use as keys in our map is
limited when using weakMaps. */
let myWeakMap = new WeakMap();
const keyWeakMap = { foo: 1 };
myWeakMap.set(keyWeakMap, 1);
// WeakMap instances have the same set and get signature as Maps with one extra restriction: keys must be Objects:
// myWeakMap.set('string', 2); will throw an exception: "TypeError: Invalid value used as weak map key"
console.log(myWeakMap.get(keyWeakMap)); // 1


/** Parameter object destructuring with required values */
// http://2ality.com/2016/05/six-nifty-es6-tricks.html
/* What we have here is an AJAX function using ESX parameter object to structuring and we're providing default values. As you can see, when we call our AJAX function we're getting not only the values
we passed into the function, but we're also getting default values for the things we didn't pass like type, data, and is async.

Instead of setting a default value for the URL property, we're going to call our required parameter function instead. What will happen is, if our AJAX function is called without a URL property, the
required parameter function will be invoked instead resulting in an error exception saying, "Missing parameter URL." Likewise, we could do the same thing for the success property. */
function ajax(
    {
        type = "get",
        url = requiredParameter("url"),
        data = {},
        success = requiredParameter("success"),
        error = () => {},
        isAsync = true
    } = {} ) {
    console.log(JSON.stringify({ type, url, data, success, error, isAsync }, null, 2));
}

function requiredParameter(name) {
    throw new Error(`Missing parameter "${name}"`);
}

try {
    ajax({
        url: "https://my.api.io",
    });
} catch (e) {
    console.warn(e.message); // Missing parameter "success"
}


/** Rest Parameters */
/* What the arguments keyword does is return back to us an array like object of all the arguments that we're passing to our function. */
function myFunction() {
    console.log(typeof arguments); // Object -- While arguments is array like, it does not have all of the methods that the array prototype has on it.
    console.log(arguments.length); // 3
}

myFunction(1, 2, 3);


function Store() {
    var aisle = {
        fruit: [],
        vegetable: []
    }
    return {
        //Store().add('category', 'item1', 'item2');
        /* let's simplify this with the new rest parameters of ES6. The way that we access this is by doing three dots, followed by the variable we want to represent the array of the remaining arguments.*/
        add: function(category, ...items) {
            /* with ES5 the way that we turned our array like arguments into an actual array was to use the splice call hack. The way we did this was we called splice on an array, and then we called
            it with our arguments, starting with the first index. What this does is exclude the category argument, but takes the remaining arguments, and puts them into an array that we've called items. */
            //var items = [].splice.call(arguments, 1);
            console.log(items); // [ 'apples', 'oranges' ]
            items.forEach(function(value, index, array) {
                aisle[category].push(value);
            });
        },
        aisle: aisle
    }
}
var myGroceryStore = new Store();
myGroceryStore.add('fruit', 'apples', 'oranges');
console.log(myGroceryStore.aisle); // { fruit: [ 'apples', 'oranges' ], vegetable: [] }

/** Promises with ES6 */
// The callback inside of a promise takes two arguments, resolve and reject.
var d = new Promise((resolve, reject) => {
        if (true) {
            resolve('Hello world');
        } else {
            reject('Not good');
        }
    });

/* Promises can either be resolved or rejected. When you resolve a promise, the .then() will fire, and when you reject a promise, the .catch() will fire instead. Usually,
inside of your promise, you have some sort of logic that decides whether you're going to reject or resolve the promise. */
d.then((data) => console.log('success', data)); // success Hello world -- will be triggered because the promise was resolved with the Hello world message
d.catch((error) => console.error('error', error));
/* If this catch would have been triggered an UnhandledPromiseRejectionWarning message would have been thrown see https://thecodebarbarian.com/unhandled-promise-rejections-in-node.js.html
It turns out that then() returns a new promise that, in this case, gets resolved with the parent promise value, which is rejected. So the new promise rejection is not being catch.
To catch it simple chain both methods: d.then().catch(). */

/* Promises are useful for a lot of things. Most importantly, they allow you to perform asynchronous operations in a synchronous-like manner. */
var d2 = new Promise(((resolve, reject) => {
    setTimeout(() => {
        if (false) {
            resolve('Hello world');
        } else {
            reject('async Not good');
        }
    }, 2000);
}));

d2.then(
    (data) => console.log('success', data)
).catch(
    (error) => console.error('error', error) // error Not good -- will be displayed after two seconds because of the time out
);

/* There's several different methods you can use when dealing with your .then() and .catch() callbacks. If you don't prefer to use the .catch()
method, you could then, instead, supply a second argument into the .then() method, which will act as an error callback. */
var d3 = new Promise(((resolve, reject) => {
    reject('Always reject');
}));
d3.then ((data) => console.log('success : ', data), (error) => {
    console.error('new error msg: ', error);
});

/* One more important thing to note is that whenever an error or exception is thrown within the promise, it will automatically trigger the .catch() to call, regardless of when that error's thrown.
To see a basic example of this, let's go ahead and throw a new error, run our code again, and we'll notice that this time our error is returned to us, even though we're evaluating true, which means
our resolve should fire. This statement remains true, regardless of when the error's thrown throughout the promise.*/
var d4 = new Promise((resolve, reject) => {
    throw new Error('error thrown!');
    setTimeout(() => {
        if (true) {
            resolve('hello world');
        } else {
            reject('no bueno');
        }
    }, 2000);
});
d4.then()
    .catch(
        error => console.log('error', error.message)
    );
