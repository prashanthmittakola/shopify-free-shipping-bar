import { useState, useCallback } from "react";
import {
  ButtonGroup,
  Button,
  Toast,
  Heading,
  FormLayout,
  Layout,
} from "@shopify/polaris";
import InputElement, { SingleChoiceList } from "../../../common/inputElement";
import UpgradePlanLockIcon from "../../../common/upgradePlanLockIcon";
import DisplayOnPages from "./step4/displayOnPages";
import ExcludePages from "./step4/excludePages";
import {
  horizontalZoomCode,
  verticalScrollCode,
  verticalScrollwhileWebsiteScrolledCode,
} from "./customCode";
const CustomCodeConfiguration = (props) => {
  const {
    currentStep,
    firstStep,
    goToStep,
    goToNamedStep,
    isActive,
    lastStep,
    nextStep,
    previousStep,
    stepName,
    totalSteps,
    transitions,
  } = props;

  /*Toast*/
  const [active, setActive] = useState(false);
  const toggleActive = useCallback(() => setActive((active) => !active), []);
  const toastMarkup = active ? (
    <Toast content="Message sent" onDismiss={toggleActive} />
  ) : null;

  /*Custom code text*/
  const [customCodeText, setCustomCodeText] = useState("");

  const customCodeChangeHandler = useCallback(
    (newValue) => setCustomCodeText(newValue),
    []
  );

  return (
    <div style={{ minHeight: "500px" }}>
      {/* <h3>Terms Conditions</h3>
                <h2>Step {currentStep}</h2>
                <p>Total Steps: {totalSteps}</p> */}
      <FormLayout>
        <FormLayout.Group>
          <Layout.Section oneHalf>
            <div className="heading-div">
              <Heading>Custom Code Configuration</Heading>
            </div>
          </Layout.Section>
        </FormLayout.Group>
        <FormLayout.Group>
          <Layout.Section fullWidth>
            <InputElement
              label={
                <UpgradePlanLockIcon
                  beforeText={"Custom Code:"}
                  textColor={"#202223"}
                />
              }
              type={"text"}
              name={"customCodeConfiguration"}
              id={"customCodeConfiguration"}
              value={customCodeText}
              onChange={(value) => customCodeChangeHandler(value)}
              placeholder={"Your custom javascript or css code here..."}
              multiline={10}
              maxHeight={250}
            />
          </Layout.Section>
        </FormLayout.Group>

        <FormLayout.Group>
          <Layout.Section>
            <div>
              <Button
                plain
                size="medium"
                onClick={() => setCustomCodeText(horizontalZoomCode)}
              >
                Horizontal Zoom
              </Button>
              <span>
                : Good for displaying a pattern based background image
              </span>
            </div>
            <div>
              <Button
                plain
                size="medium"
                onClick={() => setCustomCodeText(verticalScrollCode)}
              >
                Vertical Scroll
              </Button>
              <span>
                : A Background image scrolled vertically. Good for showing a
                product image.
              </span>
            </div>
            <div>
              <Button
                plain
                size="medium"
                onClick={() =>
                  setCustomCodeText(verticalScrollwhileWebsiteScrolledCode)
                }
              >
                Vertical Scroll while Website is Scrolled
              </Button>
              <span>: Good for displaying hero or product images</span>
            </div>
          </Layout.Section>
        </FormLayout.Group>

        <FormLayout.Group>
          <Layout.Section oneHalf>
            <ButtonGroup>
              <Button onClick={() => previousStep()}>Previous Step</Button>
              <Button onClick={() => toggleActive()}>Finish</Button>
            </ButtonGroup>
          </Layout.Section>
        </FormLayout.Group>
      </FormLayout>
      {toastMarkup}
    </div>
  );
};

export default CustomCodeConfiguration;
