const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

export class Board {
    constructor(board=null) {
        this.state = board ? board : Array.from(Array(9).keys());
    }

    insert(value, index) {
        if (typeof(this.state[index]) === "number") this.state[index] = value;
        return this.state;
    }

    isTerminal() {
        for (const combination of WINNING_COMBINATIONS) {
            if (combination.every((index) => this.state[index] === "X")) {
                return {winner: 'X', drow: false, winIndex: combination};
            }
            if (combination.every((index) => this.state[index] === "O")) {
                return {winner: 'O', drow: false, winIndex: combination};
            }
        }
        if (this.state.every((cell) => typeof(cell) === "string")) return {winner: false, drow: true};
        return {winner: false, drow: false};
    }

    getAvailableMoves() {
        return this.state.filter((val) => typeof(val) === "number");
    }
}