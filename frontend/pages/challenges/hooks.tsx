import { useState } from "react";
import { DebounceImpl } from "../../components/hooks/Debounce";
import { IntervalImpl } from "../../components/hooks/Interval";
import { TitleWithBackButton } from "@/components/common/TitleWithBackButton";

enum Hooks {
  Interval = "Interval",
  Debounce = "Debounce",
}

export default function HooksPage() {
  const [hook, setHook] = useState<Hooks>(Hooks.Interval);
  const toggleImpl = () =>
    setHook((val) =>
      val === Hooks.Interval ? Hooks.Debounce : Hooks.Interval
    );

  return (
    <>
      <TitleWithBackButton title="Hooks" />
      <h3>Current Hook: {hook}</h3>
      <button onClick={toggleImpl} style={{ width: "max-content" }}>
        Toggle Hook
      </button>
      {hook === Hooks.Interval ? <IntervalImpl /> : <DebounceImpl />}
    </>
  );
}
