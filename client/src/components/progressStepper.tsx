import React from "react";
import { useRouter } from "next/router";
import { Steps } from "antd";

export const ProgressStepper: React.FC = () => {
  const router = useRouter();
  const { Step } = Steps;
  const current = (() => {
    switch (router.pathname.split("/").slice(-1)[0]) {
      case "reading":
        return 0;
      case "shadowing":
        return 1;
      case "roleplaying":
        return 4;
      case "picturedescription":
        return 2;
      case "storyretelling":
        return 3;
      case "opiniontelling":
        return 5;
      default:
        break;
    }
  })();
  return (
    <Steps current={current} style={{ width: "60%", marginBottom: 50 }}>
      <Step title="Reading" />
      <Step title="Shadowing" />
      <Step title="Picture Description" />
      <Step title="Story Retelling" />
      <Step title="Role Playing" />
      <Step title="Opinion Telling" />
    </Steps>
  );
};
