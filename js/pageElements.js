/**
 * Generates the html for each employee card
 * @param {*} data employee object
 * @param {*} index The index of the person object
 */
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

/**
 *
 * @param {*} data
 * @param {*} index
 */
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
        
    </div>
  </div>`;

  // Closes the modal

  document.body.insertAdjacentHTML("beforeend", modal);

  document.getElementById("modal-close-btn").addEventListener("click", () => {
    document.body.lastChild.remove();
  });

  nextModal(employees, index);
}

function nextModal(data, index) {
  const modalNav = document.querySelector(".modal-btn-container");

  if (employeeArray.length > 0) {
    data = employeeArray;
  }
  console.log(index);
  console.log(data);
  console.log(data.length);
  if (index > 0 && index < data.length - 1) {
    modalNav.innerHTML = `<button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
      <button type="button" id="modal-next" class="modal-next btn">Next</button>`;

    const modalPrev = document.getElementById("modal-prev");

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
}

// Search functions

const search = `
<form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`;
document.querySelector(".search-container").innerHTML = search;

const searchInput = document.getElementById("search-input");
let employeeArray = [];

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
