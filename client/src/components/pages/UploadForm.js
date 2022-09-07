import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Upload, Form, Button } from "antd";

export const UploadForm = () => {
  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return (
    <Form>
      <Form.Item
        name="upload"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload name="logo" action="/upload.do" listType="picture">
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>
    </Form>
  );
};
