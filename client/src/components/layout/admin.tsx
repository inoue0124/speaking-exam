import React from "react"
import { useRouter } from 'next/router'
import { Layout, Menu, Typography } from 'antd'
import { UserOutlined, DatabaseOutlined } from '@ant-design/icons'

export const AdminLayout: React.FC = ({children}) => {
  const router = useRouter()
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
              defaultSelectedKeys={[router.pathname.split('/')[2]]}
              style={{ height: '100%', borderRight: 0 }}
            >
              <Menu.Item
                key="users"
                icon={<UserOutlined />}
                onClick={() => router.push('/admin/users')}
              >
                ユーザ管理
              </Menu.Item>
              <Menu.Item
                key="recordings"
                icon={<DatabaseOutlined />}
                onClick={() => router.push('/admin/recordings')}
              >
                録音音声管理
              </Menu.Item>
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
      </Layout>
    </>
  )
}