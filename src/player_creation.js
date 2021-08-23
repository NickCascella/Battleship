import { stateControl, createGameBoard } from "./battleship_creation";
import { createShips } from "./battleship";
import { shipHitMessage } from "./attacking_system";

let startGame = (e) => {
  if (e.key === "Enter" || e.target === stateControl.enterInfo) {
    let playerScreen = document.getElementById("player_creation");
    let playerText = document.getElementById("name_enter");
    stateControl.playerName = playerText.value;
    if (stateControl.playerName === "") {
      stateControl.playerName = "Player 1";
    }
    document.getElementById("name_display").textContent =
      stateControl.playerName;
    playerScreen.style.display = "none";
    createShips();
    createGameBoard();
    shipHitMessage(
      "Welcome to battleship!",
      "Begin by placing down your carrier"
    );
  }
};

function createName() {
  // stateControl.enterInfo = document.getElementById("submit_name");
  // stateControl.enterInfo.addEventListener("click", startGame);
  let enterInfoKey = document.getElementById("name_enter");
  enterInfoKey.addEventListener("keypress", startGame);
}

export { createName };
