const gameContainer = document.getElementById("game");
let card1; 

const CHAMPIONS = [
  "pantheon",
  "yone",
  "morgana",
  "xin",
  "akshan",
  "qiyana",
  "draven",
  "xayah",
  "pantheon",
  "yone",
  "morgana",
  "xin",
  "akshan",
  "qiyana",
  "draven",
  "xayah",
];

let championsLeft = CHAMPIONS.length

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledChampions = shuffle(CHAMPIONS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForChampions(championArray) {
  let counter = 0;
  for (let champion of championArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.id = counter;
    newDiv.name = champion
    newDiv.classList.add('front')

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
    counter ++;
  }
}

// TODO: Implement this function!
function handleCardClick(event) {

  // flip the card
  if(event.target.className === event.target.name + ' back'){
    event.target.className = 'front'
  } else {
    event.target.className = event.target.name + ' back';
  }


  // if same card is clicked return
  if(card1 === event.target){
    return
  }
  // you can use event.target to see which element was clicked
  //console.log("you just clicked", event.target.className);
  
  // check if 2 card are picked so we can compare them with cardMatch(card1, card2) function
  if(!card1){
    card1 = event.target
    return
  } else {
    cardMatch(card1, event.target)
    card1 = ""
    
  }

}

//function for seeing if card1 is the same as card2. if yes remove the eventlistener and keep cards facing up, otherwise flip the cards over.
function cardMatch(card1, card2){
  if(card1.name === card2.name && card1.id != card2.id){
    championsLeft -= 2
    card1.className = card1.name + ' back'
    card2.className = card2.name + ' back'
    card1.removeEventListener('click', handleCardClick)
    card2.removeEventListener('click', handleCardClick)
  } else {

    //disable click then enable after 1 second
    gameContainer.style.pointerEvents = 'none'
    setTimeout(() => {
      gameContainer.style.pointerEvents = 'all'
    }, 1000);

    //flip the cards over after 1.1 seconds
    setTimeout(() => {
      card1.className = 'front'
      card2.className = 'front'      
    }, 1100);
    
  }
  // display win the game after all pairs have been found, after .7 seconds
  setTimeout(() => {
    if(championsLeft === 0){
      alert("YOU WIN!")
    }
  }, 700);
 }
// when the DOM loads
createDivsForChampions(shuffledChampions);
