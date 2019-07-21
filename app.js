const container = document.querySelector(".container");
const overlay = document.querySelector(".overlay");
const modalContent = document.querySelector(".content");
const close = document.querySelector(".close");
const leftArrow = document.querySelector("#leftArrow");
const rightArrow = document.querySelector("#rightArrow");

fetch('https://randomuser.me/api/?results=12')
  .then(response => response.json())
  .then(response => {
    const results = response.results;
    profiles = results;
  })
  .then(sortCard)

function showProfiles(data) {
  let statusHTML = " ";
  data.forEach((profile, i) => {
    statusHTML += `
<div class="card" data-i="${i}">
<img class="avatar" src="${profile.picture.large}" />
<div>
<h2 class="name">${profile.name.first} ${profile.name.last}</h2>
<p class="email">${profile.email}</p>
<p class="address">${profile.location.city}</p>
</div>
</div>
`;
  });
  container.innerHTML = statusHTML;
}

function show(i) {
  let date = new Date(finalProfile[i].dob.date);
  const contentHTML = ` 
<img class="avatar" src="${finalProfile[i].picture.large}" />
<div>
<h2 id= "modalCard" class="name" data-i="${i}" >${finalProfile[i].name.first} ${finalProfile[i].name.last}</h2>
<p class="email">${finalProfile[i].email}</p>
<p class="city">${finalProfile[i].location.city}</p><hr>
<p class="phone">${finalProfile[i].phone}</p>
<p>${finalProfile[i].location.street} ${finalProfile[i].location.state}, ${finalProfile[i].location.postcode}</p>
<p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
</div>
`

  overlay.style.display = 'block'
  modalContent.innerHTML = contentHTML;

};


function sortCard() {
  finalProfile = profiles;
  let inputField = document.getElementById('search').value.toLowerCase();

  if (inputField && inputField.length) {
    finalProfile = finalProfile.filter((profile) =>
      profile.name.first.indexOf(inputField) > -1 || profile.name.last.indexOf(inputField) > -1);
  }
  showProfiles(finalProfile);
}

// This is the most important funciton
// once you can have the right information (with the help of the index)
//   the project is done.
container.addEventListener("click", (e) => {
  if (e.target !== container) {
    const index = e.target.closest(".card").getAttribute('data-i');
    show(index);
  }
});

leftArrow.addEventListener("click", (e) => {
  let card = document.getElementById("modalCard");
  let currenti = +modalCard.getAttribute('data-i', card);
  currenti -= 1;
  if (currenti < 0) {
    currenti = finalProfile.length - 1;
  }
  card.setAttribute('data-i', currenti)
  show(currenti);
});

rightArrow.addEventListener("click", (e) => {
  let card = document.getElementById("modalCard");
  let currenti = +modalCard.getAttribute('data-i', card);
  currenti += 1;
  if (currenti >= finalProfile.length) {
    currenti = 0;
  }
  card.setAttribute('data-i', currenti)
  show(currenti);
});

close.addEventListener("click", () => {
  overlay.style.display = 'none';
});
const searchBox = document.getElementById("searchBox");
searchBox.addEventListener("keyup", function sortCard() {
  let inputField = document.getElementById('search').value.toLowerCase();
  if (inputField && inputField.length) {
    finalProfile = profiles.filter((profile) =>
      profile.name.first.indexOf(inputField) > -1 || profile.name.last.indexOf(inputField) > -1);
  }
  showProfiles(finalProfile);
});