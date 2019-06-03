// We’ll now change the Square to be a function component.
// class Square extends React.Component {
//     render() {
//         return (
//             <button
//                 className="square"
//                 onClick={() => this.props.onClick()}
//             >
//                 {this.props.value}
//             </button>
//         );
//     }
// }

/* In React, function components are a simpler way to write components that only contain a render method and don’t have their own state. Instead of defining a class which extends React.Component, we can write a function
that takes props as input and returns what should be rendered. */
function Square(props) {
    return (
        /* The DOM <button> element’s onClick attribute has a special meaning to React because it is a built-in component. For custom components like Square, the naming is up to you. We could give any name to the Square’s
        onClick prop or Board’s handleClick method, and the code would work the same. In React, it’s conventional to use on[Event] names for props which represent events and handle[Event] for the methods which handle the events. */
        /* When we modified the Square to be a function component, we also changed onClick={() => this.props.onClick()} to a shorter onClick={props.onClick} (note the lack of parentheses on both sides). */
        <button className="square" onClick={props.onClick}>
            { /* This interpolation is denoted by these curly braces, {}. When you do this, you're exiting JSX land and entering JavaScript land. You can do any JavaScript that you want to as long as it evaluates to an expression.*/ }
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return (
            /* In React terms, the Square components are now **controlled components**. The Board has full control over them. */
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
            <div>
                { /* In JSX an element class should be named className instead of class */ }
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {

    // Passing props is how information flows in React apps, from parents to children.
    constructor(props) {
        // In JavaScript classes, you need to always call super when defining the constructor of a subclass. All React component classes that have a constructor should start it with a super(props) call.
        super(props);
        /* To collect data from multiple children, or to have two child components communicate with each other, you need to declare the shared state in their parent component instead. The parent component can pass
            the state back down to the children by using props; this keeps the child components in sync with each other and with the parent component. */
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        /* Immutability makes complex features much easier to implement. Avoiding direct data mutation lets us keep previous versions of the game’s history intact, and reuse them later.
        Detecting changes in mutable objects is difficult because they are modified directly. This detection requires the mutable object to be compared to previous copies of itself and the entire object tree to be traversed.
        Detecting changes in immutable objects is considerably easier. If the immutable object that is being referenced is different than the previous one, then the object has changed.
        The main benefit of immutability is that it helps you build **pure components** in React. Immutable data can easily determine if changes have been made which helps to determine when a component requires re-rendering.*/
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        // When you call setState in a component, React automatically updates the child components inside of it too.
        this.setState({
            history: history.concat([{
                squares: squares,
                position: i,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: 0 === (step % 2),
        });
    }

    calculateMoveAndPosition(position, move) {
        const x = (position % 3) + 1;
        const y = Math.floor(position/3) + 1;

        return 'Position: (' + x + ',' + y + ')' + ' ' + 'Symbol: ' + (1 === move%2 ? 'X' : '0');
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            if (move > this.state.stepNumber) {
                return;
            }
            const desc = move ?
                'Go to move #' + move + ' ' + this.calculateMoveAndPosition(step.position, move) :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Winner:' + winner;
        } else {
            status = 'Next player:' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
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
            return squares[a];
        }
    }
    return null;
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);