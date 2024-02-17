/* const SEED_ID = 123;
const LOWER_RANGE = 1;
const UPPER_RANGE = 100;

const srand = new Srand(SEED_ID);
const gifId = srand.intInRange(LOWER_RANGE, UPPER_RANGE); */


/*  variables init */
let lr = 1; //Lower Range for RNG with seed
    /* getting html elements */
let btn = document.getElementById("butao");
let c2 = document.getElementById("pokeU");
let tabela = document.getElementById("container");

btn.addEventListener("click",criaTab) //on clicking "criar" it creates the board

function formatar(num){ //function to format numbers with three characters
    if (num < 100){
        if (num < 10){
            return "00"+num
        }
        return "0"+num
    }
    else return num
}

let regioes = new Map([ //Map with region names
    [1,"Kanto"],
    [2,"Johto"],
    [3,"Hoenn"],
    [4,"Sinnoh"],
    [5,"Unova"],
    [6,"Kalos"],
    [7,"Alola"],
    [8,"Galar"],
    [9,"Paldea"]
])
let regioesQ = new Map([ //Map with last pokemon number for each generation
    [1,151],
    [2,251],
    [3,386],
    [4,493],
    [5,649],
    [6,721],
    [7,809],
    [8,905],
    [9,1025]
])
/* Creating Maps for the starter for each generation */
let grama = new Map([ //Grass starter Map
    [1,1],
    [2,152],
    [3,252],
    [4,387],
    [5,495],
    [6,650],
    [7,722],
    [8,810],
    [9,906],
])
let fogo = new Map([ //Fire starter Map
    [1,4],
    [2,155],
    [3,255],
    [4,390],
    [5,498],
    [6,653],
    [7,725],
    [8,813],
    [9,909],
])
let agua = new Map([ //Water starter Map
    [1,7],
    [2,158],
    [3,258],
    [4,393],
    [5,501],
    [6,656],
    [7,728],
    [8,816],
    [9,912],
])

/*  more html elements getters */
var slider = document.getElementById("myRange");
var david = document.getElementById("checkDavid");
var output = document.getElementById("out");
var outputReg = document.getElementById("out2");
var starters = document.getElementById("starters");

/* Display the name and number of the region selected on the slider picking it from the regioes Map */
output.innerHTML = slider.value; 
outputReg.innerHTML = regioes.get(parseInt(slider.value)) 

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    output.innerHTML = this.value;
    outputReg.innerHTML = regioes.get(parseInt(this.value))
    /* Displays the starters of the selected region */
    document.getElementById("st1").innerHTML = "<img src='https://assets.pokemon.com/assets/cms2/img/pokedex/full/"+formatar(grama.get(parseInt(this.value)))+".png'>"
    document.getElementById("st2").innerHTML = "<img src='https://assets.pokemon.com/assets/cms2/img/pokedex/full/"+formatar(fogo.get(parseInt(this.value)))+".png'>"
    document.getElementById("st3").innerHTML = "<img src='https://assets.pokemon.com/assets/cms2/img/pokedex/full/"+formatar(agua.get(parseInt(this.value)))+".png'>"
}

/* on check "David Acessibilidade" box, it toggles on or off the div containing the starters */
david.oninput = function() {
    if(david.checked) starters.style.display ="flex";
    else starters.style.display ="none";
  }

function capitalize(string) { // function for capitalizing single strings
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/* function to separate strings and capitalize each word (ex: 'iron-hands' -> 'Iron Hands') */
function capitalizeSeparate(string) {
    let nString = string;
    const aString = nString.split("-");
    let limit = aString.length


    for (let i = 0; i < limit; i++) {
        aString[i] = capitalize(aString[i]);
    }

    return aString.join(" ");
}

/* function to return a string as a span element if not "null" */
function retornaTipo(string){
    if (string != "null"){
        return `<span class='s2 `+string+`'>`+capitalize(string)+`</span>`
    }
    else return ""
}

/* function to create the board */
function criaTab() {
    
    let seedT = document.getElementById("seed").value; //get the seed value
    let srand = new Srand(seedT) //set the seed on the rng
    const poke = []; //array for the pokemon on the board
    const poke2 = []; //second array for prevent duplicates

    /* clears the board before making a new one */
    tabela.innerHTML = "";
    c2.innerHTML = "";

    for (let i = 0; i < 24; i++) {

        /* create a random number on the main array */
        poke[i] = srand.intInRange(lr, regioesQ.get(parseInt(slider.value))); 
        /* checks if the second array has already the last number created, if it does it creates a new one */
        if (poke2.includes(poke[i])){
            poke[i] = srand.intInRange(lr, regioesQ.get(parseInt(slider.value)));
        }
        else poke2.push(poke[i]); //copies the number generated to the second array
        
        /* html template for a single item on the board */
        tabela.innerHTML += `        
        <div class="item c1" id="`+ i +`" onclick="interruptor(`+i+`)">
                <div class="divSpan"><span class='s1'>`+capitalizeSeparate(pokemon[poke[i]].name)+`</span></div>
                <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/`+ formatar(poke[i]) +`.png">
                <div class="divSpan"><span class='s1 baixo'>`+qualReg(poke[i])+`</span>`+retornaTipo(pokemon[poke[i]].type1)+` `+retornaTipo(pokemon[poke[i]].type2)+`</div>
        </div>        
        `;   
    }
   
    /* pick randomly an item from the board */
    unico = formatar(poke[Math.floor(Math.random() * 25)])
    c2.innerHTML += `<div class="item c2">
            <div class="divSpan"><span class='s1'>`+capitalize(pokemon[unico].name)+`</span></div>
            <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/`+unico+`.png">
            <div class="divSpan"><span class='s1 baixo'>`+qualReg(unico)+` </span>`+retornaTipo(pokemon[unico].type1)+` `+retornaTipo(pokemon[unico].type2)+`</div>
        </div>`;
}


function interruptor(num){ // function to toggle on or off an item 
    if (document.getElementById(""+num).getAttribute("class") == "item c1 desativado"){
        document.getElementById(""+num).setAttribute("class","item c1 ativado");
    }
    else document.getElementById(""+num).setAttribute("class","item c1 desativado");
}

function qualReg(num){ // function that returns the region of the selected number (pokemon)
    if (num <  regioesQ.get(1)) return "1 - Kanto"
    if (num <  regioesQ.get(2)) return "2 - Johto"
    if (num <  regioesQ.get(3)) return "3 - Hoenn"
    if (num <  regioesQ.get(4)) return "4 - Sinnoh"
    if (num <  regioesQ.get(5)) return "5 - Unova"
    if (num <  regioesQ.get(6)) return "6 - Kalos"
    if (num <  regioesQ.get(7)) return "7 - Alola"
    if (num <  regioesQ.get(8)) return "8 - Galar"
    if (num <  regioesQ.get(9)) return "9 - Paldea"
}
 
