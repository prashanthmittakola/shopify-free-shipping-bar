import { useState,useCallback } from "react";
import { Card, ButtonGroup, Button, Toast, Frame, Page, TextField, FormLayout, Icon, Heading } from '@shopify/polaris';
import { LockMajor, LockMinor } from '@shopify/polaris-icons';
import InputElement from "../../../common/inputElement";

const ContentConfiguration = (props) => {
    const { currentStep, firstStep, goToStep, goToNamedStep, isActive, lastStep, nextStep, previousStep, stepName, totalSteps, transitions } = props;

    const [name, setName] = useState("");
    const [currencyFormat, setCurrencyFormat] = useState("INR");
    const [freeShippingGoal, setFreeShippingGoal] = useState(100);
    const [msgBefore1, setMsgBefore1] = useState("Free shipping for orders over");
    const [msgAfter1, setMsgAfter1] = useState("");
    props.pullData({ currencyFormat, freeShippingGoal, msgBefore1, msgAfter1 });

    const handleNameChange = useCallback((newValue) => {
        setName(newValue);
    }, []);

    const handleFreeShippingGoalChange = useCallback((newValue) => {
        setFreeShippingGoal(newValue);
    }, []);

    const handleMsgBefore1Change = useCallback((newValue) => {
        setMsgBefore1(newValue);
    }, []);

    const handleMsgAfter1Change = useCallback((newValue) => {
        setMsgAfter1(newValue);
    }, []);

    // console.log("ContentConfiguration", props);
    return (
        <div>
            {/* <h3>Basic Info</h3>
            <h2>Step {currentStep}</h2>
            <p>Total Steps: {totalSteps}</p>
            <p>Is Active: {isActive}</p> */}
            <FormLayout>

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
                    <span className="lock-icon"><Icon source={LockMinor} color="base" /></span><a href="#" onClick={() => { return false; }}>Upgrade</a>
                </ButtonGroup>

                <FormLayout.Group condensed>
                    <InputElement
                        label="Initial Message :: Before money:"
                        type="text"
                        name="msgBefore1"
                        id="msgBefore1"
                        value={msgBefore1}
                        onChange={(value) => handleMsgBefore1Change(value)}
                        helpText={
                            <span>
                                Display when cart is empty.
                            </span>
                        }
                        placeholder="Initial Message"
                    />
                    <div style={{ minWidth: "100px", margin: "0 auto" }}>
                        <label className="Polaris-Label__Text">Amount:</label>
                        <Heading>{currencyFormat} {freeShippingGoal}</Heading>
                    </div>
                    <InputElement
                        label="After money:"
                        type="text"
                        name="msgAfter1"
                        id="msgAfter1"
                        value={msgAfter1}
                        onChange={(value) => handleMsgAfter1Change(value)}
                        helpText={
                            <span>
                                Display when cart is empty.
                            </span>
                        }
                        placeholder=" "
                    />
                </FormLayout.Group>

            </FormLayout>

            <div style={{ marginTop: "20px" }}>
                <ButtonGroup >
                    <Button onClick={() => previousStep()}>Previous Step</Button>
                    <Button onClick={() => nextStep()}>Finish</Button>
                </ButtonGroup>
            </div>
        </div>
    )
}

export default ContentConfiguration;