import React from "react"
import { useRouter } from 'next/router'
import { Steps } from 'antd'

export const ProgressStepper: React.FC = () => {
  const router = useRouter()
  const { Step } = Steps
  const current = (() => {
    switch (router.pathname.split('/').slice(-1)[0]) {
      case 'reading':
        return 0
      case 'shadowing':
        return 1
      case 'roleplaying':
        return 2
      case 'picturedescription':
        return 3
      case 'storyretelling':
        return 4
      case 'opiniontelling':
        return 5
      default:
        break
    }
  })()
  return (
    <Steps current={current} style={{width: "60%", marginBottom: 50}}>
      {console.log(current)}
      <Step title="Reading" />
      <Step title="Shadowing" />
      <Step title="Role Playing" />
      <Step title="Picture Description" />
      <Step title="Story Retelling" />
      <Step title="Opinion Telling" />
    </Steps>
  )
}