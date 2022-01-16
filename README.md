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
either play or stop, a boolean variable `gameOn` was declared to be false and then altered between true/false each time
the button was clicked. This enabled the program to keep track on if the game was to play or to stop, and with an 
`if-statement` depending on this boolean, the program would execute differently. If the game state was to play the game,
the image on the button would change, the input field was enabled and automatically focused, the timer was started and 
the functions `resetGame`, `setUpCanvas` and `spanText` was called. However, if the game state was to stop the game, the 
function would instead call the `stopGame` function. It would also clear the background of the first character 
in the text in case of if the user would continuously only press the play/stop button.

At first the texts, authors and titles were hard coded into the script, this was later replaced during the 
implementations for grade B. The `spanText` function would replace the text in the text box with a version 
of it that had each character, including blank spaces in a `<span>`. This was done by looping over the text and create 
a span element for each character, then appending each spanned character to the displayed text. All spanned characters
were also put in an array to be used later when comparing user input. It was also used to att the class text-background 
on the next character to be entered by the user. Lastly in this function, an  event listener was added which listened 
to user input and calling the `gameInput` function.

The `gameInput` function would then take the user input and compare it with the text. For each user input a counter was 
incremented. By creating a constant `spanElement` based on the spanned text array with the index of the counter, 
the input data could be compared for each input. If the user input was not equal to the expected character, the function 
would add the `incorrect` class to the spanned element, play the error sound and increment an error counter. If it 
was correct, it would instead add the `correct` class. A constant `nextElement` was also created with the index of 
the counter plus one, from the text array. With this the class for the text background could be added to clearly show
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
minute. With an `if-statement` net WPM below zero would be given the value of 0 instead. To calculate the accuracy, the 
error counter was divided by the counter then multiplied by 100, and this was then subtracted from 100. It was also 
rounded with no fraction digits. The amount of errors was calculated by the error counter in the `gameInput` function. 
The canvas drawing was added to this function during the grade A implementations. For each user input the canvas would 
draw a new point on the line representing the net WPM on the Y-axis and each character on the X-axis. To calculate 
where on the X-axis each input were to be placed the counter was multiplied with the canvas width divided by the length
of the chosen text. This meant that the canvas X-axis would be completely filled once the user had typed the entire 
text. Since the (0, 0) coordinates in a default canvas is in the top left corner the Y-axis had to be 
reverted. This was done by subtracting the net WPM from the canvas height.

The `resetGame` function reset all counters, the statistics and the canvas, while the `stopGame` function simply 
changed image on the start/stop button, disabled the input text box and removed the text in it.

By doing the grade B implementations a few changes had to be done since the text information was not to be 
hard coded in anymore. To get a good structure of the code, separate functions were made for setting up the text
information, the dropdown menu and for grade A, the canvas. In order to load the XML file, an XML HTTP request was done
and an event listener which ran on load and called the `importFromFile` function was implemented. The function 
parsed the information from the XML file response text with `DOMParser()` and `parseFromString()`. Lists of all 
titles, authors, languages and texts were created and with these a list of objects containing all information for each
text was created. An ID for each item was also added here to be used later in other functions. The function then called 
the `setUpDropDown` and `setUpText` functions, and added an event listener to the dropdown menu on change to 
again call the `setUpText` function.

Next function to be implemented was the `setUpDropDown` function, since this was called from the `importFromFile`
function. To get the dropdown to only display text with the chosen language (if any chosen), the dropdown was reset
each time the user changed the language. An event listener was added in the `init` function on the buttons,
and called the function on click. The function would empty the dropdown and with an `if-statement` check which, if any,
language was chosen. Then, with the `addOption` function use the parsed list of objects to add values and text 
contents for each option in the dropdown. It would then call the `setUpText` function to update the text box
information to make sure that a text in english was displayed if english was checked, and a swedish text if 
swedish was checked.

The `setUpText` function was implemented to update the text box with the chosen text, title and author. This was done 
by taking the parsed list of objects from the XML file, and getting each item by taking the select value,
which was the same as the appointed ID. The function also calculated the amount of words and characters in the 
chosen text by counting the total length and by splitting and at blank space and then counting the length. 
Lastly, this function called the `resetGame`, `stopGame` and `setUpCanvas` functions to prepare the game for the next 
round.

The `setUpCanvas` function set the width and height of the canvas, and drew out the guidelines using very thin 
rectangles. It also set the starting point, here again by inverting the Y-axis and starting at the canvas height.

Lastly the `init` function was implemented, and outside it, an event listener that ran the function on load. The 
function wrapped all the other functions and declared a few constants, variables and arrays used throughout the script.
This was where the XMLHttp request was done. It also had the event listeners for the radio button and start/play button.


## Discussion

Knowing from the beginning that I was aiming for a higher grade, I decided to implement everything in the project 
requirements (except for the canvas in grade A, since I had to read up a lot on canvas before implementing it) from 
the start in the HTML and CSS. Almost all the HTML and CSS was finished before I even started with the JavaScript. 
I also thought that it would be easier to get the layout and design of the page set from the beginning, and not 
having to bother later with grids, paddings, margins, structure etc. Of course, the added radio buttons and checkbox
for grade B ans C did not function from the beginning but this was all fixed later when the JavaScript was implemented.

As with the laborations in this course, the HTML and CSS was fairly straight forward to implement. It is incredibly 
tempting to just put all HTML elements into `<div>`s to get the wanted layout of the page, but since it is 
understandably frowned upon, I tried to use other tags as much as possible. Creating the animation was probably the
most challenging part of the CSS, but with a bit of reading up on the subject, the implementation was easy. 
The colour palette of the page could probably be improved to make the letters in the text box easier to read, but 
since this is not a design course, I deemed it to be good enough. 

The JavaScript program was divided into quite a few smaller functions, to get the application to run as smooth as 
possible and the code easy to read. The most challenging part of this project was the grade B implementation, 
to get the XML import working and parsed correctly. I tried implementing it from the very beginning, 
but feeling a bit overwhelmed, I decided to break the project down in smaller parts and start by hard coding the texts.

At first, to solve how the game could be played and stopped, I thought about having a counter counting each time the 
button was pressed. This did not feel like an optimal solution, and I decided to go with a boolean that switched 
between true and false each time instead, which seemed to be quite a good way of handling it. It was easy to then 
control the game and functions based on if the value was true or false.

Figuring out how to add classes to the separate letters in the text during the game was not the easiest task. Since 
the project guidance gave the tip of setting each character in a span element, I decided to go for that type of 
solution. Then by having a counter that was incremented for each character typed by the user, the character could be 
compared with the text by taking the counter as index value. Then it was just a matter of assigning classes for correct, 
incorrect and next-character to add the visual colour effects. To get the error sound to play properly, the file was
cached on load and the called each time the user would type an error. Since the `play()` function for sounds returns a
promise, in case of any error this was to be logged in the console.

Implementing the `statistics` function was pretty straight forward, the only issue was with the logical error of getting 
a negative net WPW as mentioned earlier. 

The `resetGame` and `stopGame` functions might seem similar, but they do quite different things, and from the 
beginning they were implemented as a single function. They also get called on different times by different functions
which made it apparent to divide them into separate functions. I decided to let the `stopGame` function disable the 
input field while the game was stopped since users should not type in the input before the game starts. The 
`setUpDropDown`, `setUpText` and `setUpCanvas` functions all prepare the game, but since these too are called by
different functions, different times during the game they were divided into three separate functions. This also 
makes the code easier to read and follow since it is divided and not in a huge function.

I chose to import the XML file with a XMLHttpRequest, and not with JSON, mostly because I have not worked with 
XMLHttpRequests before and wanted to learn this. However, I do prefer JSON, this also seem to be the new standard.

Considering how the inversion of the Y-axis in the canvas was done, it could maybe have been solved a bit more
"programmy", but simply subtracting the value from the canvas height was a simple and quick solution. Drawing 
rectangles as guidelines in the canvas diagram might not be the fanciest solution either, but I thought it to be
pretty simple and not requiring very many lines of code. Also, by using the canvas width and height when drawing the 
rectangles, and not hard coding in values, it is easy to change the size of the canvas, without having to 
bother about the lines being in the wrong place.

This course has taught me all I know about HTML, CSS and JavaScript. I started out knowing nothing, but feel that I 
have learnt quite a bit. By completing all requirements for grade E-A, I have shown my ability to create a web 
application using HTML, CSS and JavaScript, and thereby the purpose has been fulfilled.