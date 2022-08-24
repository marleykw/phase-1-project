
//First, define all the places where we will be editing the HTML using container variables
const characterContainer = document.querySelector("#character-listing")
const popularCharactersContainer = document.querySelector("#top-characters-list")


//Then, define our form to use later
let form = document.querySelector("#new-cosplay-form")


//Initial DOMContentLoaded dependant on dropdown
document.addEventListener("DOMContentLoaded", currentCosplays())



//Add Event Listener to toggle the status 
document.addEventListener('click', (event) =>{
  if (event.target.className === 'status-btn') {
    //Get current status 
    let currentStatus = fetch(`http://localhost:3000/characters/${event.target.id}`)
      .then(resp => {
        return resp.json()
      })
      .then(result => {
      //console.log(result.status)
        let curStat = result.status
        //console.log(curStat)
        updateStatus(curStat,event.target.id, function() {
          document.location.reload()})

      })
    } else if (event.target.className === 'delete-btn') {
      console.log("it is here")
      deleteCosplay(event.target.id, function() {
        document.location.reload()})

    }
  })

//Function to update the status

function updateStatus(curStat, itemID) {
  let updatedStatus
  if (curStat === 'Complete') {
    updatedStatus = 'Unfinished'
  } else {
    updatedStatus = 'Complete'
  }
  //console.log(updatedStatus)
  fetch(`http://localhost:3000/characters/${itemID}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({
      status: updatedStatus
    })
  })
}

//Function to delete cosplay
function deleteCosplay(itemID) {
  //console.log(itemID)
  fetch(`http://localhost:3000/characters/${itemID}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  //document.location.reload()
}


//Add in the Event Listener for submissions 
form.addEventListener('submit', (e) => {
  e.preventDefault()
  let newCharacterName = form.querySelector("#new-cosplay-character-name").value
  let newCharacterShow = form.querySelector("#new-cosplay-character-show").value
  let newCharacterURL = form.querySelector("#new-cosplay-character-ref-image").value
  //POST
  postNewCharacter(newCharacterName,newCharacterShow,newCharacterURL, function() {
    document.location.reload()})
}) 

//function to post new character
function postNewCharacter(newCharacterName,newCharacterShow,newCharacterURL) {
  fetch("http://localhost:3000/characters", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({
      name: newCharacterName,
      show: newCharacterShow,
      image_URL: newCharacterURL,
      status: "Unfinished"
    })
  })
}


//Fetch for the current cosplays that exist
function currentCosplays() {
    fetch("http://localhost:3000/characters")
    .then(resp => {
      return resp.json();
    })
    .then(data => renderCosplayCards(data));
}

//Function to loop through the characters in the /characters file
function renderCosplayCards(data){
  data.forEach(character => renderOneCharacter(character))
}

//Function to create the card's HTML
function renderOneCharacter(character) {
  let card = document.createElement('li')
  card.className = 'card'
  card.innerHTML = `
    <img src=${character.image_URL} class="character-avatar" />
    <div class="content">
      <h2>${character.name}</h2> 
      <p>${character.show}</p>
      <button class="status-btn" id=${character.id}>${character.status}</button>
      <button class="delete-btn" id=${character.id}>Delete</button>
    </div>
    `
    characterContainer.append(card)
}


//Populate the data from the external API every time we open the app
fetch(`https://api.jikan.moe/v4/top/characters`)
    .then((result)=> result.json())
    .then((data)=> {
        let popularCharacterArray = data.data
        //console.log(popularCharacterArray)
        popularCharacterArray.forEach(character => renderPopularCharacter(character))
  })

  //Function to render popular charcter--has to differ from the submissions because it is a list
  function renderPopularCharacter(character) {
    let addCharacter = document.createElement('li')
    addCharacter.innerHTML = `<li>${character.name}</li>`
      popularCharactersContainer.append(addCharacter)
  }

 

