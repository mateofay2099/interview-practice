export type DirectoryItem = {
  name: string;
  items: TreeItem[];
};

export type FileItem = {
  name: string;
  size?: number;
};

export type TreeItem = FileItem | DirectoryItem;
