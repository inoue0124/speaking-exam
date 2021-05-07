import React from "react"
import { useStep } from "../../hooks/useStep"
import { Button, Row, Typography } from 'antd'

export const ReadingContainer: React.FC = () => {
  const { Title, Paragraph, Text } = Typography
  const {step, onClickNextBtn} = useStep(2, "/reading")

  return (
    <div style={{width: 800}}>
      <Title>A. Reading　(音読)</Title>
      {step===0 && (
        <Paragraph>
          There are five texts. Each text will be shown, followed by a beep. When you hear the beep, please read the text only once.
        </Paragraph>
      )}
      <Row justify="center" style={{ marginTop: 50 }}>
        <Button type="primary" onClick={ onClickNextBtn }>Next</Button>
      </Row>
    </div>
  )
}