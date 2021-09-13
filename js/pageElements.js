/**
 * Generates the html for each employee card
 * @param {*} data employee object
 * @param {*} index The index of the person object
 */
function displayEmployee(data, index) {
  const picture = data.picture.large;
  const name = data.name.first + " " + data.name.last;
  const email = data.email;
  const location = data.location.city + ", " + data.location.state;

  const html = `
          <div class="card" data-person="${index}">
          <div class="card-img-container">
              <img class="card-img" src="${picture}" alt="profile picture">
          </div>
          <div class="card-info-container">
              <h3 id="name" class="card-name cap">${name}</h3>
              <p class="card-text">${email}</p>
              <p class="card-text cap">${location}</p>
          </div>
      </div>
          `;

  gallery.insertAdjacentHTML("beforeend", html);
}

/**
 * modalPopup() creates a modal popup for the employee card
 * @param {*} data
 * @param {*} index
 */
function modalPopup(data, index) {
  const picture = data.picture.large;
  const name = data.name.first + " " + data.name.last;
  const email = data.email;
  const city = data.location.city;
  const cell = data.cell;
  const address =
    data.location.street.number +
    " " +
    data.location.street.name +
    " " +
    data.location.city +
    " " +
    data.location.state +
    " " +
    data.location.postcode;

  let modal = `
    <div class="modal-container">
      <div class="modal">
          <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
          <div class="modal-info-container">
              <img class="modal-img" src="${picture}" alt="profile picture">
              <h3 id="name" class="modal-name cap">${name}</h3>
              <p class="modal-text">${email}</p>
              <p class="modal-text cap">${city}</p>
              <hr>
              <p class="modal-text">${cell}</p>
              <p class="modal-text">${address}</p>
              <p class="modal-text">Birthday: ${formatDob(data.dob.date)}</p>
          </div>
      </div>
      <div class="modal-btn-container">
        
    </div>
  </div>`;

  // Closes the modal

  document.body.insertAdjacentHTML("beforeend", modal);
  document.getElementById("modal-close-btn").addEventListener("click", () => {
    document.body.lastChild.remove();
  });
  nextModal(employees, index);
}

/**
 *  nextModal cycles through the employees without closing the modal
 * @param {*} data The array that is being used
 *  @param {*} index The index from the employee cards
 */
function nextModal(data, index) {
  const modalNav = document.querySelector(".modal-btn-container");
  //checks if the user is searching for a employee
  if (employeeArray.length > 0) {
    data = employeeArray;
  }

  if (index > 0 && index < data.length - 1) {
    modalNav.innerHTML = `<button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
      <button type="button" id="modal-next" class="modal-next btn">Next</button>`;
    const modalPrev = document.getElementById("modal-prev");

    //cycles through the employees in the index order
    modalPrev.addEventListener("click", () => {
      document.body.removeChild(document.body.lastElementChild);
      let newIndex = parseInt(index) - 1;
      modalPopup(data[newIndex], newIndex);
    });
    const modalNext = document.getElementById("modal-next");
    modalNext.addEventListener("click", () => {
      let nextIndex = parseInt(index) + 1;
      document.body.removeChild(document.body.lastElementChild);
      modalPopup(data[nextIndex], nextIndex);
    });
  }

  if (index < 1) {
    modalNav.innerHTML = `<button type="button" id="modal-next" class="modal-next btn">Next</button>`;
    const modalNext = document.getElementById("modal-next");
    modalNext.addEventListener("click", () => {
      let nextIndex = parseInt(index) + 1;
      document.body.removeChild(document.body.lastElementChild);
      modalPopup(data[nextIndex], nextIndex);
    });
  }

  if (parseInt(index) === data.length - 1) {
    modalNav.innerHTML = `<button type="button" id="modal-prev" class="modal-prev btn">Prev</button>`;
    const modalPrev = document.getElementById("modal-prev");
    modalPrev.addEventListener("click", () => {
      document.body.removeChild(document.body.lastElementChild);
      let newIndex = parseInt(index) - 1;
      modalPopup(data[newIndex], newIndex);
    });
  }
  if (data.length === 1) {
    document.querySelector(".modal-btn-container").style.display = "none";
  }
}

// Displays the search box
const search = `
<form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`;
document.querySelector(".search-container").innerHTML = search;
const searchInput = document.getElementById("search-input");
let employeeArray = [];
