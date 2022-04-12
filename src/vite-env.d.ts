/// <reference types="vite/client" />

interface Window {
  canvasContext: CanvasRenderingContext2D | null | undefined;
  canvas: HTMLCanvasElement | null;
  UI: NodeListOf<Element>;
  __DEV__: boolean;
  battle: {
    initiated: boolean,
  };
}

declare const canvasContext: CanvasRenderingContext2D | null | undefined;
declare const canvas: HTMLCanvasElement | null;
declare const UI: NodeListOf<Element>;
declare const __DEV__: boolean;
declare const battle: {
  initiated: boolean,
};
