import { useState, SyntheticEvent, useEffect } from "react";
import { useRouter } from "next/router";

export const useStep = (lastStep: number, nextRoute: string) => {
  const [step, setStep] = useState<number>(0);
  const router = useRouter();

  const incrementStep = () => {
    setStep(step + 1);
  };

  useEffect(() => {
    // taskリスト読込中はlastStepが0になるのでリダイレクトしない
    if (lastStep === 0) return;
    if (step >= lastStep) {
      router.push(nextRoute);
    }
  }, [step]);

  return {
    step,
    incrementStep,
  };
};
