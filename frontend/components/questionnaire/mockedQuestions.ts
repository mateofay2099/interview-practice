import { Question } from "./types";

// Mocked questions to display Questionnaire component
// Ideally you wouldn't have the isCorrect property known to the client,
// and the validation would be done on the server side on form submission
export const QUESTIONS: Question[] = [
  {
    id: 1,
    type: "singleChoice",
    text: "Is Javascript single threaded?",
    answers: [
      { id: 1, text: "Yes", isCorrect: true },
      { id: 2, text: "No", isCorrect: false },
    ],
  },
  {
    id: 2,
    type: "singleChoice",
    text: "What is the Javascript built-in function to print a value in the console?",
    answers: [
      { id: 1, text: "fmt.PrintLn()", isCorrect: false },
      { id: 2, text: "console.log()", isCorrect: true },
      { id: 3, text: "print()", isCorrect: false },
      { id: 4, text: "logging.info()", isCorrect: false },
    ],
  },
  {
    id: 3,
    type: "multipleChoice",
    text: "Why is Javascript so awesome?",
    answers: [
      {
        id: 1,
        text: "Because the event loop emulates a multi-threaded behaviour",
        isCorrect: true,
      },
      {
        id: 2,
        text: "Because you can use it in frontend, backend, mobile and IoT",
        isCorrect: true,
      },
      ,
      {
        id: 3,
        text: "Because there is a lot of documentation for it",
        isCorrect: true,
      },
      {
        id: 4,
        text: "It's not that great",
        isCorrect: false,
      },
    ],
  },
  {
    id: 4,
    type: "multipleChoice",
    text: "Which of these expressions would be evaluated as true?",
    answers: [
      {
        id: 1,
        text: "!!true",
        isCorrect: true,
      },
      {
        id: 2,
        text: "Boolean('string')",
        isCorrect: true,
      },
      ,
      {
        id: 3,
        text: "1 === '1'",
        isCorrect: false,
      },
      {
        id: 4,
        text: "1249",
        isCorrect: true,
      },
    ],
  },
];
