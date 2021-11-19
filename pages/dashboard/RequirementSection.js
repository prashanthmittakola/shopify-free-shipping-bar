import React from 'react';
import { Card, Heading } from '@shopify/polaris';

const RequirementSection = () => {
    return (
        <section style={{ maxWidth: "1000px", margin: "20px auto" }}>
            <Card sectioned subdued>
                <div style={{ marginBottom: "20px" }}>
                    <Heading>[Required] Setup Free Shipping:</Heading>
                </div>
                <p>Follow these steps to setup free shipping with a minimum order value for your Shopify store:</p>
                <ol>
                    <li>Go to <a href="https://panther-prashanth.myshopify.com/admin/settings/shipping" target="_blank" className="admin-settings-shipping-link">Shopify Admin &gt; Settings &gt; Shipping</a></li>
                    <li>Open the relevant Shipping Profile</li>
                    <li>Add a Shipping Zone to this profile</li>
                    <li>Add Shipping Methods to this zone</li>
                    <li>Add a Condition and select "Based on order price"</li>
                    <li>Enter a minimum order price (same as the goal in the Free Shipping Bar App)</li>
                    <li>When you're finished, click "Done"</li>
                </ol>
                <p>You can create a bar by clicking the "Create New Bar" button below</p>
            </Card>
        </section>
    )
}

export default RequirementSection
