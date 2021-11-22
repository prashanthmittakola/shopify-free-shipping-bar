import { Card, Toast, Frame, Page, Heading, Layout } from "@shopify/polaris";
import React, { useState } from "react";
import StepWizard from "react-step-wizard";
import ContentConfiguration from "./formSteps/step1";
import CurrencyConfiguration from "./formSteps/step2";
import StyleConfiguration from "./formSteps/step3";
import TargetingConfiguration from "./formSteps/step4";

const Form = (props) => {
  const [previewBarData, setPreviewBarData] = useState({});
  const {
    currencyFormat,
    freeShippingGoal,
    msgBefore,
    msgAfter,
    progressMsgBefore,
    progressMsgAfter,
    goalAchievedMsg,
  } = previewBarData;
  const pullData = (data) => {
    setPreviewBarData(data);
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
                  <div className="preview-bar">
                    <span>{msgBefore}</span>
                    <span className="currency">
                      <span className="currency-format">{currencyFormat}</span>
                      <span className="currency-total">{freeShippingGoal}</span>
                    </span>
                    <span>{msgAfter}</span>
                  </div>
                </div>
                {/* processingBar01 */}
                <div className="msg2Preview">
                  <div className="preview-bar">
                    <span>
                      {progressMsgBefore}
                      <span className="currency">
                        <span className="currency-format">
                          {currencyFormat}
                        </span>
                        <span className="currency-total">
                          {freeShippingGoal - 1}
                        </span>
                      </span>
                      {progressMsgAfter}
                    </span>
                  </div>
                </div>
                {/* congratsBar */}
                <div className="msg3Preview">
                  <div className="preview-bar">
                    <span>{goalAchievedMsg}</span>
                  </div>
                </div>
              </div>
            </div>
          </Layout.Section>
        </Card>
        {/* preview section end */}
        <Card sectioned subdued>
          <StepWizard>
            <ContentConfiguration
              stepName={"ContentConfiguration"}
              pullData={(data) => pullData(data)}
            />
            <CurrencyConfiguration stepName={"CurrencyConfiguration"} />
            <StyleConfiguration stepName={"StyleConfiguration"} />
            <TargetingConfiguration stepName={"targetingConfiguration"} />
          </StepWizard>
        </Card>
      </Frame>
    </section>
  );
};

export default Form;
