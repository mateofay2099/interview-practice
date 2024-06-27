import { FileTreeItem } from "./FileTreeItem";
import { TreeItem } from "./types";
import { getItemsWithDirectoriesFirst } from "./utils";

// Mocked data for the file tree
const DIR_DATA: TreeItem[] = [
  {
    name: "codebooks",
    items: [
      { name: "codebook.pdf", size: 51712 },
      { name: "format.txt", size: 1945.6 },
    ],
  },
  {
    name: "data",
    items: [
      {
        name: "aggregate",
        items: [{ name: "aggregates.tab", size: 40 }],
      },
      {
        name: "raw",
        items: [
          { name: "output_data.tab", size: 129740.8 },
          { name: "quality_data.tab", size: 124620.8 },
        ],
      },
      { name: "README.txt", size: 109 },
    ],
  },
];

const orderedData = getItemsWithDirectoriesFirst(DIR_DATA);

export const FileTreeViewerSolution = () => {
  return (
    <div className="App">
      <h2>Text editor</h2>
      <section
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          padding: 24,
          minHeight: "23rem",
        }}
      >
        <ul
          style={{
            listStyle: "none",
            textAlign: "start",
          }}
        >
          {orderedData.map((item, i) => (
            <FileTreeItem
              item={item}
              level={0}
              key={`rootItems-${item.name}-${i}`}
            />
          ))}
        </ul>
      </section>
    </div>
  );
};
