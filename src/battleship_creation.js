import { createCarrierOnBoard } from "./battleship";
import { shipHitMessage, enemyAttack } from "./enemy_fleet_creation";
import { checkShipsSank } from "./end_game";

let stateControl = {
  board: document.getElementById("game_board"),
  textDisplay: document.getElementById("text_display"),
  currentFunction: "This is filler",
  hoizontal_placement: true,
  availibleSquares: [],
  taken_sqaures: [],
  checkArray: false,
  hoverArray: [],
  readyAim: false,
  passedSquare: "This is filler",
  clearPassedSquare: false,
  readyFire: false,
  enemyTurn: false,
  playerSuccessfulShots: [],
  enemySuccessfulShots: [],
  missedShots: [],
  playerShipsSunk: 0,
  enemyShipsSunk: 0,
  playerCarrier: {
    spawnCarrier: true,
    ship: {},
    position: [],
  },
  playerBattleship: {
    spawnBattleship: false,
    ship: {},
    position: [],
  },
  playerCruiser: {
    spawnCruiser: false,
    ship: {},
    position: [],
  },
  playerSubmarine: {
    spawnSubmarine: false,
    ship: {},
    position: [],
  },
  playerPatrolboat: {
    spawnPatrolboat: false,
    ship: {},
    position: [],
  },
  enemyBoard: document.getElementById("enemy_board"),
  enemy_taken_squares: [],
  enemyCarrier: {
    ship: {},
    position: [],
  },
  enemyBattleship: {
    ship: {},
    position: [],
  },
  enemyCruiser: {
    ship: {},
    position: [],
  },
  enemySubmarine: {
    ship: {},
    position: [],
  },
  enemyPatrolboat: {
    ship: {},
    position: [],
  },
  playerName: "",
};

class shipFactory {
  constructor(name, hit_points, length) {
    this.name = name;
    this.hit_points = hit_points;
    this.length = length;
  }
  hit() {
    this.hit_points -= 1;
    if (this.hit_points !== 0 && stateControl.enemyTurn === false) {
      shipHitMessage("Checking.....", "It's a hit!");
      setTimeout(function nextTurn() {
        stateControl.enemyTurn = true;
        enemyAttack();
      }, 5500);
    } else if (this.hit_points !== 0 && stateControl.enemyTurn === true) {
      shipHitMessage(
        "Waiting for enemy fire.....",
        `Our ${this.name}\'s been hit! Fire back!`
      );
      stateControl.enemyTurn = false;
      setTimeout(function nextTurn() {
        stateControl.readyFire = true;
        stateControl.readyAim = true;
      }, 3300);
    } else if (this.hit_points === 0 && stateControl.enemyTurn === false) {
      shipHitMessage(
        "Checking.....",
        `Nice shot! you sunk their ${this.name}!`
      );
      setTimeout(function nextTurn() {
        stateControl.enemyShipsSunk++;
        if (
          stateControl.playerShipsSunk === 5 ||
          stateControl.enemyShipsSunk === 5
        ) {
          checkShipsSank();
        } else {
          stateControl.enemyTurn = true;
          enemyAttack();
        }
      }, 5500);
    } else if (this.hit_points === 0 && stateControl.enemyTurn === true) {
      shipHitMessage(
        "Waiting for enemy fire.....",
        `Damn! they sunk our ${this.name}!!`
      );
      stateControl.enemyTurn = false;
      setTimeout(function nextTurn() {
        stateControl.playerShipsSunk++;
        if (
          stateControl.playerShipsSunk === 5 ||
          stateControl.enemyShipsSunk === 5
        ) {
          checkShipsSank();
        } else {
          stateControl.readyFire = true;
          stateControl.readyAim = true;
        }
      }, 3300);
    }
  }
}

let findSharedElements = (arr1, arr2) => {
  return arr1
    .map((elm) => elm.id)
    .some((id) => arr2.map((elm) => elm.id).includes(id));
};

let check = (e) => {
  for (let i = 0; i < 100; i++) {
    //carrier horizonal hover effect
    if (
      stateControl.playerCarrier.spawnCarrier === true &&
      stateControl.hoizontal_placement === true &&
      e.target.id === `square_${i}`
    ) {
      if (stateControl.checkArray === true) {
        stateControl.hoverArray.forEach((x) => {
          if (x !== null) x.style.backgroundColor = "";
        });
      }
      let hoverOne = document.getElementById(`square_${i}`);
      let hoverTwo = document.getElementById(`square_${i + 1}`);
      let hoverThree = document.getElementById(`square_${i + 2}`);
      let hoverFour = document.getElementById(`square_${i + 3}`);
      let hoverFive = document.getElementById(`square_${i + 4}`);
      stateControl.hoverArray = [];
      stateControl.checkArray = true;
      stateControl.hoverArray.push(
        hoverOne,
        hoverTwo,
        hoverThree,
        hoverFour,
        hoverFive
      );
      if (
        hoverOne.getAttribute("X") < 6 &&
        hoverOne.getAttribute("Y") === hoverFive.getAttribute("Y") &&
        !stateControl.hoverArray.includes(null)
      ) {
        stateControl.hoverArray.forEach((x) => {
          x.style.backgroundColor = "green";
        });
      } else {
        stateControl.hoverArray.forEach((x) => {
          if (
            x !== null &&
            x.getAttribute("Y") ===
              stateControl.hoverArray[0].getAttribute("Y") &&
            !stateControl.taken_sqaures.includes(x)
          ) {
            x.style.backgroundColor = "red";
          }
        });
      }

      //carrier vertical hover effect
    } else if (
      stateControl.playerCarrier.spawnCarrier === true &&
      stateControl.hoizontal_placement === false &&
      e.target.id === `square_${i}`
    ) {
      if (stateControl.checkArray === true) {
        stateControl.hoverArray.forEach((x) => {
          if (x !== null) x.style.backgroundColor = "";
        });
      }
      let hoverOne = document.getElementById(`square_${i}`);
      let hoverTwo = document.getElementById(`square_${i - 10}`);
      let hoverThree = document.getElementById(`square_${i - 20}`);
      let hoverFour = document.getElementById(`square_${i - 30}`);
      let hoverFive = document.getElementById(`square_${i - 40}`);
      stateControl.hoverArray = [];
      stateControl.checkArray = true;
      stateControl.hoverArray.push(
        hoverOne,
        hoverTwo,
        hoverThree,
        hoverFour,
        hoverFive
      );
      if (
        hoverOne.getAttribute("Y") < 6 &&
        hoverOne.getAttribute("X") === hoverFive.getAttribute("X") &&
        !stateControl.hoverArray.includes(null)
      ) {
        stateControl.hoverArray.forEach((y) => {
          y.style.backgroundColor = "green";
        });
      } else {
        stateControl.hoverArray.forEach((x) => {
          if (
            x !== null &&
            x.getAttribute("X") ===
              stateControl.hoverArray[0].getAttribute("X") &&
            !stateControl.taken_sqaures.includes(x)
          ) {
            x.style.backgroundColor = "red";
          }
        });
      }
    }

    //hover battleship horizonal effect
    else if (
      stateControl.playerBattleship.spawnBattleship === true &&
      stateControl.hoizontal_placement === true &&
      e.target.id === `square_${i}`
    ) {
      if (stateControl.checkArray === true) {
        stateControl.hoverArray.forEach((x) => {
          if (x !== null && !stateControl.taken_sqaures.includes(x)) {
            x.style.backgroundColor = "";
          }
        });
      }
      let hoverOne = document.getElementById(`square_${i}`);
      let hoverTwo = document.getElementById(`square_${i + 1}`);
      let hoverThree = document.getElementById(`square_${i + 2}`);
      let hoverFour = document.getElementById(`square_${i + 3}`);
      stateControl.hoverArray = [];
      stateControl.checkArray = true;
      stateControl.hoverArray.push(hoverOne, hoverTwo, hoverThree, hoverFour);
      //mark it green
      if (
        hoverOne.getAttribute("X") < 7 &&
        hoverOne.getAttribute("Y") === hoverFour.getAttribute("Y") &&
        !findSharedElements(stateControl.taken_sqaures, stateControl.hoverArray)
      ) {
        stateControl.hoverArray.forEach((x) => {
          x.style.backgroundColor = "green";
        });
      } else {
        stateControl.hoverArray.forEach((x) => {
          if (
            x !== null &&
            x.getAttribute("Y") ===
              stateControl.hoverArray[0].getAttribute("Y") &&
            !stateControl.taken_sqaures.includes(x)
          ) {
            x.style.backgroundColor = "red";
          }
        });
      }
    }

    //hover battleship vertically effect
    else if (
      stateControl.playerBattleship.spawnBattleship === true &&
      stateControl.hoizontal_placement === false &&
      e.target.id === `square_${i}`
    ) {
      if (stateControl.checkArray === true) {
        stateControl.hoverArray.forEach((x) => {
          if (x !== null && !stateControl.taken_sqaures.includes(x)) {
            x.style.backgroundColor = "";
          }
        });
      }
      let hoverOne = document.getElementById(`square_${i}`);
      let hoverTwo = document.getElementById(`square_${i - 10}`);
      let hoverThree = document.getElementById(`square_${i - 20}`);
      let hoverFour = document.getElementById(`square_${i - 30}`);
      stateControl.hoverArray = [];
      stateControl.checkArray = true;
      stateControl.hoverArray.push(hoverOne, hoverTwo, hoverThree, hoverFour);
      //mark it green
      if (
        hoverOne.getAttribute("Y") < 7 &&
        hoverOne.getAttribute("X") === hoverFour.getAttribute("X") &&
        !findSharedElements(stateControl.taken_sqaures, stateControl.hoverArray)
      ) {
        stateControl.hoverArray.forEach((x) => {
          x.style.backgroundColor = "green";
        });
      } else {
        stateControl.hoverArray.forEach((x) => {
          if (
            x !== null &&
            x.getAttribute("X") ===
              stateControl.hoverArray[0].getAttribute("X") &&
            !stateControl.taken_sqaures.includes(x)
          ) {
            x.style.backgroundColor = "red";
          }
        });
      }
    }

    //hover cruiser/submarine horizonal effect
    else if (
      (stateControl.playerCruiser.spawnCruiser === true ||
        stateControl.playerSubmarine.spawnSubmarine === true) &&
      stateControl.hoizontal_placement === true &&
      e.target.id === `square_${i}`
    ) {
      if (stateControl.checkArray === true) {
        stateControl.hoverArray.forEach((x) => {
          if (x !== null && !stateControl.taken_sqaures.includes(x)) {
            x.style.backgroundColor = "";
          }
        });
      }
      let hoverOne = document.getElementById(`square_${i}`);
      let hoverTwo = document.getElementById(`square_${i + 1}`);
      let hoverThree = document.getElementById(`square_${i + 2}`);
      stateControl.hoverArray = [];
      stateControl.checkArray = true;
      stateControl.hoverArray.push(hoverOne, hoverTwo, hoverThree);
      //mark it green
      if (
        hoverOne.getAttribute("X") < 8 &&
        hoverOne.getAttribute("Y") === hoverThree.getAttribute("Y") &&
        !findSharedElements(stateControl.taken_sqaures, stateControl.hoverArray)
      ) {
        stateControl.hoverArray.forEach((x) => {
          x.style.backgroundColor = "green";
        });
      } else {
        stateControl.hoverArray.forEach((x) => {
          if (
            x !== null &&
            x.getAttribute("Y") ===
              stateControl.hoverArray[0].getAttribute("Y") &&
            !stateControl.taken_sqaures.includes(x)
          ) {
            x.style.backgroundColor = "red";
          }
        });
      }
    }

    //hover cruiser/submarine effect vertically
    else if (
      (stateControl.playerCruiser.spawnCruiser === true ||
        stateControl.playerSubmarine.spawnSubmarine === true) &&
      stateControl.hoizontal_placement === false &&
      e.target.id === `square_${i}`
    ) {
      if (stateControl.checkArray === true) {
        stateControl.hoverArray.forEach((x) => {
          if (x !== null && !stateControl.taken_sqaures.includes(x)) {
            x.style.backgroundColor = "";
          }
        });
      }
      let hoverOne = document.getElementById(`square_${i}`);
      let hoverTwo = document.getElementById(`square_${i - 10}`);
      let hoverThree = document.getElementById(`square_${i - 20}`);
      stateControl.hoverArray = [];
      stateControl.checkArray = true;
      stateControl.hoverArray.push(hoverOne, hoverTwo, hoverThree);
      //mark it green
      if (
        hoverOne.getAttribute("Y") < 8 &&
        hoverOne.getAttribute("X") === hoverThree.getAttribute("X") &&
        !findSharedElements(stateControl.taken_sqaures, stateControl.hoverArray)
      ) {
        stateControl.hoverArray.forEach((x) => {
          x.style.backgroundColor = "green";
        });
      } else {
        stateControl.hoverArray.forEach((x) => {
          if (
            x !== null &&
            x.getAttribute("X") ===
              stateControl.hoverArray[0].getAttribute("X") &&
            !stateControl.taken_sqaures.includes(x)
          ) {
            x.style.backgroundColor = "red";
          }
        });
      }
    }
    //hover patrol boat horizonal effect
    else if (
      stateControl.playerPatrolboat.spawnPatrolboat === true &&
      stateControl.hoizontal_placement === true &&
      e.target.id === `square_${i}`
    ) {
      if (stateControl.checkArray === true) {
        stateControl.hoverArray.forEach((x) => {
          if (x !== null && !stateControl.taken_sqaures.includes(x)) {
            x.style.backgroundColor = "";
          }
        });
      }
      let hoverOne = document.getElementById(`square_${i}`);
      let hoverTwo = document.getElementById(`square_${i + 1}`);
      stateControl.hoverArray = [];
      stateControl.checkArray = true;
      stateControl.hoverArray.push(hoverOne, hoverTwo);
      //mark it green
      if (
        hoverOne.getAttribute("X") < 9 &&
        hoverOne.getAttribute("Y") === hoverTwo.getAttribute("Y") &&
        !findSharedElements(stateControl.taken_sqaures, stateControl.hoverArray)
      ) {
        stateControl.hoverArray.forEach((x) => {
          x.style.backgroundColor = "green";
        });
      } else {
        stateControl.hoverArray.forEach((x) => {
          if (
            x !== null &&
            x.getAttribute("Y") ===
              stateControl.hoverArray[0].getAttribute("Y") &&
            !stateControl.taken_sqaures.includes(x)
          ) {
            x.style.backgroundColor = "red";
          }
        });
      }
    }

    //hover patrol boat effect vertically
    else if (
      stateControl.playerPatrolboat.spawnPatrolboat === true &&
      stateControl.hoizontal_placement === false &&
      e.target.id === `square_${i}`
    ) {
      if (stateControl.checkArray === true) {
        stateControl.hoverArray.forEach((x) => {
          if (x !== null && !stateControl.taken_sqaures.includes(x)) {
            x.style.backgroundColor = "";
          }
        });
      }
      let hoverOne = document.getElementById(`square_${i}`);
      let hoverTwo = document.getElementById(`square_${i - 10}`);
      stateControl.hoverArray = [];
      stateControl.checkArray = true;
      stateControl.hoverArray.push(hoverOne, hoverTwo);
      //mark it green
      if (
        hoverOne.getAttribute("Y") < 9 &&
        hoverOne.getAttribute("X") === hoverTwo.getAttribute("X") &&
        !findSharedElements(stateControl.taken_sqaures, stateControl.hoverArray)
      ) {
        stateControl.hoverArray.forEach((x) => {
          x.style.backgroundColor = "green";
        });
      } else {
        stateControl.hoverArray.forEach((x) => {
          if (
            x !== null &&
            x.getAttribute("X") ===
              stateControl.hoverArray[0].getAttribute("X") &&
            !stateControl.taken_sqaures.includes(x)
          ) {
            x.style.backgroundColor = "red";
          }
        });
      }
    }
  }
};

let createGameBoard = () => {
  stateControl.currentFunction = createCarrierOnBoard;
  stateControl.board.addEventListener("click", stateControl.currentFunction);
  for (let i = 0; i < 100; i++) {
    let square = document.createElement("div");
    if (i < 10) {
      square.setAttribute("X", i);
      square.setAttribute("Y", 9);
    } else if (i < 20) {
      square.setAttribute("X", i - 10);
      square.setAttribute("Y", 8);
    } else if (i < 30) {
      square.setAttribute("X", i - 20);
      square.setAttribute("Y", 7);
    } else if (i < 40) {
      square.setAttribute("X", i - 30);
      square.setAttribute("Y", 6);
    } else if (i < 50) {
      square.setAttribute("X", i - 40);
      square.setAttribute("Y", 5);
    } else if (i < 60) {
      square.setAttribute("X", i - 50);
      square.setAttribute("Y", 4);
    } else if (i < 70) {
      square.setAttribute("X", i - 60);
      square.setAttribute("Y", 3);
    } else if (i < 80) {
      square.setAttribute("X", i - 70);
      square.setAttribute("Y", 2);
    } else if (i < 90) {
      square.setAttribute("X", i - 80);
      square.setAttribute("Y", 1);
    } else if (i < 100) {
      square.setAttribute("X", i - 90);
      square.setAttribute("Y", 0);
    }
    square.id = `square_${i}`;
    square.addEventListener("mouseover", check);
    square.classList.add("squares");
    stateControl.board.appendChild(square);
    stateControl.availibleSquares.push(i);
  }
};

export { shipFactory, createGameBoard, stateControl, findSharedElements };
