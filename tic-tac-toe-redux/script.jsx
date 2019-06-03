// -- Actions -- https://redux.js.org/basics/actions

/*
 * action types
 */
const CLICK_GRID = 'CLICK_GRID';
const GO_TO_STEP = 'GO_TO_STEP';

/**
 * This action will be triggered once a player clicks on one of the squares
 * @param index
 * @returns {{index: *, type: string}}
 */
function clickGrid(index) {
    return {
        type: CLICK_GRID,
        index,
    };
}

/**
 * This action will "go back on time" and resume the game on a previous state
 * @param step
 * @returns {{step: *, type: string}}
 */
function goToStep(step) {
    return {
        type: GO_TO_STEP,
        step,
    }
}

// -- Reducers -- https://redux.js.org/basics/reducers

/**
 * The initial state of the game with an empty board.
 * history - will save an array of arrays where each of these final arrays wil contain an object representing the state of the board at that moment
 * stepNumber - tells the game how many moves have been done since the beginning of the game
 * xIsNext - Starts on true and it will switch on each move telling the board what player's turn is next
 * winner - Starts as null and once a player wins it will contain an object with the following notation { winner: 'X or O', 'line': [0,1,2] } Where line contains the square's indexes in the matrix that won the game
 * @type {{xIsNext: boolean, winner: null, history: {squares: any[]}[], stepNumber: number}}
 */
const initialState = {
    history : [{
        squares: Array( 9).fill(null)
    }],
    stepNumber: 0,
    xIsNext: true,
    winner: null,
}

/**
 * One single reducer that will handle the two types of actions
 * @param state
 * @param action
 * @returns {*}
 */
const ticTacToeReducer = (state = initialState, action) => {
    switch (action.type) {
        case CLICK_GRID:
            // This action comes with the index of the item clicked (From 0 to 8)

            // Slice the history creating a copy of it (respecting the mutation principles)
            let history = state.history.slice(0, state.stepNumber + 1);
            const current = state.history[state.stepNumber];
            const squares = current.squares.slice();

            // If there is already a winner or if the square was already clicked return the current state generating no changes
            if (state.winner || squares[action.index]) {
                return state;
            }

            // Modify the square clicked with the player identifier and concatenating the new move in our history creating a new move
            squares[action.index] = state.xIsNext ? 'X' : 'O';
            history = history.concat([{
                squares: squares,
                position: action.index,
            }]);
            // Check if after the previous move we have a winner
            const winner = calculateWinner(squares);

            return {
                history: history,
                stepNumber: history.length - 1,
                xIsNext: !state.xIsNext,
                winner: winner,
            };
        case GO_TO_STEP:
            // This action brings within the action type the step number

            // If the current step is the same one clicked don't do any changes
            if (action.step === state.stepNumber) {
                return state;
            }
            return {
                ...state,
                stepNumber: action.step,
                xIsNext: 0 === (action.step % 2),
                winner: null,
            }
        default:
            return state;
    }
};

/**
 * This function crates a React Element that will represent our Square in the table, all logic comes within the props argument and the object only knows that it has a value, a className and that it triggers a function
 * once it's clicked
 * @param props
 * @returns {*}
 * @constructor
 */
function Square(props) {
    return (
        <button className={props.className} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

/**
 * This component represents the game board and contains the logic to render the items and distribute all the information to the Squares (attributes and callbacks)
 */
class Board extends React.Component {
    renderSquare(i) {
        // This property will tell the square if it's part of the winner line
        const className = this.props.winner ? -1 !== this.props.winner.line.indexOf(i) ? 'square winner' : 'square' : 'square';

        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                className={className}
            />
        );
    }

    render() {


        let children = [], items;
        // Iterate through a nested loop rendering the board, the square children can be created first before adding them to their div parent.
        for (var i =0;i < 3;i++) {
            items = [];
            for (var j=0; j < 3; j++) {
                items.push(this.renderSquare(i*3+j));
            }
            children.push(<div className="board-row">{items}</div>);
        }

        return (
            <div>
                {children}
            </div>
        );
    }
}

const { PropTypes } = PropTypes;

/**
 * The Game component completely control the board and it's children it contains all the logic behind the rendering of the data contained in the Redux store
 */
class Game extends React.Component {

    /** These PropTypes will map what is being sent from the mapStateToProps with the component, the creation of this properties is not mandatory in order for redux to work
     * but it gives more clarity to the code flow and it also guarantees that redux is sending the properties that our components need to work properly
     * https://reactjs.org/docs/typechecking-with-proptypes.html */
    static propTypes = {
        history: PropTypes.array.isRequired,
        stepNumber: PropTypes.number.isRequired,
        xIsNext: PropTypes.bool.isRequired,
        winner: PropTypes.string.isRequired,
        handleBoardClick: PropTypes.func.isRequired,
        handleGoToStepClick: PropTypes.func.isRequired,
    }

    /**
     * Returns a cartesian position (x,y) based on a position in the array[0,..,8] plus the symbol that was played on the move sent
     * @param position
     * @param move
     * @returns {string}
     */
    calculateMoveAndPosition(position, move) {
        const x = (position % 3) + 1;
        const y = Math.floor(position/3) + 1;

        return 'Position: (' + x + ',' + y + ')' + ' ' + 'Symbol: ' + (1 === move%2 ? 'X' : '0');
    }

    render() {
        const history = this.props.history;
        const current = history[this.props.stepNumber];
        const winner = this.props.winner;

        /**
         * Creates the list of the moves and adds the data and listeners sent via props
         * @type {*[]}
         */
        const moves = history.map((step, move) => {
            if (move > this.props.stepNumber) {
                return;
            }
            const desc = move ?
                'Go to move #' + move + ' ' + this.calculateMoveAndPosition(step.position, move) :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.props.handleGoToStepClick(move)}>{desc}</button>

                </li>
            );
        });

        // Calculate the status of the game based on the winners property
        let status;
        if (winner) {
            status = 'Winner:' + winner.winner;
        } else if ( 9 === this.props.stepNumber ) {
            status = 'Draw game';
        } else {
            status = 'Next player:' + (this.props.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.props.handleBoardClick(i)}
                        winner={winner}
                    />
                </div>

                <div className="game-info">
                    <div>{ status }</div>
                    <ol>{ moves }</ol>
                </div>
            </div>
        );
    }
}

/**
 * Based on an array of squares calculates if there is a winner (On a 3x3 matrix), if there is a winner a winner object will be returned with the winner symbol and the lines that produced the win
 * @see initialState winner definition
 * @param squares
 * @returns {*}
 */
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return {
                winner: squares[a],
                line: [a, b, c]
            }
        }
    }
    return null;
}

const { createStore } = Redux;

// Use a Provider and a connect function in order to make the store available to all container components in the application without passing it explicitly. https://redux.js.org/basics/usage-with-react#passing-the-store
const { Provider, connect } = ReactRedux;

// Create a redux store https://redux.js.org/basics/store
const store = createStore(ticTacToeReducer);

/** To use connect(), you need to define a special function called mapStateToProps that describes how to transform the current Redux store state into the props you want to pass to a presentational component you are wrapping.
 https://redux.js.org/basics/usage-with-react#implementing-container-components */
// In this case the state doesn't transform because the redux state represents exactly what the game uses
const mapStateToProps = state => {
    return state;
};

/** In addition to reading the state, container components can dispatch actions. In a similar fashion, you can define a function called mapDispatchToProps() that receives the dispatch() method and returns
 * callback props that you want to inject into the presentational component. */
// Here we add the two callbacks that are triggered on the board (Square click and GoToStep click) these function just tell redux how the state is changing and internally he'll make the changes using our ticTacToeReducer
const mapDispatchToProps = dispatch => {
    return {
        handleBoardClick: (id) => {
            dispatch(clickGrid(id));
        },
        handleGoToStepClick : (step) => {
            dispatch(goToStep(step));
        },
    }
};

// Finally, we create the TicTacToeGame by calling connect() and passing these two functions:
const TicTacToeGame = connect(
    mapStateToProps,
    mapDispatchToProps
)(Game)

ReactDOM.render(
    <Provider store = {store}>
        <TicTacToeGame />
    </Provider>,
    document.getElementById('root')
);