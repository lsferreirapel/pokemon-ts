import { Attack, Rectangle } from "../types";
import attacksData from "../data/attacks.json";

export function createImage(url: string): HTMLImageElement {
  const image = new Image();
  image.src = url;
  return image;
}

export function getAttackByName(name: string): Attack | undefined {
  return attacksData.attacks.find((attack) => attack.name === name);
}

export function rectangularCollision(
  rectangle1: Rectangle,
  rectangle2: Rectangle
) {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  );
}
