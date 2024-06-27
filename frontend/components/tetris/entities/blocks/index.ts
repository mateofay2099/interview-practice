import { InvertedLBlock } from "./InvertedLBlock";
import { LBlock } from "./LBlock";
import { LineBlock } from "./LineBlock";
import { SquareBlock } from "./SquareBlock";
import { TBlock } from "./TBlock";

enum BlockType {
  LINE = "LINE",
  SQUARE = "SQUARE",
  L = "L",
  T = "T",
  INVERTED_L = "INVERTED_L",
}

export const createRandomBlock = () => {
  const type = getRandomBlockType();
  switch (type) {
    case BlockType.LINE:
      return new LineBlock();
    case BlockType.SQUARE:
      return new SquareBlock();
    case BlockType.L:
      return new LBlock();
    case BlockType.INVERTED_L:
      return new InvertedLBlock();
    case BlockType.T:
      return new TBlock();
  }
};

function getRandomBlockType() {
  const arr = Object.values(BlockType);
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}
