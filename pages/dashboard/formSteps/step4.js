import { useState, useCallback, useEffect } from "react";
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

const TargetingConfiguration = (props) => {
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
    pullTargetingData,
  } = props;
  // console.log("targetingConfiguration", props);

  /* Display on Page: */
  const [displayOnPageData, setDisplayOnPageData] = useState({});
  const displayOnPagePullData = (data) => {
    setDisplayOnPageData(data);
  };

  /* excludePage Data: */
  const [excludePageData, setExcludePageData] = useState({});
  const excludePagePullData = (data) => {
    setExcludePageData(data);
  };
  /* device target Data: */
  const [deviceTargetSelected, setDeviceTargetSelected] = useState(["all"]);
  const deviceTargetChangeHandler = useCallback(
    (value) => setDeviceTargetSelected(value),
    []
  );
  const deviceTargetingChoices = [
    {
      label:
        "Display on both desktop and mobile browsers. On mobile browsers font size will be capped to achieve optimum display",
      value: "all",
    },
    { label: "Display only on desktop browsers", value: "desktop" },
    { label: "Display only on mobile browsers", value: "mobile" },
  ];
  /* product targeting Data: */
  const [productTargeting, setProductTargeting] = useState(["all"]);
  const productTargetingChangeHandler = useCallback(
    (value) => setProductTargeting(value),
    []
  );
  const productTargetingChoices = [
    {
      label: "All products",
      value: "all",
    },
    {
      label: (
        <UpgradePlanLockIcon
          beforeText={
            "Only target products that requires shipping (e.g. exclude digital products, gift cards)"
          }
        />
      ),
      value: "require_shipping",
      disabled: true,
    },
  ];

  /* customer targeting: */
  const [customerTargeting, setCustomerTargeting] = useState(["all"]);
  const customerTargetingChangeHandler = useCallback(
    (value) => setCustomerTargeting(value),
    []
  );
  const customerTargetingChoices = [
    {
      label: "All customers",
      value: "all",
    },
    {
      label: (
        <UpgradePlanLockIcon
          beforeText={"Target customers based on customer tag"}
        />
      ),
      value: "tag",
      disabled: true,
    },
    {
      label: (
        <UpgradePlanLockIcon
          beforeText={"Target customers based on lifetime spent"}
        />
      ),
      value: "spent",
      disabled: true,
    },
  ];

  /* Geo Location Target  */
  const [geoLocationTarget, setGeoLocationTarget] = useState("");
  const geoLocationTargetChangeHandler = useCallback(
    (value) => setGeoLocationTarget(value),
    []
  );
  /* Exclude Geo Location */
  const [excludeGeoLocation, setExcludeGeoLocation] = useState("");
  const excludeGeoLocationChangeHandler = useCallback(
    (value) => setExcludeGeoLocation(value),
    []
  );

  /* Display Schedule: */
  const [displayScheduleSelected, setDisplayScheduleSelected] = useState([
    "all",
  ]);
  const displayScheduleChangeHandler = useCallback(
    (value) => setDisplayScheduleSelected(value),
    []
  );
  const displayScheduleChoices = [
    {
      label: "Always display",
      value: "yes",
    },
    {
      label: "Only display within the given period of time",
      value: "no",
    },
  ];

  useEffect(() => {
    let deviceTarget = deviceTargetSelected.find((selected) => selected);
    let productTarget = productTargeting.find((selected) => selected);
    let customerTarget = customerTargeting.find((selected) => selected);
    let displaySchedule = displayScheduleSelected.find((selected) => selected);
    pullTargetingData({
      displayOnPageData,
      excludePageData,
      deviceTarget,
      productTarget,
      customerTarget,
      geoLocationTarget,
      excludeGeoLocation,
      displaySchedule,
    });
    /*
    return () => {
      cleanup
    }
    */
  }, [
    displayOnPageData,
    excludePageData,
    deviceTargetSelected,
    productTargeting,
    customerTargeting,
    geoLocationTarget,
    excludeGeoLocation,
    displayScheduleSelected,
  ]);

  return (
    <div style={{ minHeight: "350px" }}>
      {/* <h3>Terms Conditions</h3>
            <h2>Step {currentStep}</h2>
            <p>Total Steps: {totalSteps}</p> */}
      <FormLayout>
        <FormLayout.Group>
          <Layout.Section oneHalf>
            <div className="heading-div">
              <Heading>Targeting Configuration</Heading>
            </div>
          </Layout.Section>
        </FormLayout.Group>

        <FormLayout.Group>
          <Layout.Section>
            <DisplayOnPages
              title={"Display on Page:"}
              id={"displayOnPage"}
              displayOnPagePullData={(data) => displayOnPagePullData(data)}
            />
          </Layout.Section>
        </FormLayout.Group>

        <FormLayout.Group>
          <Layout.Section>
            <ExcludePages
              title={"Exclude Page:"}
              id={"excludePage"}
              excludePagePullData={(data) => excludePagePullData(data)}
            />
          </Layout.Section>
        </FormLayout.Group>

        <FormLayout.Group>
          <Layout.Section>
            <SingleChoiceList
              title={"Device Target:"}
              choices={deviceTargetingChoices}
              selected={deviceTargetSelected}
              onChange={(value) => deviceTargetChangeHandler(value)}
              id={"deviceTarget"}
            />
          </Layout.Section>
        </FormLayout.Group>

        <FormLayout.Group>
          <Layout.Section>
            <SingleChoiceList
              title={"Product Targeting:"}
              choices={productTargetingChoices}
              selected={productTargeting}
              onChange={(value) => productTargetingChangeHandler(value)}
              id={"productTargeting"}
            />
          </Layout.Section>
        </FormLayout.Group>

        <FormLayout.Group>
          <Layout.Section>
            <SingleChoiceList
              title={"Customer Targeting:"}
              choices={customerTargetingChoices}
              selected={customerTargeting}
              onChange={(value) => customerTargetingChangeHandler(value)}
              id={"customerTargeting"}
            />
          </Layout.Section>
        </FormLayout.Group>

        <Layout.Section fullWidth>
          <InputElement
            label={
              <UpgradePlanLockIcon
                beforeText={"Geo Location Target:"}
                textColor={"#202223"}
              />
            }
            type={"text"}
            name={"Geo Location Target"}
            id={"geoLocationTarget"}
            value={geoLocationTarget}
            onChange={(value) => geoLocationTargetChangeHandler(value)}
            helpText={
              <span>
                If you want to display for all countries, leave this field blank
              </span>
            }
            // placeholder={"Choose countries you want to target"}
            placeholder={" "}
            disabled={true}
          />
        </Layout.Section>

        <Layout.Section fullWidth>
          <InputElement
            label={
              <UpgradePlanLockIcon
                beforeText={"Exclude Geo Location:"}
                textColor={"#202223"}
              />
            }
            type={"text"}
            name={"Exclude Geo Location"}
            id={"excludeGeoLocation"}
            value={excludeGeoLocation}
            onChange={(value) => excludeGeoLocationChangeHandler(value)}
            helpText={
              <span>
                If you do not want to exlucde any countries, leave this field
                blank
              </span>
            }
            // placeholder={"Choose countries you want to target"}
            placeholder={" "}
            disabled={true}
          />
        </Layout.Section>

        <FormLayout.Group>
          <Layout.Section>
            <SingleChoiceList
              title={
                <UpgradePlanLockIcon
                  beforeText={"Display Schedule:"}
                  textColor={"#202223"}
                />
              }
              id={"displaySchedule"}
              choices={displayScheduleChoices}
              selected={displayScheduleSelected}
              onChange={(value) => displayScheduleChangeHandler(value)}
              disabled={true}
            />
          </Layout.Section>
        </FormLayout.Group>

        {/* <div className="p-relative"> */}
        <FormLayout.Group>
          <Layout.Section oneHalf>
            <ButtonGroup>
              <Button onClick={() => previousStep()}>Previous Step</Button>
              <Button onClick={() => nextStep()}>Next</Button>
            </ButtonGroup>
          </Layout.Section>
        </FormLayout.Group>
        {/* </div> */}
      </FormLayout>
    </div>
  );
};

export default TargetingConfiguration;
