const gallery = document.getElementById("gallery");
let employees = [];
const api = "https://randomuser.me/api/?results=12&nat=us,ca";

// Get the user data from the api.
fetch(api)
  .then((res) => res.json())
  .then((res) => {
    res.results.map((person) => {
      employees.push(person);
      const index = employees.indexOf(person);
      displayEmployee(person, index);
    });
  })
  .catch((error) => {
    console.log("something went wrong", error);
    gallery.innerHTML = "<h2>Something went wrong";
  });

// Event Listener for clicks on a employee card. Displays the modal
gallery.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  let index = card.getAttribute("data-person");
  let personData;
  if (employeeArray !== "undefined" && employeeArray.length > 0) {
    personData = employeeArray[index];
  } else {
    personData = employees[index];
  }
  modalPopup(personData, index);
});

//event listener for employee searches
searchInput.addEventListener("keyup", (e) => {
  e.preventDefault();
  employeeSearch(e.target.value);
});

// search employees
function employeeSearch(term) {
  employeeArray = [];
  gallery.innerHTML = "";
  searchValue = term;

  // Pick out the students who match the search results
  searchResults = employees.filter((x) => {
    let fullName = x.name.first.toLowerCase() + x.name.last.toLowerCase();

    // if the student matches put them into an array
    if (fullName.includes(searchValue.toLowerCase())) {
      employeeArray.push(x);
      let newIndex = employeeArray.indexOf(x);
      const noResults = document.getElementById("no-results");
      if (noResults !== null) {
        noResults.remove();
      }
      displayEmployee(x, newIndex);
    }

    //If there are no search matches
    if (employeeArray.length === 0) {
      gallery.innerHTML = `<div id="no-results"><h1>No Results</h1> <p>Try your search again or <a href="/">Go Back</a></p></div>`;
    }
  });
}

/**
 * Helper functions
 */

// Formats the employees DOB so it's readable

function formatDob(dob) {
  const year = dob.substring(0, 4);
  const month = dob.substring(5, 7);
  const day = dob.substring(8, 10);

  return year + "/" + month + "/" + day;
}
