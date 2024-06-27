import { TitleWithBackButton } from "@/components/common/TitleWithBackButton";
import { FileTreeViewerSolution } from "@/components/fileTreeViewer/FileTreeViewerSolution";

export default function FileTreeViewer() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4rem",
        padding: "2rem",
      }}
    >
      <TitleWithBackButton title="File Tree Viewer" />
      <div>
        Build a file tree viewer.
        <br />
        <img src="https://i.ibb.co/ftvw6d1/Whats-App-Image-2023-10-12-at-18-30-38.jpg" />
        <br />
        <br />
        <ol>
          <li>It should allow arbitrary levels of depth</li>
          <li>You should be able to expand/collapse any part of the tree</li>
          <li>Basic aesthetics with pure CSS</li>
        </ol>
      </div>
      <h2>Solution:</h2>
      <FileTreeViewerSolution />
    </div>
  );
}
