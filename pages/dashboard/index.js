import { useState, useEffect } from "react";
import {
    Stack,
    Heading,
    Page,
    Icon,
    Checkbox,
    Card,
    Layout,
    ButtonGroup,
    Button,
    PageActions,
    FooterHelp,
} from "@shopify/polaris";
import menu from "../../config/menu";
import Link from "next/link";
import { useRouter } from 'next/router';
import RequirementSection from "./RequirementSection";
import FreeShippingBarsList from "./FreeShippingBarsList";
import Form from "./Form";

const Footer = () => {
    return <FooterHelp>
        Learn more about{' '}
        <Link external href="#">
            <a target="_blank">
                Free shipping Bar
            </a>
        </Link>
    </FooterHelp>
}

const Index = (props) => {
    const router = useRouter();
    return (
        <>
            {/* "WELCOME TO DASH BOARD" */}
            <div style={{ "margin": "10px" }}>
                {menu.map(item => {
                    return (
                        <div key={item.name} style={{ display: "inline-block", "marginRight": "20px" }}>
                            <Button>
                                <Link href={item.url}>
                                    <span>{item.name}</span>
                                </Link>
                            </Button>
                        </div>
                    )
                })}
            </div>
            <hr style={{ borderTop: "1px solid #c1c1c1" }} />
            <RequirementSection />
            <FreeShippingBarsList />
            <Form></Form>
            <Footer />
        </>
    );
}

export default Index;