import gsap from "gsap";
import { audio } from "../data/audio";
import { Boundary, PlayerSprite, Sprite } from "../entities";
import { Position } from "../types";
import {
  battleZones,
  collisions,
  generateBoundariesMap,
} from "../utils/boundaries";
import { createImage, rectangularCollision } from "../utils/utils";
import { startBattle } from "./battleScene";

const offset: Position = {
  x: -685,
  y: -420,
};

const foreground = new Sprite({
  src: "/assets/foreground.png",
  position: offset,
});
const background = new Sprite({
  src: "/assets/pellet-town.png",
  position: offset,
});

const player = new PlayerSprite({
  src: "/assets/player/player-down.png",
  position: {
    x: canvas!.width / 2 - 192 / 4 / 2,
    y: canvas!.height / 2 - 68 / 2,
  },
  animation: {
    frames: {
      max: 4,
    },
  },
  sprites: {
    up: createImage("/assets/player/player-up.png"),
    down: createImage("/assets/player/player-down.png"),
    left: createImage("/assets/player/player-left.png"),
    right: createImage("/assets/player/player-right.png"),
  },
});

const boundaries = generateBoundariesMap(collisions, offset);
const battleZonesBoundaries = generateBoundariesMap(battleZones, offset);

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  lastKeyPressed: "",
};

const movables = [background, ...boundaries, ...battleZonesBoundaries];

export function animate() {
  const animationId = window.requestAnimationFrame(animate);
  background.draw();
  boundaries.forEach((boundary) => {
    boundary.draw();
  });
  battleZonesBoundaries.forEach((boundary) => {
    boundary.draw();
  });
  player.draw();
  foreground.draw();

  let moving = true;
  player.animation.enable = false;
  if (battle.initiated) return;

  // console.log(animationId);

  // Active a battle
  if (keys.w.pressed || keys.d.pressed || keys.s.pressed || keys.a.pressed) {
    for (let i = 0; i < battleZonesBoundaries.length; i++) {
      const battleZone = battleZonesBoundaries[i];
      const overlappingArea =
        (Math.min(
          player.position.x + player.width,
          battleZone.position.x + Boundary.width
        ) -
          Math.max(player.position.x, battleZone.position.x)) *
        (Math.min(
          player.position.y + player.height,
          battleZone.position.y + Boundary.height
        ) -
          Math.max(player.position.y, battleZone.position.y));

      if (
        rectangularCollision(player, {
          position: {
            x: battleZone.position.x,
            y: battleZone.position.y + 3,
          },
          width: Boundary.width,
          height: Boundary.height,
        }) &&
        overlappingArea > (player.width * player.height) / 2 &&
        Math.random() < 0.01
      ) {
        console.log("Activate Battle");
        audio.Map.stop();
        audio.Battle.play();
        battle.initiated = true;
        window.cancelAnimationFrame(animationId);
        gsap.to("#overlapping", {
          opacity: 1,
          repeat: 3,
          yoyo: true,
          duration: 0.4,
          onComplete() {
            gsap.to("#overlapping", {
              opacity: 1,
              duration: 0.4,
              onComplete() {
                gsap.to("#overlapping", {
                  opacity: 0,
                  duration: 0.4,
                });
                startBattle();

                UI.forEach((item) => {
                  item.setAttribute("style", "opacity:1");
                });
              },
            });
          },
        });
        break;
      }
    }
  }

  if (keys.w.pressed && keys.lastKeyPressed === "w") {
    player.animation.enable = true;
    player.image = player.sprites.up;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision(player, {
          position: {
            x: boundary.position.x,
            y: boundary.position.y + 3,
          },
          width: Boundary.width,
          height: Boundary.height,
        })
      ) {
        moving = false;
        break;
      }
    }

    if (moving) movables.forEach((item) => (item.position.y += 3));
  } else if (keys.s.pressed && keys.lastKeyPressed === "s") {
    player.animation.enable = true;
    player.image = player.sprites.down;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision(player, {
          position: {
            x: boundary.position.x,
            y: boundary.position.y - 3,
          },
          width: Boundary.width,
          height: Boundary.height,
        })
      ) {
        moving = false;
        break;
      }
    }
    if (moving) movables.forEach((item) => (item.position.y -= 3));
  } else if (keys.d.pressed && keys.lastKeyPressed === "d") {
    for (let i = 0; i < boundaries.length; i++) {
      player.animation.enable = true;
      player.image = player.sprites.right;
      const boundary = boundaries[i];
      if (
        rectangularCollision(player, {
          position: {
            x: boundary.position.x - 3,
            y: boundary.position.y,
          },
          width: Boundary.width,
          height: Boundary.height,
        })
      ) {
        moving = false;
        break;
      }
    }
    if (moving) movables.forEach((item) => (item.position.x -= 3));
  } else if (keys.a.pressed && keys.lastKeyPressed === "a") {
    player.animation.enable = true;
    player.image = player.sprites.left;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision(player, {
          position: {
            x: boundary.position.x + 3,
            y: boundary.position.y,
          },
          width: Boundary.width,
          height: Boundary.height,
        })
      ) {
        moving = false;
        break;
      }
    }
    if (moving) movables.forEach((item) => (item.position.x += 3));
  }
}

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "w":
      keys.w.pressed = true;
      keys.lastKeyPressed = "w";
      break;
    case "a":
      keys.a.pressed = true;
      keys.lastKeyPressed = "a";
      break;
    case "s":
      keys.s.pressed = true;
      keys.lastKeyPressed = "s";
      break;
    case "d":
      keys.d.pressed = true;
      keys.lastKeyPressed = "d";
      break;
  }
});
window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "w":
      keys.w.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "s":
      keys.s.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
  }
});

window.onload = () => {
  audio.Map.play();
};
