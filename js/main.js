"use strict";
import {Board} from './board.js';

const boxs = Array.from(document.querySelectorAll('.cell'));
const table = document.querySelector('table');
const opponentPlayer = document.getElementById("opponent");

const whoesTrue = document.querySelector(".whose-turn");
const gameMsgBox = document.querySelector('.game-message');
const msg = document.querySelector('.msg');

const restartBtn = document.querySelector('.restart');
const gameStartBtn = document.getElementById("game-start-btn");
const changeGameModeBtn = document.querySelector(".change-game-mode button");


class TicTacToe {
    constructor() {
        this.human = 'X';
        this.opponent = 'O';
    }

    minimax(board, player) {
        let case_ = board.isTerminal();
        let availSpots = board.getAvailableMoves();

        if (case_.winner === this.human) {
            return { score: -10 };
        } else if (case_.winner === this.opponent) {
            return { score: 10 };
        } else if (availSpots.length === 0) {
            return { score: 0 };
        }

        let moves = [];
        for (let i = 0; i < availSpots.length; i++) {
            let move = {};
            move.index = board.state[availSpots[i]];
            board.state[availSpots[i]] = player;

            if (player == this.opponent) {
                let result = this.minimax(board, this.human);
                move.score = result.score;
            } else {
                let result = this.minimax(board, this.opponent);
                move.score = result.score;
            }
            board.state[availSpots[i]] = move.index;
            moves.push(move);
        }

        let bestMove;
        if (player === this.opponent) {
            let bestScore = -10000;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        } else {
            let bestScore = 10000;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }
        return moves[bestMove];
    }

    startGame = () => {
        this.board = new Board();
        this.currentPlayer = this.human;
        this.aiGameMode = (opponentPlayer.value === "ai") ? true : false;

        this.gameWin;
        this.handleClick();
        this.whoesTrueDisplay();

        table.classList.add(this.currentPlayer.toLowerCase());
        gameMsgBox.classList.add("hide");

        boxs.forEach((box) => {
            box.innerHTML = '';
            box.className = 'cell';
        });
    }

    endGame(drow) {
        table.className = "";

        // change background color winner win index
        if (this.gameWin.winIndex) {
            this.gameWin.winIndex.forEach((index) => {
                boxs[index].style.backgroundColor = "#7E7F83";
            });
        }
        // display end game message
        setTimeout(() => this.endGameMessage(drow), 1500);
    }

    endGameMessage(drow) {
        gameMsgBox.classList.remove("hide");
        document.querySelector(".start-game").classList.add("hide");
        document.querySelector(".end-game").classList.remove("hide");

        if (drow) {
            msg.innerHTML = "Game Drow!";
        } else {
            if (this.aiGameMode){
                msg.innerHTML = `${this.currentPlayer == this.human ? "You" : "Computer"} winner!`;
            } else {
                msg.innerHTML = `${this.currentPlayer == this.human ? "You" : "Your friend"} winner!`;
            }
            
        }
    }

    handleClick() {
        boxs.forEach((box) => {
            box.addEventListener('click', this.boxEvent, {once: true});
        });
    }

    restartGame = () => {
        gameMsgBox.classList.add("hide");
        // msgBox.classList.remove("msg-box-animation");

        if (this.gameWin.winIndex) {
            this.gameWin.winIndex.forEach((index) => {
                boxs[index].style.backgroundColor = "";
            });
        }
        this.startGame();
    }

    placeMark(id) {
        boxs[id].innerHTML = this.currentPlayer;
        this.board.insert(this.currentPlayer, id)
        boxs[id].classList.add(this.currentPlayer);
        this.gameWin = this.board.isTerminal();

        if (this.gameWin.winner) {
            this.endGame(false);

        } else if (this.gameWin.drow) {
            this.endGame(true);

        } else {
            this.switchPlayer();
        }
        this.whoesTrueDisplay();
    }

    boxEvent = (e) => {
        if (!e.target.innerHTML) {
            this.placeMark(e.target.id);

            if (!this.gameWin.drow && this.aiGameMode){
                this.placeMark(this.minimax(this.board, this.opponent).index);
            }
        }
    }

    switchPlayer() {
        this.currentPlayer = (this.currentPlayer === this.human) ? this.opponent : this.human;
        table.className = this.currentPlayer.toLowerCase();
    }

    changeGameMode() {
        gameMsgBox.classList.remove("hide");
        document.querySelector(".start-game").classList.remove("hide");
        document.querySelector(".end-game").classList.add("hide");
        document.querySelector(".start-game .title").innerHTML = "Change Game Mode!";
    }

    whoesTrueDisplay() {
        let turnIs;
        if (this.currentPlayer === this.human) turnIs = "Your Turn";
        else if (this.aiGameMode) turnIs = "Computer turn";
        else turnIs = "Friend Turn";
        whoesTrue.innerHTML = turnIs;
    }
}


const ticTacToe = new TicTacToe();

gameStartBtn.addEventListener('click', ticTacToe.startGame);
restartBtn.addEventListener('click', ticTacToe.restartGame);
changeGameModeBtn.addEventListener('click', ticTacToe.changeGameMode);


