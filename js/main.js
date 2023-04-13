"use strict";

const _app = (function () {
    // cache DOM
    const $gameStartBtn = jQuery("#game-start-btn");
    const $reStartBtn = jQuery("#restart-btn");
    const $settingsBtn = jQuery("#setting button");
    const $opponentPlayer = jQuery("#opponent");

    // application object
    const app = {};

    // application init function
    app.init = function () {
        // add click event into the game start button
        $gameStartBtn.click(_game.startGame);
        // add click event into the restart button
        $reStartBtn.click(_game.restartGame);

        // add click event into the settings button
        $settingsBtn.click(_game.changeSetting);

        // add click event into the opponent selection
        $opponentPlayer.click(() => utls.playSound("select"));
    };

    $(document).ready(function () {
        // initialise app
        app.init();
    });
})();
