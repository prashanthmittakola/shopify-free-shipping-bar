import { useState, useCallback, useEffect } from "react";
import {
  Button,
  ButtonGroup,
  FormLayout,
  Layout,
  Heading,
} from "@shopify/polaris";
import currencyData from "./currencyData.json";
import InputElement, { SelectBox } from "../../../common/inputElement";
import UpgradePlanLockIcon from "../../../common/upgradePlanLockIcon";

const CurrencyConfiguration = (props) => {
  const {
    pullCurrencyData,
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
  // console.log("CurrencyConfiguration", props);
  // console.log("currencyData==>", currencyData);

  const [currencyValue, setCurrencyValue] = useState("INR");
  const [currencySymbol, setCurrencySymbol] = useState(currencyValue);
  const [currencySymbolPosition, setCurrencySymbolPosition] = useState(
    "before"
  );
  const [autoCurrencyConversion, setAutoCurrencyConversion] = useState("OFF");

  const currencySymbolOptions = [
    { label: "Place symbol before the amount", value: "before" },
    { label: "Place symbol after the amount", value: "after" },
  ];

  const autoCurrencyConversionOptions = [
    { label: "OFF", value: "OFF" },
    { label: "ON", value: "ON" },
  ];

  const handleCurrencyChange = useCallback((value) => {
    setCurrencyValue(value);
    setCurrencySymbol(value);
  }, []);
  const handleCurrencySymbolChange = useCallback((value) => {
    setCurrencySymbol(value);
  }, []);
  const handleCurrencySymbolPositionChange = useCallback((value) => {
    setCurrencySymbolPosition(value);
  }, []);
  const handleAutoCurrencyConversionChange = useCallback((value) => {
    setAutoCurrencyConversion(value);
  }, []);

  useEffect(() => {
    pullCurrencyData({ currencyValue, currencySymbol, currencySymbolPosition });
    /*
    return () => {
      cleanup
    }
    */
  }, [currencyValue, currencySymbol, currencySymbolPosition]);

  return (
    <div>
      {/* <h3>Contact Info</h3>
            <h2>Step {currentStep}</h2>
            <p>Total Steps: {totalSteps}</p>
            <p>Is Active: {isActive}</p> */}

      {/* currencySelectBox */}
      <FormLayout>
        <FormLayout.Group>
          <Layout.Section oneHalf>
            <div className="heading-div">
              <Heading>Currency Configuration</Heading>
            </div>
          </Layout.Section>
        </FormLayout.Group>
        <FormLayout.Group>
          <Layout.Section oneHalf>
            <SelectBox
              label="Currency:"
              id="currencySelectBox"
              selected={currencyValue}
              options={currencyData}
              onChange={(value) => handleCurrencyChange(value)}
            />
          </Layout.Section>
          <Layout.Section oneHalf> </Layout.Section>
        </FormLayout.Group>

        {/* Currency Symbol: */}
        <FormLayout.Group>
          <Layout.Section oneHalf>
            <InputElement
              label="Currency Symbol:"
              type="text"
              name="currencySymbol"
              id="currencySymbol"
              value={currencySymbol}
              onChange={(value) => handleCurrencySymbolChange(value)}
            />
          </Layout.Section>
          <Layout.Section oneHalf></Layout.Section>
        </FormLayout.Group>

        {/* Currency Symbol Position: */}
        <FormLayout.Group>
          <Layout.Section oneHalf>
            <SelectBox
              label="Currency Symbol Position:"
              id="currencySymbolPosition"
              selected={currencySymbolPosition}
              options={currencySymbolOptions}
              onChange={(value) => handleCurrencySymbolPositionChange(value)}
              helpText={
                <span>
                  Eg.{" "}
                  {currencySymbolPosition == "before"
                    ? `${currencySymbol}100`
                    : `100${currencySymbol}`}
                </span>
              }
            />
          </Layout.Section>
          <Layout.Section oneHalf></Layout.Section>
        </FormLayout.Group>

        <FormLayout.Group>
          <Layout.Section oneHalf>
            <SelectBox
              label={
                <UpgradePlanLockIcon beforeText={"Auto Currency Conversion:"} />
              }
              id="UpgradePlanLockIcon"
              selected={autoCurrencyConversion}
              options={autoCurrencyConversionOptions}
              onChange={(value) => handleAutoCurrencyConversionChange(value)}
              helpText={
                <span>
                  NOTE: If Shopify’s native multi-currencies feature is enabled
                  in your store, turn on Auto Currency Conversion in the app.
                  The free shipping target will update when a different currency
                  is selected in Shopify's currency selector.
                </span>
              }
              disabled={true}
            />
          </Layout.Section>
          <Layout.Section oneHalf></Layout.Section>
        </FormLayout.Group>
      </FormLayout>

      <FormLayout>
        <Layout.Section>
          <ButtonGroup>
            <Button onClick={() => previousStep()}>Previous Step</Button>
            <Button onClick={() => nextStep()}>Next Step</Button>
          </ButtonGroup>
        </Layout.Section>
      </FormLayout>
    </div>
  );
};

export default CurrencyConfiguration;
