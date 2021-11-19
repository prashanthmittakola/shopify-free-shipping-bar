import React from 'react';
import { DataTable, Page, Card, Heading, ButtonGroup, Button, Badge, Icon } from '@shopify/polaris';
import { DeleteMinor } from '@shopify/polaris-icons';

const data = [1];
let Name = ({ name, active }) => {
    return (
        active ? (
            <> <Badge status="success">Active</Badge> {name} </>
        ) : (
            <> <Badge status="attention">Active</Badge> {name} </>
        )
    )
}


let EditBtnHandler = () => {
    console.log("EditBtnHandler")
}
let DublicateBtnHandler = () => {
    console.log("DublicateBtnHandler")
}
let DeleteBtnHandler = () => {
    console.log("DeleteBtnHandler")
}
let pauseBtnHandler = () => {
    console.log("pauseBtnHandler")
}
let activateHandler = () => {
    console.log("activateHandler")
}

let Actions = (props) => {
    return <ButtonGroup>
        <Button primary size="slim" onClick={() => EditBtnHandler()}>Edit</Button>
        <Button size="slim" onClick={() => DublicateBtnHandler()}>Dublicate</Button>
        {
            props.active ? (
                <Button size="slim" onClick={() => pauseBtnHandler()}><div style={{ minWidth: "50px" }}>{"Pause"}</div></Button>
            ) : (
                <Button size="slim" onClick={() => activateHandler()}><div style={{ minWidth: "50px" }}>{"Active"}</div></Button>
            )
        }
        <Button size="slim" destructive onClick={() => DeleteBtnHandler()}> <Icon source={DeleteMinor} color="base" /> </Button>
    </ButtonGroup>
}

const ListTable = () => {
    const rows = [
        [<Name name={"Bar 01"} active={true} />, 'All Countries', "N/A", <Actions active={true} />, 'Premium only'],
        [<Name name={"Bar 02"} active={false} />, 'All Countries', "N/A", <Actions active={false} />, 'Premium only'],
        [<Name name={"Bar 03"} active={false} />, 'All Countries', "N/A", <Actions active={false} />, 'Premium only'],
        [<Name name={"Bar 04"} active={false} />, 'All Countries', "N/A", <Actions active={false} />, 'Premium only'],
    ];

    return (


        <DataTable
            columnContentTypes={[
                'text',
                'text',
                'text',
                'text',
                'text',
            ]}
            headings={[
                'Name',
                'Geo Target',
                'Excluded Countries',
                'Actions',
                'Achievements',
            ]}
            rows={rows}
        />

    );
}



const createNewBarHandler = () => {
    console.log("createNewBarHandler");
}
const CreateNewBarBtn = () => {
    return <Button primary onClick={() => createNewBarHandler()}>Create new bar</Button>
}

const ShippingBarsListEmpty = () => {
    return (
        <>
            <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Heading>Create your 1st Free Shipping Bar</Heading> <CreateNewBarBtn />
            </div>
            <p> You have 0 free shipping bars in your account. </p>
        </>
    )
}

const ShippingBarsList = () => {
    return (
        <>
            <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Heading>Online store dashboard</Heading> <CreateNewBarBtn />
            </div>
            <ListTable />
        </>
    )
}


const Index = () => {
    return (
        <section style={{ maxWidth: "1000px", margin: "20px auto" }}>
            <Card sectioned subdued>{data.length > 0 ? <ShippingBarsList /> : <ShippingBarsListEmpty />} </Card>
        </section>
    )
}

export default Index
