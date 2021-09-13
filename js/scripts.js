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
  let personData = employees[index];
  modalPopup(personData, index);
});

searchInput.addEventListener("keyup", (e) => {
  e.preventDefault();
  employeeSearch(e.target.value);
});

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
