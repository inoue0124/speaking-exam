import React from "react";
import { Input, Button, Typography, Space, Card, Row } from 'antd'
const { Text } = Typography
import { useLoginForm } from "../containers/Login/hooks/useLoginForm"

type Props = ReturnType<typeof useLoginForm>

export const LoginForm: React.FC<Props> = ({
  loginId,
  password,
  errorMsg,
  isLoading,
  onChangeLoginId,
  onChangePassword,
  onKeyPress,
  onClickLoginBtn
}) => {
  return (
    <>
    <Card title="SPEAKING TEST" style={{ width: 400 }}>
      <Row justify="center">
        <Space direction="vertical">
          <Input 
            placeholder="Login ID"
            value={loginId}
            onChange={onChangeLoginId}
            onKeyPress={onKeyPress}
            style={{ width: 300 }}
          />
          <Input.Password
            placeholder="Password"
            type="password"
            value={password}
            onChange={onChangePassword}
            onKeyPress={onKeyPress}
          />
          <Space>
            <Button
              type="primary"
              onClick={onClickLoginBtn}
              loading={isLoading}
              disabled={isLoading}
            >
              Login
            </Button>
            <Text type="danger">
              {errorMsg}
            </Text>
          </Space>
        </Space>
      </Row>
    </Card>
    </>
  );
};