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
    pullStyleData,
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

  /* fontSize */
  const [fontSize, setFontSize] = useState(16);
  const fontSizeChangeHandler = useCallback((value) => setFontSize(value), []);

  /* barPadding */
  const [barPadding, setBarPadding] = useState(10);
  const barPaddingChangeHandler = useCallback(
    (value) => setBarPadding(value),
    []
  );

  /* disappearAfter */
  const [disappearAfter, setDisappearAfter] = useState(0);
  const disappearAfterChangeHandler = useCallback(
    (value) => setDisappearAfter(value),
    []
  );

  /* Delay Before Repeating: */
  const [delayBeforeRepeating, setDelayBeforeRepeating] = useState(0);
  const delayBeforeRepeatingChangeHandler = useCallback(
    (value) => setDelayBeforeRepeating(value),
    []
  );

  /* Time to Fade In/Out: */
  const [timeToFadeInOut, setTimeToFadeInOut] = useState(0);
  const timeToFadeInOutChangeHandler = useCallback(
    (value) => setTimeToFadeInOut(value),
    []
  );

  /* fontFamily */
  const [fontFamily, setFontFamily] = useState("Lato");
  const pullFontStyle = useCallback(
    ({ fontFamily }) => setFontFamily(fontFamily),
    []
  );

  useEffect(() => {
    pullStyleData({
      backgroundColor,
      textColor,
      specialTextColor,
      backgroundOpacity,
      fontFamily,
      fontSize,
      barPadding,
      disappearAfter,
      delayBeforeRepeating,
      timeToFadeInOut,
    });
    /*
    return () => {
      cleanup
    }
    */
  }, [
    backgroundColor,
    textColor,
    specialTextColor,
    backgroundOpacity,
    fontFamily,
    fontSize,
    barPadding,
    disappearAfter,
    delayBeforeRepeating,
    timeToFadeInOut,
  ]);

  // console.log("StyleConfiguration", props);
  return (
    <div>
      {/* <h3>Contact Info</h3>
            <h2>Step {currentStep}</h2>
            <p>Total Steps: {totalSteps}</p>
            <p>Is Active: {isActive}</p> */}
      <FormLayout>
        <FormLayout.Group>
          <Layout.Section oneHalf>
            <div className="heading-div">
              <Heading>Style Configuration</Heading>
            </div>
          </Layout.Section>
        </FormLayout.Group>

        <FormLayout.Group condensed>
          <Layout.Section oneThird>
            {/* <ColorPickerBox /> */}
            {/* backgroundColor */}
            <div className="color-picker-div">
              <div className="side-elements color-picker">
                <input
                  type="color"
                  onChange={(e) => {
                    backGroundColorChangeHandler(e);
                  }}
                  value={backgroundColor}
                />
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
              <div className="side-elements color-picker">
                <input
                  type="color"
                  onChange={(e) => {
                    textColorChangeHandler(e);
                  }}
                  value={textColor}
                />
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
              <div className="side-elements color-picker">
                <input
                  type="color"
                  onChange={(e) => {
                    specialTextColorChangeHandler(e);
                  }}
                  value={specialTextColor}
                />
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
            <FontButtons pullFontStyle={(data) => pullFontStyle(data)} />
          </Layout.Section>
        </FormLayout.Group>

        <FormLayout.Group>
          <Layout.Section oneHalf>
            <InputElement
              label="Font Size:"
              type="number"
              name="font Size"
              id="Name"
              value={fontSize}
              onChange={(value) => fontSizeChangeHandler(value)}
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
              value={barPadding}
              onChange={(value) => barPaddingChangeHandler(value)}
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
              value={disappearAfter}
              onChange={(value) => disappearAfterChangeHandler(value)}
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
              value={delayBeforeRepeating}
              onChange={(value) => delayBeforeRepeatingChangeHandler(value)}
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
              value={timeToFadeInOut}
              onChange={(value) => timeToFadeInOutChangeHandler(value)}
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
