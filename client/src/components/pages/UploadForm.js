import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
// import { UploadOutlined } from "@ant-design/icons";
import { Form, Button, Input, Select } from "antd";
import { useEffectOnlyOnce } from "../../hooks/useEffectOnce";
import useRequest from "../../hooks/useRequest";

const { Option } = Select;

axios.defaults.withCredentials = true;

export const UploadForm = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({});
  const [video, setVideo] = useState({});

  const onFinish = async (values) => {
    const { title, categoryId } = values;
    const data = new FormData();
    data.append("title", title);
    data.append("categoryId", categoryId);

    if (video) {
      data.append("video", video);
    }
    const response = await axios({
      method: "post",
      baseURL: `${process.env.REACT_APP_PROXY}/videos`,
      headers: { "Content-Type": "multipart/form-data" },
      data,
    });
  };

  const onFinishFailed = (errorInfo) => {
    toast(errorInfo);
  };

  const handleTitleChange = (e) => {
    setFormData({ ...formData, title: e.target.value });
  };
  const onCategoryChange = (value) => {
    setFormData({ ...formData, categoryId: value });
  };
  const handleFileChange = (e) => {
    setVideo({ [e.target.name]: e.target.files[0] });
  };

  const { doRequest, errors } = useRequest({
    url: `${process.env.REACT_APP_PROXY}/categories`,
    method: "get",
    body: {},
    onSuccess: () => {},
  });

  useEffectOnlyOnce(() => {
    const getVideos = async () => {
      const response = await doRequest();
      setCategories(response.data);
      if (errors) {
        toast.error(errors);
      }
    };
    if (categories.length === 0) {
      getVideos();
    }
  }, [categories, errors, doRequest]);
  return (
    <Form
      encType="multipart/form-data"
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please input video title!" }]}
      >
        <Input onChange={handleTitleChange} />
      </Form.Item>
      <Form.Item
        name="categoryId"
        label="Category"
        rules={[{ required: true }]}
      >
        <Select
          placeholder="Select category"
          onChange={onCategoryChange}
          allowClear
        >
          {categories &&
            categories.map((category) => (
              <Option value={category.id} key={category.id}>
                {category.category}
              </Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="File"
        name="file"
        rules={[{ required: true, message: "Please choose mp4 or mov video" }]}
      >
        <Input
          onChange={handleFileChange}
          name="video"
          type="file"
          bordered={false}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
