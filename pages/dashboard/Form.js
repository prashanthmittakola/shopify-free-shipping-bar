import { Card, Toast, Frame, Page, Heading } from '@shopify/polaris';
import React, { useState, } from 'react';
import StepWizard from "react-step-wizard";
import ContentConfiguration from './formSteps/step1';
import CurrencyConfiguration from './formSteps/step2';
import StyleConfiguration from './formSteps/step3';
import TargetingConfiguration from './formSteps/step4';


const Form = (props) => {
    const [previewBarData1,setPreviewBarData1] = useState({});
    let msgBefore1="Free shipping for order over";
    
    const pullData = (data) => {
        // console.log("pullData",data);
        msgBefore1=data.msgBefore1;
    }
    
    return (
        <section style={{ maxWidth: "1000px", margin: "20px auto" }}>
            <Frame>
                <Card sectioned subdued>
                    <Heading>Preview</Heading>
                    <div className="preview-section">
                        <div className="row">
                            <div className="msg1Preview">
                                <div className="preview-bar">
                                    <span>{msgBefore1} </span>
                                    <span className="currency">
                                        <span className="currency-format">{"INR"}</span>
                                        <span className="currency-total">{"1000"}</span>
                                    </span>
                                </div>
                            </div>
                            <div className="msg2Preview">
                                <div className="preview-bar">
                                    <span>Only
                                        <span className="currency">
                                            <span className="currency-format">{"INR"}</span>
                                            <span className="currency-total">{"100"}</span>
                                        </span>
                                        away from free shipping </span>
                                </div>
                            </div>
                            <div className="msg3Preview">
                                <div className="preview-bar">
                                    <span>Congratulations! You've got free shipping</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
                <Card sectioned subdued>
                    {/* HELLOO */}
                    <StepWizard>
                        <ContentConfiguration stepName={"ContentConfiguration"} pullData={pullData}/>
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
