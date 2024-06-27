import { x, y } from "../../constants";
import { Block } from "../Block";
import { Position } from "../Board";

export class SquareBlock extends Block {
  public getOcuppiedSpaces(position?: Position): Position[] {
    const positionValue = position ?? this.centralPosition;
    return [
      [positionValue[x], positionValue[y] - 1],
      [positionValue[x] + 1, positionValue[y] - 1],
      positionValue,
      [positionValue[x] + 1, positionValue[y]],
    ];
  }
}
