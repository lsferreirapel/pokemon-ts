import { Position } from "../../../types";

export type SpriteInput = {
  src: string;
  position: Position;
  animation?: {
    enable?: boolean;
    frames?: {
      max?: number;
      frameRate?: number;
    };
    effect?: {
      opacity?: number;
      rotation?: number;
    };
  };
};

export class Sprite {
  position: Position;
  image = new Image();
  c: CanvasRenderingContext2D | null | undefined;
  animation = {
    enable: false,
    frames: {
      max: 1,
      value: 0,
      elapsed: 0,
      frameRate: 10,
    },
    effect: {
      opacity: 1,
      rotation: 0,
    },
  };

  width: number = 0;
  height: number = 0;

  constructor({ src, position, animation }: SpriteInput) {
    this.position = position;
    this.animation = {
      ...this.animation,
      ...animation,
      frames: { ...this.animation.frames, ...animation?.frames },
      effect: { ...this.animation.effect, ...animation?.effect },
    };
    this.image.onload = () => {
      this.width = this.image.width / this.animation.frames.max;
      this.height = this.image.height;
    };
    this.image.src = src;
    this.c = canvasContext;
  }

  draw() {
    this.c?.save();
    this.c!.globalAlpha = this.animation.effect.opacity;
    this.c!.translate(
      this.position.x + this.width / 2,
      this.position.y + this.height / 2
    );
    this.c?.rotate(this.animation.effect.rotation);
    this.c!.translate(
      -this.position.x - this.width / 2,
      -this.position.y - this.height / 2
    );
    this.c?.drawImage(
      this.image,
      this.animation.frames.value * this.width,
      0,
      this.image.width / this.animation.frames.max,
      this.image.height,
      this.position.x,
      this.position.y,
      this.image.width / this.animation.frames.max,
      this.image.height
    );
    this.c?.restore();

    if (!this.animation.enable) return;
    if (this.animation.frames.max > 1) this.animation.frames.elapsed++;

    if (this.animation.frames.elapsed % this.animation.frames.frameRate === 0)
      if (this.animation.frames.value < this.animation.frames.max - 1)
        this.animation.frames.value++;
      else this.animation.frames.value = 0;
  }
}
