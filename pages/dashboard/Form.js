import { Card, ButtonGroup, Button, Toast, Frame, Page } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';
import StepWizard from "react-step-wizard";

const ContentConfiguration = (props) => {
    const {currentStep,firstStep,goToStep,goToNamedStep,isActive,lastStep,nextStep,previousStep,stepName,totalSteps,transitions} = props;
    console.log("ContentConfiguration", props);
    return (
        <div>
            <h3>Basic Info</h3>
            <h2>Step {currentStep}</h2>
            <p>Total Steps: {totalSteps}</p>
            <p>Is Active: {isActive}</p>
            <input type="text"></input>
            <input type="number"></input>
            <input type="email"></input>
            <ButtonGroup>
                <Button onClick={() => previousStep()}>Previous Step</Button>
                <Button onClick={() => nextStep()}>Finish</Button>
            </ButtonGroup>
        </div>
    )
}
const CurrencyConfiguration = (props) => {
    const {currentStep,firstStep,goToStep,goToNamedStep,isActive,lastStep,nextStep,previousStep,stepName,totalSteps,transitions} = props;
    console.log("CurrencyConfiguration", props);
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
const StyleConfiguration = (props) => {
    const {currentStep,firstStep,goToStep,goToNamedStep,isActive,lastStep,nextStep,previousStep,stepName,totalSteps,transitions} = props;
    console.log("StyleConfiguration", props);
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
const TargetingConfiguration = (props) => {
    const {currentStep,firstStep,goToStep,goToNamedStep,isActive,lastStep,nextStep,previousStep,stepName,totalSteps,transitions} = props;
    console.log("targetingConfiguration", props);

    const [active, setActive] = useState(false);
    const toggleActive = useCallback(() => setActive((active) => !active), []);
    const toastMarkup = active ? (
        <Toast content="Message sent" onDismiss={toggleActive} />
    ) : null;

    return (
        <div>
            <h3>Terms Conditions</h3>
            <h2>Step {currentStep}</h2>
            <p>Total Steps: {totalSteps}</p>
            <input type="text"></input>
            <input type="number"></input>
            <input type="email"></input>
            <ButtonGroup>
                <Button onClick={() => previousStep()}>Previous Step</Button>
                <Button onClick={() => toggleActive()}>Finish</Button>
            </ButtonGroup>
            {toastMarkup}
        </div>
    )
}

const Form = (props) => {
    return (
        <section style={{ maxWidth: "1000px", margin: "20px auto" }}>
            <Frame>
                <Card sectioned subdued>
                    <StepWizard>
                        <ContentConfiguration stepName={"ContentConfiguration"} />
                        <CurrencyConfiguration stepName={"CurrencyConfiguration"} />
                        <StyleConfiguration stepName={"StyleConfiguration"} />
                        <TargetingConfiguration stepName={"targetingConfiguration"} />
                    </StepWizard>
                </Card>
            </Frame>
        </section>
    )
}

export default Form
