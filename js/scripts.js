const gallery = document.getElementById("gallery");

fetch("https://randomuser.me/api/?results=12")
  .then((res) => res.json())
  .then((data) => {
    data.results.map((person) => {
      displayEmployee(person);
    });
  })
  .catch((error) => console.log("something went wrong", error));

function displayEmployee(data) {
  const html = `
    <div class="card">
    <div class="card-img-container">
        <img class="card-img" src="${data.picture.large}" alt="profile picture">
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
