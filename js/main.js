const parsedList = []


// det här är ju ett fett stort frågetecken
const xhr = new XMLHttpRequest();

xhr.onload = function () {

    let parser =  new DOMParser();
    let xml = parser.parseFromString(xhr.responseText, "application/xml");
    let titles = xml.querySelectorAll("title")
    let authors = xml.querySelectorAll("author")
    let languages = xml.querySelectorAll("language")
    let texts = xml.querySelectorAll("text")



    for (let i = 0; i < titles.length; i++) {
        parsedList.push({
            id: i,
            title: titles[i].innerHTML,
            author: authors[i].innerHTML,
            language: languages[i].innerHTML,
            text: texts[i].innerHTML
        })
    }

    dropDown()

    select.addEventListener("change", textfixer)
    textfixer()
}

xhr.open("get", "../texts.xml", true);
xhr.send();





const textDisplay = document.getElementById("textarea")
const title = document.getElementById("title")
const author = document.getElementById("author")
let select = document.getElementById("select");
let chosenText;
let chosenAuthor;
let arrayText;
const inputElement = document.getElementById("inputtext");
let counter;
const wrongSound = new Audio("../audio/wrong-sound.mp3")

const btn = document.getElementById("btn")
const playStopImg = document.getElementById("play-stop")
let gameChange = true

const statsGWPM = document.getElementById("gross")
const statsNWPM = document.getElementById("net")
const statsAcc = document.getElementById("accuracy")
const statsErr = document.getElementById("errors")
let errorCounter;

let timerNow;
let timerStart;

function textfixer() {

    // sätta dessa som lokala variabler istället??

    title.innerText = parsedList[select.value].title
    chosenText = parsedList[select.value].text
    chosenAuthor = parsedList[select.value].author
    textDisplay.innerText = chosenText;
    const wordcount = chosenText.split(" ").length
    const charcount = chosenText.trim().length
    author.innerText = `${chosenAuthor} (${wordcount} words, ${charcount} chars)`;

    resetFunc()
    stopFunc()
}

btn.addEventListener("click", startGame)

function startGame() {

    if (gameChange) {
        playStopImg.setAttribute("src", "img/stop.png")
        document.getElementById("inputtext").disabled = false // gör att man inte kan ge input innan play
        resetFunc()
        timerStart = new Date()
        yolo()
    } else {
        stopFunc()
        arrayText[0].classList.remove("text-background")  //removes the text background on first char in case player only clicks play/stop/splay/stop
    }
    gameChange = !gameChange
}

function resetFunc() {
    errorCounter = 0
    counter = 0
    statsErr.innerText = "Errors:"
    statsAcc.innerText = "Accuracy:"
    statsGWPM.innerText = "Gross WPM:"
    statsNWPM.innerText = "Net WPM:"
}

function stopFunc() {
    playStopImg.setAttribute("src", "img/play.png")
    document.getElementById("inputtext").disabled = true
    document.getElementById("inputtext").value = ""
}

function yolo() {

    // removes placeholder text so that the spanned text can take its place.
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

    // Make sure script works when user is at end of text.
    if (counter === arrayText.length - 1) {
        spanElement.classList.remove("text-background")
    } else {
        nextElement.classList.add("text-background")
        spanElement.classList.remove("text-background")
    }

    // Check if ignore casing is checked.
    const ignoreCasing = document.getElementById("ignore-casing")
    let input = e.data
    let charToCompare = spanElement.innerText
    if (ignoreCasing.checked) {
        input = input.toLowerCase()
        charToCompare = charToCompare.toLowerCase()
    }

    // Compare input with expected character
    if (input !== charToCompare) {
        spanElement.classList.add("incorrect")
        wrongSound.play()
        errorCounter = errorCounter + 1
    } else {
        spanElement.classList.add("correct")
    }

    // Blanks the input box after every blank.
    if (input === " ") {
        document.getElementById("inputtext").value = ""
    }

    counter = counter + 1
    timerNow = new Date()
    statistics()
}

function statistics() {
    statsErr.innerText = `Errors: ${errorCounter}`

    let accuracy = (100 - (errorCounter/counter * 100)).toFixed(0)
    statsAcc.innerText = `Accuracy: ${accuracy}%`

    let grossWPM = (((counter / 5) / (timerNow.getTime() - timerStart.getTime())) * 60 * 1000).toFixed(0)
    statsGWPM.innerText = `Gross WPM: ${grossWPM}`

    // Blir detta rätt?
    let netWPM = (((counter / 5) - errorCounter) / (timerNow.getTime() - timerStart.getTime()) * 60 * 1000).toFixed(0)
    if (netWPM > 0) {
        statsNWPM.innerText = `Net WPM: ${netWPM}`
    } else {
        statsNWPM.innerText = "Net WPM: 0"
    }
}


const buttons = document.querySelectorAll("input[name='swedish-english']")
buttons.forEach(button => button.addEventListener("change", dropDown))


function dropDown() {

    //resets the dropdown list.
    document.getElementById("select").innerHTML = ""

    if (document.getElementById("swedish").checked) {

        parsedList.forEach(textObj => {
            if (textObj.language === "swedish") {
                const el = document.createElement("option")
                el.value = textObj.id
                el.textContent = textObj.title
                select.add(el)
            }
        })
        textfixer()

    } else if (document.getElementById("english").checked) {

        parsedList.forEach(textObj => {
            if (textObj.language === "english") {
                const el = document.createElement("option")
                el.value = textObj.id
                el.textContent = textObj.title
                select.add(el)
            }
        })
        textfixer()

    } else {
        parsedList.forEach(textObj => {
            const el = document.createElement("option")
            el.value = textObj.id
            el.textContent = textObj.title
            select.add(el)
        })
    }
}



//canvas
let canvas = document.querySelector("canvas")
let context = canvas.getContext("2d")

context.fillRect(0, 30, 300, 1)
context.fillRect(0, 60, 300, 1)
context.fillRect(0, 90, 300, 1)
context.fillRect(0, 120, 300, 1)


context.beginPath();

context.moveTo(0, 0)
context.lineTo(0, 20)
context.lineTo(50, 30)
context.lineTo(70, 40)
context.lineTo(80, 20)

context.stroke();

