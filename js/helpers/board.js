"use strict";

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

// Game board class
class Board {
    constructor(board) {
        this.state = board instanceof Board ? board : Array.from(Array(9).keys());
    }

    insert(value, index) {
        this.state[index] = value;
    }

    get(index) {
        return this.state[index];
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
        if (this.state.every((cell) => typeof(cell) === "string")) {
            return {winner: false, drow: true};
        }
        return {winner: false, drow: false};
    }

    getAvailableMoves() {
        return this.state.filter((val) => typeof(val) === "number");
    }
}