import data from "../../public/assets/pellet-town-boundaries.json";
import { Boundary } from "../entities";
import { Position } from "../types";

function getLayerDataByName(name: string) {
  return data.layers.find((layer) => layer.name === name)?.data ?? [];
}

export const collisions = getLayerDataByName("collision");

export const battleZones = getLayerDataByName("battle-zones");

export function generateBoundariesMap(
  boundariesData: number[],
  mapOffset: Position = {
    x: 0,
    y: 0,
  }
) {
  console.log(boundariesData);

  const mapTilesWidth = 70; // 70 tiles

  const boundaries = [];
  for (let i = 0; i < boundariesData.length; i += mapTilesWidth) {
    boundaries.push(boundariesData.slice(i, mapTilesWidth + i));
  }

  const boundariesMap: Boundary[] = [];
  boundaries.forEach((row, i) => {
    row.forEach((symbol, j) => {
      if (symbol !== 0) {
        boundariesMap.push(
          new Boundary({
            position: {
              x: j * Boundary.width + mapOffset.x,
              y: i * Boundary.height + mapOffset.y,
            },
          })
        );
      }
    });
  });

  return boundariesMap;
}
