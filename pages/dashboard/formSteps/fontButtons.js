import React, { useState, useEffect } from "react";
import { ButtonGroup, Button } from "@shopify/polaris";
import data from "./fontButtons.json";

const Index = (props) => {
  const { pullFontStyle } = props;
  const [clickedBtnIndex, setClickedBtnIndex] = useState(0);
  const [selectedFont, setSelectedFont] = useState("Lato");
  const btnClickHandler = (i, index) => {
    data.map((item, itemIndex) => {
      if (item == i && itemIndex == index) {
        setClickedBtnIndex(index);
        setSelectedFont(i);
      }
    });
  };
  useEffect(() => {
    pullFontStyle({ fontFamily: selectedFont });
  }, [selectedFont]);
  return (
    <ButtonGroup>
      {data.map((i, index) => {
        return (
          <Button
            key={i + index}
            onClick={() => btnClickHandler(i, index)}
            primary={clickedBtnIndex === index ? true : false}
          >
            <span style={{ fontFamily: i }}>{i}</span>
          </Button>
        );
      })}
    </ButtonGroup>
  );
};

export default Index;
