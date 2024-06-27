import { INITIAL_POSITION, x, y } from "../constants";
import { Position } from "./Board";
import { Directions } from "./Game";

export abstract class Block {
  public color: string;
  public centralPosition: Position;
  public rotation: 0 | 1 | 2 | 3 = 0;

  constructor(initialPosition = INITIAL_POSITION) {
    this.centralPosition = initialPosition;
    this.color = this.getRandomColor();
  }

  private getRandomColor() {
    const colors = ["red", "yellow", "green", "blue", "violet"];
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
  }

  rotate() {
    if (this.rotation === 3) {
      this.rotation = 0;
    } else {
      this.rotation++;
    }
  }

  move(direction: Directions) {
    switch (direction) {
      case Directions.Rotate:
        this.rotate();
        break;
      case Directions.Bottom:
        this.centralPosition = [
          this.centralPosition[x],
          this.centralPosition[y] + 1,
        ];
        break;
      case Directions.Right:
        this.centralPosition = [
          this.centralPosition[x] + 1,
          this.centralPosition[y],
        ];
        break;
      case Directions.Left:
        this.centralPosition = [
          this.centralPosition[x] - 1,
          this.centralPosition[y],
        ];
        break;
    }
  }

  public abstract getOcuppiedSpaces(
    position?: Position,
    rotation?: number
  ): Position[];
}
