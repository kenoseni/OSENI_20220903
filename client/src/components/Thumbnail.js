import React from "react";
import { Image } from "antd";

export const Thumbnail = ({ thumbnail }) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      {thumbnail && <Image src={thumbnail?.thumbnailUrl} />}
    </div>
  );
};
