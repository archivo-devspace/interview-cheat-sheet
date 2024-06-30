import { Layout } from "antd";
import Navigation from "../components/common/Navigation";
import { Outlet } from "react-router-dom";

const { Header, Content, Footer } = Layout;

function Root() {
  return (
    <Layout>
      <Header style={{ padding: "0", backgroundColor: "#fff" }}>
        <Navigation />
      </Header>
      <Content>
        <div style={{ background: "#fff", padding: 24 }}>
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: "center",  backgroundColor: "#fff" }}>Developed by MMITDEV.</Footer>
    </Layout>
  );
}

export default Root;
