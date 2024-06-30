import { Col, Radio, RadioChangeEvent, Row, Space } from "antd";
import { useEffect, useState } from "react";
import { Typography } from "antd";
import { Lang } from "../../constants";

const { Title } = Typography;

function Setting() {
  const [value, setValue] = useState("");

  // effects
  useEffect(() => {
    const lang = localStorage.getItem(Lang.Key);
    if (lang) {
      setValue(lang);
    } else {
      setValue(Lang.Myanmar);
      localStorage.setItem(Lang.Key, Lang.Myanmar);
    }
  }, []);

  // utils
  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
    localStorage.setItem(Lang.Key, e.target.value);
  };
  return (
    <Row>
      <Col xs={{span : 24}} md={{span : 12, offset: 6}} style={{ textAlign: "center" }}>
        <Space direction="vertical" size="small" style={{ display: "flex" }}>
          <Title level={4}>Available Languages</Title>
          <Radio.Group
            onChange={onChange}
            value={value}
            optionType="button"
            buttonStyle="solid"
          >
            <Radio value={Lang.Myanmar}>Myanmar</Radio>
            <Radio value={Lang.English}>English</Radio>
          </Radio.Group>
        </Space>
      </Col>
    </Row>
  );
}

export default Setting;
