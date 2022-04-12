import { Position } from "../../../types";
import { Sprite } from "../Sprite";

type SceneInput = {
  backgroundSrc: string;
  foregroundSrc: string;
  initialPosition?: Position;
};

export class Scene {
  background: Sprite;
  foreground?: Sprite;
  initialPosition?: Position;
  drawableEntities: Array<Sprite> = [];

  constructor({ backgroundSrc, foregroundSrc, initialPosition }: SceneInput) {
    this.initialPosition = initialPosition ?? { x: 0, y: 0 };
    this.background = new Sprite({
      position: this.initialPosition,
      src: backgroundSrc,
    });
    this.foreground = new Sprite({
      position: this.initialPosition,
      src: foregroundSrc,
    });
  }

  render() {}
}
