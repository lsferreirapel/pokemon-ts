import { Position } from "../../types";

type BoundaryInput = {
  position: Position;
};

export class Boundary {
  position: Position;
  static width = 16 * 3.5;
  static height = 16 * 3.5;
  public c: CanvasRenderingContext2D | null | undefined;

  constructor(props: BoundaryInput) {
    this.position = props.position;
    this.c = canvasContext;
  }

  draw() {
    __DEV__
      ? (this.c!.fillStyle = "rgba(255,0,0,0.3)")
      : (this.c!.fillStyle = "rgba(255,0,0,0)");
    this.c!.fillRect(
      this.position.x,
      this.position.y,
      Boundary.width,
      Boundary.height
    );
  }
}
