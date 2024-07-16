import React, { useState } from "react";
import { Menu, Drawer, Button, MenuProps, Typography } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";
import { useLocation, useNavigate } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import { Routes } from "../../constants";

type MenuItem = Required<MenuProps>["items"][number];

const { Text } = Typography;

const items: MenuItem[] = [
  {
    label: Routes.home.label,
    key: Routes.home.route,
    icon: <HomeOutlined />,
  },
  // {
  //   label: Routes.setting.label,
  //   key: Routes.setting.route,
  //   icon: <SettingOutlined />,
  // },
];

const Navigation: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const location = useLocation();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(location.pathname);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    onClose();
    navigate(e.key)
  };

  const menuItems = (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode={isMobile ? "vertical" : "horizontal"}
      items={items}
    />
  );

  return (
    <>
      {isMobile ? (
        <>
          <Button type="text" onClick={showDrawer}>
            <MenuOutlined /> <Text type="success">Interview Cheat Sheet</Text>
          </Button>
          <Drawer
            title="Menu"
            placement="right"
            onClose={onClose}
            open={visible}
          >
            {menuItems}
          </Drawer>
        </>
      ) : (
        menuItems
      )}
    </>
  );
};

export default Navigation;
