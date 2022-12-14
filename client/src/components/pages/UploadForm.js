import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Form, Button, Input, Select, Progress, Spin, message } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useEffectOnlyOnce } from "../../hooks/useEffectOnce";
import useRequest from "../../hooks/useRequest";
import { Thumbnail } from "../Thumbnail";

const { Option } = Select;

axios.defaults.withCredentials = true;

export const UploadForm = () => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({});
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedVideo, setUploadedVideo] = useState({});
  const [thumbnails, setThumbnails] = useState([]);

  const onFinish = async (values) => {
    setLoading(true);
    const { title, categoryId } = values;
    const data = new FormData();
    if (video) {
      data.append("video", video);
    }
    data.append("title", title);
    data.append("categoryId", categoryId);

    const response = await axios({
      method: "post",
      baseURL: `${process.env.REACT_APP_PROXY}/videos`,
      data,
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (progressEvent) => {
        setProgress(
          parseInt(
            Math.round((progressEvent.loaded / progressEvent.total) * 100)
          )
        );
      },
    });

    if (response) {
      message.success(response.data.message);
      setUploadedVideo(response.data.data[0]);
      setProgress(0);
      setLoading(false);
      form.resetFields();
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error(errorInfo);
  };

  const handleTitleChange = (e) => {
    setFormData({ ...formData, title: e.target.value });
  };
  const onCategoryChange = (value) => {
    setFormData({ ...formData, categoryId: value });
  };
  const handleFileChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const generateThumbnail = async (e) => {
    setLoading(true);
    e.preventDefault();
    const { id } = uploadedVideo;
    if (id) {
      const response = await axios({
        method: "post",
        baseURL: `${process.env.REACT_APP_PROXY}/thumbnails/${id}`,
        headers: { "Content-Type": "application/json" },
        onUploadProgress: (progressEvent) => {
          setProgress(
            parseInt(
              Math.round((progressEvent.loaded / progressEvent.total) * 100)
            )
          );
        },
      });
      if (response) {
        message.success(response.data.message);
        setThumbnails(response.data.data);
        setProgress(0);
        setLoading(false);
        setUploadedVideo({});
      }
    }
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
        message.error(errors);
      }
    };
    if (categories.length === 0) {
      getVideos();
    }
  }, [categories, errors, doRequest]);
  return (
    <>
      <Link to={"/"}>
        <Button icon={<HomeOutlined />}>Home</Button>
      </Link>
      <Form
        encType="multipart/form-data"
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        form={form}
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
          rules={[
            { required: true, message: "Please choose mp4 or mov video" },
          ]}
        >
          <Input
            onChange={handleFileChange}
            name="video"
            type="file"
            bordered={false}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type="success"
            htmlType="submit"
            disabled={loading ? true : false}
          >
            Submit
          </Button>{" "}
          {/* {loading && <Spin />} */}
        </Form.Item>
      </Form>

      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          //   margin: "1rem 0",
        }}
      >
        <Button
          onClick={generateThumbnail}
          type="warning"
          disabled={uploadedVideo?.id ? false : true}
        >
          Generate Thumbnails
        </Button>{" "}
        {loading && <Spin />}
      </div>
      {loading && <Progress percent={progress} status="active" />}
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        {thumbnails.length > 0 &&
          thumbnails.map((thumbnail) => (
            <Thumbnail thumbnail={thumbnail} key={thumbnail?.id} />
          ))}
      </div>
    </>
  );
};
