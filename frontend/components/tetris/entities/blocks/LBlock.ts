import { INITIAL_POSITION, x, y } from "../../constants";
import { Block } from "../Block";
import { Position } from "../Board";

export class LBlock extends Block {
  constructor() {
    super([INITIAL_POSITION[x], INITIAL_POSITION[y] - 2]);
  }

  public getOcuppiedSpaces(position?: Position, rotation?: number): Position[] {
    const rotationValue = rotation ?? this.rotation;
    const positionValue = position ?? this.centralPosition;
    switch (rotationValue) {
      case 0:
        return [
          positionValue,
          [positionValue[x] + 1, positionValue[y] - 1],
          [positionValue[x], positionValue[y] + 1],
          [positionValue[x], positionValue[y] - 1],
        ];
      case 1:
        return [
          positionValue,
          [positionValue[x] + 1, positionValue[y]],
          [positionValue[x] - 1, positionValue[y]],
          [positionValue[x] - 1, positionValue[y] - 1],
        ];
      case 2:
        return [
          [positionValue[x], positionValue[y] + 1],
          [positionValue[x], positionValue[y] - 1],
          positionValue,
          [positionValue[x] - 1, positionValue[y] + 1],
        ];
      case 3:
        return [
          [positionValue[x] + 1, positionValue[y]],
          [positionValue[x] - 1, positionValue[y]],
          positionValue,
          [positionValue[x] + 1, positionValue[y] + 1],
        ];
    }
  }
}
