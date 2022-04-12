import { Stats, TypeEnum } from "../../types";
import { Sprite } from "./Sprite";
import { Pokemon } from "./Sprite/Pokemon";

type MoveAnimationInput = {
  pokemon: Pokemon;
  target: Pokemon;
  animatableSprites?: Array<Sprite>;
};

export type MoveInput = {
  accuracy: number;
  basePower: number;
  category: "STATUS" | "SPECIAL" | "PHYSICAL";
  name: string;
  pp: number;
  boosts?: Partial<Stats>;
  target: "PLAYER" | "ENEMY";
  type: TypeEnum;
  animate: (props: MoveAnimationInput) => void;
};

export class Move {
  accuracy: MoveInput["accuracy"];
  basePower: MoveInput["basePower"];
  category: MoveInput["category"];
  name: MoveInput["name"];
  pp: MoveInput["pp"];
  boosts?: MoveInput["boosts"];
  // secondary: null
  target: MoveInput["target"];
  type: MoveInput["type"];

  animate: MoveInput["animate"];

  constructor(props: MoveInput) {
    this.accuracy = props.accuracy;
    this.basePower = props.basePower;
    this.category = props.category;
    this.name = props.name;
    this.pp = props.pp;
    this.boosts = props.boosts;
    this.target = props.target;
    this.type = props.type;
    this.animate = props.animate;
  }
}
