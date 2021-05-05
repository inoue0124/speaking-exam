import React, { useCallback, SyntheticEvent } from "react"
import { useRouter } from 'next/router'
import { Button, Row } from 'antd'
import { Instruction } from "../../components/Instruction"

export const TopContainer: React.FC = () => {
  const router = useRouter()
  const onClickNextBtn = useCallback(
    (event: SyntheticEvent) => {
      event.preventDefault()
      router.push("/reading")
    }, [])

  return (
    <div style={{width: 800}}>
      <Instruction />
      <Row justify="center" style={{ marginTop: 50 }}>
        <Button type="primary" onClick={ onClickNextBtn }>Next</Button>
      </Row>
    </div>
  )
}