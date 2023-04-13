/*
 * Title: Minimax algorithoms
 * Description: The tic tac toe game AI player
 * Author: Junayed Akbor
 * Date: 09/04/2023
 *
 */

"use strict";

// Minimax function
const minimax = (board, player, ai_player = "O") => {
    let human = ai_player === "O" ? "X" : "O";

    let winner = board.isTerminal().winner;
    let availSpots = board.getAvailableMoves();

    if (winner === human) {
        return { score: -10 };
    } else if (winner === ai_player) {
        return { score: 10 };
    } else if (availSpots.length === 0) {
        return { score: 0 };
    }

    let moves = [];
    for (let i = 0; i < availSpots.length; i++) {
        let move = {};
        move.index = board.get(availSpots[i]);
        board.insert(player, move.index);

        if (player === ai_player) {
            let result = minimax(board, human, ai_player);
            move.score = result.score;
        } else {
            let result = minimax(board, ai_player, ai_player);
            move.score = result.score;
        }

        board.insert(move.index, availSpots[i]);
        moves.push(move);
    }

    let bestMove;
    if (player === ai_player) {
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
};
