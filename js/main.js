const parsedList = [];
const xhr = new XMLHttpRequest();

xhr.onload = function () {

    let parser =  new DOMParser();
    let xml = parser.parseFromString(xhr.responseText, "application/xml");
    let titles = xml.querySelectorAll("title");
    let authors = xml.querySelectorAll("author");
    let languages = xml.querySelectorAll("language");
    let texts = xml.querySelectorAll("text");

    for (let i = 0; i < titles.length; i++) {
        parsedList.push({
            id: i,
            title: titles[i].innerHTML,
            author: authors[i].innerHTML,
            language: languages[i].innerHTML,
            text: texts[i].innerHTML
        })
    }

    select.addEventListener("change", SetUpText);
    SetUpDropDown();
    SetUpText();
}

function SetUpDropDown() {

    //resets the dropdown list.
    document.getElementById("select").innerHTML = "";

    if (document.getElementById("swedish").checked) {
        parsedList.forEach(textObj => {
            if (textObj.language === "swedish") {
                const el = document.createElement("option");
                el.value = textObj.id;
                el.textContent = textObj.title;
                select.add(el);
            }
        })
        SetUpText();
    } else if (document.getElementById("english").checked) {
        parsedList.forEach(textObj => {
            if (textObj.language === "english") {
                const el = document.createElement("option");
                el.value = textObj.id;
                el.textContent = textObj.title;
                select.add(el);
            }
        })
        SetUpText();
    } else {
        parsedList.forEach(textObj => {
            const el = document.createElement("option");
            el.value = textObj.id;
            el.textContent = textObj.title;
            select.add(el);
        })
    }
}

function SetUpText() {

    document.getElementById("title").innerText = parsedList[select.value].title;
    chosenText = parsedList[select.value].text;
    let chosenAuthor = parsedList[select.value].author;
    textDisplay.innerText = chosenText;
    const wordcount = chosenText.split(" ").length;
    const charcount = chosenText.trim().length;
    document.getElementById("author").innerText =
        `${chosenAuthor} (${wordcount} words, ${charcount} chars)`;

    resetFunc();
    stopFunc();
    setCanvas();
}

function resetFunc() {
    errorCounter = 0;
    counter = 0;
    statsErr.innerText = "Errors:";
    statsAcc.innerText = "Accuracy:";
    statsGWPM.innerText = "Gross WPM:";
    statsNWPM.innerText = "Net WPM:";
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function stopFunc() {
    playStopImg.setAttribute("src", "img/play.png");
    document.getElementById("inputtext").disabled = true;
    document.getElementById("inputtext").value = "";
}

function setCanvas() {
    canvas.width = 200;
    canvas.height = 100;
    context.fillStyle = "darkslategray";
    context.fillRect(0, 20, 200, 1);
    context.fillRect(0, 40, 200, 1);
    context.fillRect(0, 60, 200, 1);
    context.fillRect(0, 80, 200, 1);
    context.beginPath();
    context.moveTo(0, canvas.height);
}

function startGame() {

    if (gameOn) {
        playStopImg.setAttribute("src", "img/stop.png");
        document.getElementById("inputtext").disabled = false; // gör att man inte kan ge input innan play
        timerStart = new Date();
        inputElement.focus();
        resetFunc();
        setCanvas();
        spanText();
    } else {
        stopFunc();
        arrayText[0].classList.remove("text-background");  //removes the text background on first char in case player only clicks play/stop/splay/stop
    }
    gameOn = !gameOn;
}

function spanText() {

    // removes placeholder text so that the spanned text can take its place.
    textDisplay.innerText = "";

    chosenText.split("").forEach(character => {
        const characterSpan = document.createElement("span");
        characterSpan.innerText = character;
        textDisplay.appendChild(characterSpan);
    })

    arrayText = textDisplay.querySelectorAll("span");

    arrayText[0].classList.add("text-background");

    inputElement.addEventListener("input", gameInput);
}

function gameInput(e) {

    const spanElement = arrayText[counter];
    const nextElement = arrayText[(counter + 1)];

    // Make sure script works when user is at end of text.
    if (counter === arrayText.length - 1) {
        spanElement.classList.remove("text-background");
    } else {
        nextElement.classList.add("text-background");
        spanElement.classList.remove("text-background");
    }

    // Check if ignore casing is checked.
    const ignoreCasing = document.getElementById("ignore-casing");
    let input = e.data;
    let charToCompare = spanElement.innerText;
    if (ignoreCasing.checked) {
        input = input.toLowerCase();
        charToCompare = charToCompare.toLowerCase();
    }

    // Compare input with expected character
    if (input !== charToCompare) {
        spanElement.classList.add("incorrect");
        const wrongSound = new Audio("../audio/wrong-sound.mp3");
        wrongSound.play();
        errorCounter = errorCounter + 1;
    } else {
        spanElement.classList.add("correct");
    }

    // Blanks the input box after every blank.
    if (input === " ") {
        document.getElementById("inputtext").value = "";
    }

    counter = counter + 1;
    timerNow = new Date();
    statistics();
}

function statistics() {
    statsErr.innerText = `Errors: ${errorCounter}`;

    let accuracy = (100 - (errorCounter/counter * 100)).toFixed(0);
    statsAcc.innerText = `Accuracy: ${accuracy}%`;

    let grossWPM = (((counter / 5) / (timerNow.getTime() - timerStart.getTime())) * 60 * 1000).toFixed(0);
    statsGWPM.innerText = `Gross WPM: ${grossWPM}`;

    // Blir detta rätt?
    let netWPM = (((counter / 5) - errorCounter) /
        (timerNow.getTime() - timerStart.getTime()) * 60 * 1000).toFixed(0);
    if (netWPM > 0) {
        statsNWPM.innerText = `Net WPM: ${netWPM}`;
    } else {
        statsNWPM.innerText = "Net WPM: 0";
    }

    // Canvas
    let timePassed = (timerNow.getTime() - timerStart.getTime()) / 1000;

    context.lineTo(timePassed, (canvas.height - grossWPM));
    context.strokeStyle = "darkslategray";
    context.stroke();
}


xhr.open("get", "../texts.xml", true);
xhr.send();

const textDisplay = document.getElementById("textarea");
let select = document.getElementById("select");

let chosenText;
let arrayText;
const inputElement = document.getElementById("inputtext");
let counter;

const btn = document.getElementById("btn");
const playStopImg = document.getElementById("play-stop");
let gameOn = true;

const statsGWPM = document.getElementById("gross");
const statsNWPM = document.getElementById("net");
const statsAcc = document.getElementById("accuracy");
const statsErr = document.getElementById("errors");
let errorCounter;

let timerNow;
let timerStart;

let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");

const languageBtn = document.querySelectorAll("input[name='swedish-english']");
languageBtn.forEach(button => button.addEventListener("change", SetUpDropDown));

btn.addEventListener("click", startGame);