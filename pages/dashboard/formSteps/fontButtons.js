import React, { useState } from "react";
import { ButtonGroup, Button } from "@shopify/polaris";
import data from "./fontButtons.json";

const fontButtons = () => {
  const [active, setActive] = useState(true);
  const [clickedBtnIndex, setClickedBtnIndex] = useState(0);
  const btnClickHandler = (i, index) => {
    data.map((item, itemIndex) => {
      item == i && itemIndex == index ? setClickedBtnIndex(index) : null;
    });
  };
  return (
    <ButtonGroup>
      {data.map((i, index) => {
        return (
          <Button
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

export default fontButtons;
