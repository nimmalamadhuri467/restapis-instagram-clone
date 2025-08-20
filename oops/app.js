// let arr=[1,2,3,40]
// arr.sayhello=()=>{
//     console.log("iam a array")

// }

// // arr.__proto__.push = (n) => {console.log("pushing number: ", n);}
// factory function
// function PersonMaker(name, age) {
//   const person = {
//     name: name,
//     age: age,
//     talk() {
//       console.log(`Hi, my name is ${this.name}`);
//     },
//   };
//   return person;
// }
// p1=PersonMaker("rads","12")
// console.log(p1)

// p1.talk()
// app.js:14 Hi, my name is rads

// new operator
// function Person(name, age) {
//   this.name = name;
//   this.age = age;
// }

// // Define the method once on the prototype
// Person.prototype.talk = function() {
//   console.log(`Hi, my name is ${this.name}`);
// };

// // Use the `new` keyword to create an instance
// const p1 = new Person("rads", 12);

// // Test it
// console.log(p1);       // Outputs: Person { name: 'rads', age: 12 }
// p1.talk();             // Outputs: Hi, my name is rads

// classes 

// Define the class properly
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  // Define the method inside the class
  talk() {
    console.log(`Hi, my name is ${this.name}`);
  }
}

// Create an instance
let p1 = new Person("rads", 12);

// Test it
console.log(p1);       // Outputs: Person { name: 'rads', age: 12 }
p1.talk();             // Outputs: Hi, my name is rads
