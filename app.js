// Car class: Instantiate a car
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
    // const StoredCars = [
    //   {
    //     make: 'Nissan',
    //     model: '2014',
    //     type: `${document.querySelector('input[name="type"]:checked').value}`
    //     // new: `<i class="fas fa-check-circle text-success"></i>`,
    //     // used: `<i class="fas fa-minus text-warning"></i>`
    //   }

    const cars = Store.getCar();

    cars.forEach(car => UI.addCarToList(car));
  }

  static addCarToList(car) {
    const list = document.querySelector('#car-list');

    if (list.value === '') {
      UI.displayAlert('Add Cars', 'secondary text-center');
    } else {
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

  static displayAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const cntr = document.querySelector('.container');
    const form = document.querySelector('#car-form');
    cntr.insertBefore(div, form);

    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static clearFields() {
    document.querySelector('#make').value = '';
    document.querySelector('#model').value = '';
  }

  static deleteCar(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }
}

// Store Class: Manage Storage
class Store {
  static getCar() {
    let cars;
    if (localStorage.getItem('cars') === null) {
      cars = [];
    } else {
      cars = JSON.parse(localStorage.getItem('cars'));
    }
    return cars;
  }

  static addCar(car) {
    const cars = Store.getCar();
    cars.push(car);
    localStorage.setItem('cars', JSON.stringify(cars));
  }

  static removeCar(model) {
    const cars = Store.getCar();

    cars.forEach((car, index) => {
      if (car.model === model) {
        cars.splice(index, 1);
      }
    });

    localStorage.setItem('cars', JSON.stringify(cars));
  }
}

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
  if (make === '' || model === '') {
    UI.displayAlert('All fields are mandatory', 'danger text-center');
  } else {
    //Instantiate new car
    const car = new Car(make, model, type);

    // adding car to the list
    UI.addCarToList(car);

    // add car to localstorage
    Store.addCar(car);

    // display success message
    UI.displayAlert('Added to list', 'success text-center');

    // Clear all the fields
    UI.clearFields();
  }
});

// Event: remove a car
document.querySelector('#car-list').addEventListener('click', e => {
  // remove book from ui
  UI.deleteCar(e.target);

  // remove book from localstorage
  Store.removeCar(
    e.target.parentElement.previousElementSibling.previousElementSibling
      .textContent
  );

  UI.displayAlert('Item Deleted', 'warning text-center');
});
