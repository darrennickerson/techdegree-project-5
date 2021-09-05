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

function displayEmployee(data, index) {
  const picture = data.picture.large;

  const html = `
        <div class="card" data-person="${index}">
        <div class="card-img-container">
            <img class="card-img" src="${picture}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${data.name.first} ${data.name.last}</h3>
            <p class="card-text">${data.email}</p>
            <p class="card-text cap">${data.location.city}, ${data.location.state}</p>
        </div>
    </div>
        `;

  gallery.insertAdjacentHTML("beforeend", html);
}

function modalPopup(data, index) {
  let modal = `

      <div class="modal-container">
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${
              data.picture.large
            }" alt="profile picture">
            <h3 id="name" class="modal-name cap">${data.name.first} ${
    data.name.last
  }</h3>
            <p class="modal-text">${data.email}</p>
            <p class="modal-text cap">${data.location.city}</p>
            <hr>
            <p class="modal-text">${data.cell}</p>
            <p class="modal-text">${data.location.street.number} ${
    data.location.street.name
  }, ${data.location.city}, ${data.location.state} ${data.location.postcode}</p>
            <p class="modal-text">Birthday: ${formatDob(data.dob.date)}</p>
        </div>
    </div>
    <div class="modal-btn-container">
    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
    <button type="button" id="modal-next" class="modal-next btn">Next</button>
</div>
</div>
    '`;

  // Closes the modal

  document.body.insertAdjacentHTML("beforeend", modal);
  document.getElementById("modal-close-btn").addEventListener("click", () => {
    document.body.lastChild.remove();
  });

  //Displays next employee

  const modalPrev = document.getElementById("modal-prev");
  const modalNext = document.getElementById("modal-next");

  modalPrev.addEventListener("click", () => {
    let newIndex = parseInt(index) - 1;
    if (index > 0) {
      document.body.removeChild(document.body.lastElementChild);
      modalPopup(employees[newIndex], newIndex);
    } else {
      modalPrev.style.display = "none";
    }
  });

  // Event Listener for the prev and next buttons

  modalNext.addEventListener("click", () => {
    let nextIndex = parseInt(index) + 1;
    console.log(index);
    console.log(nextIndex);
    if (index < employees.length - 1) {
      document.body.removeChild(document.body.lastElementChild);
      modalPopup(employees[nextIndex], nextIndex);
    } else {
      modalNext.style.display = "none";
    }
  });
}

// Event Listener for clicks on a employee card. Displays the modal

gallery.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  let index = card.getAttribute("data-person");
  let personData = employees[index];
  modalPopup(personData, index);
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
