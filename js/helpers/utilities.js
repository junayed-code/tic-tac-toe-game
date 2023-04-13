"use strict";

const utls = (function () {
    const utilities = {};

    // mark the game board cell
    utilities.placeMark = (cell, mark) => {
        cell.innerHTML = mark;
        cell.classList.add(mark);
    };

    // play audio sound
    utilities.playSound = (name) => {
        const audio = new Audio(`sounds/${name}.mp3`);
        audio.play();
        return audio;
    };

    return utilities;
})();
