import { useState } from "react";
import { Button, ButtonGroup } from "@shopify/polaris";

const CurrencyConfiguration = (props) => {
    const { currentStep, firstStep, goToStep, goToNamedStep, isActive, lastStep, nextStep, previousStep, stepName, totalSteps, transitions } = props;
    // console.log("CurrencyConfiguration", props);
    return (
        <div>
            <h3>Contact Info</h3>
            <h2>Step {currentStep}</h2>
            <p>Total Steps: {totalSteps}</p>
            <p>Is Active: {isActive}</p>
            <input type="text"></input>
            <input type="number"></input>
            <input type="email"></input>
            <ButtonGroup>
                <Button onClick={() => previousStep()}>Previous Step</Button>
                <Button onClick={() => nextStep()}>Next Step</Button>
            </ButtonGroup>
        </div>
    )
}

export default CurrencyConfiguration;