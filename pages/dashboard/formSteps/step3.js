import { useState, useCallback, useEffect } from "react";
import {
  ButtonGroup,
  Button,
  Heading,
  FormLayout,
  Layout,
  Select,
} from "@shopify/polaris";
import InputElement, {
  ColorPickerBox,
  RangeSliderWithControl,
} from "../../../common/inputElement";
import UpgradePlanLockIcon from "../../../common/upgradePlanLockIcon";
import ThumbNail from "../../../common/thumbnail";
import BackgroundImages from "./backgroundImages";
import FontButtons from "./fontButtons";

const StyleConfiguration = (props) => {
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
    stylePullData,
  } = props;

  /*backgroundColor*/
  const [backgroundColor, setBackgroundColor] = useState("#000000");
  const [backgroundColorTextBox, setBackgroundColorTextBox] = useState(
    backgroundColor
  );
  const backGroundColorChangeHandler = (e) => {
    // console.log("e", e.target.value);
    setBackgroundColor(e.target.value);
    setBackgroundColorTextBox(e.target.value);
  };
  const backGroundColorTextBoxChangeHandler = useCallback((newValue) => {
    setBackgroundColor(newValue);
    setBackgroundColorTextBox(newValue);
  }, []);

  /*textColor*/
  const [textColor, setTextColor] = useState("#ffffff");
  const [textColorTextBox, setTextColorTextBox] = useState(textColor);
  const textColorChangeHandler = (e) => {
    // console.log("e", e.target.value);
    setTextColor(e.target.value);
    setTextColorTextBox(e.target.value);
  };
  const textColorTextBoxChangeHandler = useCallback((newValue) => {
    setTextColor(newValue);
    setTextColorTextBox(newValue);
  }, []);

  /*specialTextColor*/
  const [specialTextColor, setSpecialTextColor] = useState("#ff0000");
  const [specialTextColorTextBox, setSpecialTextColorTextBox] = useState(
    specialTextColor
  );
  const specialTextColorChangeHandler = (e) => {
    // console.log("e", e.target.value);
    setSpecialTextColor(e.target.value);
    setSpecialTextColorTextBox(e.target.value);
  };
  const specialTextColorTextBoxChangeHandler = useCallback((newValue) => {
    setSpecialTextColor(newValue);
    setSpecialTextColorTextBox(newValue);
  }, []);

  /*rangeSlider*/
  const [backgroundOpacity, setBackgroundOpacity] = useState(1);
  const backgroundOpacityChangeHandler = useCallback(
    (value) => setBackgroundOpacity(value),
    []
  );

  useEffect(() => {
    stylePullData({
      backgroundColor,
      textColor,
      specialTextColor,
      backgroundOpacity,
    });
    /*
    return () => {
      cleanup
    }
    */
  }, [backgroundColor, textColor, specialTextColor, backgroundOpacity]);

  // console.log("StyleConfiguration", props);
  return (
    <div>
      {/* <h3>Contact Info</h3>
            <h2>Step {currentStep}</h2>
            <p>Total Steps: {totalSteps}</p>
            <p>Is Active: {isActive}</p> */}
      <FormLayout>
        <div className="heading-div">
          <Heading>Style Configuration</Heading>
        </div>

        <FormLayout.Group condensed>
          <Layout.Section oneThird>
            {/* <ColorPickerBox /> */}
            {/* backgroundColor */}
            <div className="color-picker-div">
              {/* <label className="color-label">Background Color: </label> */}
              <div class="side-elements color-picker">
                {/* <div class="color-picker__preview"></div> */}
                <input
                  type="color"
                  onChange={(e) => {
                    backGroundColorChangeHandler(e);
                  }}
                  value={backgroundColor}
                />
                {/* <input type="text" id="color-picker--background_color" /> */}
                <InputElement
                  label="Background Color:"
                  type="text"
                  name="backgroundColor"
                  id="backgroundColor"
                  value={backgroundColorTextBox}
                  onChange={(value) =>
                    backGroundColorTextBoxChangeHandler(value)
                  }
                />
              </div>
            </div>
          </Layout.Section>

          <Layout.Section oneThird>
            {/* textColor */}
            <div className="color-picker-div">
              {/* <label className="color-label">Text Color: </label> */}
              <div class="side-elements color-picker">
                <input
                  type="color"
                  onChange={(e) => {
                    textColorChangeHandler(e);
                  }}
                  value={textColor}
                />
                {/* <input type="text" id="color-picker--text_color" /> */}
                <InputElement
                  label="Text Color:"
                  type="text"
                  name="textColor"
                  id="textColor"
                  value={textColorTextBox}
                  onChange={(value) => textColorTextBoxChangeHandler(value)}
                />
              </div>
            </div>
          </Layout.Section>

          <Layout.Section oneThird>
            {/* special text color */}
            <div className="color-picker-div">
              {/* <label className="color-label">Special Text Color: </label> */}
              <div class="side-elements color-picker">
                <input
                  type="color"
                  onChange={(e) => {
                    specialTextColorChangeHandler(e);
                  }}
                  value={specialTextColor}
                />
                {/* <input type="text" id="color-picker--special_text_color" /> */}
                <InputElement
                  label="Special Text Color:"
                  type="text"
                  name="specialTextColor"
                  id="specialTextColor"
                  value={specialTextColorTextBox}
                  onChange={(value) =>
                    specialTextColorTextBoxChangeHandler(value)
                  }
                />
              </div>
            </div>
          </Layout.Section>
        </FormLayout.Group>

        <FormLayout.Group>
          <Layout.Section oneHalf>
            <RangeSliderWithControl
              label={"Background Color Opacity:"}
              min={0}
              max={1}
              step={0.1}
              rangeValue={backgroundOpacity}
              onChange={(value) => {
                backgroundOpacityChangeHandler(value);
              }}
              helpText={
                <span>
                  The range is from 0 to 1. Set to 0 for fully transparent, and
                  to 1 for solid.
                </span>
              }
            />
          </Layout.Section>
          <Layout.Section oneHalf></Layout.Section>
        </FormLayout.Group>

        <FormLayout.Group>
          <Layout.Section oneHalf>
            <UpgradePlanLockIcon beforeText={"Background Images:"} />
          </Layout.Section>
        </FormLayout.Group>

        <FormLayout.Group condensed>
          <Layout.Section>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "start",
              }}
            >
              <BackgroundImages />
            </div>
          </Layout.Section>
        </FormLayout.Group>
        <FormLayout.Group>
          <Layout.Section>
            <UpgradePlanLockIcon beforeText={"Upload Background Image:"} />
            <input type="file" />
          </Layout.Section>
        </FormLayout.Group>

        <FormLayout.Group>
          <Layout.Section>
            <label>Fonts:</label>
            <FontButtons />
          </Layout.Section>
        </FormLayout.Group>

        <FormLayout.Group>
          <Layout.Section oneHalf>
            <InputElement
              label="Font Size:"
              type="number"
              name="font Size"
              id="Name"
              value={16}
              onChange={(value) => console.log("HIII", value)}
              helpText={
                <span>
                  Bar height is determined by Font Size and Bar Padding.
                </span>
              }
              connectedRight={<Button>px</Button>}
            />
          </Layout.Section>
          <Layout.Section oneHalf></Layout.Section>
        </FormLayout.Group>

        <FormLayout.Group>
          <Layout.Section oneHalf>
            <InputElement
              label="Bar Padding:"
              type="number"
              name="Bar Padding"
              id="barPadding"
              value={12}
              onChange={(value) => console.log("HIII", value)}
              helpText={
                <span>Space between the text and the upper/lower borders.</span>
              }
              connectedRight={<Button>px</Button>}
            />
          </Layout.Section>
          <Layout.Section oneHalf></Layout.Section>
        </FormLayout.Group>

        <FormLayout.Group>
          <Layout.Section oneHalf>
            <InputElement
              label="Disappear After:"
              type="number"
              name="Disappear After"
              id="disappearAfter"
              value={0}
              onChange={(value) => console.log("HIII", value)}
              helpText={<span>Bar will not disappear if set to 0.</span>}
              connectedRight={<Button>Seconds</Button>}
            />
          </Layout.Section>
          <Layout.Section oneHalf></Layout.Section>
        </FormLayout.Group>

        <FormLayout.Group>
          <Layout.Section oneHalf>
            <InputElement
              label="Delay Before Repeating:"
              type="number"
              name="Delay Before Repeating"
              id="delayBeforeRepeating"
              value={0}
              onChange={(value) => console.log("HIII", value)}
              helpText={
                <span>
                  Wait this many seconds to show Free Shipping Bar again (unless
                  cart value changes).
                </span>
              }
              connectedRight={<Button>Seconds</Button>}
            />
          </Layout.Section>
          <Layout.Section oneHalf></Layout.Section>
        </FormLayout.Group>

        <FormLayout.Group>
          <Layout.Section oneHalf>
            <InputElement
              label="Time to Fade In/Out:"
              type="number"
              name="Time to Fade In/Out"
              id="timetoFadeInOut"
              value={0}
              onChange={(value) => console.log("HIII", value)}
              helpText={<span>Bar will not fade if set to 0.</span>}
              connectedRight={<Button>Seconds</Button>}
            />
          </Layout.Section>
          <Layout.Section oneHalf></Layout.Section>
        </FormLayout.Group>

        <Layout.Section oneHalf>
          <ButtonGroup>
            <Button onClick={() => previousStep()}>Previous Step</Button>
            <Button onClick={() => nextStep()}>Next Step</Button>
          </ButtonGroup>
        </Layout.Section>
      </FormLayout>
    </div>
  );
};

export default StyleConfiguration;
