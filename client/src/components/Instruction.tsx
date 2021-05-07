import React from "react"
import { Typography } from 'antd'

export const Instruction: React.FC = () => {
  const { Title, Paragraph, Text } = Typography
  
  return (
    <>
      <Title>SPEAKING TEST</Title>
      <Paragraph>
        This test will assess your speaking proficiency.<br/>
        It is expected to take approximately thirty minutes. You may not take a break once you start the test.<br/>
        <Text type="danger">Please use earphones when you take the test.</Text>
      </Paragraph>
      <Paragraph>
        There are six sections. Please read the instructions of each section before taking the test.
      </Paragraph>
      <Paragraph>
        <Title level={2}>A.  Reading　(音読)</Title>
        There are five texts. Each text will be shown, followed by a beep. When you hear the beep, please read the text only once.
      </Paragraph>
      <Paragraph>
        <Title level={2}>B.  Shadowing　（シャドーイング）</Title>
        There are five texts. When you listen to the text, please speak it aloud at the same time as the speaker.
        <Text type="danger">Please use earphones when you take the test.</Text>
      </Paragraph>
      <Paragraph>
        <Title level={2}>C.  Role Playing　（状況対応）</Title>
        There are two situations. You have one minute to read the situation. While reading, you may not take any memos.
        You will then hear a line from your conversational partner, followed by a beep. When you hear the beep,
        you will have forty seconds to reply to the line based on the situation.
      </Paragraph>
      <Paragraph>
        <Title level={2}>D. Picture Descriptions　（絵の描写）</Title>
        There are two four-panel pictures. You have thirty seconds to look at each picture, followed by a beep.
        When you hear the beep, you will have one minute to describe the story in Japanese. 
        Try to describe as much of the story as you can, including the situation, characters, actions, and ending.
      </Paragraph>
      <Paragraph>
        <Title level={2}>E.  Story Retelling　（再話）</Title>
        You will hear two brief stories. Each story will be spoken once, followed by a beep.
        You may take memos when you listen to the story. When you hear the beep, you will have one minute to retell the story in Japanese.
        Try to retell as much of the story as you can, including the situation, characters, actions, and ending.
      </Paragraph>
      <Paragraph>
        <Title level={2}>F. Opinion Telling　（意見述べ）</Title>
        There are two situations. You will have two minutes to formulate an opinion according to the situation.
        You may take any memos. When you hear the beep, you will have one minute to express your opinion.
      </Paragraph>
    </>
  )
}