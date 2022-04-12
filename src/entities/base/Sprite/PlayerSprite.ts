import { SpriteInput, Sprite } from ".";

type PlayerSpriteInput = {
  sprites: {
    up: HTMLImageElement;
    down: HTMLImageElement;
    left: HTMLImageElement;
    right: HTMLImageElement;
  };
} & SpriteInput;

export class PlayerSprite extends Sprite {
  sprites: PlayerSpriteInput["sprites"];

  constructor({ sprites, ...props }: PlayerSpriteInput) {
    super(props);
    this.sprites = sprites;
  }
}
