interface Person {
  name: string;
  age: number;
}

const person1: Person = { name: "Jack", age: 36 };
const person2: Person = { name: "Jasmine", age: 33 };

const people: Person[] = [person1, person2];

function sortByAge(arr: Person[]) {
  // Custom sort function to sort by age
  arr.sort((a, b) => {
    return a.age - b.age;
  });
}

sortByAge(people);

console.log(people); // Output will be sorted by age
