// Initiate the script and call the importFromFile function.
function init() {

    // Parse and import information from the XML file.
    function importFromFile() {
        const parser =  new DOMParser();
        const xml = parser.parseFromString(xhr.responseText, "application/xml");
        const titles = xml.querySelectorAll("title");
        const authors = xml.querySelectorAll("author");
        const languages = xml.querySelectorAll("language");
        const texts = xml.querySelectorAll("text");

        // Loop over the XML file to create a list of objects with all information,
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

        // Call the setUpDropDown and setUpText in order to update the page with all information.
        // Also add event listener to change on the dropdown menu in order to change the text box.
        setUpDropDown();
        setUpText();
        select.addEventListener("change", setUpText);
    }

    // Function that decides which options are available in the dropdown list.
    function setUpDropDown() {
        // Resets the current dropdown list.
        select.innerHTML = "";

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
            setUpText();
        } else if (document.getElementById("english").checked) {
            parsedList.forEach(textObj => {
                if (textObj.language === "english") {
                    const el = document.createElement("option");
                    el.value = textObj.id;
                    el.textContent = textObj.title;
                    select.add(el);
                }
            })
            setUpText();
        } else {
            // If none of the radio buttons are clicked, we end up in this case,
            // this is only possible on initial load since you cannot unclick radio buttons.
            parsedList.forEach(textObj => {
                const el = document.createElement("option");
                el.value = textObj.id;
                el.textContent = textObj.title;
                select.add(el);
            })
        }
    }

    // Update the text box with the chosen text, title and author.
    function setUpText() {
        document.getElementById("title").innerText = parsedList[select.value].title;
        chosenText = parsedList[select.value].text;
        const chosenAuthor = parsedList[select.value].author;
        textDisplay.innerText = chosenText;

        // Calculate amount och words and characters in the chosen text.
        const wordCount = chosenText.split(" ").length;
        const charCount = chosenText.length;
        document.getElementById("author").innerText =
            `${chosenAuthor} (${wordCount} words, ${charCount} chars)`;

        stopGame();
        resetGame();
        setUpCanvas();
    }

    // Reset all counters, statistics and canvas.
    function resetGame() {
        errorCounter = 0;
        counter = 0;
        statsErr.innerText = "Errors:";
        statsAcc.innerText = "Accuracy:";
        statsGWPM.innerText = "Gross WPM:";
        statsNWPM.innerText = "Net WPM:";
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Sets the play button, and disables and empties the input field.
    function stopGame() {
        playStopImg.setAttribute("src", "img/play.png");
        inputElement.disabled = true;
        inputElement.value = "";
    }

    // Set up the canvas with size, lines and starting point.
    function setUpCanvas() {
        canvas.width = 200;
        canvas.height = 100;
        context.fillStyle = "darkslategray";
        context.fillRect(0, canvas.height * 1/5, canvas.width, 1);
        context.fillRect(0, canvas.height * 2/5, canvas.width, 1);
        context.fillRect(0, canvas.height * 3/5, canvas.width, 1);
        context.fillRect(0, canvas.height * 4/5, canvas.width, 1);
        context.beginPath();
        context.moveTo(0, canvas.height);
    }

    // Depending on the state, either start or stop the game.
    function startStopGame() {
        // Change game state.
        gameOn = !gameOn;

        if (gameOn) {
            // Change image on play/stop button.
            playStopImg.setAttribute("src", "img/stop.png");

            // Enable the input field.
            inputElement.disabled = false;

            // Automatically focus the input field.
            inputElement.focus();

            // Start the timer
            timerStart = new Date();

            resetGame();
            setUpCanvas();
            spanText();
        } else {
            // Call stop function to stop the game.
            stopGame();
            // Remove the text background on the first character in case player only clicks play/stop/play/stop...
            charArray[0].classList.remove("text-background");
        }
    }

    // Function that sets each character, including spaces, in spans. This is to enable
    // modification of the styling on each character.
    function spanText() {
        // Remove placeholder text so that the spanned text can take its place.
        textDisplay.innerText = "";

        chosenText.split("").forEach(character => {
            const characterSpan = document.createElement("span");
            characterSpan.innerText = character;
            textDisplay.appendChild(characterSpan);
        })

        // Store all spans in an array so that we can access the elements when
        // comparing with game input.
        charArray = textDisplay.querySelectorAll("span");

        charArray[0].classList.add("text-background");

        inputElement.addEventListener("input", gameInput);
    }

    // Function that compares user input with the text and adds classes/ plays sound
    // depending on if user is correct or not.
    function gameInput(e) {
        const spanElement = charArray[counter];
        const nextElement = charArray[(counter + 1)];

        // Make sure script works when user is at end of text to avoid trying to access
        // next character when on the last character.
        if (counter === charArray.length - 1) {
            spanElement.classList.remove("text-background");
            inputElement.disabled = true;
        } else {
            nextElement.classList.add("text-background");
            spanElement.classList.remove("text-background");
        }

        let input = e.data;
        let charToCompare = spanElement.innerText;

        // If ignore casing is checked, change the characters to lowercase.
        const ignoreCasing = document.getElementById("ignore-casing");
        if (ignoreCasing.checked) {
            input = input.toLowerCase();
            charToCompare = charToCompare.toLowerCase();
        }

        // Compare input with expected character and evaluate.
        if (input !== charToCompare) {
            spanElement.classList.add("incorrect");
            const wrongSound = new Audio("audio/wrong-sound.mp3");
            wrongSound.play().catch(err => console.log(err));
            errorCounter = errorCounter + 1;
        } else {
            spanElement.classList.add("correct");
        }

        // Blanks the input box after every space.
        if (input === " ") {
            inputElement.value = "";
        }

        // Increment the counter and get the time for the input.
        counter = counter + 1;
        let timerNow = new Date();
        statistics(timerNow);
    }

    // Function that calculate and display statistics on the page.
    function statistics(timerNow) {
        // Calculate gross WPM, assuming words have a length of 5 characters.
        let grossWPM = (((counter / 5) / (timerNow.getTime() - timerStart.getTime())) * 60 * 1000).toFixed(0);
        statsGWPM.innerText = `Gross WPM: ${grossWPM}`;

        let netWPM = (((counter / 5) - errorCounter) /
            (timerNow.getTime() - timerStart.getTime()) * 60 * 1000).toFixed(0);
        if (netWPM < 0) {
            netWPM = 0;
        }
        statsNWPM.innerText = `Net WPM: ${netWPM}`

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
    xhr.open("get", "texts.xml", true);
    xhr.send();

    const textDisplay = document.getElementById("textarea");
    let select = document.getElementById("select");
    let chosenText;
    let charArray;
    const inputElement = document.getElementById("inputtext");

    let counter;
    let errorCounter;
    let timerStart;

    // This is for caching the sound on the webpage to prevent any delays.
    new Audio("audio/wrong-sound.mp3");

    const playStopImg = document.getElementById("play-stop");

    let gameOn = false;

    const statsGWPM = document.getElementById("gross");
    const statsNWPM = document.getElementById("net");
    const statsAcc = document.getElementById("accuracy");
    const statsErr = document.getElementById("errors");

    let canvas = document.querySelector("canvas");
    let context = canvas.getContext("2d");

    // Add event listeners that sets up the dropdown menu when clicking the radio buttons.
    document.querySelectorAll("input[name='swedish-english']")
        .forEach(button => button.addEventListener("change", setUpDropDown));

    // Add event listener to the play/stop button.
    document.getElementById("btn").addEventListener("click", startStopGame);
}

window.addEventListener("load", init);