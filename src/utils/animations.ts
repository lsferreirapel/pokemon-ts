import gsap from "gsap";
import { Sprite } from "../entities";

export function damageTakenAnimation(sprite: Sprite) {
  gsap.to(sprite.position, {
    x: sprite.position.x + 10,
    yoyo: true,
    repeat: 5,
    duration: 0.08,
    opacity: 0,
  });
  gsap.to(sprite.animation.effect, {
    opacity: 0,
    yoyo: true,
    repeat: 5,
    duration: 0.08,
  });
}

export function faintAnimation(sprite: Sprite) {
  gsap.to(sprite.position, {
    y: sprite.position.y + 20,
  });
  gsap.to(sprite.animation.effect, {
    opacity: 0,
  });
}

export function fadeBackToBlackAnimation(onComplete: () => void) {
  gsap.to("#overlapping", {
    opacity: 1,
    onComplete: () => {
      UI.forEach((item) => {
        item.setAttribute("style", "opacity:0");
      });
      onComplete();
      gsap.to("#overlapping", {
        opacity: 0,
      });
    },
  });
}
