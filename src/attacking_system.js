import { stateControl } from "./battleship_creation";
import { checkShipsSank } from "./end_game";

function setColors(targetSquare, color) {
  setTimeout(() => {
    targetSquare.textContent = "X";
    targetSquare.style.color = "black";
    stateControl.playerSuccessfulShots.push(targetSquare);
    targetSquare.style.backgroundColor = color;
  }, 2500);
}

let attackEnemy = (e) => {
  let targetSquare = e.target;
  if (
    stateControl.readyAim === true &&
    stateControl.readyFire === true &&
    !stateControl.missedShots.includes(targetSquare) &&
    !stateControl.playerSuccessfulShots.includes(targetSquare) &&
    stateControl.enemy_taken_squares.includes(targetSquare)
  ) {
    stateControl.readyAim = false;
    stateControl.readyFire = false;
    if (stateControl.enemyCarrier.position.includes(targetSquare)) {
      setColors(targetSquare, "orange");
      stateControl.enemyCarrier.ship.hit();
    } else if (stateControl.enemyBattleship.position.includes(targetSquare)) {
      setColors(targetSquare, "rgb(45, 192, 250)");
      stateControl.enemyBattleship.ship.hit();
    } else if (stateControl.enemyCruiser.position.includes(targetSquare)) {
      setColors(targetSquare, "rgb(34, 250, 106)");
      stateControl.enemyCruiser.ship.hit();
    } else if (stateControl.enemySubmarine.position.includes(targetSquare)) {
      setColors(targetSquare, "rgb(182, 34, 250)");
      stateControl.enemySubmarine.ship.hit();
    } else if (stateControl.enemyPatrolboat.position.includes(targetSquare)) {
      setColors(targetSquare, "rgb(250, 34, 196)");
      stateControl.enemyPatrolboat.ship.hit();
    }
  } else if (
    stateControl.readyAim === true &&
    stateControl.readyFire === true &&
    !stateControl.playerSuccessfulShots.includes(targetSquare) &&
    !stateControl.missedShots.includes(targetSquare)
  ) {
    stateControl.readyAim = false;
    stateControl.readyFire = false;
    stateControl.missedShots.push(targetSquare);
    setTimeout(function setColor() {
      targetSquare.textContent = "X";
    }, 2500);
    shipHitMessage("Checking.....", "We missed!");
    stateControl.enemyTurn = true;
    setTimeout(enemyAttack, 6400);
  }
};

let enemyAttack = () => {
  let targetid = Math.floor(Math.random() * 100);
  let targetSquare = document.getElementById(`square_${targetid}`);
  if (
    stateControl.taken_sqaures.includes(targetSquare) &&
    !stateControl.enemySuccessfulShots.includes(targetSquare) &&
    !stateControl.missedShots.includes(targetSquare)
  ) {
    setTimeout(function setColor() {
      targetSquare.textContent = "X";
      targetSquare.style.color = "black";
      stateControl.readyAim = true;
      stateControl.readyFire = true;
      stateControl.enemySuccessfulShots.push(targetSquare);
    }, 4000);
    if (stateControl.playerCarrier.position.includes(targetSquare)) {
      stateControl.playerCarrier.ship.hit();
    } else if (stateControl.playerBattleship.position.includes(targetSquare)) {
      stateControl.playerBattleship.ship.hit();
    } else if (stateControl.playerCruiser.position.includes(targetSquare)) {
      stateControl.playerCruiser.ship.hit();
    } else if (stateControl.playerSubmarine.position.includes(targetSquare)) {
      stateControl.playerSubmarine.ship.hit();
    } else if (stateControl.playerPatrolboat.position.includes(targetSquare)) {
      stateControl.playerPatrolboat.ship.hit();
    }
  } else if (
    stateControl.enemySuccessfulShots.includes(targetSquare) ||
    stateControl.missedShots.includes(targetSquare)
  ) {
    enemyAttack();
  } else {
    shipHitMessage("Waiting on the enemy.....", "They missed! Fire away!");
    setTimeout(function () {
      stateControl.missedShots.push(targetSquare);
      targetSquare.textContent = "X";
      stateControl.readyAim = true;
      stateControl.readyFire = true;
      stateControl.enemyTurn = false;
    }, 1900);
  }
};

let aimAtEnemy = (e) => {
  if (
    stateControl.readyAim === true &&
    !stateControl.playerSuccessfulShots.includes(e.target) &&
    !stateControl.missedShots.includes(e.target)
  ) {
    if (
      stateControl.clearPassedSquare === true &&
      !stateControl.playerSuccessfulShots.includes(stateControl.passedSquare)
    ) {
      stateControl.passedSquare.style.backgroundColor = "";
    }
    stateControl.passedSquare = e.target;
    e.target.style.backgroundColor = "orange";
    stateControl.clearPassedSquare = true;
  }
};

let shipHitMessage = (shipHasBeenSetMessage, nextShipToBeSetMessage) => {
  stateControl.textDisplay.textContent = "";
  stateControl.textDisplay.classList.remove("text_display");
  stateControl.textDisplay.classList.add("text_display2");
  setTimeout(() => {
    stateControl.textDisplay.classList.remove("text_display2");
    stateControl.textDisplay.textContent = shipHasBeenSetMessage;
    stateControl.textDisplay.classList.add("text_display");
    setTimeout(() => {
      stateControl.textDisplay.textContent = "";
      stateControl.textDisplay.classList.remove("text_display");
      stateControl.textDisplay.classList.add("text_display2");
      setTimeout(() => {
        stateControl.textDisplay.textContent = nextShipToBeSetMessage;
        stateControl.textDisplay.classList.remove("text_display2");
        stateControl.textDisplay.classList.add("text_display");
      }, 1000);
    }, 1600);
  }, 500);
};

export { attackEnemy, enemyAttack, aimAtEnemy, shipHitMessage };
