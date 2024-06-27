import { TitleWithBackButton } from "@/components/common/TitleWithBackButton";
import { TetrisSolution } from "@/components/tetris/TetrisSolution";

export default function Tetris() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        gap: "4rem",
      }}
    >
      <TitleWithBackButton title="Tetris" />
      <p>Build a Tetris Game (as far as you can take it)</p>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/M8fqHaJU_cc"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
      <h2>Solution:</h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "black",
          padding: "10px 40px",
          minHeight: "40rem",
          flex: 1,
        }}
      >
        <TetrisSolution />
      </div>
    </div>
  );
}
