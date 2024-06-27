import { TitleWithBackButton } from "@/components/common/TitleWithBackButton";
import { SignUpSolution } from "@/components/signUp/SignUpSolution";

export default function SignupFormChallenge() {
  return (
    <>
      <TitleWithBackButton title="Signup Form" />
      <p>Build a user Signup form in React with the following features.</p>
      <ul>
        <li>An email and a password input</li>
        <li>Email must have an “@” and the domain side must include a “.”</li>
        <li>
          Password must include
          <ul>
            <li>At least one special character</li>
            <li>one number and be at least 8 characters</li>
          </ul>
        </li>
        <li>
          <p>Validation and error handling</p>
          <ul>
            <li>Client-side validations</li>
            <li>Server side errors</li>
          </ul>
        </li>
        <li>Basic aesthetics with pure CSS</li>
      </ul>

      <div
        style={{
          padding: "10px 40px",
        }}
      >
        <h2 style={{ marginBottom: "1rem" }}>Solution:</h2>
        <SignUpSolution />
      </div>
    </>
  );
}
