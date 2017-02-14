var form = document.querySelector('form');
var addPerson = document.querySelector('button.add');
var householdElem = form.elements;
var householdMembers = [];

function validateAge(age) {
  // Validate if the input is the type of number, and it's not less than 1
  if(typeof age != 'number' && age < 1) {
    alert('Age must be a number and higher than 0!');
    return false;
  }
}

function validateRel(rel) {
  if(rel == '') {
    alert('You must select your relationship.');
    return false;
  }
}

function addListElement(age, rel, smoker) {
  var list = document.querySelector('ol.household');

  householdElem['smoker'].checked == true ? smoker = 'smoker' : smoker = 'non-smoker';

  // Create <li> element containing the household form information
  var listElem = document.createElement('LI');
  var text = document.createTextNode(age + ' years old, ' + rel + ', ' + smoker);
  listElem.appendChild(text);

  // Create <span> element to delete a person from the list, and some styling
  var span = document.createElement('SPAN');
  var spanText = document.createTextNode('X');
  span.setAttribute('style', 'color: red; margin-left: 30px; cursor: pointer');
  span.appendChild(spanText);
  listElem.appendChild(span); // Add the <span> element to the <li>
  list.appendChild(listElem); // Add <li> element to ordered list of people

  // Delete person from the list
  span.onclick = function() {
    list.removeChild(listElem);
  };
  // Add Person to aray of objects
  householdMembers.push({age: age, rel: rel, smoker: smoker});
}

function serializeJSON() {
  var debug = document.querySelector('pre.debug')
  var data = JSON.stringify({householdMembers}, null, 2);

  debug.innerHTML = data;
  debug.style.display = 'block';
}

form.onsubmit = function() {
  event.preventDefault();
  serializeJSON();
  return false;
}

// Adds person to the list when
addPerson.onclick = function() {
  event.preventDefault();
  var age = householdElem['age'].value;
  var rel = householdElem['rel'].value;
  var smoker = householdElem['smoker'].value;

  if(validateAge(age) != false && validateRel(rel) != false) {
    addListElement(age, rel, smoker);
  };
}
