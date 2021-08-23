import { stateControl } from "./battleship_creation";
import { shipHitMessage } from "./enemy_fleet_creation";

let checkShipsSank = () => {
  if (stateControl.enemyShipsSunk === 5) {
    stateControl.readyAim = false;
    stateControl.readyFire = false;
    stateControl.enemyTurn = false;
    shipHitMessage(
      `Congratulations ${stateControl.playerName}, you have sank all enemy ships!`,
      "Play again?"
    );
  } else if (stateControl.playerShipsSunk === 5) {
    stateControl.readyAim = false;
    stateControl.readyFire = false;
    stateControl.enemyTurn = false;
    shipHitMessage(
      `Congratulations ${stateControl.playerName}, you lost spectacularly!`,
      "Play again?"
    );
  }
};

let restart = () => {
  location.reload();
};
document.getElementById("restart").addEventListener("click", restart);

export { checkShipsSank };
