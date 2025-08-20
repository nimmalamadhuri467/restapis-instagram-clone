class Person1 { //base class
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  talk() {
    console.log(`Hi, I am ${this.name}`);
  }
}

class Student extends Person1 {
  constructor(name, age, marks) {
    super(name, age); // parent class constructor is being called
    this.marks = marks;
  }
}
let s=new Student("kiran",45,78)

class Teacher extends Person1 {
  constructor(name, age, subject) {
    super(name, age); // parent class constructor is being called
    this.subject = subject;
  }
}

let t=new Teacher("priya",92,"english")