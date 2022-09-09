import React from "react";
import { Image } from "antd";

export const Thumbnail = ({ thumbnail }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        margin: "0.5rem 0 1.5rem 0",
      }}
    >
      {thumbnail && <Image src={thumbnail?.thumbnailUrl} />}
    </div>
  );
};
