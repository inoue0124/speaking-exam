import React from "react"
import { Layout, Menu, Typography } from 'antd'
import { UserOutlined, DatabaseOutlined } from '@ant-design/icons'

export const AdminLayout: React.FC = ({children}) => {
  const { Header, Content, Sider } = Layout
  const { Text } = Typography
  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Header>
          <Text>スピーキングテスト</Text>
        </Header>
        <Layout>
          <Sider width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <Menu.Item key="1" icon={<UserOutlined />}>ユーザ管理</Menu.Item>
              <Menu.Item key="2" icon={<DatabaseOutlined />}>録音音声管理</Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ padding: '24px 24px' }}>
            <Content
              style={{
                padding: 24,
                margin: 24,
                background: "#fff",
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      </Layout>,
    </>
  )
}