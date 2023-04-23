import { dogsData } from "./data";
import { useState } from "react";
import { v1 as generateUniqueID } from "uuid";
import DogDetails from "./DogDetails";


function App() {
  const [dogs, setDogs] = useState(dogsData);

function addDog() {
  // Create a new dog named Rover
  // give the dog a "unique" id
  // normally a database would handle the unique id logic for you
  const rover = {
    id: generateUniqueID(),
    name: "Rover",
    present: false,
    grade: "100",
    notes: "The goodest new dog",
  };

  // make a copy of the dogs array using destructuring
  // add rover, in this case the dog is added to the first array position
  // what would you need to change to add him as the last array item?
  setDogs([rover, ...dogs]);
}

function removeDog(dogID) {
  // use the filter method to remove any dogs that have a matching id
  const filteredDogArray = dogs.filter((dog) => dog.id !== dogID);
  // set the dogs array to the new array that will not have the removed dog
  setDogs(filteredDogArray);
}

function updateDogAttendance(dogId) {
  // Copy the dogs array so that the copy can be updated
  const dogArray = [...dogs];
  // Find the dog with the matching id number's array position
  const index = dogArray.findIndex((dog) => dogId === dog.id);
  // Access the dog's present property and update the value
  // By using ! it will toggle the value of present
  dogArray[index].present = !dogArray[index].present;
  // Put the updated array into setDogs to update the dogs array
  setDogs(dogArray);
}

  return (
    <>
    <div className="App">
      <header>
        <h1> Bark and Bowl Doggy Day Care</h1>
        <h2>{new Date().toDateString()}</h2>
      <button onClick={addDog}>Add a new dog</button>
      <ul>
      {
        dogs.map((dog) => {
          return (
            <li key={dog.id}>
              {/* <span>{dog.name}</span> */}
              <span onClick={() => updateDogAttendance(dog.id)}
            style=
            { dog.present ? { textDecoration: "none" }
             : { textDecoration: "line-through" }
             }
              >
           {dog.name}{" "}
            </span>

              <button onClick={() => removeDog(dog.id)}>remove</button>
              <DogDetails dog={dog} />
            </li>
            
          );
        })
      }
      </ul>
      </header>
      <aside></aside>
      <main></main>
    </div>
    </>
  );
}

// console.log(dogsData);

export default App;
/*

# Importance of the Key Prop in React

When rendering lists of components in React, it is important to include a unique `key` prop for each item in the list. The `key` prop helps React to identify which items have changed, been added, or removed from the list, and allows it to update the DOM efficiently.

One important thing to keep in mind when using `key` props is that the value must be stable and unique for each item in the list. The `key` value should not be based on the index of the item, as this can cause issues with re-rendering when items are added or removed from the list.

Instead, it is recommended to use a unique identifier for each item, such as a database ID or a hash of the item's properties. This ensures that the `key` value remains stable even if the order of the items changes.

In summary, using the `key` prop in React is important for efficient rendering of lists of components. Remember to use a stable and unique identifier for each item in the list to avoid re-rendering issues.

*/