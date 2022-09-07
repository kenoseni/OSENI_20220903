import React from "react";
import { VideoWrapper } from "../../styles/Video.style";
import { Card } from "antd";
const { Meta } = Card;

export const Video = ({ video }) => {
  return (
    <VideoWrapper>
      <Card
        hoverable
        style={{
          width: 400,
        }}
        cover={
          <video
            src={video.videoUrl}
            controls
            width={"640"}
            preload="metadata"
            autoPlay
            id={video.id}
          />
        }
      >
        <Meta title={video.title} />
      </Card>
    </VideoWrapper>
  );
};
