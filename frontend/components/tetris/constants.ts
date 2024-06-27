import { Position } from "./entities/Board";

export const [x, y] = [0, 1];

export const BOARD_X_SIZE = 10;
export const BOARD_Y_SIZE = 20;
export const INITIAL_POSITION: Position = [Math.floor(BOARD_X_SIZE / 2), -1];

export const MAX_SCORE = 1000;
export const SCORE_PER_ROW = 100;
