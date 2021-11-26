import React, { useEffect, useState } from "react";
import {
  DataTable,
  Page,
  Card,
  Heading,
  ButtonGroup,
  Button,
  Badge,
  Icon,
} from "@shopify/polaris";
import { DeleteMinor } from "@shopify/polaris-icons";

const data = [1];
let Name = ({ name, active }) => {
  return active ? (
    <>
      {" "}
      <Badge status="success">Active</Badge> {name}{" "}
    </>
  ) : (
    <>
      {" "}
      <Badge status="attention">Active</Badge> {name}{" "}
    </>
  );
};

let EditBtnHandler = (data) => {
  const { id } = data;
  fetch(`../api/formSubmit/${id}`)
    .then((data) => data.json())
    .then((data) => console.log({ data }));
};
let DublicateBtnHandler = (props) => {
  console.log("DublicateBtnHandler", props);
};
let DeleteBtnHandler = (props) => {
  console.log("DeleteBtnHandler", props);
};
let pauseBtnHandler = (props) => {
  console.log("pauseBtnHandler", props);
};
let activateHandler = (props) => {
  console.log("activateHandler", props);
};

let Actions = (props) => {
  return (
    <ButtonGroup>
      <Button primary size="slim" onClick={() => EditBtnHandler(props)}>
        Edit
      </Button>
      <Button size="slim" onClick={() => DublicateBtnHandler(props)}>
        Dublicate
      </Button>
      {props.active ? (
        <Button size="slim" onClick={() => pauseBtnHandler(props)}>
          <div style={{ minWidth: "50px" }}>{"Pause"}</div>
        </Button>
      ) : (
        <Button size="slim" onClick={() => activateHandler(props)}>
          <div style={{ minWidth: "50px" }}>{"Active"}</div>
        </Button>
      )}
      <Button size="slim" destructive onClick={() => DeleteBtnHandler(props)}>
        {" "}
        <Icon source={DeleteMinor} color="base" />{" "}
      </Button>
    </ButtonGroup>
  );
};

const ListTable = () => {
  const [barsList, setBarsList] = useState([]);

  useEffect(() => {
    fetch("../api/formSubmit")
      .then((data) => data.json())
      .then((data) => {
        setBarsList(data);
      });
  }, []);

  const rows = barsList.map((item, index) => {
    const { barName, _id: id } = item;
    return [
      <Name name={barName} active={index === 0 ? true : false} />,
      "All Countries",
      "N/A",
      <Actions id={id} active={index === 0 ? true : false} />,
      "Premium only",
    ];
  });

  return (
    <DataTable
      columnContentTypes={["text", "text", "text", "text", "text"]}
      headings={[
        "Name",
        "Geo Target",
        "Excluded Countries",
        "Actions",
        "Achievements",
      ]}
      rows={rows}
    />
  );
};

const CreateNewBarBtn = () => {
  const createNewBarHandler = () => {
    console.log("createNewBarHandler");
  };

  return (
    <Button primary onClick={() => createNewBarHandler()}>
      Create new bar
    </Button>
  );
};

const ShippingBarsListEmpty = () => {
  return (
    <>
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Heading>Create your 1st Free Shipping Bar</Heading> <CreateNewBarBtn />
      </div>
      <p> You have 0 free shipping bars in your account. </p>
    </>
  );
};

const ShippingBarsList = () => {
  return (
    <>
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Heading>Online store dashboard</Heading> <CreateNewBarBtn />
      </div>
      <ListTable />
    </>
  );
};

const Index = () => {
  return (
    <section style={{ maxWidth: "1000px", margin: "20px auto" }}>
      <Card sectioned subdued>
        {data.length > 0 ? <ShippingBarsList /> : <ShippingBarsListEmpty />}{" "}
      </Card>
    </section>
  );
};

export default Index;
