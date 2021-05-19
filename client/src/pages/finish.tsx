import React from "react"
import { Result, Typography, Card, Row } from 'antd'
import { useRequireLogin } from "../hooks/useRequireLogin"

const Finish: React.FC = ({}) => {
  useRequireLogin()
  const { Paragraph } = Typography
  return (
    <>
      <Result
        status="success"
        title="The test is finished!"
        subTitle="If you have any inquiries, please contact the following."
      />
      <Row justify="center">
      <Card title="Contact Information" style={{ width: 400 }}>
        <Paragraph>
          Fusako Beuckmann(Ph.D.)<br/>
          Center for Global Communication Strategies, Graduate School of Arts and Sciences. Professor.<br/>
          The University of Tokyo, 3-8-1 Komaba, Meguro-ku, Tokyo, 153-8902<br/>
          beuckmann@g.ecc.u-tokyo.ac.jp
        </Paragraph>
      </Card>
    </Row>
    </>
  )
}

export default Finish