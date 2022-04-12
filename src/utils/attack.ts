import { Move } from "./../entities/base/Move";
import { Pokemon } from "../entities/base/Sprite/Pokemon";
import gsap from "gsap";

function calculateHealthPercentage(target: Pokemon, damage: number): string {
  console.log({ health: target.health });
  console.log({ damage });

  const maxHealth = target.stats.hp * 10;

  console.log({ maxHealth });

  const result = (target.health * 100) / maxHealth;
  // const result = 100 - damagePercentage;

  // console.log(`damage ${damagePercentage}%`);
  console.log(`result ${result}%`);

  return `${result}%`;
}

export function reduceTargetHealth(target: Pokemon, move: Move) {
  // reduce enemy health bar
  let healthBar = "#enemy-health-bar";
  if (target.owner === "PLAYER") healthBar = "#player-health-bar";

  // Reduce target UI health bar
  gsap.to(healthBar, {
    width: calculateHealthPercentage(target, move.basePower),
  });
}
