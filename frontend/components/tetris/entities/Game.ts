import {
  BOARD_X_SIZE,
  BOARD_Y_SIZE,
  MAX_SCORE,
  SCORE_PER_ROW,
  x,
  y,
} from "../constants";
import { Block } from "./Block";
import { Board, Position } from "./Board";
import { createRandomBlock } from "./blocks";

export enum Directions {
  Rotate = "Rotate",
  Bottom = "Bottom",
  Right = "Right",
  Left = "Left",
}

export class Game {
  public board: Board;
  public activeBlock: Block | null = null;
  public lost = false;

  constructor() {
    this.board = new Board();
  }

  addNewBlock() {
    this.activeBlock = createRandomBlock();
    this.lost = this.board.addBlock(this.activeBlock);
  }

  moveActiveBlock(direction: Directions) {
    if (!this.activeBlock) return;
    if (this.board.shouldStick(this.activeBlock)) {
      if (this.board.isOutsideBoard(this.activeBlock)) {
        this.lost = true;
      } else {
        this.activeBlock = null;
        this.board.removeCompletedRows();
      }
      return;
    }
    const prevSpaces = this.activeBlock.getOcuppiedSpaces();
    const nextRotation =
      this.activeBlock.rotation === 3 ? 0 : this.activeBlock.rotation + 1;
    const newSpaces = this.activeBlock.getOcuppiedSpaces(
      this.getNewPosition(this.activeBlock.centralPosition, direction),
      direction === Directions.Rotate ? nextRotation : this.activeBlock.rotation
    );
    if (
      newSpaces.some(
        (pos) =>
          !prevSpaces.some(
            ([prevX, prevY]) => prevX === pos[x] && prevY === pos[y]
          ) && this.isInvalidPosition(pos)
      )
    ) {
      return;
    }
    this.activeBlock.move(direction);
    this.board.updateBlock(prevSpaces, this.activeBlock);
  }

  private getNewPosition(position: Position, direction: Directions): Position {
    switch (direction) {
      case Directions.Bottom:
        return [position[x], position[y] + 1];
      case Directions.Right:
        return [position[x] + 1, position[y]];
      case Directions.Left:
        return [position[x] - 1, position[y]];
      default:
        return position;
    }
  }

  private isInvalidPosition(position: Position) {
    console.log(position);
    return (
      position[x] < 0 ||
      position[x] >= BOARD_X_SIZE ||
      position[y] >= BOARD_Y_SIZE ||
      (position[y] >= 0 && this.board.rows[position[y]][position[x]] !== null)
    );
  }

  public getScore() {
    return Math.min(this.board.completedRows * SCORE_PER_ROW, MAX_SCORE);
  }
}
