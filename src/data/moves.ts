import gsap from "gsap";
import { Sprite } from "../entities";
import { Move, MoveInput } from "../entities/base/Move";
import { damageTakenAnimation } from "../utils/animations";
import { reduceTargetHealth } from "../utils/attack";
import { audio } from "./audio";

type MovesDataType = {
  tackle: MoveInput;
  ember: MoveInput;
  growl: MoveInput;
};
const movesData: MovesDataType = {
  tackle: {
    accuracy: 100,
    basePower: 40,
    category: "PHYSICAL",
    name: "TACKLE",
    pp: 35,
    boosts: undefined,
    // secondary: undefined,
    target: "ENEMY",
    type: "NORMAL",
    animate(props) {
      const { pokemon, target } = props;
      const tl = gsap.timeline();

      // Verify if player or enemy is attacking
      let pokemonSprite = pokemon.sprites.battle.back;
      if (pokemon.owner === "NONE")
        pokemonSprite = pokemon.sprites.battle.front;

      let targetSprite = target.sprites.battle.front;
      if (target.owner === "PLAYER") targetSprite = target.sprites.battle.back;

      let movementDistance = 20;
      if (target.owner === "PLAYER") movementDistance = -20;

      audio.moves.tackle.play();

      // Reduce target health
      target.health = target.health - this.basePower;

      // Start attack animation
      tl.to(pokemonSprite.position, {
        x: pokemonSprite.position.x - movementDistance,
      })
        .to(pokemonSprite.position, {
          x: pokemonSprite.position.x + movementDistance * 2,
          duration: 0.1,
          onComplete: () => {
            // Calculate damage and reduce target health bar
            reduceTargetHealth(target, this);

            // Start damage recived animation
            damageTakenAnimation(targetSprite);
          },
        })
        .to(pokemonSprite.position, {
          x: pokemonSprite.position.x,
        });
    },
  },
  ember: {
    accuracy: 100,
    basePower: 60,
    category: "SPECIAL",
    name: "EMBER",
    pp: 25,
    boosts: undefined,
    // secondary: {
    //   chance: 10,
    //   status: "brn",
    // },
    target: "ENEMY",
    type: "FIRE",
    animate(props) {
      const { pokemon, target, animatableSprites } = props;

      // Verify if player or enemy is attacking
      let pokemonSprite = pokemon.sprites.battle.back;
      if (pokemon.owner === "NONE")
        pokemonSprite = pokemon.sprites.battle.front;

      let targetSprite = target.sprites.battle.front;
      if (target.owner === "PLAYER") targetSprite = target.sprites.battle.back;

      const fireball = new Sprite({
        src: "/assets/attacks/ember.png",
        position: {
          x: pokemonSprite.position.x,
          y: pokemonSprite.position.y,
        },
        animation: {
          enable: true,
          frames: {
            max: 4,
            frameRate: 10,
          },
        },
      });

      // Reduce target health
      target.health = target.health - this.basePower;

      audio.moves.ember.play();

      fireball.animation.effect.rotation = pokemon.owner === "NONE" ? -2.5 : 1;
      animatableSprites?.splice(1, 0, fireball);
      gsap.to(fireball.position, {
        x: targetSprite.position.x,
        y: targetSprite.position.y,
        onComplete: () => {
          // Calculate damage and reduce target health bar
          reduceTargetHealth(target, this);

          // Start damage recived animation
          damageTakenAnimation(targetSprite);
          animatableSprites?.splice(1, 1);
        },
      });
    },
  },
  growl: {
    accuracy: 100,
    basePower: 0,
    category: "STATUS",
    name: "Growl",
    pp: 40,
    boosts: {
      dmg: -1,
    },
    // secondary: undefined,
    target: "ENEMY",
    type: "NORMAL",
    animate() {
      console.log(this.name);
    },
  },
};

export const moves = {
  tackle: new Move(movesData.tackle),
  ember: new Move(movesData.ember),
  growl: new Move(movesData.growl),
};
// new Move({
//   accuracy: 100,
//   basePower: 40,
//   // boosts: null,
//   category: "SPECIAL",
//   pp: 20,
//   target: "ENEMY",
//   type: "NORMAL",
//   name: "EMBER",
//   animate: () => {
//     console.log("ember");
//   },
// }),
