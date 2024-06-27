import { x, y } from "../../constants";
import { Block } from "../Block";
import { Position } from "../Board";

export class LineBlock extends Block {
  public getOcuppiedSpaces(position?: Position, rotation?: number): Position[] {
    const rotationValue = rotation ?? this.rotation;
    const positionValue = position ?? this.centralPosition;
    switch (rotationValue) {
      case 0:
      case 2:
        return [
          [positionValue[x], positionValue[y] - 2],
          [positionValue[x], positionValue[y] - 1],
          positionValue,
          [positionValue[x], positionValue[y] + 1],
        ];
      case 1:
      case 3:
        return [
          [positionValue[x] - 1, positionValue[y]],
          positionValue,
          [positionValue[x] + 1, positionValue[y]],
          [positionValue[x] + 2, positionValue[y]],
        ];
    }
  }
}
