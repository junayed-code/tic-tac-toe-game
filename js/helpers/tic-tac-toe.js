"use strict";

const _game = (function () {
    // document selection using jquery
    const $msg = jQuery(".msg");
    const $table = jQuery("table");
    const $boardCells = jQuery(".cell");
    const $opponentPlayer = jQuery("#opponent");
    const $gameMsgBox = jQuery(".game-message");
    const $turnDisplay = jQuery("#turn-display");

    // game object
    const game = {};
    // game players
    const players = { main: "X", opponent: "O" };

    // start game function
    game.startGame = function () {
        // game start sound
        utls.playSound("select");

        // create game board
        game.board = new Board();
        game.currentPlayer = players.main;

        // Opponent Player
        game.opponent = $opponentPlayer.val();

        // add class into the table element
        $table.attr("class", game.currentPlayer.toLowerCase());

        // remove inner html and (X or O) class in the board cells
        $boardCells.empty().removeClass("X O");
        // hide the message box
        $gameMsgBox.hide();

        // change turn display text
        game._changeTurnDisplay();

        // add click event on the board cells
        $boardCells.click(game._cellsClick);
    };

    // check game is END
    game._gameIsEnd = function () {
        const { winner, drow } = this.board.isTerminal();
        return winner || drow || false;
    };

    // End Game function
    game._endGame = function () {
        const { winner, drow, winIndex } = this.board.isTerminal();

        // remove click on the board cells
        $boardCells.off("click");

        // if winner is true then change background color in the winner index
        if (winner) {
            // game winner
            this.winner =
                winner === players.main
                    ? "You"
                    : this.opponent === "computer"
                    ? "Computer"
                    : this.opponent === "random"
                    ? "Random"
                    : "Your Friend";

            winIndex?.forEach((index) => {
                $boardCells[index]?.classList.add("bg-color-animation");
            });

            // play win and lose sound effect
            if (this.winner === "You") {
                // game win sound
                setTimeout(() => utls.playSound("win-sound"), 400);
            } else {
                // game lose sound
                setTimeout(() => utls.playSound("negative_beeps"), 300);
            }

            // if game is drow then turn on background color animation
        } else {
            $boardCells.addClass("bg-color-animation");
            // game drow sound
            setTimeout(() => utls.playSound("negative_beeps"), 300);
        }

        // call game end alert message function after 1450 milliseconds
        setTimeout(() => game._endGameAlert(drow), 1450);
    };

    // Restart game function
    game.restartGame = function () {
        // change current player
        const { main, opponent } = players;
        players.main = opponent;
        players.opponent = main;

        // remove borad cells background animation class
        $boardCells.removeClass("bg-color-animation");

        // cell startGame function
        game.startGame();
    };

    // Player turn
    game._playerTurn = function (targetCell, targetCellid) {
        utls.placeMark(targetCell, this.currentPlayer);
        utls.playSound(this.currentPlayer);
        this.board.insert(this.currentPlayer, targetCellid);

        // if game is end then call the endGame function
        if (this._gameIsEnd()) {
            this._endGame();
            return;
        }

        // if game is not end the switch player and change turn display text
        this._switchPlayer();
        this._changeTurnDisplay();
    };

    // Opponent player turn
    game._opponentPlayerTurn = function (opponentPlayer) {
        // Opponent players
        const opponents = {
            computer() {
                const index = minimax(
                    game.board,
                    players.opponent,
                    players.opponent
                ).index;
                const aiTerget = $boardCells[index];

                game._playerTurn(aiTerget, index);
            },
            friend() {},
            random() {
                const availSpots = game.board.getAvailableMoves();
                const randomNumber = Math.floor(
                    Math.random() * availSpots.length
                );
                const index = availSpots[randomNumber];
                const randomTerget = $boardCells[index];

                game._playerTurn(randomTerget, index);
            },
        };

        // if opponent player is exist then cell opponent player function
        opponents[opponentPlayer]?.();
    };

    // switch the player function
    game._switchPlayer = function () {
        // change the current player
        this.currentPlayer =
            this.currentPlayer === players.main
                ? players.opponent
                : players.main;

        // change the table class attribute value
        $table.attr("class", this.currentPlayer.toLowerCase());
    };

    // end game alert function
    game._endGameAlert = function (gameDrow) {
        // show the game message box
        $gameMsgBox.show();
        // hide start game message box
        $(".start-game").hide();
        // show end game message box
        $(".end-game").show();

        // show the win or drow message
        $msg.text(gameDrow ? "Game Drow!" : `${game.winner} winner!`);
    };

    // change turn display text
    game._changeTurnDisplay = function () {
        const turn =
            this.currentPlayer === players.main ? "your" : game.opponent;

        $turnDisplay.text(`${turn} turn (${this.currentPlayer})`);
    };

    // board cells click event
    game._cellsClick = function () {
        const target = $(this);

        if (!target.html()) {
            game._playerTurn(this, target.attr("id"));
            // turn off click event
            $boardCells.off("click");

            // if not game is end then call the opponent player turn function
            if (!game._gameIsEnd()) {
                setTimeout(() => {
                    game._opponentPlayerTurn(game.opponent);

                    // if game not end then turn on click event
                    if (!game._gameIsEnd()) {
                        $boardCells.on("click", game._cellsClick);
                    }
                }, 300);
            }
        }
    };

    // change settings function
    game.changeSetting = function () {
        // play select sound
        utls.playSound("select");

        // show the game message box
        $gameMsgBox.show();
        // show start game message box
        $(".start-game").show();
        // change title
        $(".start-game .title").text("Change game setting");

        // hide end game message box
        $(".end-game").hide();
    };

    return game;
})();
