import { Card, Col, Modal, Row, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { Lang } from "../../constants";

const loadLang = async () => {
  const lang = localStorage.getItem(Lang.Key);

  let data = await import("../../../public/data/my.json");

  if (lang) {
    data = await import(`../../../public/data/${lang}.json`);
  }

  return data.default;
};

const { Paragraph } = Typography;

function Home() {
  const [resources, setResources] = useState<any>(null);
  const [details, setDetails] = useState<any>(null);

  // effects
  useEffect(() => {
    const fetchLangData = async () => {
      const data = await loadLang();
      setResources(data);
    };

    fetchLangData();
  }, []);

  // utils
  const handleCancel = () => {
    setDetails(null);
  };

  console.log("resources ", resources);

  return (
    <>
      <Row gutter={[16, 16]}>
        {resources &&
          Object.keys(resources).map((k) => (
            <Col key={k} xs={24} md={12}>
              <Card
                title={resources[k].title}
                onClick={() => {
                  setDetails(resources[k]);
                }}
              >
                <Space
                  direction="vertical"
                  size="middle"
                  style={{ display: "flex" }}
                >
                  <Paragraph
                    style={{
                      overflow: "hidden",
                      textWrap: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {resources[k].ques}
                  </Paragraph>
                </Space>
              </Card>
            </Col>
          ))}
      </Row>

      {/* Details */}
      {details && (
        <Modal
          title={details.title}
          open={details !== null}
          okButtonProps={{ style: { display: "none" } }}
          closable={false}
          onCancel={handleCancel}
        >
          <Paragraph>{details.ques}</Paragraph>
        </Modal>
      )}
    </>
  );
}

export default Home;
