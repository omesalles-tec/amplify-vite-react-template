import { generateClient } from "aws-amplify/data";
import { fetchUserAttributes } from "aws-amplify/auth";
import { Form, Link, redirect, useLoaderData, useNavigate } from "react-router-dom";
//import { useState, useEffect } from "react";
import type { Schema } from "../../amplify/data/resource";
import { createUser, deleteUser } from "../../amplify/graphql/mutations";
import { listUsers } from "../../amplify/graphql/queries";
import Table from "@cloudscape-design/components/table";
import {
  AppLayout,
  Box,
  Button,
  Container,
  Header,
  Icon,
  SpaceBetween,
} from "@cloudscape-design/components";

const client = generateClient<Schema>();
export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const label = formData.get("anonymousLabel") as string;
  const householdID = formData.get("householdID") as string;

  const result = await client.graphql({
    query: createUser,
    variables: {
      input: {
        email: "",
        householdID,
        adminFlag: false,
        anonymousFlag: true,
        anonymousLabel: label,
        tags: [],
      },
    },
  });
  return { user: result.data.createUser };
}

export async function loader() {
  const attributes = await fetchUserAttributes();
  const householdID = String(attributes["custom:householdID"]) || "";

  const { data: household } = await client.models.Household.get({
    id: householdID,
  });

  const { data } = await client.graphql({
    query: listUsers,
    variables: {
      filter: {
        householdID: { eq: householdID },
      },
    },
  });

  return { users: data.listUsers.items, household };
}

type LoaderResult = Awaited<ReturnType<typeof loader>>;
const Household = () => {
  const { users, household } = useLoaderData() as LoaderResult;
  const householdID = users[0].householdID;
  const navigate = useNavigate();
  // the editing options should only be available to the admin
  // can I add householdID and adminFlag info to cookie?

  const deleteAnonymousMember = async (item: any ) => {
    try{     
      await client.graphql({
        query: deleteUser,
        variables: {input: {id: item.id}},
      });
      navigate(0);
    } catch(error){
      console.log(error);
    }

  }

  return (
    <AppLayout
      content={
        <>
          <Container header={<Header variant="h2">Household name</Header>}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ marginRight: "10px" }}>{household?.householdName}</div>
              <Form action="edit" style={{ display: "inline" }}>
                <Button formAction="submit">
                  <Icon name="edit" />
                </Button>
              </Form>
            </div>
          </Container>
          <p></p>
          {users && Array.isArray(users) && users && (
            <Table
              columnDefinitions={[
                {
                  id: "email",
                  header: "email",
                  cell: (x) => <Link to={`/edit-user/${x.id}`}>{x.email}</Link>,
                },
                {
                  id: "adminFlag",
                  header: "Household admin",
                  cell: (item) => (
                    <input type="checkbox" checked={item.adminFlag} readOnly/>
                  ),
                },
                {
                  id: "tags",
                  header: "Dietary needs",
                  cell: (item) => item.tags?.join(", ") ?? "",
                },
              ]}
              columnDisplay={[
                { id: "email", visible: true },
                { id: "adminFlag", visible: true },
                { id: "tags", visible: true },
              ]}
              items={users.filter((user) => !user.anonymousFlag)}
              loadingText="Loading resources"
              empty={
                <Box
                  margin={{ vertical: "xs" }}
                  textAlign="center"
                  color="inherit"
                >
                  <SpaceBetween size="m">
                    <b>No resources</b>
                  </SpaceBetween>
                </Box>
              }
              header={<Header>Family members with accounts</Header>}
            />
          )}
          <p></p>
          {users && Array.isArray(users) && (
            <Table
              columnDefinitions={[
                {
                  id: "anonymousLabel",
                  header: "Name",
                  cell: (x) => (
                    <Link to={`/edit-anonymous-user/${x.id}`}>
                      {x.anonymousLabel}
                    </Link>
                  ),
                },
                {
                  id: "tags",
                  header: "Dietary needs",
                  cell: (item) => item.tags?.join(", ") ?? "",
                },
                {
                  id: "deleteAction",
                  header: "",
                  cell: (item) => <span onClick={()=> deleteAnonymousMember(item)}> <Icon name="remove" /></span>,
                },                
              ]}
              columnDisplay={[
                { id: "anonymousLabel", visible: true },
                { id: "tags", visible: true },
                {id:"deleteAction", visible: true}
              ]}
              items={users.filter((user) => user.anonymousFlag)}
              loadingText="Loading resources"
              empty={
                <Box
                  margin={{ vertical: "xs" }}
                  textAlign="center"
                  color="inherit"
                >
                  <SpaceBetween size="m">
                    <b>No resources</b>
                  </SpaceBetween>
                </Box>
              }
              header={<Header>Other members</Header>}
            />
          )}
          <p></p>
          <Form action="add-anonymous-member">
            <input type="text" name="householdID" value={householdID} hidden readOnly/>
            <Button formAction="submit"><Icon name="add-plus" />Add other  members</Button>
          </Form>
        </>
      }
      navigationHide={true}
      toolsHide={true}
    />
  );
};

export default Household;
