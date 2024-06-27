import { TitleWithBackButton } from "@/components/common/TitleWithBackButton";
import { QuestionnaireSolution } from "@/components/questionnaire/QuestionnaireSolution";

export default function Questionnaire() {
  return (
    <>
      <TitleWithBackButton title="Questionnaire" />
      <p>
        We want to build a Multiple choice Questionnaire. After submission, we
        calculate a score based on the answers.
      </p>
      Create a questionnaire that takes two types of questions
      <ol>
        <li>Questions with a single answer (radio)</li>
        <li>Questions with multiple answers (checkboxes)</li>
      </ol>
      <p>
        After submitting the questionnaire, each of the users answers must be
        compared with the actual answer for grading.
      </p>
      <p>
        A multiple answer question is correct if{" "}
        <strong>all of the selected answers</strong> are correct
      </p>
      <div
        style={{
          padding: "10px 40px",
        }}
      >
        <h2 style={{ marginBottom: "1rem" }}>Solution:</h2>
        <QuestionnaireSolution />
      </div>
    </>
  );
}
