
let titleList = []
let authorList = []
let languageList = []
let textList = []


// det här är ju ett fett stort frågetecken
const xhr = new XMLHttpRequest();

xhr.onload = function () {

    let parser =  new DOMParser();
    let xml = parser.parseFromString(xhr.responseText, "application/xml");
    let titles = xml.querySelectorAll("title")
    let authors = xml.querySelectorAll("author")
    let languages = xml.querySelectorAll("language")
    let texts = xml.querySelectorAll("text")

    titles.forEach(title => {
        titleList.push(title.innerHTML)
    })

    authors.forEach(author => {
        authorList.push(author.innerHTML)
    })

    languages.forEach(language => {
        languageList.push(language.innerHTML)
    })

    texts.forEach(text => {
        textList.push(text.innerHTML)
    })

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

    title.innerText = titleList[select.value]
    chosenText = textList[select.value]
    chosenAuthor = authorList[select.value]
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

function languages() {
    if (document.getElementById("swedish").checked) {
        languageList.forEach((option, index) => {
            if (option === "english") {
                let testttt= document.getElementsByTagName("option")
                testttt[index].disabled = true
            }
        })
    } else {
        languageList.forEach((option, index) => {
            if (option === "swedish") {
                let testttt= document.getElementsByTagName("option")
                testttt[index].disabled = true
            }
        })
    }
}

function dropDown() {

    if (document.getElementById("swedish").checked) {

        languageList.forEach((option, index) => {
            if (option === "english") {
                console.log(option)
                select.remove(index)
            }
        })
    } else if (document.getElementById("english").checked) {
        languageList.forEach((option, index) => {
            if (option === "swedish") {


                let testttt= document.getElementsByTagName("option")
                testttt[index].disabled = true
            }
        })
    } else {
        titleList.forEach((option, index) => {
            const el = document.createElement("option")
            el.value = index
            el.textContent = option
            select.add(el)
        })
    }



}



//canvas
