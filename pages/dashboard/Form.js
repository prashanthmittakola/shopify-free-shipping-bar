import React, { useState } from "react";
import {
  Card,
  Toast,
  Frame,
  Page,
  Heading,
  Layout,
  ButtonGroup,
  Button,
  Form,
} from "@shopify/polaris";
import StepWizard from "react-step-wizard";
import { Formik, Field } from "formik";
import ContentConfiguration from "./formSteps/step1";
import CurrencyConfiguration from "./formSteps/step2";
import StyleConfiguration from "./formSteps/step3";
import TargetingConfiguration from "./formSteps/step4";
import CustomCodeConfiguration from "./formSteps/step5";

const Index = (props) => {
  const [previewBarData, setPreviewBarData] = useState({});
  // console.log("previewBarData",previewBarData);
  const {
    currencyFormat,
    freeShippingGoal,
    msgBefore,
    msgAfter,
    progressMsgBefore,
    progressMsgAfter,
    goalAchievedMsg,
  } = previewBarData;

  /* currencyData */
  const [currencyData, setCurrencyData] = useState({});
  // console.log("currencyData",currencyData)
  const {
    currencyValue,
    currencySymbol,
    currencySymbolPosition,
  } = currencyData;
  const pullCurrencyData = (data) => {
    setCurrencyData(data);
  };

  /*barStyle*/
  const [barStyle, setBarStyle] = useState({});
  // console.log("barStyle",barStyle);
  const {
    backgroundColor,
    textColor,
    specialTextColor,
    backgroundOpacity,
  } = barStyle;

  const progressBarShippingGoal =
    freeShippingGoal == undefined ? Math.random() * 200 : freeShippingGoal - 1;

  const pullContentData = (data) => {
    setPreviewBarData(data);
  };
  const pullStyleData = (data) => {
    setBarStyle(data);
  };

  /* targetingData */
  const [targetingData, setTargetingData] = useState({});
  // console.log("targetingData",targetingData);
  const pullTargetingData = (data) => {
    setTargetingData(data);
  };
  /* customCodeData */
  const [customCodeData, setCustomCodeData] = useState({});
  // console.log("customCodeData",customCodeData);
  const pullCustomCodeData = (data) => {
    setCustomCodeData(data);
  };
  const handleSubmit = () => {
    const formData = {
      ...previewBarData,
      ...currencyData,
      ...barStyle,
      ...targetingData,
      ...customCodeData,
    };
    fetch("../api/formSubmit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((res) => console.log({ res }));
  };

  return (
    <section style={{ maxWidth: "1000px", margin: "20px auto" }}>
      <Frame>
        {/*Preview Section*/}
        <Card sectioned subdued>
          <Layout.Section>
            <Heading>Preview</Heading>
            <div className="preview-section">
              <div className="row">
                {/* shippingBar01 */}
                <div className="msg1Preview">
                  <div
                    className="preview-bar"
                    style={{
                      backgroundColor: backgroundColor ?? "black",
                      color: textColor ?? "white",
                    }}
                  >
                    <span>{msgBefore}</span>
                    <span
                      className="currency"
                      style={{ color: specialTextColor ?? "red" }}
                    >
                      <span className="currency-format">
                        {currencySymbol ?? currencyFormat}
                      </span>
                      <span className="currency-total">{freeShippingGoal}</span>
                    </span>
                    <span>{msgAfter}</span>
                  </div>
                </div>
                {/* processingBar01 */}
                {freeShippingGoal > 0 ? (
                  <div className="msg2Preview">
                    <div
                      className="preview-bar"
                      style={{
                        backgroundColor: backgroundColor ?? "black",
                        color: textColor ?? "white",
                      }}
                    >
                      <span>
                        {progressMsgBefore}
                        <span
                          className="currency"
                          style={{ color: specialTextColor ?? "red" }}
                        >
                          <span className="currency-format">
                            {currencySymbol ?? currencyFormat}
                          </span>
                          <span className="currency-total">
                            {progressBarShippingGoal}
                          </span>
                        </span>
                        {progressMsgAfter}
                      </span>
                    </div>
                  </div>
                ) : null}
                {/* congratsBar */}
                <div className="msg3Preview">
                  <div
                    className="preview-bar"
                    style={{
                      backgroundColor: backgroundColor ?? "black",
                      color: textColor ?? "white",
                    }}
                  >
                    <span>{goalAchievedMsg}</span>
                  </div>
                </div>
              </div>
            </div>
          </Layout.Section>
        </Card>
        {/* preview section end */}
        <Card sectioned subdued>
          <Form onSubmit={handleSubmit}>
            <div className="card-min-height-500">
              <StepWizard>
                <ContentConfiguration
                  stepName={"ContentConfiguration"}
                  pullContentData={(data) => pullContentData(data)}
                />
                <CurrencyConfiguration
                  stepName={"CurrencyConfiguration"}
                  pullCurrencyData={(data) => pullCurrencyData(data)}
                />
                <StyleConfiguration
                  stepName={"StyleConfiguration"}
                  pullStyleData={(data) => {
                    pullStyleData(data);
                  }}
                />
                <TargetingConfiguration
                  stepName={"targetingConfiguration"}
                  pullTargetingData={(data) => {
                    pullTargetingData(data);
                  }}
                />
                <CustomCodeConfiguration
                  stepName={"CustomCodeConfiguration"}
                  pullCustomCodeData={(data) => pullCustomCodeData(data)}
                />
              </StepWizard>
            </div>
          </Form>
        </Card>
      </Frame>
    </section>
  );
};

export default Index;
