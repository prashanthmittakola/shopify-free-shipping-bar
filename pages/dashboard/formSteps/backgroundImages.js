import React from "react";
import ThumbNail from "../../../common/thumbnail";
import data from "./backgroundImages.json";

const backgroundImages = () => {
  return data.map((i, index) => {
    return (
      <ThumbNail
        key={index}
        source={i.source}
        alt={i.alt}
        size={i.size}
        text={i.text}
        textColor={"white"}
      />
    );
  });
};

export default backgroundImages;
