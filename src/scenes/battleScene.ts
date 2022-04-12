import { audio } from "../data/audio";
import { moves } from "../data/moves";
import { Sprite } from "../entities";
import { Pokemon } from "../entities/base/Sprite/Pokemon";
import { fadeBackToBlackAnimation } from "../utils/animations";
import { animate } from "./townScenes";

const battleBackground = new Sprite({
  src: "/assets/battle-background.jpeg",
  position: {
    x: 0,
    y: 0,
  },
});
let charmander: Pokemon;
let charmanderEnemy: Pokemon;
let queue: Array<() => void> = [];

function renderAttackBarList(pokemon?: Pokemon) {
  const attackBarList = document.querySelector("#attack-bar-list");

  pokemon?.moves?.forEach((move) => {
    const button = document.createElement("button");
    button.innerHTML = move.name;
    attackBarList?.append(button);
  });

  return attackBarList;
}

let animatableSprites: Sprite[] = [];

function buildBattle() {
  document
    .querySelector("#enemy-health-bar")
    ?.setAttribute("style", "width:100%");
  document
    .querySelector("#player-health-bar")
    ?.setAttribute("style", "width:100%");
  document.querySelector("#attack-bar-list")?.replaceChildren();

  charmander = new Pokemon({
    name: "CHARMANDER",
    moves: [moves.tackle, moves.ember],
    stats: {
      dmg: 20,
      hp: 35,
      speed: 50,
    },
    owner: "PLAYER",
    type: "FIRE",
    sprites: {
      battle: {
        back: new Sprite({
          src: "/assets/pokemons/charmander-back.png",
          position: {
            x: 275,
            y: 325,
          },
          animation: {
            enable: true,
            frames: {
              max: 55,
              frameRate: 8,
            },
          },
        }),
        front: new Sprite({
          src: "/assets/pokemons/charmander-front.png",
          position: {
            x: 650,
            y: 200,
          },
          animation: {
            enable: true,
            frames: {
              max: 55,
              frameRate: 8,
            },
          },
        }),
      },
    },
  });

  charmanderEnemy = new Pokemon({
    name: "CHARMANDER",
    moves: [moves.tackle, moves.ember],
    stats: {
      dmg: 20,
      hp: 35,
      speed: 50,
    },
    owner: "NONE",
    type: "FIRE",
    sprites: {
      battle: {
        back: new Sprite({
          src: "/assets/pokemons/charmander-back.png",
          position: {
            x: 275,
            y: 325,
          },
          animation: {
            enable: true,
            frames: {
              max: 55,
              frameRate: 8,
            },
          },
        }),
        front: new Sprite({
          src: "/assets/pokemons/charmander-front.png",
          position: {
            x: 650,
            y: 200,
          },
          animation: {
            enable: true,
            frames: {
              max: 55,
              frameRate: 8,
            },
          },
        }),
      },
    },
  });

  animatableSprites = [
    charmander.sprites.battle.back,
    charmanderEnemy.sprites.battle.front,
  ];

  renderAttackBarList(charmander);

  queue = [];
  // our event listeners for our buttons (attack)
  document.querySelectorAll("button").forEach((button) => {
    const move = (moves as any)?.[button.innerHTML.toLowerCase()];
    const playerMove = charmander.moves.find(
      (move) => move.name === button.innerHTML
    );
    button.addEventListener("click", () => {
      console.log("clickei");

      // Player attack moves
      charmander.attack({
        move: move,
        target: charmanderEnemy,
        animatableSprites,
      });

      // Verify if enemy pokemon is alive
      if (charmanderEnemy.health <= 0) {
        queue.push(() => {
          charmanderEnemy.faint();
        });
        queue.push(() => {
          fadeBackToBlackAnimation(() => {
            audio.Battle.stop();
            audio.Map.play();
            cancelAnimationFrame(battleAnimationId);
            animate();
            battle.initiated = false;
          });
        });

        return;
      }

      // Select enemy attack and add attack to queue
      const enemySelectedMove =
        charmanderEnemy.moves[
          Math.floor(Math.random() * charmanderEnemy.moves.length)
        ];
      queue.push(() => {
        charmanderEnemy.attack({
          move: enemySelectedMove,
          target: charmander,
          animatableSprites,
        });

        if (charmander.health <= 0) {
          queue.push(() => {
            charmander.faint();
          });
          queue.push(() => {
            fadeBackToBlackAnimation(() => {
              audio.Battle.stop();
              audio.Map.play();
              cancelAnimationFrame(battleAnimationId);
              animate();
              battle.initiated = false;
            });
          });

          return;
        }
      });
    });

    button.addEventListener("mouseenter", () => {
      console.log(move);
      const moveTypeEl = document.getElementById("move-type");
      const movePpEl = document.getElementById("move-pp");

      moveTypeEl!.innerHTML = move.type;
      movePpEl!.innerHTML = (playerMove?.pp ?? 0) + "/" + move.pp;
    });
  });
}

let battleAnimationId: number;
function animateBattle() {
  battleAnimationId = window.requestAnimationFrame(animateBattle);
  battleBackground.draw();
  animatableSprites?.map((sprite) => {
    sprite.draw();
  });
}

export function startBattle() {
  buildBattle();
  animateBattle();
}

const battleDialog = document!.querySelector("#battle-dialog-box");
battleDialog?.addEventListener("click", () => {
  if (queue.length > 0) {
    queue[0]();
    queue.shift();
  } else {
    battleDialog?.setAttribute("style", "display:none");
  }
});
