//mealclass: represents a meal
class Meal{
  constructor(breakfast, lunch, dinner, date) {
    this.breakfast = breakfast;
    this.lunch = lunch;
    this.dinner = dinner;
    this.date = date;
  }
}

// ui class: handle ui tasks
class UI {
  static displayMeals() {
  const meals = Store.getMeals();

  meals.forEach((meal) => UI.addMealToList(meal));
  }
  static addMealToList(meal) {
    const list = document.querySelector('#meal-list');

    const row = document.createElement('tr');

    row.innerHTML = `
    <td>${meal.breakfast}</td>
    <td>${meal.lunch}</td>
    <td>${meal.dinner}</td>
    <td>${meal.date}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    list.appendChild(row);
  }
  static deleteMeal(el){
    if(el.classList.contains('delete')){
      el.parentElement.parentElement.remove();
    }
  }
static showAlert(message, className){
  const div = document.createElement('div');
  div.className = `alert alert-${className}`;
  div.appendChild(document.createTextNode(message));
  const container = document.querySelector('.container');
  const form = document.querySelector('#meal-form');
  container.insertBefore(div, form);
  // vanish in 3 sec
  setTimeout(() => document.querySelector('.alert').remove(), 3000);
}
  static clearFields() {
    document.querySelector('#breakfast').value = '';
    document.querySelector('#lunch').value = '';
    document.querySelector('#dinner').value = '';
    document.querySelector('#date').value = '';
  }
}
//store class: handles storage

class Store{
static getMeals(){
     let meals;
     if(localStorage.getItem('meals') === null) {
       meals = [];
     }else{
       meals = JSON.parse(localStorage.getItem('meals'));
     }
     return meals;
  }
static addMeal(meal){
  const meals = Store.getMeals();
  meals.push(meal);
localStorage.setItem('meals', JSON.stringify(meals));
}
static removeMeal(dinner){
  const meals = Store.getMeals();

  meals.forEach((meal, index) => {
    if(meal.dinner === dinner){
      meals.splice(index, 1);
    }
  });
localStorage.setItem('meals', JSON.stringify(meals));
 }
}

//event: display mealclass
document.addEventListener('DOMContentLoaded', UI.displayMeals);
// evrnt: add a meeal
document.querySelector('#meal-form').addEventListener('submit', (e) => {
  //prevent actual submit
  e.preventDefault();
  //get form values
  const breakfast = document.querySelector('#breakfast').value;
  const lunch = document.querySelector('#lunch').value;
  const dinner = document.querySelector('#dinner').value;
  const date = document.querySelector('#date').value;

//validate
if(breakfast === '' || lunch === '' || dinner === '' || date === '') {
  UI.showAlert("Please fill in all fields", "danger");
}else{
    //instatiate meal
    const meal = new Meal(breakfast, lunch, dinner, date);

  //add meal to UI
  UI.addMealToList(meal);

  //add meal to store
Store.addMeal(meal);

//show success message

UI.showAlert('Meal Added', 'success');

  //clear fields
  UI.clearFields();
 }
});
// event: remove a meal
document.querySelector('#meal-list').addEventListener('click', (e) => {
  //remove book from UI
  UI.deleteMeal(e.target);
  //remove book from stored
  Store.removeMeal(e.target.parentElement.previousElementSibling.textContent);
  //show removed

  UI.showAlert('Meal Removed', 'success');
});
