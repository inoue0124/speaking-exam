import { useState, SyntheticEvent, useEffect } from "react"
import { useRouter } from 'next/router'

export const useStep = (lastStep: number, nextRoute: string) => {
  const [step, setStep] = useState<number>(0)
  const router = useRouter()
  
  const onClickNextBtn = ((event: SyntheticEvent) => {
    event.preventDefault()
    setStep(step + 1)
  })

  useEffect(()=>{
    if (step >= lastStep) {
      router.push(nextRoute)
    }
  },[step])

  return {
    step,
    onClickNextBtn
  }
}