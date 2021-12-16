# Project
Emma Pesjak

## Environment & Tools
The project was performed on a Windows 10 PC with WebStorm 2021.2.3, HTML5, CSS3, JS and Git version 2.33.0.windows.2.

## Purpose
The purpose of this project was to create a web application by applying the knowledge gained of HTML5, CSS3 
and JavaScript in this course.

## Procedures

To begin this project, the index.html file was created. All the HTML for grade E-B was added according to the 
project guidance. The `<canvas>` was added during the grade A-implementations. A head and a body was added, and in 
the head; metadata, title and links to the stylesheet, favicon and script were added. In the body, sections for 
header, main and footer were added. The header contained the logo and title. The main section was divided into 
four subsections according to the grade E requirements. For part 3.1.2 and grade C-B a checkbox for an ignore 
casing option, radio buttons for language and a dropdown select menu were added, each with names, IDs, and/or types
in their HTML-elements. For part 3.1.3 a section with text details in different `<h>` or `<p>` elements were added.
For the input and start/stop button section in 3.1.4 a text input field and a button was simply added. For the 3.1.5 
statistics section `<p>` elements containing the statistics information were added. This was also where 
the `<canvas>` was later added. Lastly, copyright information and an e-mail link was added to the footer. 

Once the HTML was roughly finished, the CSS work began. In order to get the background image to always cover the page,
the background properties were set to cover, be centered and the HTML minimum height was set to 100%. Margins were 
set to 0 on the body and the max-width was set to 600px to conform with the project guidance. To get the header in 
order, the logo and header text were set in a grid with two columns. Two different fonts were added to the font 
folder and with `@font-face`, these were implemented in the CSS. Font weight and style were set for both. 
The settings and statistics sections were also put in grids to comply with the layout stated in the project guidance. 
Also, over all, most element were given different paddings, margins, borders, fonts and styling.
The button attributes were set to transparent and with no border in order to only show the image. The placeholder in 
the input text box focus was set to transparent in order to make the text not show on focus. The footer got a 
top-border to clearly separate it from the rest of the content. To get the typed characters to be either red or 
slightly lighter green depending on if the user typed correctly, classes for correct and incorrect were added with
different colours. A class for adding a background to the next character to be typed was also added. Lastly,
the animation on the header was implemented with `@key-frames`, changing the colour and position, repeating infinite 
times and alternating back and forth.

The first function to be implemented in the JavaScript file was the `startStopGame` function. An event listener
was added to the play/stop button that called the function. Since the game basically had two states, 
either play or stop, a boolean variable `gameOn` was declared to be true and then altered between true/false each time
the button was clicked. This enabled the program to keep track on if the game was to play or to stop, and with an 
`if-statement` depending on this boolean, the program would execute differently. If the game state was to play the game,
the image on the button would change, the input field was enabled and automatically focused, the timer was started and 
the functions `resetFunc`, `setCanvas` and `spanText` was called. However, if the game state was to stop the game, the 
function would instead call the `stopFunc` function. It would also clear the background of the first character 
in the text in case of if the user would continuously only press the play/stop button.

At first the texts, authors and titles were hard coded into the script, this was later replaced during the 
implementations for grade B. The `spanText` function would replace the text in the text box with a version 
of it that had each character, including blank spaces in a `<span>`. This was done by looping over the text and create 
a span element for each character, then appending each spanned character to the displayed text. All spanned characters
were also put in an array to be used later when comparing user input. It was also used to att the class text-backgound 
on the next character to be entered by the user. Lastly in this function, an  event listener was added which listened 
to user input and calling the `gameInput` function.

The `gameInput` function would then take the user input and compare it with the text. For each user input a counter was 
incremented. By creating a constant `spanElement` based on the spanned text array with the index of the counter, 
the input data could be compared for each input. If the user input was not equal to the expected character, the function 
would add the `incorrect` class to the spanned element, play the error sound and increment an error counter. If it 
was correct, it would instead add the `correct` class. A constant `nextElement` was also created with the index of 
the counter plus one from the text array. With this the class for the text background could be added to clearly show
which character was to be written next. A problem that emerged with this was an error that came when the last character 
of the text was typed, since the index of the counter plus one did not exist. To fix this problem an `if-statement` was 
implemented that checked the length of the array and did not add a background on an element that did not exist. It 
would also disable the user input box so that no type errors would occur in case of if the user typed an excessive 
amount of characters. To get the input box to be emptied after each word, an `if-statement` that checked and emptied the
box if the user input was a blank space was implemented. Since grade C required an option to ignore casing, another 
`if-statement` was implemented that checked if the checkbox was checked an in that case set both the user input and the 
character to compare to lowercase. Lastly in this function the counter was incremented, the time was taken and 
the `statistics` function was called.

For the grade E requirements of the project the `statistics` function simply calculated the gross WPM, net WPM, 
accuracy and amount of errors, and wrote it om the page. The gross and net WPM were calculated as stated in the project 
guidance, with the counter and timers, and then rounded with no fraction digits. However, if the user were to perform
very badly, the net WPM would go below zero. This is a logical error since you cannot write fewer than zero words per 
minute. With an `if-statement` net WPM below zero would be written out as 0. To calculate the accuracy, the 
error counter was divided by the counter then multiplied by 100, and this was then subtracted from 100. It was also 
rounded with no fraction digits. The amount of errors was calculated by the error counter in the `gameInput` function. 
The canvas drawing was added to this function during the grade A implementations. For each user input the canvas would 
draw a new line representing the net WPM on the Y-axis and each character on the X-axis. To calculate where on the
X-axis each input were to be placed the counter was multiplied with the canvas width divided by the length of the 
chosen text. Since the (0, 0) coordinates in a default canvas is in the top left corner the Y-axis had to be reverted.
This was done by subtracting the net WPM from the canvas height.

The `resetFunc` function reset all counters, the statistics and the canvas, while the `stopFunc` function simply 
changed image on the start/stop button, disabled the input text box and removed the text in it.

By doing the grade B implementations a few changes had to be done since the text information was not to be 
hard coded in anymore. To get a good structure of the code, separate functions were made for setting up the text
information, the dropdown menu and for grade A, the canvas.



const parsedList = [];
const xhr = new XMLHttpRequest();
xhr.addEventListener("load", importFromFile);
xhr.open("get", "../texts.xml", true);
xhr.send();

`importFromFile`



`SetUpDropDown`
`SetUpText`


The `setCanvas` function set the width and height of the canvas, and drew out the guidelines using very thin rectangles.
It also set the starting point, here again by inverting the Y-axis and starting at the canvas height.

Lastly the `init` function was implemented. .....


## Discussion

Knowing I was aiming for grade A.... decided to implement everything, started by doing all html and then css.
the most challengeing part of thiss project was the grade B implementation, to get the XML working


först html och css
sen typsnitt och animation i D-delen
sen drop downen

visste från början att jag ville göra upp till A..


y axeln hade ju kunnat inverteras bättre, maybe not the most programmy solution, might be a more mathematical solution