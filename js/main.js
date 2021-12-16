
function init() {
// Initiate the script and call the importFromFile function.


    function importFromFile() {
        // Parse and import information from the XML file.

        let parser =  new DOMParser();
        let xml = parser.parseFromString(xhr.responseText, "application/xml");
        let titles = xml.querySelectorAll("title");
        let authors = xml.querySelectorAll("author");
        let languages = xml.querySelectorAll("language");
        let texts = xml.querySelectorAll("text");

        // Loop over the XML file to create an object with all information,
        // giving each item an ID to match the index to be used in other functions.
        for (let i = 0; i < titles.length; i++) {
            parsedList.push({
                id: i,
                title: titles[i].innerHTML,
                author: authors[i].innerHTML,
                language: languages[i].innerHTML,
                text: texts[i].innerHTML
            })
        }

        // Call the SetUpDropDown and SetUpText in order to update the page with all information.
        // Also add event listener to change on the dropdown menu in order to change the text box.
        SetUpDropDown();
        SetUpText();
        select.addEventListener("change", SetUpText);
    }

    function SetUpDropDown() {
        // Function that decides which options are available in the dropdown list.

        // Resets the current dropdown list.
        document.getElementById("select").innerHTML = "";

        // Depending on if/which radio button is clicked, add texts to the dropdown menu.
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
        // Updates the text box with the chosen text, title and author.

        document.getElementById("title").innerText = parsedList[select.value].title;
        chosenText = parsedList[select.value].text;
        let chosenAuthor = parsedList[select.value].author;
        textDisplay.innerText = chosenText;

        // Calculate amount och words and characters in the chosen text.
        const wordcount = chosenText.split(" ").length;
        const charcount = chosenText.length;
        document.getElementById("author").innerText =
            `${chosenAuthor} (${wordcount} words, ${charcount} chars)`;

        resetFunc();
        stopFunc();
        setCanvas();
    }

    function resetFunc() {
        // Reset all counters, statistics and canvas.

        errorCounter = 0;
        counter = 0;
        statsErr.innerText = "Errors:";
        statsAcc.innerText = "Accuracy:";
        statsGWPM.innerText = "Gross WPM:";
        statsNWPM.innerText = "Net WPM:";
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function stopFunc() {
        // Sets the play button, and disables and empties the input field.

        playStopImg.setAttribute("src", "img/play.png");
        inputElement.disabled = true;
        inputElement.value = "";
    }

    function setCanvas() {
        // Set up the canvas with size, lines and starting point.
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

    function startStopGame() {
        // Depending on the state, either start or stop the game.

        if (gameOn) {
            // Change image on play/stop button.
            playStopImg.setAttribute("src", "img/stop.png");

            // Enable the input field.
            inputElement.disabled = false;

            // Start the timer
            timerStart = new Date();

            // Automatically focus the input field.
            inputElement.focus();

            resetFunc();
            setCanvas();
            spanText();
        } else {
            // Call stop function to stop the game.
            stopFunc();
            // Remove the text background on the first character in case player only clicks play/stop/play/stop
            arrayText[0].classList.remove("text-background");
        }

        // Change game state.
        gameOn = !gameOn;
    }

    function spanText() {
        // Function that sets each character, including space, in an span.

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
        // Function that compares user input with the text and adds classes/ plays sound
        // depending on if user is correct or not.

        const spanElement = arrayText[counter];
        const nextElement = arrayText[(counter + 1)];

        // Make sure script works when user is at end of text.
        if (counter === arrayText.length - 1) {
            spanElement.classList.remove("text-background");
            inputElement.disabled = true;
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

        // Blanks the input box after every space.
        if (input === " ") {
            inputElement.value = "";
        }

        //increment the counter and get the time for the input.
        counter = counter + 1;
        let timerNow = new Date();
        statistics(timerNow);
    }

    function statistics(timerNow) {
        // Function that calculate and display statistics on the page.

        let grossWPM = (((counter / 5) / (timerNow.getTime() - timerStart.getTime())) * 60 * 1000).toFixed(0);
        statsGWPM.innerText = `Gross WPM: ${grossWPM}`;

        let netWPM = (((counter / 5) - errorCounter) /
            (timerNow.getTime() - timerStart.getTime()) * 60 * 1000).toFixed(0);
        if (netWPM > 0) {
            statsNWPM.innerText = `Net WPM: ${netWPM}`;
        } else {
            statsNWPM.innerText = "Net WPM: 0";
        }

        let accuracy = (100 - (errorCounter/counter * 100)).toFixed(0);
        statsAcc.innerText = `Accuracy: ${accuracy}%`;

        statsErr.innerText = `Errors: ${errorCounter}`;

        // Update the canvas. X-axis forwards movement is calculated by counter multiplied with
        // canvas width multiplied with total number of characters in the text. In order to invert the y-axis,
        // the y coordinate is set to the canvas height minus the WPM.
        context.lineTo((counter * canvas.width / chosenText.length), (canvas.height - netWPM));
        context.strokeStyle = "darkslategray";
        context.stroke();
    }

    const parsedList = [];
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load", importFromFile);
    xhr.open("get", "../texts.xml", true);
    xhr.send();

    const textDisplay = document.getElementById("textarea");
    let select = document.getElementById("select");
    let chosenText;
    let arrayText;
    const inputElement = document.getElementById("inputtext");

    let counter;
    let errorCounter;
    let timerStart;

    const playStopImg = document.getElementById("play-stop");

    let gameOn = true;

    const statsGWPM = document.getElementById("gross");
    const statsNWPM = document.getElementById("net");
    const statsAcc = document.getElementById("accuracy");
    const statsErr = document.getElementById("errors");

    let canvas = document.querySelector("canvas");
    let context = canvas.getContext("2d");


    // Add eventlisteners on the buttons.
    document.querySelectorAll("input[name='swedish-english']")
        .forEach(button => button.addEventListener("change", SetUpDropDown));

    document.getElementById("btn").addEventListener("click", startStopGame);
}

window.addEventListener("load", init);