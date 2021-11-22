import { useState,useCallback } from "react";
import { ButtonGroup, Button, Toast } from "@shopify/polaris";


const TargetingConfiguration = (props) => {
    const { currentStep, firstStep, goToStep, goToNamedStep, isActive, lastStep, nextStep, previousStep, stepName, totalSteps, transitions } = props;
    // console.log("targetingConfiguration", props);

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

export default TargetingConfiguration;