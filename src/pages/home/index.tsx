import {
  Badge,
  Card,
  Col,
  Divider,
  Flex,
  GetProps,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Tag,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { Lang } from "../../constants";
import { Category } from "../../constants/data";
import { Resource } from "../../models";
import styles from "./style.module.css";

const loadLang = async () => {
  const lang = localStorage.getItem(Lang.Key);

  let data;

  if (lang) {
    data = await import(`../../../public/data/${lang}.json`);
  } else {
    data = await import("../../../public/data/my.json");
  }

  return data.default;
};

const { Paragraph, Text } = Typography;

function Home() {
  const [resources, setResources] = useState<{
    [key: string]: Resource;
  } | null>(null);
  const [renderResources, setRenderResources] = useState<{
    [key: string]: Resource;
  } | null>(null);
  const [details, setDetails] = useState<any>(null);
  const [filterOptions, setFilterOptions] = useState({
    category: Category.All,
    search: "",
  });

  // effects
  useEffect(() => {
    setRenderResources(resources);
  }, [resources]);

  useEffect(() => {
    if (resources === null) {
      const fetchLangData = async () => {
        const data = (await loadLang()) as { [key: string]: Resource };
        setResources(data);
      };

      fetchLangData();
    }
  }, []);

  // utils
  const getDataRelatedCategory = (
    category: Category,
    resources: {
      [key: string]: Resource;
    }
  ) => {
    let res: {
      [key: string]: Resource;
    } = {};

    resources &&
      Object.keys(resources).forEach((k: string) => {
        if (category.toLowerCase() === Category.All.toLowerCase()) {
          res[k] = resources[k];
        } else if (
          resources[k].category.toLowerCase() === category.toLowerCase()
        ) {
          res[k] = resources[k];
        }
      });

    return res;
  };

  const getDataRelatedSearchString = (
    searchString: string,
    resources: {
      [key: string]: Resource;
    }
  ) => {
    let res: {
      [key: string]: Resource;
    } = {};

    resources &&
      Object.keys(resources).forEach((k: string) => {
        if (
          resources[k].title.toLowerCase().includes(searchString) ||
          resources[k].ques.toLowerCase().includes(searchString)
        ) {
          res[k] = resources[k];
        }
      });

    return res;
  };

  const handleCancel = () => {
    setDetails(null);
  };

  const handleSearch: GetProps<typeof Input.Search>["onSearch"] = (value) => {
    setFilterOptions({
      ...filterOptions,
      search: value,
    });

    if (resources) {
      const res = getDataRelatedCategory(filterOptions.category, resources);
      setRenderResources(getDataRelatedSearchString(value, res));
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(e.target.value);
  };

  const handleCategory = (value: Category) => {
    setFilterOptions({
      ...filterOptions,
      category: value,
    });

    if (resources) {
      const res = getDataRelatedSearchString(filterOptions.search, resources);
      setRenderResources(getDataRelatedCategory(value, res));
    }
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Space
            direction="horizontal"
            size="middle"
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <Select
              showSearch
              placeholder="Select Category"
              optionFilterProp="label"
              onChange={handleCategory}
              className={styles.filter}
              options={Object.keys(Category).map((k) => {
                return {
                  value: k,
                  label: Category[k as keyof typeof Category],
                };
              })}
            />

            <Input.Search
              placeholder="Search"
              allowClear
              onChange={handleOnChange}
              onSearch={handleSearch}
              className={styles.filter}
            />
          </Space>
        </Col>
        <Col span={24}>
          <Divider orientation="left">Color Definition</Divider>
          <Flex gap="4px 0" wrap>
            <Tag color="red">Advanced</Tag>
            <Tag color="green">Normal</Tag>
          </Flex>
        </Col>
        {renderResources &&
          Object.keys(renderResources).map((k) => (
            <Col key={k} xs={24} md={12}>
              <Badge.Ribbon
                text={renderResources[k].category.toUpperCase()}
                color={renderResources[k].isAdvanced ? "red" : "green"}
              >
                <Card
                  className={styles.card}
                  title={<Text>{renderResources[k].title}</Text>}
                  onClick={() => {
                    setDetails(renderResources[k]);
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
                      {renderResources[k].ques}
                    </Paragraph>
                  </Space>
                </Card>
              </Badge.Ribbon>
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
          <Space direction="vertical" size="small" style={{ display: "flex" }}>
            <Paragraph style={{ marginTop: "20px" }}>{details.ques}</Paragraph>
          </Space>
        </Modal>
      )}
    </>
  );
}

export default Home;
