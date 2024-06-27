import { TitleWithBackButton } from "@/components/common/TitleWithBackButton";
import { SudokuSolution } from "@/components/sudoku/SudokuSolution";

export default function Sudoku() {
  return (
    <>
      <TitleWithBackButton title="Sudoku" />
      <ol>
        <li>A sudoku board is a 9x9 grid, with 3x3 subgrids.</li>
        <li>
          Each sub-grid can only have digits from 1-9, and digits cannot be
          repeated
        </li>
        <li>
          Interactions The user should be able to put a number 1-9 as long as it
          does not violate rule #2 The use should be able to clear the board
        </li>
      </ol>
      <div
        style={{
          padding: "10px 40px",
          backgroundColor: "black",
        }}
      >
        <h2 style={{ marginBottom: "1rem" }}>Solution:</h2>
        <SudokuSolution />
      </div>
    </>
  );
}
