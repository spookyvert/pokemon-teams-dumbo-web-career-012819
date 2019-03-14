const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`



const pokemonTrainerCard = (trainer) => {
  return `
  <div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
  <button data-trainer-id="${trainer.id}" class="add-pokemon">Add Pokemon</button>
  <ul id="${trainer.id}">

  </ul>
</div>`;
}


const mainTag = document.querySelector('main');

mainTag.addEventListener('click', (event) => {

  if (event.target.className === 'release') {

    let pokemon_id = event.target.dataset.pokemonId
    event.target.parentElement.remove()
    removePokemon(pokemon_id)

  } else if (event.target.className === 'add-pokemon') {

    let user_id = event.target.dataset.trainerId

    addPokemon(user_id)
      .then(updatedTrainer => {
        const ulTag = document.getElementById(updatedTrainer.trainer_id)

        function trainersPokemons() {
          return `<li>${updatedTrainer.nickname} (${updatedTrainer.species}) <button class="release" data-pokemon-id="${updatedTrainer.id}">Release</button></li>`
        }

        ulTag.innerHTML += trainersPokemons()

        // {id: 32, nickname: "Amari", species: "Shellder", trainer_id: 1}
      })

  }

});

fetch(TRAINERS_URL)
  .then(res => res.json())
  .then((trainers) => {

    trainers.forEach((trainer) => {

      mainTag.innerHTML += pokemonTrainerCard(trainer)
      const ulTag = document.getElementById(trainer.id)

      trainer.pokemons.forEach((pokemon) => {
        function trainersPokemons() {
          return `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
        }

        ulTag.innerHTML += trainersPokemons()
      })

    })

  })


const removePokemon = (pokemon_id) => {
  // i need an id of the compliment i want to update

  fetch(`http://localhost:3000/pokemons/${pokemon_id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
    // i need the info i want updated ex. hug_count

  })
  // .then(response => response.json())

}

const addPokemon = (trainer_id) => {
  // i need an id of the compliment i want to update

  return fetch(`http://localhost:3000/pokemons/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        trainer_id: trainer_id
      })
    })
    .then(response => response.json())

}