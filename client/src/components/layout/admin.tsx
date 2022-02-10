import React from "react";
import { useRouter } from "next/router";
import { Layout, Menu, Typography, Row, Col, Tooltip } from "antd";
import {
  UserOutlined,
  DatabaseOutlined,
  LoginOutlined,
} from "@ant-design/icons";

export const AdminLayout: React.FC = ({ children }) => {
  const router = useRouter();
  const { Header, Content, Sider } = Layout;
  const { Text } = Typography;
  const onClickLogoutBtn = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/login");
  };
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Header style={{ padding: "0 30px" }}>
          <Row>
            <Col span={8}>
              <Text style={{ color: "#fff" }}>STAR SPEAKING TEST</Text>
            </Col>
            <Col span={8} offset={8} style={{ textAlign: "right" }}>
              <Tooltip title="ログアウト">
                <LoginOutlined
                  style={{ color: "#fff", fontSize: "18px" }}
                  onClick={onClickLogoutBtn}
                />
              </Tooltip>
            </Col>
          </Row>
        </Header>
        <Layout>
          <Sider width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={[router.pathname.split("/")[2]]}
              style={{ height: "100%", borderRight: 0 }}
            >
              <Menu.Item
                key="users"
                icon={<UserOutlined />}
                onClick={() => router.push("/admin/users")}
              >
                ユーザ管理
              </Menu.Item>
              <Menu.Item
                key="recordings"
                icon={<DatabaseOutlined />}
                onClick={() => router.push("/admin/recordings")}
              >
                録音音声管理
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ padding: "24px 24px" }}>
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
  );
};
