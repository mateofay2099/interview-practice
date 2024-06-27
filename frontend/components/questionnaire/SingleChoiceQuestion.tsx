import { Question } from "./types";

type SingleChoiceQuestionProps = {
  question: Question;
  selectedAnswers: number[];
  onSelect: (
    questionId: number,
    selectedAnswers: number[],
    isCorrect: boolean
  ) => void;
  submitted: boolean;
  isCorrect: boolean;
};

export const SingleChoiceQuestion = ({
  question,
  selectedAnswers,
  onSelect,
  submitted,
  isCorrect,
}: SingleChoiceQuestionProps) => {
  const updateSelection = (answerId: number) => {
    return onSelect(
      question.id,
      selectedAnswers.includes(answerId) ? [] : [answerId],
      question.answers.find((a) => a.id === answerId).isCorrect
    );
  };

  return (
    <div
      style={{
        width: "45%",
        minWidth: "26rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <h3>{question.text}</h3>
        {submitted && (
          <>
            {isCorrect ? (
              <p style={{ color: "green" }}>Correct</p>
            ) : (
              <p style={{ color: "red" }}>Incorrect</p>
            )}
          </>
        )}
      </div>
      {question.answers.map((answer) => (
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
          }}
          key={`${question.id}-option-${answer.id}`}
        >
          <input
            id={`${question.id}-option-${answer.id}`}
            type="radio"
            checked={selectedAnswers.some((val) => val === answer.id)}
            onChange={() => updateSelection(answer.id)}
          />
          <label htmlFor={`${question.id}-option-${answer.id}`}>
            {answer.text}
          </label>
        </div>
      ))}
    </div>
  );
};
