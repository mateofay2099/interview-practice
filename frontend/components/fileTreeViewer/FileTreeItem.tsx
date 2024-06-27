import { useState } from "react";
import { DirectoryItem, FileItem, TreeItem } from "./types";
import {
  getHumanReadableSize,
  getItemsWithDirectoriesFirst,
  isDirectory,
} from "./utils";

type FileTreeItemProps<T> = {
  item: T;
  level: number;
};

const ICON_SIZE = 20;

const DirectoryItemComponent = ({
  item,
  level,
}: FileTreeItemProps<DirectoryItem>) => {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = item.items.length > 0;
  const parsedChildren = getItemsWithDirectoriesFirst(item.items);
  return (
    <>
      <div
        onClick={() => setExpanded((val) => !val)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: 0,
          cursor: "pointer",
        }}
      >
        <button
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
            border: 0,
            width: ICON_SIZE,
            height: ICON_SIZE,
            ...(expanded
              ? {
                  transform: "rotate(90deg)",
                }
              : {}),
          }}
        >
          &gt;
        </button>
        <h3>{item.name}</h3>
      </div>
      {hasChildren && (
        <ul
          style={{
            listStyle: "none",
            textAlign: "start",
            ...(expanded ? {} : { display: "none" }),
          }}
        >
          {parsedChildren.map((elem, i) => (
            <FileTreeItem
              item={elem}
              level={level + 1}
              key={`item-${elem.name}-${i}`}
            />
          ))}
        </ul>
      )}
    </>
  );
};

const FileItemComponent = ({ item }: FileTreeItemProps<FileItem>) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: 0,
      }}
    >
      <p style={{ color: "rgb(25, 96, 196)" }}>{item.name}</p>
      <p style={{ color: "grey" }}>({getHumanReadableSize(item.size)})</p>
    </div>
  );
};

export const FileTreeItem = ({ item, level }: FileTreeItemProps<TreeItem>) => {
  return (
    <li style={{ marginLeft: ICON_SIZE + 20 * level, padding: "5px 0" }}>
      {isDirectory(item) ? (
        <DirectoryItemComponent item={item} level={level} />
      ) : (
        <FileItemComponent item={item} level={level} />
      )}
    </li>
  );
};
