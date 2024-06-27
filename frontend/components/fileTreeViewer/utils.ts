import { DirectoryItem, TreeItem } from "./types";

export const isDirectory = (item: TreeItem): item is DirectoryItem =>
  "items" in item && Array.isArray(item.items);

export const getItemsWithDirectoriesFirst = (items: TreeItem[]) => {
  const directories = items.filter(isDirectory);
  const files = items.filter((i) => !isDirectory(i));
  return [...directories, ...files];
};

export const getHumanReadableSize = (byteSize: number) => {
  if (byteSize <= 0) return "0 B";
  const i = Math.floor(Math.log(byteSize) / Math.log(1024));
  const size = Number((byteSize / Math.pow(1024, i)).toFixed(2));
  const unit = ["B", "KB", "MB", "GB", "TB"][i];
  return `${size} ${unit}`;
};
