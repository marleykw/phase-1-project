document.addEventListener("DOMContentLoaded", () => {
    let form = document.querySelector('#suggest-new-cosplay-form')
  console.log(form);

    form.addEventListener('submit', (e) => {
      e.preventDefault()
      let newCharacter = document.querySelector('#new-cosplay-character-name').value
      console.log(newCharacter)
      let li = document.createElement('li')
        li.textContent = newCharacter
        console.log(li)
      document.querySelector('#cosplay-list').appendChild(li)
      //buildCharacterList(newCharacter)
    })
  });
  
  function buildCharacterList(newCharacter) {
    let li = document.createElement('li')
    //let btn = document.createElement('button')
  
    //btn.addEventListener('click', handleDelete)
  
    //btn.textContent = 'x'
    li.textContent = `<li>${newCharacter}</li>`
    document.querySelector('#cosplay-list').appendChild(li)
  }
  
  function handleDelete(e) {
    e.target.parentNode.remove()
  }