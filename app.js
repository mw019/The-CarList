// Car class: Instantiate a book
class Car {
  constructor(make, model, type) {
    this.make = make;
    this.model = model;
    this.type = type;
  }
}

// UI class: Handle UI Tasks
class UI {
  static displayCar() {
    const StoredCars = [
      {
        make: 'Nissan',
        model: '2014',
        type: `${document.querySelector('input[name="type"]:checked').value}`
        // new: `<i class="fas fa-check-circle text-success"></i>`,
        // used: `<i class="fas fa-minus text-warning"></i>`
      },
      {
        make: 'BMW',
        model: '2015',
        type: `${document.querySelector('input[name="type"]:checked').value}`
      },
      {
        make: 'Ford',
        model: '2011',
        type: `${document.querySelector('input[name="type"]:checked').value}`
      }
    ];

    const cars = StoredCars;

    cars.forEach(car => UI.addCarToList(car));
  }

  static addCarToList(car) {
    const list = document.querySelector('#car-list');

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${car.make}</td>
      <td>${car.model}</td>
      <td>${car.type}</td>
      <td> <a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    list.appendChild(row);
  }
}

// Store Class: Manage Storage

// Events: to display car information
document.addEventListener('DOMContentLoaded', UI.displayCar);

//Event: add a car

document.querySelector('#car-form').addEventListener('submit', e => {
  e.preventDefault();
  //get form values
  const make = document.querySelector('#make').value;
  const model = document.querySelector('#model').value;
  const type = document.querySelector('input[name="type"]:checked').value;

  // Check if all the field are filled
  if (make === '' || model === '' || type === '') {
    alert('All the fields are mandatory');
  }

  //Instantiate new book
  const car = new Car(make, model, type);
  console.log(car);
});

function listener() {}

// Event: remove a car
