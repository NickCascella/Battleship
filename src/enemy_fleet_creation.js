import {
  shipFactory,
  stateControl,
  findSharedElements,
} from "./battleship_creation";
import {
  attackEnemy,
  enemyAttack,
  aimAtEnemy,
  shipHitMessage,
} from "./attacking_system";

let createEnemyGrid = () => {
  stateControl.enemyBoard.addEventListener("click", attackEnemy);
  for (let i = 0; i < 100; i++) {
    let square = document.createElement("div");
    if (i < 10) {
      square.setAttribute("XX", i);
      square.setAttribute("YY", 9);
    } else if (i < 20) {
      square.setAttribute("XX", i - 10);
      square.setAttribute("YY", 8);
    } else if (i < 30) {
      square.setAttribute("XX", i - 20);
      square.setAttribute("Y", 7);
    } else if (i < 40) {
      square.setAttribute("XX", i - 30);
      square.setAttribute("YY", 6);
    } else if (i < 50) {
      square.setAttribute("XX", i - 40);
      square.setAttribute("YY", 5);
    } else if (i < 60) {
      square.setAttribute("XX", i - 50);
      square.setAttribute("YY", 4);
    } else if (i < 70) {
      square.setAttribute("XX", i - 60);
      square.setAttribute("YY", 3);
    } else if (i < 80) {
      square.setAttribute("XX", i - 70);
      square.setAttribute("YY", 2);
    } else if (i < 90) {
      square.setAttribute("XX", i - 80);
      square.setAttribute("YY", 1);
    } else if (i < 100) {
      square.setAttribute("XX", i - 90);
      square.setAttribute("YY", 0);
    }
    square.id = `enemySquare_${i}`;
    square.addEventListener("mouseover", aimAtEnemy);
    square.classList = "squares";
    stateControl.enemyBoard.appendChild(square);
    if (i === 99) {
      shipHitMessage("Ready for battle!", "Commence attack!");
      setTimeout(createEnemyFleet, 3000);
    }
  }
};

let createEnemyFleet = () => {
  let enemyCarrier = new shipFactory("Carrier", 5, 5);
  let enemyBattleship = new shipFactory("Battleship", 4, 4);
  let enemyCruiser = new shipFactory("Cruiser", 3, 3);
  let enemySubmarine = new shipFactory("Submarine", 3, 3);
  let enemyPatrolboat = new shipFactory("Patrol Boat", 2, 2);
  stateControl.enemyCarrier.ship = enemyCarrier;
  stateControl.enemyBattleship.ship = enemyBattleship;
  stateControl.enemyCruiser.ship = enemyCruiser;
  stateControl.enemySubmarine.ship = enemySubmarine;
  stateControl.enemyPatrolboat.ship = enemyPatrolboat;
  placeEnemyCarrier();
  placeEnemyBattleship();
  placeEnemyCruiser();
  placeEnemySubmarine();
  placeEnemyPatrolboat();
  stateControl.readyAim = true;
  stateControl.readyFire = true;
};

function placeEnemyCarrier() {
  let spot_on_grid = Math.floor(Math.random() * 100);
  let horizonal_or_vertical = Math.floor(Math.random() * 2);
  if (horizonal_or_vertical === 0) {
    let check_spot_1 = document.getElementById(`enemySquare_${spot_on_grid}`);
    let check_spot_2 = document.getElementById(
      `enemySquare_${spot_on_grid + 1}`
    );
    let check_spot_3 = document.getElementById(
      `enemySquare_${spot_on_grid + 2}`
    );
    let check_spot_4 = document.getElementById(
      `enemySquare_${spot_on_grid + 3}`
    );
    let check_spot_5 = document.getElementById(
      `enemySquare_${spot_on_grid + 4}`
    );
    let check_spot_array = [];
    check_spot_array.push(
      check_spot_1,
      check_spot_2,
      check_spot_3,
      check_spot_4,
      check_spot_5
    );
    if (
      !check_spot_array.includes(null) &&
      !findSharedElements(stateControl.enemy_taken_squares, check_spot_array) &&
      check_spot_1.getAttribute("YY") === check_spot_5.getAttribute("YY")
    ) {
      let enemy_carrier_position_1 = check_spot_1;
      let enemy_carrier_position_2 = check_spot_2;
      let enemy_carrier_position_3 = check_spot_3;
      let enemy_carrier_position_4 = check_spot_4;
      let enemy_carrier_position_5 = check_spot_5;
      let enemy_carrier_position_array = [];
      enemy_carrier_position_array.push(
        enemy_carrier_position_1,
        enemy_carrier_position_2,
        enemy_carrier_position_3,
        enemy_carrier_position_4,
        enemy_carrier_position_5
      );
      for (let j = 0; j < check_spot_array.length; j++) {
        // enemy_carrier_position_array[j].style.backgroundColor = "red";
        stateControl.enemyCarrier.position.push(
          enemy_carrier_position_array[j]
        );
        stateControl.enemy_taken_squares.push(enemy_carrier_position_array[j]);
      }
    } else {
      placeEnemyCarrier();
    }
  } else if (horizonal_or_vertical === 1) {
    let check_spot_1 = document.getElementById(`enemySquare_${spot_on_grid}`);
    let check_spot_2 = document.getElementById(
      `enemySquare_${spot_on_grid - 10}`
    );
    let check_spot_3 = document.getElementById(
      `enemySquare_${spot_on_grid - 20}`
    );
    let check_spot_4 = document.getElementById(
      `enemySquare_${spot_on_grid - 30}`
    );
    let check_spot_5 = document.getElementById(
      `enemySquare_${spot_on_grid - 40}`
    );
    let check_spot_array = [];
    check_spot_array.push(
      check_spot_1,
      check_spot_2,
      check_spot_3,
      check_spot_4,
      check_spot_5
    );
    if (
      !check_spot_array.includes(null) &&
      !findSharedElements(stateControl.enemy_taken_squares, check_spot_array)
    ) {
      let enemy_carrier_position_1 = check_spot_1;
      let enemy_carrier_position_2 = check_spot_2;
      let enemy_carrier_position_3 = check_spot_3;
      let enemy_carrier_position_4 = check_spot_4;
      let enemy_carrier_position_5 = check_spot_5;
      let enemy_carrier_position_array = [];
      enemy_carrier_position_array.push(
        enemy_carrier_position_1,
        enemy_carrier_position_2,
        enemy_carrier_position_3,
        enemy_carrier_position_4,
        enemy_carrier_position_5
      );
      for (let j = 0; j < check_spot_array.length; j++) {
        // check_spot_array[j].style.backgroundColor = "red";
        stateControl.enemyCarrier.position.push(
          enemy_carrier_position_array[j]
        );
        stateControl.enemy_taken_squares.push(enemy_carrier_position_array[j]);
      }
    } else {
      placeEnemyCarrier();
    }
  }
}

function placeEnemyBattleship() {
  let spot_on_grid = Math.floor(Math.random() * 100);
  let horizonal_or_vertical = Math.floor(Math.random() * 2);
  if (horizonal_or_vertical === 0) {
    let check_spot_1 = document.getElementById(`enemySquare_${spot_on_grid}`);
    let check_spot_2 = document.getElementById(
      `enemySquare_${spot_on_grid + 1}`
    );
    let check_spot_3 = document.getElementById(
      `enemySquare_${spot_on_grid + 2}`
    );
    let check_spot_4 = document.getElementById(
      `enemySquare_${spot_on_grid + 3}`
    );
    let check_spot_array = [];
    check_spot_array.push(
      check_spot_1,
      check_spot_2,
      check_spot_3,
      check_spot_4
    );
    if (
      !check_spot_array.includes(null) &&
      !findSharedElements(stateControl.enemy_taken_squares, check_spot_array) &&
      check_spot_1.getAttribute("YY") === check_spot_4.getAttribute("YY")
    ) {
      let enemy_battleship_position_1 = check_spot_1;
      let enemy_battleship_position_2 = check_spot_2;
      let enemy_battleship_position_3 = check_spot_3;
      let enemy_battleship_position_4 = check_spot_4;
      let enemy_battleship_position_array = [];
      enemy_battleship_position_array.push(
        enemy_battleship_position_1,
        enemy_battleship_position_2,
        enemy_battleship_position_3,
        enemy_battleship_position_4
      );
      for (let j = 0; j < check_spot_array.length; j++) {
        // check_spot_array[j].style.backgroundColor = "red";
        stateControl.enemyBattleship.position.push(
          enemy_battleship_position_array[j]
        );
        stateControl.enemy_taken_squares.push(
          enemy_battleship_position_array[j]
        );
      }
    } else {
      placeEnemyBattleship();
    }
  } else if (horizonal_or_vertical === 1) {
    let check_spot_1 = document.getElementById(`enemySquare_${spot_on_grid}`);
    let check_spot_2 = document.getElementById(
      `enemySquare_${spot_on_grid - 10}`
    );
    let check_spot_3 = document.getElementById(
      `enemySquare_${spot_on_grid - 20}`
    );
    let check_spot_4 = document.getElementById(
      `enemySquare_${spot_on_grid - 30}`
    );
    let check_spot_array = [];
    check_spot_array.push(
      check_spot_1,
      check_spot_2,
      check_spot_3,
      check_spot_4
    );
    if (
      !check_spot_array.includes(null) &&
      !findSharedElements(stateControl.enemy_taken_squares, check_spot_array)
    ) {
      let enemy_battleship_position_1 = check_spot_1;
      let enemy_battleship_position_2 = check_spot_2;
      let enemy_battleship_position_3 = check_spot_3;
      let enemy_battleship_position_4 = check_spot_4;
      let enemy_battleship_position_array = [];
      enemy_battleship_position_array.push(
        enemy_battleship_position_1,
        enemy_battleship_position_2,
        enemy_battleship_position_3,
        enemy_battleship_position_4
      );
      for (let j = 0; j < check_spot_array.length; j++) {
        // check_spot_array[j].style.backgroundColor = "red";
        stateControl.enemyBattleship.position.push(
          enemy_battleship_position_array[j]
        );
        stateControl.enemy_taken_squares.push(
          enemy_battleship_position_array[j]
        );
      }
    } else {
      placeEnemyBattleship();
    }
  }
}

function placeEnemyCruiser() {
  let spot_on_grid = Math.floor(Math.random() * 100);
  let horizonal_or_vertical = Math.floor(Math.random() * 2);
  if (horizonal_or_vertical === 0) {
    let check_spot_1 = document.getElementById(`enemySquare_${spot_on_grid}`);
    let check_spot_2 = document.getElementById(
      `enemySquare_${spot_on_grid + 1}`
    );
    let check_spot_3 = document.getElementById(
      `enemySquare_${spot_on_grid + 2}`
    );
    let check_spot_array = [];
    check_spot_array.push(check_spot_1, check_spot_2, check_spot_3);
    if (
      !check_spot_array.includes(null) &&
      !findSharedElements(stateControl.enemy_taken_squares, check_spot_array) &&
      check_spot_1.getAttribute("YY") === check_spot_3.getAttribute("YY")
    ) {
      let enemy_cruiser_position_1 = check_spot_1;
      let enemy_cruiser_position_2 = check_spot_2;
      let enemy_cruiser_position_3 = check_spot_3;
      let enemy_cruiser_position_array = [];
      enemy_cruiser_position_array.push(
        enemy_cruiser_position_1,
        enemy_cruiser_position_2,
        enemy_cruiser_position_3
      );
      for (let j = 0; j < check_spot_array.length; j++) {
        // check_spot_array[j].style.backgroundColor = "red";
        stateControl.enemyCruiser.position.push(
          enemy_cruiser_position_array[j]
        );
        stateControl.enemy_taken_squares.push(enemy_cruiser_position_array[j]);
      }
    } else {
      placeEnemyCruiser();
    }
  } else if (horizonal_or_vertical === 1) {
    let check_spot_1 = document.getElementById(`enemySquare_${spot_on_grid}`);
    let check_spot_2 = document.getElementById(
      `enemySquare_${spot_on_grid - 10}`
    );
    let check_spot_3 = document.getElementById(
      `enemySquare_${spot_on_grid - 20}`
    );

    let check_spot_array = [];
    check_spot_array.push(check_spot_1, check_spot_2, check_spot_3);
    if (
      !check_spot_array.includes(null) &&
      !findSharedElements(stateControl.enemy_taken_squares, check_spot_array)
    ) {
      let enemy_cruiser_position_1 = check_spot_1;
      let enemy_cruiser_position_2 = check_spot_2;
      let enemy_cruiser_position_3 = check_spot_3;
      let enemy_cruiser_position_array = [];
      enemy_cruiser_position_array.push(
        enemy_cruiser_position_1,
        enemy_cruiser_position_2,
        enemy_cruiser_position_3
      );
      for (let j = 0; j < check_spot_array.length; j++) {
        // check_spot_array[j].style.backgroundColor = "red";
        stateControl.enemyCruiser.position.push(
          enemy_cruiser_position_array[j]
        );
        stateControl.enemy_taken_squares.push(enemy_cruiser_position_array[j]);
      }
    } else {
      placeEnemyCruiser();
    }
  }
}

function placeEnemySubmarine() {
  let spot_on_grid = Math.floor(Math.random() * 100);
  let horizonal_or_vertical = Math.floor(Math.random() * 2);
  if (horizonal_or_vertical === 0) {
    let check_spot_1 = document.getElementById(`enemySquare_${spot_on_grid}`);
    let check_spot_2 = document.getElementById(
      `enemySquare_${spot_on_grid + 1}`
    );
    let check_spot_3 = document.getElementById(
      `enemySquare_${spot_on_grid + 2}`
    );
    let check_spot_array = [];
    check_spot_array.push(check_spot_1, check_spot_2, check_spot_3);
    if (
      !check_spot_array.includes(null) &&
      !findSharedElements(stateControl.enemy_taken_squares, check_spot_array) &&
      check_spot_1.getAttribute("YY") === check_spot_3.getAttribute("YY")
    ) {
      let enemy_submarine_position_1 = check_spot_1;
      let enemy_submarine_position_2 = check_spot_2;
      let enemy_submarine_position_3 = check_spot_3;
      let enemy_submarine_position_array = [];
      enemy_submarine_position_array.push(
        enemy_submarine_position_1,
        enemy_submarine_position_2,
        enemy_submarine_position_3
      );
      for (let j = 0; j < check_spot_array.length; j++) {
        // check_spot_array[j].style.backgroundColor = "red";
        stateControl.enemySubmarine.position.push(
          enemy_submarine_position_array[j]
        );
        stateControl.enemy_taken_squares.push(
          enemy_submarine_position_array[j]
        );
      }
    } else {
      placeEnemySubmarine();
    }
  } else if (horizonal_or_vertical === 1) {
    let check_spot_1 = document.getElementById(`enemySquare_${spot_on_grid}`);
    let check_spot_2 = document.getElementById(
      `enemySquare_${spot_on_grid - 10}`
    );
    let check_spot_3 = document.getElementById(
      `enemySquare_${spot_on_grid - 20}`
    );

    let check_spot_array = [];
    check_spot_array.push(check_spot_1, check_spot_2, check_spot_3);
    if (
      !check_spot_array.includes(null) &&
      !findSharedElements(stateControl.enemy_taken_squares, check_spot_array)
    ) {
      let enemy_submarine_position_1 = check_spot_1;
      let enemy_submarine_position_2 = check_spot_2;
      let enemy_submarine_position_3 = check_spot_3;
      let enemy_submarine_position_array = [];
      enemy_submarine_position_array.push(
        enemy_submarine_position_1,
        enemy_submarine_position_2,
        enemy_submarine_position_3
      );
      for (let j = 0; j < check_spot_array.length; j++) {
        // check_spot_array[j].style.backgroundColor = "red";
        stateControl.enemySubmarine.position.push(
          enemy_submarine_position_array[j]
        );
        stateControl.enemy_taken_squares.push(
          enemy_submarine_position_array[j]
        );
      }
    } else {
      placeEnemySubmarine();
    }
  }
}

function placeEnemyPatrolboat() {
  let spot_on_grid = Math.floor(Math.random() * 100);
  let horizonal_or_vertical = Math.floor(Math.random() * 2);
  if (horizonal_or_vertical === 0) {
    let check_spot_1 = document.getElementById(`enemySquare_${spot_on_grid}`);
    let check_spot_2 = document.getElementById(
      `enemySquare_${spot_on_grid + 1}`
    );
    let check_spot_array = [];
    check_spot_array.push(check_spot_1, check_spot_2);
    if (
      !check_spot_array.includes(null) &&
      !findSharedElements(stateControl.enemy_taken_squares, check_spot_array) &&
      check_spot_1.getAttribute("YY") === check_spot_2.getAttribute("YY")
    ) {
      let enemy_patrolboat_position_1 = check_spot_1;
      let enemy_patrolboat_position_2 = check_spot_2;
      let enemy_patrolboat_position_array = [];
      enemy_patrolboat_position_array.push(
        enemy_patrolboat_position_1,
        enemy_patrolboat_position_2
      );
      for (let j = 0; j < check_spot_array.length; j++) {
        // check_spot_array[j].style.backgroundColor = "red";
        stateControl.enemyPatrolboat.position.push(
          enemy_patrolboat_position_array[j]
        );
        stateControl.enemy_taken_squares.push(
          enemy_patrolboat_position_array[j]
        );
      }
    } else {
      placeEnemyPatrolboat();
    }
  } else if (horizonal_or_vertical === 1) {
    let check_spot_1 = document.getElementById(`enemySquare_${spot_on_grid}`);
    let check_spot_2 = document.getElementById(
      `enemySquare_${spot_on_grid - 10}`
    );
    let check_spot_array = [];
    check_spot_array.push(check_spot_1, check_spot_2);
    if (
      !check_spot_array.includes(null) &&
      !findSharedElements(stateControl.enemy_taken_squares, check_spot_array)
    ) {
      let enemy_patrolboat_position_1 = check_spot_1;
      let enemy_patrolboat_position_2 = check_spot_2;
      let enemy_patrolboat_position_array = [];
      enemy_patrolboat_position_array.push(
        enemy_patrolboat_position_1,
        enemy_patrolboat_position_2
      );
      for (let j = 0; j < check_spot_array.length; j++) {
        // check_spot_array[j].style.backgroundColor = "red";
        stateControl.enemyPatrolboat.position.push(
          enemy_patrolboat_position_array[j]
        );
        stateControl.enemy_taken_squares.push(
          enemy_patrolboat_position_array[j]
        );
      }
    } else {
      placeEnemyPatrolboat();
    }
  }
}

export { createEnemyGrid, createEnemyFleet, shipHitMessage, enemyAttack };
