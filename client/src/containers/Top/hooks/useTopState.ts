import { useState, useCallback, SyntheticEvent } from "react"
import { useRouter } from 'next/router'

export const useTopState = () => {
  const [step, setStep] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  
  const onClickNextBtn = useCallback(
    (event: SyntheticEvent) => {
      setIsLoading(true)
      event.preventDefault()
      setStep(step + 1)
      if (step === 1) {
        router.push("/reading")
      }
      setIsLoading(false)
    }, [step])

  return {
    step,
    isLoading,
    onClickNextBtn
  }
}