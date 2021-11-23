import { useState, useCallback, useEffect } from "react";
import {
  Card,
  ButtonGroup,
  Button,
  Toast,
  Frame,
  Page,
  TextField,
  FormLayout,
  Icon,
  Heading,
  Select,
  Layout,
} from "@shopify/polaris";
import { LockMajor, LockMinor } from "@shopify/polaris-icons";
import InputElement, {
  SelectBox,
  SingleChoiceList,
  SingleCheckbox,
} from "../../../common/inputElement";
import UpgradePlanLockIcon from "../../../common/upgradePlanLockIcon";

const ContentConfiguration = (props) => {
  const {
    pullData,
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

  const [name, setName] = useState("");
  const [currencyFormat, setCurrencyFormat] = useState("INR");
  const [freeShippingGoal, setFreeShippingGoal] = useState(100);
  const [msgBefore, setMsgBefore] = useState("Free shipping for orders over");
  const [msgAfter, setMsgAfter] = useState("");

  const [progressMsgBefore, setProgressMsgBefore] = useState("Only");
  const [progressMsgAfter, setProgressMsgAfter] = useState(
    "away from free shipping"
  );
  const [goalAchievedMsg, setGoalAchievedMsg] = useState(
    "Congratulations! You've got free shipping"
  );

  /* addLinkToBar */
  const [addLinkToBar, setAddLinkToBar] = useState("OFF");
  const handleAddLinkBarChange = useCallback(
    (value) => setAddLinkToBar(value),
    []
  );
  const addLinkToBarOptions = [
    { label: "OFF", value: "OFF" },
    { label: "ON", value: "ON" },
  ];
  const [openLinkInNewTab, setOpenLinkInNewTab] = useState(true);
  const handleOpenLinkInNewTab = useCallback(
    (newChecked) => setOpenLinkInNewTab(newChecked),
    []
  );

  /* includeCloseButton */
  const [includeCloseButton, setIncludeCloseButton] = useState("NO");
  const includeCloseButtonHandler = useCallback((value) => {
    setIncludeCloseButton(value);
  }, []);
  const includeCloseButtonOptions = [
    { label: "NO", value: "NO" },
    { label: "YES", value: "YES" },
  ];
  /* single cholice list */
  const [singleChoiceListSelected, setSingleChoiceListSelected] = useState([
    "Top",
  ]);
  const handleSingleChoiceListChange = useCallback(
    (value) => setSingleChoiceListSelected(value),
    []
  );
  const singleChoiceListOptions = [
    { label: "Top bar pushes down the rest of the page", value: "Top" },
    { label: "Bottom bar overlaps bottom of the page", value: "Bottom" },
  ];

  useEffect(() => {
    /*
      let url ="../../api/currency";
      fetch(url).then(data=>data.json()).then(data=>console.log("hiiii",data));
    */

    pullData({
      currencyFormat,
      freeShippingGoal,
      msgBefore,
      msgAfter,
      progressMsgBefore,
      progressMsgAfter,
      goalAchievedMsg,
    });
    /*
        return () => {
            // cleanup
        }
        */
  }, [
    currencyFormat,
    freeShippingGoal,
    msgBefore,
    msgAfter,
    progressMsgBefore,
    progressMsgAfter,
    goalAchievedMsg,
  ]);

  // pullData({ currencyFormat, freeShippingGoal, msgBefore, msgAfter });

  const handleNameChange = useCallback((newValue) => {
    setName(newValue);
  }, []);

  const handleFreeShippingGoalChange = useCallback((newValue) => {
    setFreeShippingGoal(newValue);
  }, []);

  const handleMsgBeforeChange = useCallback((newValue) => {
    setMsgBefore(newValue);
  }, []);

  const handleProgressBarMsgBeforeChange = useCallback((newValue) => {
    setProgressMsgBefore(newValue);
  }, []);

  const handleMsgAfterChange = useCallback((newValue) => {
    setMsgAfter(newValue);
  }, []);

  const handleProgressBarMsgAfterChange = useCallback((newValue) => {
    setProgressMsgAfter(newValue);
  }, []);

  const handleGoalAchievedMsgChange = useCallback((newValue) => {
    setGoalAchievedMsg(newValue);
  }, []);

  // console.log("ContentConfiguration", props);
  return (
    <div>
      {/* <h3>Basic Info</h3>
            <h2>Step {currentStep}</h2>
            <p>Total Steps: {totalSteps}</p>
            <p>Is Active: {isActive}</p> */}
      <FormLayout>
        <Layout.Section>
          <div className="heading-div">
            <Heading>Content Configuration</Heading>
          </div>
          <InputElement
            label="Name"
            type="text"
            name="name"
            id="Name"
            value={name}
            onChange={(value) => handleNameChange(value)}
            helpText={
              <span>
                For your own internal reference - only you can see it.
              </span>
            }
          />
          <InputElement
            label="Free Shipping Goal:"
            type="number"
            name="name"
            id="Name"
            value={freeShippingGoal}
            onChange={(value) => handleFreeShippingGoalChange(value)}
            helpText={
              <span>
                If no minimum order value is required, please set goal to 0.
              </span>
            }
          />
          <ButtonGroup>
            <Button disabled={true}>Add Secondary Goal</Button>
            <UpgradePlanLockIcon />
          </ButtonGroup>
        </Layout.Section>
        {/* for first preview bar */}
        <FormLayout.Group>
          <Layout.Section oneThird>
            <InputElement
              label="Initial Message :: Before money:"
              type="text"
              name="msgBefore"
              id="msgBefore"
              value={msgBefore}
              onChange={(value) => handleMsgBeforeChange(value)}
              helpText={<span>Display when cart is empty.</span>}
              placeholder=" "
            />
          </Layout.Section>
          <Layout.Section oneThird>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minWidth: "100px",
                margin: "0 auto",
              }}
            >
              <label className="Polaris-Label__Text">Amount:</label>
              <Heading>
                {currencyFormat} {freeShippingGoal}
              </Heading>
            </div>
          </Layout.Section>
          <Layout.Section oneThird>
            <InputElement
              label="After money:"
              type="text"
              name="msgAfter"
              id="msgAfter"
              value={msgAfter}
              onChange={(value) => handleMsgAfterChange(value)}
              placeholder=" "
            />
          </Layout.Section>
        </FormLayout.Group>

        {/* for second preview bar */}
        <FormLayout.Group>
          <Layout.Section oneThird>
            <InputElement
              label="Progress Message:"
              type="text"
              name="progressMsgBefore"
              id="progressMsgBefore"
              value={progressMsgBefore}
              onChange={(value) => handleProgressBarMsgBeforeChange(value)}
              helpText={
                <span>Displays when cart value is less than the goal.</span>
              }
              placeholder=" "
            />
          </Layout.Section>
          <Layout.Section oneThird>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minWidth: "100px",
                margin: "0 auto",
              }}
            >
              <label className="Polaris-Label__Text">Amount:</label>
              <Heading>
                {currencyFormat} {freeShippingGoal - 1}
              </Heading>
            </div>
          </Layout.Section>
          <Layout.Section oneThird>
            <InputElement
              label="After money:"
              type="text"
              name="progressMsgAfter"
              id="progressMsgAfter"
              value={progressMsgAfter}
              onChange={(value) => handleProgressBarMsgAfterChange(value)}
              placeholder=" "
            />
          </Layout.Section>
        </FormLayout.Group>

        {/* for third preview bar */}
        <FormLayout.Group>
          <Layout.Section oneThird>
            <InputElement
              label="Goal Achieved Message:"
              type="text"
              name="goalAchievedMsg"
              id="goalAchievedMsg"
              value={goalAchievedMsg}
              onChange={(value) => handleGoalAchievedMsgChange(value)}
              helpText={
                <span>Displays when cart value is greater than goal.</span>
              }
              placeholder=" "
            />
          </Layout.Section>
          <Layout.Section oneThird> </Layout.Section>
        </FormLayout.Group>
        <FormLayout.Group>
          <Layout.Section oneThird>
            <SelectBox
              label="Add Link to the Bar (optional):"
              id="AddLinkToBar"
              selected={addLinkToBar}
              options={addLinkToBarOptions}
              onChange={(value) => handleAddLinkBarChange(value)}
              helpText={
                <span>The bar will be clickable after adding a link.</span>
              }
            />
            <InputElement
              label="Link URL:"
              type="text"
              name="goalAchievedMsg"
              id="goalAchievedMsg"
              value={goalAchievedMsg}
              onChange={(value) => handleGoalAchievedMsgChange(value)}
              helpText={
                <span>
                  This address will be visited after clicking the bar.
                </span>
              }
              placeholder="https://apps.shopify.com/partners/panthercodx"
            />
            {addLinkToBar == "ON" ? (
              <SingleCheckbox
                label="Open the link in a NEW tab when clicked"
                onChange={handleOpenLinkInNewTab}
                checked={openLinkInNewTab}
              />
            ) : null}
          </Layout.Section>
          <Layout.Section oneThird> </Layout.Section>
        </FormLayout.Group>
        <FormLayout.Group>
          <Layout.Section oneThird>
            <SelectBox
              label="Include Close Button:"
              id="includeCloseButton"
              options={includeCloseButtonOptions}
              onChange={includeCloseButtonHandler}
              helpText={
                <span>
                  Places an "x" button on the bar so that users can close it
                  manually.
                </span>
              }
              selected={includeCloseButton}
            />
          </Layout.Section>
          <Layout.Section oneThird> </Layout.Section>
        </FormLayout.Group>
        <Layout.Section>
          <SingleChoiceList
            title="Select a Display Position:"
            id="displayPosition"
            choices={singleChoiceListOptions}
            selected={singleChoiceListSelected}
            onChange={handleSingleChoiceListChange}
          />
        </Layout.Section>
      </FormLayout>

      <Layout.Section>
        <div style={{ marginTop: "20px" }}>
          <ButtonGroup>
            {/* <Button onClick={() => previousStep()}>Previous Step</Button> */}
            <Button onClick={() => nextStep()}>Next</Button>
          </ButtonGroup>
        </div>
      </Layout.Section>
    </div>
  );
};

export default ContentConfiguration;
