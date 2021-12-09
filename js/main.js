
// det här är ju ett fett stort frågetecken
//const xhr = new XMLHttpRequest();

//xhr.onreadystatechange = function () {
    //document.getElementById("textarea").textContent=xhr.responseText;
//}

//xhr.open("get", "../texts.xml", true);
//xhr.send();
// men det loggar ut xmlen i consolen

// Detta är till dropdownen
let textDisplay = document.getElementById("textarea")
let title = document.getElementById("title")
let author = document.getElementById("author")
let select = document.querySelector("select");
let chosenText;
let chosenAuthor;

let arrayText;

const inputElement = document.getElementById("inputtext");

let counter = 0
var span = document.querySelector('span');  // kan detta tas bort?

let wrongSound = new Audio("../audio/wrong-sound.mp3")

select.addEventListener("change", () => {
    if (select.value === "Förändringens Tid") {
        chosenText = "Vinden viner över sällsamma ruiner, över berg och slätter, " +
            "dagar som nätter. Ger världen form inför den kommande storm, likt gudars sång," +
            " skall bli dess undergång. Svart som natten, blank likt vatten, i skyn du häver " +
            "då Allfader kräver. Åter resas skall nu han, som i misteln döden fann. Sonas med " +
            "sin ene broder, den blinde född av samma moder. Satt att råda är de båda, bröders " +
            "hand över evigt land.";
        chosenAuthor = "Erik Ström";
    } else if (select.value === "Moln") {
        chosenText = "Se de mäktiga moln, vilkas fjärran höga toppar stolta, skimrande resa sig, " +
            "vita som vit snö! Lugna glida de fram för att slutligen lugnt dö sakta lösande sig i en " +
            "skur av svala droppar. Majestätiska moln - genom livet, genom döden gå de leende fram i" +
            " en strålande sols sken utan skymmande oro i eter så klart ren, gå med storstilat, " +
            "stilla förakt för sina öden.";
        chosenAuthor = "Karin Boye";
    } else if (select.value === "Jag har en dröm") {
        chosenText = "Så säger jag er, mina vänner, att jag trots dagens och morgondagens svårigheter" +
            " har en dröm. Det är en dröm med djupa rötter i den amerikanska drömmen om att denna " +
            "nation en dag kommer att resa sig och leva ut den övertygelsens innersta mening, som vi " +
            "håller för självklar: Att alla människor är skapade med samma värde.";
        chosenAuthor = "Martin Luther King Jr.";
    } else if (select.value === "Doktor Glas") {
        chosenText = "Jag stod vid pastor Gregorius bädd; han låg sjuk. Övre delen av hans kropp var " +
            "blottad, och jag lyssnade på hans hjärta. Sängen stod i hans arbetsrum; en kammarorgel " +
            "stod i ett hörn, och någon spelade på den. Ingen koral, knappt en melodi. Bara formlösa " +
            "fugaartade tongångar fram och tillbaka. En dörr stod öppen; det oroade mig, men jag kunde" +
            " inte komma mig för att få den stängd.";
        chosenAuthor = "Hjalmar Söderberg";
    } else if (select.value === "Katherine") {
        chosenText = "I am not bound to win, but I am bound to be true. I am not bound to succeed, " +
            "but I am bound to live by the light that I have. I must stand with anybody that stands " +
            "right, and stand with him while he is right, and part with him when he goes wrong.";
        chosenAuthor = "Abraham Lincoln";
    } else if (select.value === "Love and Weirdness") {
        chosenText = "We are all a little weird and life's a little weird, and when we find someone" +
            " whose weirdness is compatible with ours, we join up with them and fall in mutual weirdness " +
            "and call it love.";
        chosenAuthor = "Dr. Seuss";
    } else if (select.value === "Integrity") {
        chosenText = "It's not what we eat but what we digest that makes us strong; not what we gain but " +
            "what we save that makes us rich; not what we read but what we remember that makes us learned;" +
            " and not what we profess but what we practice that gives us integrity.";
        chosenAuthor = "Francis Bacon";
    } else if (select.value === "The Odyssey") {
        chosenText = "May the gods grant you all things which your heart desires, and may they give you" +
            " a husband and a home and gracious concord, for there is nothing greater and better than this" +
            " - when a husband and wife keep a household in oneness of mind, a great woe to their enemies " +
            "and joy to their friends, and win high renown.";
        chosenAuthor = "Homer";
    } else if (select.value === "Short") {
        chosenText = "This text is not long.";
        chosenAuthor = "Robert Jonsson";
    } else if (select.value === "Kort") {
        chosenText = "Denna text är inte lång.";
        chosenAuthor = "Robert Jonsson";
    }
    textDisplay.innerText = chosenText;
    title.innerText = select.value;
    const wordcount = chosenText.split(" ").length
    const charcount = chosenText.trim().length
    author.innerText = `${chosenAuthor} (${wordcount} words, ${charcount} chars)`;
})

let btn = document.getElementById("btn")
let playStopImg = document.getElementById("play-stop")
let gameChange;

btn.addEventListener("click", startGame)

base()
function base() {
    gameChange = true
}

function startGame() {

    if (gameChange) {
        playStopImg.setAttribute("src", "img/stop.png")
        document.getElementById("inputtext").disabled = false // gör att man inte kan ge input innan play
        yolo()
    } else {
        playStopImg.setAttribute("src", "img/play.png")
        document.getElementById("inputtext").disabled = true
        document.getElementById("inputtext").value = ""
        counter = 0
    }
    gameChange = !gameChange
}

function yolo() {

    textDisplay.innerText = ""

    chosenText.split("").forEach(character => {
        const characterSpan = document.createElement("span")
        characterSpan.innerText = character
        textDisplay.appendChild(characterSpan)
    })

    arrayText = textDisplay.querySelectorAll("span")

    arrayText[0].classList.add("text-background")

    inputElement.addEventListener("input", yalla)
}

function yalla(e) {

    const spanElement = arrayText[counter]
    const nextElement = arrayText[(counter + 1)]

    if (counter === arrayText.length - 1) {
        spanElement.classList.remove("text-background")
    } else {
        nextElement.classList.add("text-background")
        spanElement.classList.remove("text-background")
    }

    if (e.data !== spanElement.innerText) {
        spanElement.classList.add("incorrect")
        wrongSound.play()
    } else {
        spanElement.classList.add("correct")
    }

    // detta blankar efter varje mellanslag.
    if (e.data === " ") {
        document.getElementById("inputtext").value = ""
    }

    counter = counter + 1
}