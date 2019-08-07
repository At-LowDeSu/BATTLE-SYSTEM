//Setting basic variables

let clicked = false;
let typeClass = 0;

//Setting dom variables

const mage = document.querySelector('#mage');
const knight = document.querySelector('#knight');
const demon = document.querySelector('#demon');
const battle_1 = document.querySelector('.battle-1');
const battle_2 = document.querySelector('.battle-2');
const battle_3 = document.querySelector('.battle-3');
const battle_4 = document.querySelector('.battle-4');
const text_1 = document.querySelector('#text-1');
const text_2 = document.querySelector('#text-2');
const text_3 = document.querySelector('#text-3');
const text_4 = document.querySelector('#text-4');
const text_5 = document.querySelector('#text-5');
const text_6 = document.querySelector('#text-6');

//Creating basic classes

//Event Listeners

mage.addEventListener('click', mageClick => {
  mainLoop();
});

knight.addEventListener('click', knightClick => {
  mainLoop();
});

demon.addEventListener('click', demonClick => {
  mainLoop();
});

//Main Loop

function mainLoop() {
  //Creating the player class

  class Player {
    constructor(type_class) {
      this.type_class = type_class;
      this.health = 100;
      this.mana = 10;
      this.speed = 5;
    }
    takeDamage(x) {
      this.health = this.health - x;
      updateStats();
      if (this.health <= 0) {
        this.playerDies();
      }
    }
    gainHealth(x) {
      this.health = this.health + x;
      updateStats();
      text_2.innerHTML = text_2.innerHTML + '<br>You gain ' + x + ' health!';
      text_3.innerHTML = '';
      activeEnemy.enemyChoice();
    }
    chargeMana(x) {
      this.mana = this.mana + x;
      text_2.innerHTML =
        'You meditate calmly. Your mana increases by ' + x + ' points.';
      text_3.innerHTML = '';
      updateStats();
      activeEnemy.enemyChoice();
    }
    attack(enemy) {
      text_2.innerHTML = 'You hit the enemy with a solid strike!';
      enemy.takeDamage(10);
      enemy.enemyChoice();
    }
    specialAttack(enemy) {
      if (this.mana >= 3) {
        text_2.innerHTML =
          'Using 3 mana points, you expel energy from your body. The mana begins to permeate around your weapon.<br>You hit the enemy with a magic strike!';
        text_3.innerHTML = '';
        this.mana = this.mana - 3;
        enemy.takeDamage(15);
        enemy.enemyChoice();
      } else {
        text_2.innerHTML =
          "You attempt to expel energy from your body, but since your mana was too low, you've taken a form of mana burn!";
        text_3.innerHTML = '';
        this.takeDamage(10);
        enemy.enemyChoice();
      }
    }
    heal() {
      if (this.mana >= 5) {
        text_2.innerHTML =
          'Using 5 mana points, you expel energy from your body. The mana begins to permeate around your body.<br>Your body begins to recover from its injuries!';
        text_3.innerHTML = '';
        this.mana = this.mana - 5;
        this.gainHealth(20);
      } else {
        text_2.innerHTML =
          "You attempt to expel energy from your body, but since your mana was too low, you've taken a form of mana burn!";
        text_3.innerHTML = '';
        this.takeDamage(10);
        activeEnemy.enemyChoice();
      }
    }
    wait() {
      this.chargeMana(5);
    }
    playerDies() {
      //Add what happens when you lose the game here
      text_1.innerHTML = "You've lost the game!";
      text_2.innerHTML = '';
      text_3.innerHTML = 'Play Again?';
      text_4.innerHTML = '<a href="#">Play Again</a>';
      text_5.innerHTML = '';
      text_6.innerHTML = '';
      battle_1.innerHTML = '';
      battle_2.innerHTML = '';
      battle_3.innerHTML = '';
      battle_4.innerHTML = '';
    }
  }

  //Creating the enemy class

  class Enemy {
    constructor(type_class) {
      this.type_class = type_class;
      this.health = 130;
      this.mana = 15;
      this.speed = 5;
      this.rand = 0;
    }
    takeDamage(x) {
      this.health = this.health - x;
      updateStats();
      if (this.health <= 0) {
        this.enemyDies();
      } else {
        text_2.innerHTML =
          text_2.innerHTML + '<br>The enemy takes ' + x + ' damage!';
      }
    }
    gainHealth(x) {
      this.health = this.health + x;
      updateStats();
      text_3.innerHTML =
        text_3.innerHTML + '<br>The enemy gains ' + x + ' health!';
    }
    chargeMana(x) {
      this.mana = this.mana + x;
      text_3.innerHTML =
        'The enemy meditates calmly. His mana increases by ' + x + ' points.';
      updateStats();
    }
    attack(enemy) {
      text_3.innerHTML = 'The enemy hits you with a solid strike!';
      enemy.takeDamage(10);
    }
    specialAttack(enemy) {
      if (this.mana >= 3) {
        text_3.innerHTML =
          'Using 3 mana points, the enemy expels energy from his body. The mana begins to permeate around his weapon.<br>The enemy hits you with a magic strike!';
        this.mana = this.mana - 3;
        enemy.takeDamage(15);
      } else {
        text_2.innerHTML =
          "The enemy attempts to expel energy from his body, but since his mana was too low, he's taken a form of mana burn!";
        this.takeDamage(10);
      }
    }
    heal() {
      if (this.mana >= 5) {
        text_3.innerHTML =
          'Using 5 mana points, the enemy expels energy from his body. The mana begins to permeate around his body.<br>His body begins to recover from its injuries!';
        this.mana = this.mana - 5;
        this.gainHealth(20);
      } else {
        text_3.innerHTML =
          "The enemy attempts to expel energy from his body, but since his mana was too low, he's taken a form of mana burn!";
        this.takeDamage(10);
      }
    }
    wait() {
      this.chargeMana(7);
    }
    enemyChoice() {
      function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }
      this.rand = getRandomInt(4);
      console.log('e.action');
      console.log(this.rand);
      switch (this.rand) {
        case 0:
          this.attack(activePlayer);
          console.log('e.attack');
          break;
        case 1:
          this.specialAttack(activePlayer);
          console.log('e.special');
          break;
        case 2:
          this.heal();
          console.log('e.heal');
          break;
        case 3:
          this.wait();
          console.log('e.wait');
          break;
      }
    }
    enemyDies() {
      text_1.innerHTML = "You've won the game!";
      text_2.innerHTML =
        text_2.innerHTML +
        '<br>The enemy takes 10 damage! <br>They have been defeated!';
      text_3.innerHTML = 'Play Again?';
      text_4.innerHTML = '<a href="#">Play Again</a>';
      text_5.innerHTML = '';
      text_6.innerHTML = '';
      battle_1.innerHTML = '';
      battle_2.innerHTML = '';
      battle_3.innerHTML = '';
      battle_4.innerHTML = '';
    }
  }

  //Main Event Listeners

  battle_1.addEventListener('click', attack => {
    activePlayer.attack(activeEnemy);
  });

  battle_2.addEventListener('click', specialAttack => {
    activePlayer.specialAttack(activeEnemy);
  });

  battle_3.addEventListener('click', heal => {
    activePlayer.heal();
  });

  battle_4.addEventListener('click', wait => {
    activePlayer.wait();
  });
  text_4.addEventListener('click', replay => {
    window.location.reload(false);
  });

  //Functions within the mainLoop so they have access to the player classes

  function gameStart() {
    mage.remove();
    knight.remove();
    demon.remove();
    text_1.innerHTML = '';
    text_2.innerHTML = '';
    text_3.innerHTML = '';
    text_4.innerHTML = '';
    text_5.innerHTML = '';
    text_6.innerHTML = '';
    battle_1.innerHTML = '<a href="#">Attack</a>';
    battle_2.innerHTML = '<a href="#">Special Attack</a>';
    battle_3.innerHTML = '<a href="#">Heal</a>';
    battle_4.innerHTML = '<a href="#">Wait</a>';
    updateStats();
  }

  function updateStats() {
    text_1.innerHTML =
      '<p><span class="player-text">Player:</span> Health: ' +
      activePlayer.health +
      ' Mana: ' +
      activePlayer.mana +
      '</p> <br> <p> <span class="enemy-text">Enemy:</span> Health: ' +
      activeEnemy.health +
      ' Mana: ' +
      activeEnemy.mana +
      '</p>';
    console.log('Test update stats');
  }

  let activePlayer = new Player(0);
  let activeEnemy = new Enemy(0);
  gameStart();
  text_2.innerHTML =
    'Your speed is higher. You go first. Select an attack option. ';
}
