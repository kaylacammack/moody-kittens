let kittens = []
let kitten = {}
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault();
  let form = event.target;
  
  let kittenName = form.name.value;
  if (kittenName === '') {
    alert('The kitten needs a name');
    return;
  }
  
  kitten = kittens.find(kitten => kitten.name.toLowerCase() == kittenName.toLowerCase());
  
  if (!kitten) {
    kitten = {id: generateId(), name: kittenName, mood: "angry", affection: 0, image: 'grumpycat.jfif'};
    kittens.push(kitten);
  }
  form.reset();
  saveKittens();
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens 
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens));
  drawKittens()
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let kittenData = JSON.parse(window.localStorage.getItem("kittens"));
  if (kittenData) {
    kittens = kittenData;
  }
  drawKittens();
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let template = "";

  kittens.forEach(kitten => {
    template +=`
    <div id="kitten-card" class="card mt-1 mb-1" style="width: 250px">
      <h1 class="d-flex justify-content-center mt-1 mb-1">${kitten.name}</h1>
      <div class="d-flex justify-content-center space-between flex-wrap kitten ${kitten.mood}">
        <img class="kitten happy" src="${kitten.image}">
        <p>
          <span>Mood: ${kitten.mood}</span>
        </p>
      </div>
      <div class="d-flex space-around">
        <button onclick="pet('${kitten.id}')">Pet</button>
        <button onclick="catnip('${kitten.id}')">Catnip</button>
      </div>
    </div>
    `
  })
  
  document.getElementById("kittens").innerHTML=template
}


/**
 * Find the kitten in the array by its id
 * @param {string} id 
 * @return {Kitten}
 */
function findKittenById(id) {
  return kitten = kittens.find(kitten => kitten.id == id);
}


/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5 
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id 
 */
function pet(id) {
  let cat = findKittenById(id)
  let randomNumber = Math.random()
  if (randomNumber > .5) {
    cat.affection ++
  } else {
    cat.affection --
  }
  setKittenMood(cat)
  saveKittens()
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {
  let cat = findKittenById(id)
  cat.mood = 'tolerant'
  cat.affection = 5
  setKittenMood(cat)
  saveKittens()
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten 
 */
function setKittenMood(kitten) {
  if (kitten.affection > 6) {
    kitten.mood = 'happy'
    kitten.image = 'happycat.jfif'
  } else if (kitten.affection < 4) {
    kitten.mood = 'angry'
    kitten.image = 'grumpycat.jfif'
  } else{
    kitten.mood = 'tolerant'
    kitten.image = 'tolerantcat.jfif'
  }
}

/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens(){
  kittens = []
  saveKittens()
}

/**
 * Removes the welcome content and should probably draw the 
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").remove();
  console.log('Good Luck, Take it away')
  document.getElementById("kitten-form").classList.remove("hidden")
  document.getElementById("kittens").classList.remove("hidden")
}


// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{name: string, mood: string, affection: number}} Kitten
 */


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

loadKittens();
