import { BOARD_X_SIZE, BOARD_Y_SIZE } from "../constants";
import { Block } from "./Block";

export type Position = [number, number];

export class Board {
  private error = false;
  public rows: (string | null)[][];
  public completedRows = 0;

  constructor() {
    this.rows = new Array(BOARD_Y_SIZE);
    for (let i = 0; i < this.rows.length; i++) {
      this.rows[i] = new Array(BOARD_X_SIZE).fill(null);
    }
  }

  addBlock(block: Block) {
    const spaces = block.getOcuppiedSpaces();
    const color = block.color;

    spaces.forEach((position) => {
      if (position[1] < this.rows.length) return;

      if (this.rows[position[1]][position[0]]) {
        this.error = true;
        return;
      }

      this.rows[position[1]][position[0]] = color;
    });

    return this.error;
  }

  updateBlock(prevSpaces: Position[], block: Block) {
    prevSpaces.forEach((position) => {
      if (position[1] < 0) return;
      this.rows[position[1]][position[0]] = null;
    });
    this.paintPositions(block.getOcuppiedSpaces(), block.color);
    return this.error;
  }

  private paintPositions(positions: Position[], color: string) {
    positions.forEach((position) => {
      if (position[1] < 0) return;

      this.rows[position[1]][position[0]] = color;
    });
  }

  isOutsideBoard(block: Block) {
    const positions = block.getOcuppiedSpaces();
    return positions.some((position) => position[1] < 0);
  }

  shouldStick(block: Block) {
    const positions = block.getOcuppiedSpaces();
    return positions.some(
      (position) =>
        position[1] === BOARD_Y_SIZE - 1 ||
        (this.rows[position[1] + 1] &&
          this.rows[position[1] + 1][position[0]] !== null &&
          !positions.some(
            (pos) => pos[0] === position[0] && pos[1] === position[1] + 1
          ))
    );
  }

  removeCompletedRows() {
    const newRows = this.rows.filter((row) =>
      row.some((cell) => cell === null)
    );
    const deletedRows = this.rows.length - newRows.length;
    newRows.unshift(
      ...new Array(deletedRows)
        .fill("")
        .map(() => new Array(BOARD_X_SIZE).fill(null))
    );
    this.completedRows += deletedRows;
    this.rows = newRows;
  }
}
