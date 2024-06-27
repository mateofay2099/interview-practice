import Link from "next/link";

export const TitleWithBackButton = ({ title }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4rem" }}>
      <h1>{title}</h1>
      <Link
        href={"/"}
        style={{ cursor: "pointer", fontSize: 18, color: "blue" }}
      >
        Go back
      </Link>
    </div>
  );
};
