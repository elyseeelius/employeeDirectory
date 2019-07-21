
const container = document.querySelector(".container");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal-info");
const closeModal = document.querySelector(".modal-close");
const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");



 fetch('https://randomuser.me/api/?results=12')
    .then(res => res.json())
    .then(res => {
      const results = res.results;
      profiles = results;
    })
    .then(sortCard)

  function showProfiles (data) {
   let statusHTML = " ";
   data.forEach((profile, i) =>{
        statusHTML += `
        <div class="card" data-i="${i}">
            <img class="avatar" src="${profile.picture.large}" />
            <div class="text-container">
                <h2 class="name">${profile.name.first} ${profile.name.last}</h2>
                <p class="email">${profile.email}</p>
                <p class="address">${profile.location.city}</p>
            </div>
        </div>
         `;
   }
   ); 
   container.innerHTML = statusHTML;
}

function show(i){
   profile = finalProfile[i]; 
  let date = new Date(profile.dob.date);//work on that
  const contentHTML = ` 
  <img class="avatar" src="${profile.picture.large}" />
  <div class="modal-text-container">
      <h2 id= "modalCard" class="name" data-i="${i}" >${profile.name.first} ${profile.name.last}</h2>
      <p class="email">${profile.email}</p>
      <p class="city">${profile.location.city}</p><hr>
      <p class="phone">${profile.phone}</p>
      <p>${profile.location.street} ${profile.location.state}, ${profile.location.postcode}</p>
      <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    `
 
    overlay.style.display = 'block'
    modal.innerHTML = contentHTML;

}; 
   

function sortCard() {
    finalProfile = profiles;
    let inputField = document.getElementById('search-field').value.toLowerCase();

    if (inputField && inputField.length) {
        finalProfile = finalProfile.filter((profile) =>
            profile.name.first.indexOf(inputField) > -1 || profile.name.last.indexOf(inputField) > -1);
    }
    showProfiles(finalProfile);
}

  
  container.addEventListener("click", (e) =>{
    if(e.target !== container){
      const card = e.target.closest(".card");
      const i = card.getAttribute('data-i');
      show(i);
    }
  });

  leftArrow.addEventListener("click", (e)=>{
    let card = document.getElementById("modalCard");
    let currenti = +modalCard.getAttribute('data-i', card);
     currenti -=1;
     if(currenti < 0){
        currenti = finalProfile.length -1;
     }
     card.setAttribute('data-i', currenti)
     show(currenti);
  });

  rightArrow.addEventListener("click", (e)=>{
    let card = document.getElementById("modalCard");
    let currenti = + modalCard.getAttribute('data-i',card);
     currenti +=1;
     if(currenti >= finalProfile.length){
        currenti = 0;
     }
     card.setAttribute('data-i', currenti)
     show(currenti);
  });

  closeModal.addEventListener("click", ()=>{
     overlay.style.display  = 'none';
  });
  const searchBar = document.getElementById("searchBar");
  searchBar.addEventListener("keyup", sortCard);
  


