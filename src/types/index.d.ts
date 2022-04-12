export type PositiveInteger<T extends number> = number extends T
  ? never
  : `${T}` extends `-${string}` | `${string}.${string}`
  ? never
  : T;

export type Stats = {
  hp: number;
  dmg: number;
  speed: number;
};

export type Position = {
  x: number;
  y: number;
};

export type Frames = {
  max: number;
  value: number;
  elapsed: number;
  frameRate: number;
};

export type Rectangle = {
  position: Position;
  width: number;
  height: number;
};

export type Attack = {
  name: string;
  type: Type | string;
  damage: number;
};

export type TypeEnum =
  | "NORMAL"
  | "FIRE"
  | "WATER"
  | "GRASS"
  | "ELETRIC"
  | "ICE"
  | "FIGHTING"
  | "POISON"
  | "GROUND"
  | "FLYING"
  | "PSYCHIC"
  | "BUG"
  | "ROCK"
  | "GHOST"
  | "DARK"
  | "DRAGON"
  | "STEEL";
