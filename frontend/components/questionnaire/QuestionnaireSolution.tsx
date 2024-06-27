import { FormEventHandler, useState } from "react";
import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion";
import { SingleChoiceQuestion } from "./SingleChoiceQuestion";
import { QUESTIONS } from "./mockedQuestions";

const defaultSelectedAnswers = Object.fromEntries(
  QUESTIONS.map((q) => [q.id, { selected: [], isCorrect: false }])
);

export const QuestionnaireSolution = () => {
  const [answers, setAnswers] = useState<{
    [id: number]: { selected: number[]; isCorrect: boolean };
  }>(defaultSelectedAnswers);
  const [submitted, setSubmitted] = useState(false);

  const onSelect = (
    id: number,
    selectedAnswers: number[],
    isCorrect: boolean
  ) => {
    setSubmitted(false);
    setAnswers((prev) => ({
      ...prev,
      [id]: { selected: selectedAnswers, isCorrect },
    }));
  };

  const submitAnswers: FormEventHandler = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const score =
    (Object.values(answers).filter((a) => a.isCorrect).length * 100) /
    QUESTIONS.length;

  return (
    <form onSubmit={submitAnswers}>
      <div
        style={{
          display: "flex",
          gap: "2rem",
          flexWrap: "wrap",
          padding: "1rem 2rem",
        }}
      >
        {QUESTIONS.map((question) =>
          question.type === "singleChoice" ? (
            <SingleChoiceQuestion
              question={question}
              key={`question-${question.id}`}
              selectedAnswers={answers[question.id].selected}
              isCorrect={answers[question.id].isCorrect}
              onSelect={onSelect}
              submitted={submitted}
            />
          ) : (
            <MultipleChoiceQuestion
              question={question}
              key={`question-${question.id}`}
              selectedAnswers={answers[question.id].selected}
              isCorrect={answers[question.id].isCorrect}
              onSelect={onSelect}
              submitted={submitted}
            />
          )
        )}
      </div>
      {submitted && (
        <h3 style={{ margin: "1rem 0", color: "grey" }}>
          Your score: {score}%
        </h3>
      )}
      <button style={{ margin: "3rem 1rem", maxWidth: "10rem" }} type="submit">
        Submit answers
      </button>
    </form>
  );
};
