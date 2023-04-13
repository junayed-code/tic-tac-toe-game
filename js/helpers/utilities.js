"use strict";

const utls = (function () {
    const utilities = {};

    // mark the game board cell
    utilities.placeMark = (cell, mark) => {
        cell.innerHTML = mark;
        cell.classList.add(mark);
    };

    utilities.playSound = (name) => {
        new Audio(`../sounds/${name}.mp3`).play();
    };

    return utilities;
})();
