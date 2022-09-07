import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Divider, Row } from "antd";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { UploadOutlined } from "@ant-design/icons";
import { useTitle } from "../../hooks/useTitle";
import { VideoListWrapper } from "../../styles/VideoList.style";
import { Video } from "./Video";
import useRequest from "../../hooks/useRequest";
import { useEffectOnlyOnce } from "../../hooks/useEffectOnce";

export const VideoLists = () => {
  const navigate = useNavigate();
  useTitle("Videos");

  const [videos, setVideos] = useState([]);

  const handleVideoUpload = () => {
    navigate("/video");
  };

  const { doRequest, errors } = useRequest({
    url: `${process.env.REACT_APP_PROXY}/videos`,
    method: "get",
    body: {},
    onSuccess: () => {},
  });

  useEffectOnlyOnce(() => {
    const getVideos = async () => {
      const response = await doRequest();
      setVideos(response.data);
      if (errors) {
        toast.error(errors);
      }
    };
    if (videos.length === 0) {
      getVideos();
    }
  }, [videos, errors, doRequest]);
  return (
    <VideoListWrapper>
      <Button
        onClick={handleVideoUpload}
        size="large"
        icon={<UploadOutlined />}
      >
        Upload video
      </Button>
      <Divider orientation="left">
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          {videos &&
            videos.map((video) => (
              <Col className="gutter-row" span={16} key={video.id}>
                <Video video={video} />
              </Col>
            ))}
        </Row>
      </Divider>
      <ToastContainer />
    </VideoListWrapper>
  );
};
