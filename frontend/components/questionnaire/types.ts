type Answer = {
  id: number;
  text: string;
  isCorrect: boolean;
};

export type Question = {
  id: number;
  type: "singleChoice" | "multipleChoice";
  text: string;
  answers: Answer[];
};
