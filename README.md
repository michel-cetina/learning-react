# Introduction
This project was made with the purpose of helping during the learning process of the [REACT](https://reactjs.org/) library.

The project contains four different sub-projects and a README file that describes the project content and how this tutorial should be taken.

\* (SA) stands for Stand Alone application meaning that this application can be run without installing any extra packages in the machine running it.

Code and commentaries in these projects were taken from two different sources.

Egghead courses given by [Dan Abramov's](https://github.com/gaearon) - [Getting started with Redux](https://egghead.io/courses/getting-started-with-redux) and [John Lindquist](https://github.com/johnlindquist) - [Learn ES6(ECMAScript 2015)](https://egghead.io/courses/learn-es6-ecmascript-2015).
And the official [ReactJs website](https://reactjs.org) following their amazing [tutorial](https://reactjs.org/tutorial/tutorial.html#wrapping-up).

## The projects

### es6
This application summarise all changes introduced on 2015 to Javascript (ECMAScript 6), also known as ECMAScript 2015, is the latest version of the ECMAScript standard.

Personally, I never documented myself regarding these changes and once I jumped into REACT I found myself struggling a lot with the basic concepts in REACT. Then I decided to study ES6 before continuing with the REACT tutorials.

If you want to modify/run the script contained in this project you'll need to install **babel** via npm in order to transpile your code into something that node can understand.

The content of the project was created based on the following tutorial: https://egghead.io/courses/learn-es6-ecmascript-2015 

```bash
# ReactExamples/es6

# Install the required libraries
npm install

# Generate the distribution script
./node_modules/.bin/babel  ./src --experimental --source-maps-inline -d ./dist

# Run the generated script
node dist/learn-es6.js
```

### Tic-tac-toe (SA)
Besides the tic-tac-toe game the application also offers the ability to list the previous moves and the ability to go back in time to a previous move.

This example was taken from the react [website](https://reactjs.org/tutorial/tutorial.html) and it contains the code made through the tutorial alongside a series of notes that were considered relevant during the creation of this tutorial.

The code also contains the following feature suggested by the original tutorial described below:
1. Display the location for each move in the format (col, row) in the move history list.

### Tic-tac-toe-redux (SA)
This project refactors the Tic-tac-toe game and applies Redux concepts. It also includes personal thoughts and commentaries taken from the Redux official website.

The following challenges mentioned in the react [tutorial](https://reactjs.org/tutorial/tutorial.html#wrapping-up) were also included:

1. Display the location for each move in the format (col, row) in the move history list.
3. Rewrite Board to use two loops to make the squares instead of hardcoding them.
5. When someone wins, highlight the three squares that caused the win.
6. When no one wins, display a message about the result being a draw.


### toDo (SA)
The toDo application builds a minimalistic task manager system where users can create tasks, mark them as completed and filter them by their status (All, Active and Completed).

This project is the result of a lesson offered by the [Egghead site](https://egghead.io/courses/getting-started-with-redux) and contains the following topics:
* React components
* Redux

At the moment the project lacks of commentaries which makes it suitable for a person that already understands the React and Redux concepts.

