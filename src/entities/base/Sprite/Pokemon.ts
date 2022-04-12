import { Sprite } from ".";
import { Stats, TypeEnum } from "../../../types";
import { faintAnimation } from "../../../utils/animations";
import { Move } from "../Move";

type PokemonInput = {
  name: string;
  type: TypeEnum;
  stats: Stats;
  owner: "PLAYER" | "NONE";
  sprites: {
    battle: {
      front: Sprite;
      back: Sprite;
    };
  };
  moves: Array<Move>;
};

type AttackInput = {
  target: Pokemon;
  move: Move;
  animatableSprites?: Array<Sprite>;
};

export class Pokemon {
  name: string;
  type: TypeEnum;
  level = 0;
  stats: {
    hp: number;
    dmg: number;
    speed: number;
  };
  health: number;
  owner: PokemonInput["owner"];
  sprites: PokemonInput["sprites"];
  moves: PokemonInput["moves"];

  constructor({ name, type, stats, owner, sprites, moves }: PokemonInput) {
    this.name = name;
    this.type = type;
    this.stats = stats;
    this.owner = owner;
    this.sprites = sprites;
    this.moves = moves;
    this.health = this.stats.hp * 10;
  }

  faint() {
    // Set battle dialog text
    const dialog = document!.querySelector("#battle-dialog-box");
    dialog?.setAttribute("style", "display:flex");
    document!.querySelector(
      "#battle-dialog-text"
    )!.innerHTML = `${this.name} fainted`;
    console.log("morri");

    // Start faint animation
    faintAnimation(
      this.owner === "PLAYER"
        ? this.sprites.battle.back
        : this.sprites.battle.front
    );
  }

  attack({ move, target, animatableSprites }: AttackInput) {
    // if (!props.move) return;

    // Set battle dialog text
    const dialog = document!.querySelector("#battle-dialog-box");
    dialog?.setAttribute("style", "display:flex");
    document!.querySelector(
      "#battle-dialog-text"
    )!.innerHTML = `${this.name} used <br> ${move?.name}`;

    // verify if move is in pokemon moves array and trigger animate function
    if (this.moves.includes(move)) {
      move.animate({
        target,
        pokemon: this,
        animatableSprites,
      });
    }

    // switch (attack?.name) {
    //   case "tackle":
    //     const tl = gsap.timeline();

    //     let movementDistance = 20;
    //     if (this.isEnemy) movementDistance = -20;

    //     tl.to(this.position, {
    //       x: this.position.x - movementDistance,
    //     })
    //       .to(this.position, {
    //         x: this.position.x + movementDistance * 2,
    //         duration: 0.1,
    //         onComplete: () => {
    //           gsap.to(healthBar, {
    //             width: this.health - attack!.damage + "%",
    //           });

    //           gsap.to(target.position, {
    //             x: target.position.x + 10,
    //             yoyo: true,
    //             repeat: 5,
    //             duration: 0.08,
    //             opacity: 0,
    //           });
    //           gsap.to(target, {
    //             opacity: 0,
    //             yoyo: true,
    //             repeat: 5,
    //             duration: 0.08,
    //           });
    //         },
    //       })
    //       .to(this.position, {
    //         x: this.position.x,
    //       });
    //     break;
    //   case "ember":
    //     const fireball = new Sprite(
    //       "/assets/attacks/ember.png",
    //       {
    //         x: this.position.x,
    //         y: this.position.y,
    //       },
    //       {
    //         max: 4,
    //         frameRate: 10,
    //       },
    //       true
    //     );
    //     fireball.rotation = this.isEnemy ? -2.5 : 1;
    //     animatableSprites?.splice(1, 0, fireball);
    //     gsap.to(fireball.position, {
    //       x: target.position.x,
    //       y: target.position.y,
    //       onComplete: () => {
    //         gsap.to(healthBar, {
    //           width: this.health - attack!.damage + "%",
    //         });
    //         gsap.to(target.position, {
    //           x: target.position.x + 10,
    //           yoyo: true,
    //           repeat: 5,
    //           duration: 0.08,
    //           opacity: 0,
    //         });
    //         gsap.to(target, {
    //           opacity: 0,
    //           yoyo: true,
    //           repeat: 5,
    //           duration: 0.08,
    //         });
    //         animatableSprites?.splice(1, 1);
    //       },
    //     });

    //     break;
    // }
  }
}
