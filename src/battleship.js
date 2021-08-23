import {
  shipFactory,
  stateControl,
  findSharedElements,
} from "./battleship_creation";
import { createEnemyFleet, createEnemyGrid } from "./enemy_fleet_creation";
import { createName } from "./player_creation";
import "./battleship.css";

//change vertical/horizontal positon of the boats
let changeAxis = () => {
  if (stateControl.hoizontal_placement === true) {
    stateControl.hoizontal_placement = false;
  } else {
    stateControl.hoizontal_placement = true;
  }
};

let shipSetupText = (shipHasBeenSetMessage, nextShipToBeSetMessage) => {
  stateControl.textDisplay.textContent = "";
  stateControl.textDisplay.classList.remove("text_display");
  stateControl.textDisplay.classList.add("text_display2");
  stateControl.board.removeEventListener("click", stateControl.currentFunction);
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
        stateControl.board.addEventListener(
          "click",
          stateControl.currentFunction
        );
      }, 1000);
    }, 1600);
  }, 500);
};

let createShips = () => {
  document.getElementById("change_axis").addEventListener("click", changeAxis);
  let carrier = new shipFactory("Carrier", 5, 5);
  let battleship = new shipFactory("Battleship", 4, 4);
  let cruiser = new shipFactory("Cruiser", 3, 3);
  let submarine = new shipFactory("Submarine", 3, 3);
  let patrolboat = new shipFactory("Patrol Boat", 2, 2);
  stateControl.playerCarrier.ship = carrier;
  stateControl.playerBattleship.ship = battleship;
  stateControl.playerCruiser.ship = cruiser;
  stateControl.playerSubmarine.ship = submarine;
  stateControl.playerPatrolboat.ship = patrolboat;
};

let createCarrierOnBoard = (e) => {
  if (stateControl.playerCarrier.spawnCarrier === true) {
    for (let i = 0; i < 100; i++) {
      if (e.target.getAttribute("X") > 5) {
        return;
      }
      if (
        e.target.id === `square_${i}` &&
        stateControl.hoizontal_placement === true
      ) {
        let carrier_position_1 = document.getElementById(`square_${i}`);
        let carrier_position_2 = document.getElementById(`square_${i + 1}`);
        let carrier_position_3 = document.getElementById(`square_${i + 2}`);
        let carrier_position_4 = document.getElementById(`square_${i + 3}`);
        let carrier_position_5 = document.getElementById(`square_${i + 4}`);
        let tempCarrierArray = [];
        tempCarrierArray.push(
          carrier_position_1,
          carrier_position_2,
          carrier_position_3,
          carrier_position_4,
          carrier_position_5
        );
        if (
          !tempCarrierArray.includes(null) &&
          carrier_position_1.getAttribute("Y") ===
            carrier_position_5.getAttribute("Y")
        ) {
          for (let j = 0; j < tempCarrierArray.length; j++) {
            tempCarrierArray[j].style.backgroundColor = "orange";
            stateControl.taken_sqaures.push(tempCarrierArray[j]);
            stateControl.playerCarrier.position.push(tempCarrierArray[j]);
          }
          stateControl.playerCarrier.spawnCarrier = false;
          shipSetupText(
            "Carrier has been set!",
            "Please set down your battleship!"
          );
          stateControl.currentFunction = createBattleshipOnBoard;
          setTimeout(() => {
            stateControl.playerBattleship.spawnBattleship = true;
          }, 3000);
        } else {
          return;
        }
      } else if (
        e.target.id === `square_${i}` &&
        stateControl.hoizontal_placement === false
      ) {
        if (e.target.getAttribute("Y") > 5) {
          return;
        }
        let carrier_position_1 = document.getElementById(`square_${i}`);
        let carrier_position_2 = document.getElementById(`square_${i - 10}`);
        let carrier_position_3 = document.getElementById(`square_${i - 20}`);
        let carrier_position_4 = document.getElementById(`square_${i - 30}`);
        let carrier_position_5 = document.getElementById(`square_${i - 40}`);
        let tempCarrierArray = [];
        tempCarrierArray.push(
          carrier_position_1,
          carrier_position_2,
          carrier_position_3,
          carrier_position_4,
          carrier_position_5
        );
        if (
          !tempCarrierArray.includes(null) &&
          carrier_position_1.getAttribute("X") ===
            carrier_position_5.getAttribute("X")
        ) {
          for (let j = 0; j < tempCarrierArray.length; j++) {
            tempCarrierArray[j].style.backgroundColor = "orange";
            stateControl.taken_sqaures.push(tempCarrierArray[j]);
            stateControl.playerCarrier.position.push(tempCarrierArray[j]);
          }
          stateControl.playerCarrier.spawnCarrier = false;
          shipSetupText(
            "Carrier has been set!",
            "Please set down your battleship!"
          );
          stateControl.currentFunction = createBattleshipOnBoard;
          setTimeout(() => {
            stateControl.playerBattleship.spawnBattleship = true;
          }, 3000);
        } else {
          return;
        }
      }
    }
  }
};

let createBattleshipOnBoard = (e) => {
  if (stateControl.playerBattleship.spawnBattleship === true) {
    for (let i = 0; i < 100; i++) {
      if (
        e.target.id === `square_${i}` &&
        stateControl.hoizontal_placement === true
      ) {
        if (e.target.getAttribute("X") > 6) {
          return;
        }
        let battleShip_position_1 = document.getElementById(`square_${i}`);
        let battleShip_position_2 = document.getElementById(`square_${i + 1}`);
        let battleShip_position_3 = document.getElementById(`square_${i + 2}`);
        let battleShip_position_4 = document.getElementById(`square_${i + 3}`);
        let tempBattleShipArray = [];
        tempBattleShipArray.push(
          battleShip_position_1,
          battleShip_position_2,
          battleShip_position_3,
          battleShip_position_4
        );
        if (
          battleShip_position_1.getAttribute("Y") ===
            battleShip_position_4.getAttribute("Y") &&
          !findSharedElements(tempBattleShipArray, stateControl.taken_sqaures)
        ) {
          for (let j = 0; j < tempBattleShipArray.length; j++) {
            tempBattleShipArray[j].style.backgroundColor = "rgb(45, 192, 250)";
            stateControl.taken_sqaures.push(tempBattleShipArray[j]);
            stateControl.playerBattleship.position.push(tempBattleShipArray[j]);
          }
          stateControl.playerBattleship.spawnBattleship = false;
          shipSetupText(
            "Battleship has been placed!",
            "Please set up your Cruiser..."
          );
          stateControl.currentFunction = createCruiserOnBoard;
          setTimeout(() => {
            stateControl.playerCruiser.spawnCruiser = true;
          }, 3000);
        } else {
          return;
        }
      } else if (
        e.target.id === `square_${i}` &&
        stateControl.hoizontal_placement === false
      ) {
        if (e.target.getAttribute("Y") > 6) {
          return;
        }
        let battleShip_position_1 = document.getElementById(`square_${i}`);
        let battleShip_position_2 = document.getElementById(`square_${i - 10}`);
        let battleShip_position_3 = document.getElementById(`square_${i - 20}`);
        let battleShip_position_4 = document.getElementById(`square_${i - 30}`);
        let tempBattleShipArray = [];
        tempBattleShipArray.push(
          battleShip_position_1,
          battleShip_position_2,
          battleShip_position_3,
          battleShip_position_4
        );
        if (
          battleShip_position_1.getAttribute("X") ===
            battleShip_position_4.getAttribute("X") &&
          !findSharedElements(tempBattleShipArray, stateControl.taken_sqaures)
        ) {
          for (let j = 0; j < tempBattleShipArray.length; j++) {
            tempBattleShipArray[j].style.backgroundColor = "rgb(45, 192, 250)";
            stateControl.taken_sqaures.push(tempBattleShipArray[j]);
            stateControl.playerBattleship.position.push(tempBattleShipArray[j]);
          }
          stateControl.playerBattleship.spawnBattleship = false;
          shipSetupText(
            "Battleship has been placed!",
            "Please set up your Cruiser..."
          );
          stateControl.currentFunction = createCruiserOnBoard;
          setTimeout(() => {
            stateControl.playerCruiser.spawnCruiser = true;
          }, 3000);
        } else {
          return;
        }
      }
    }
  }
};

let createCruiserOnBoard = (e) => {
  if (stateControl.playerCruiser.spawnCruiser === true) {
    for (let i = 0; i < 100; i++) {
      if (
        e.target.id === `square_${i}` &&
        stateControl.hoizontal_placement === true
      ) {
        if (e.target.getAttribute("X") > 7) {
          return;
        }
        let cruiser_position_1 = document.getElementById(`square_${i}`);
        let cruiser_position_2 = document.getElementById(`square_${i + 1}`);
        let cruiser_position_3 = document.getElementById(`square_${i + 2}`);
        let tempCruiserArray = [];
        tempCruiserArray.push(
          cruiser_position_1,
          cruiser_position_2,
          cruiser_position_3
        );
        if (
          cruiser_position_1.getAttribute("Y") ===
            cruiser_position_3.getAttribute("Y") &&
          !findSharedElements(tempCruiserArray, stateControl.taken_sqaures)
        ) {
          for (let j = 0; j < tempCruiserArray.length; j++) {
            tempCruiserArray[j].style.backgroundColor = "rgb(34, 250, 106)";
            stateControl.taken_sqaures.push(tempCruiserArray[j]);
            stateControl.playerCruiser.position.push(tempCruiserArray[j]);
          }
          stateControl.playerCruiser.spawnCruiser = false;
          shipSetupText("Cruiser is set!", "Please submerge your submarine...");
          stateControl.currentFunction = createSubmarineOnBoard;
          setTimeout(() => {
            stateControl.playerSubmarine.spawnSubmarine = true;
          }, 3000);
        } else {
          return;
        }
      } else if (
        e.target.id === `square_${i}` &&
        stateControl.hoizontal_placement === false
      ) {
        if (e.target.getAttribute("Y") > 7) {
          return;
        }
        let cruiser_position_1 = document.getElementById(`square_${i}`);
        let cruiser_position_2 = document.getElementById(`square_${i - 10}`);
        let cruiser_position_3 = document.getElementById(`square_${i - 20}`);
        let tempCruiserArray = [];
        tempCruiserArray.push(
          cruiser_position_1,
          cruiser_position_2,
          cruiser_position_3
        );
        if (
          cruiser_position_1.getAttribute("X") ===
            cruiser_position_3.getAttribute("X") &&
          !findSharedElements(tempCruiserArray, stateControl.taken_sqaures)
        ) {
          for (let j = 0; j < tempCruiserArray.length; j++) {
            tempCruiserArray[j].style.backgroundColor = "rgb(34, 250, 106)";
            stateControl.taken_sqaures.push(tempCruiserArray[j]);
            stateControl.playerCruiser.position.push(tempCruiserArray[j]);
          }
          stateControl.playerCruiser.spawnCruiser = false;
          shipSetupText("Cruiser is set!", "Please submerge your submarine...");
          stateControl.currentFunction = createSubmarineOnBoard;
          setTimeout(() => {
            stateControl.playerSubmarine.spawnSubmarine = true;
          }, 3000);
        } else {
          return;
        }
      }
    }
  }
};

let createSubmarineOnBoard = (e) => {
  if (stateControl.playerSubmarine.spawnSubmarine === true) {
    for (let i = 0; i < 100; i++) {
      if (
        e.target.id === `square_${i}` &&
        stateControl.hoizontal_placement === true
      ) {
        if (e.target.getAttribute("X") > 7) {
          return;
        }
        let submarine_position_1 = document.getElementById(`square_${i}`);
        let submarine_position_2 = document.getElementById(`square_${i + 1}`);
        let submarine_position_3 = document.getElementById(`square_${i + 2}`);
        let tempSubmarineArray = [];
        tempSubmarineArray.push(
          submarine_position_1,
          submarine_position_2,
          submarine_position_3
        );
        if (
          submarine_position_1.getAttribute("Y") ===
            submarine_position_3.getAttribute("Y") &&
          !findSharedElements(tempSubmarineArray, stateControl.taken_sqaures)
        ) {
          for (let j = 0; j < tempSubmarineArray.length; j++) {
            tempSubmarineArray[j].style.backgroundColor = "rgb(182, 34, 250)";
            stateControl.taken_sqaures.push(tempSubmarineArray[j]);
            stateControl.playerSubmarine.position.push(tempSubmarineArray[j]);
          }
          stateControl.playerSubmarine.spawnSubmarine = false;
          shipSetupText(
            "Submarine is submerged!",
            "Please send out your patrol boat.."
          );
          stateControl.currentFunction = createPatrolboatOnBoard;
          setTimeout(() => {
            stateControl.playerPatrolboat.spawnPatrolboat = true;
          }, 3000);
        } else {
          return;
        }
      } else if (
        e.target.id === `square_${i}` &&
        stateControl.hoizontal_placement === false
      ) {
        if (e.target.getAttribute("Y") > 7) {
          return;
        }
        let submarine_position_1 = document.getElementById(`square_${i}`);
        let submarine_position_2 = document.getElementById(`square_${i - 10}`);
        let submarine_position_3 = document.getElementById(`square_${i - 20}`);
        let tempSubmarineArray = [];
        tempSubmarineArray.push(
          submarine_position_1,
          submarine_position_2,
          submarine_position_3
        );
        if (
          submarine_position_1.getAttribute("X") ===
            submarine_position_3.getAttribute("X") &&
          !findSharedElements(tempSubmarineArray, stateControl.taken_sqaures)
        ) {
          for (let j = 0; j < tempSubmarineArray.length; j++) {
            tempSubmarineArray[j].style.backgroundColor = "rgb(182, 34, 250)";
            stateControl.taken_sqaures.push(tempSubmarineArray[j]);
            stateControl.playerSubmarine.position.push(tempSubmarineArray[j]);
          }
          stateControl.playerSubmarine.spawnSubmarine = false;
          shipSetupText(
            "Submarine is submerged!",
            "Please send out your patrol boat.."
          );
          stateControl.currentFunction = createPatrolboatOnBoard;
          setTimeout(() => {
            stateControl.playerPatrolboat.spawnPatrolboat = true;
          }, 3000);
        } else {
          return;
        }
      }
    }
  }
};

let createPatrolboatOnBoard = (e) => {
  if (stateControl.playerPatrolboat.spawnPatrolboat === true) {
    for (let i = 0; i < 100; i++) {
      if (
        e.target.id === `square_${i}` &&
        stateControl.hoizontal_placement === true
      ) {
        if (e.target.getAttribute("X") > 8) {
          return;
        }
        let patrolBoat_position_1 = document.getElementById(`square_${i}`);
        let patrolBoat_position_2 = document.getElementById(`square_${i + 1}`);
        let tempPatrolboatArray = [];
        tempPatrolboatArray.push(patrolBoat_position_1, patrolBoat_position_2);
        if (
          patrolBoat_position_1.getAttribute("Y") ===
            patrolBoat_position_2.getAttribute("Y") &&
          !findSharedElements(tempPatrolboatArray, stateControl.taken_sqaures)
        ) {
          for (let j = 0; j < tempPatrolboatArray.length; j++) {
            tempPatrolboatArray[j].style.backgroundColor = "rgb(250, 34, 196)";
            stateControl.taken_sqaures.push(tempPatrolboatArray[j]);
            stateControl.playerPatrolboat.position.push(tempPatrolboatArray[j]);
          }
          stateControl.playerPatrolboat.spawnPatrolboat = false;
          shipSetupText(
            "Patrolboat is submerged!",
            "Prepare to engage enemy fleet..."
          );
          stateControl.currentFunction = createEnemyFleet;
          setTimeout(() => {
            createEnemyGrid();
          }, 5000);
        } else {
          return;
        }
      } else if (
        e.target.id === `square_${i}` &&
        stateControl.hoizontal_placement === false
      ) {
        if (e.target.getAttribute("Y") > 8) {
          return;
        }
        let patrolBoat_position_1 = document.getElementById(`square_${i}`);
        let patrolBoat_position_2 = document.getElementById(`square_${i - 10}`);
        let tempPatrolboatArray = [];
        tempPatrolboatArray.push(patrolBoat_position_1, patrolBoat_position_2);

        if (
          patrolBoat_position_1.getAttribute("X") ===
            patrolBoat_position_2.getAttribute("X") &&
          !findSharedElements(tempPatrolboatArray, stateControl.taken_sqaures)
        ) {
          for (let j = 0; j < tempPatrolboatArray.length; j++) {
            tempPatrolboatArray[j].style.backgroundColor = "rgb(250, 34, 196)";
            stateControl.taken_sqaures.push(tempPatrolboatArray[j]);
            stateControl.playerPatrolboat.position.push(tempPatrolboatArray[j]);
          }
          stateControl.playerPatrolboat.spawnPatrolboat = false;
          shipSetupText(
            "Patrolboat is submerged!",
            "Prepare to engage enemy fleet..."
          );
          stateControl.currentFunction = createEnemyFleet;
          setTimeout(() => {
            createEnemyGrid();
          }, 5000);
        } else {
          return;
        }
      }
    }
  }
};

export { createCarrierOnBoard, createShips };

createName();
