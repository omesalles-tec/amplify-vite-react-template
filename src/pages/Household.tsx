import { generateClient } from "aws-amplify/data";
import { fetchUserAttributes } from "aws-amplify/auth";
import { Form, Link, useLoaderData } from "react-router-dom";
//import { useState, useEffect } from "react";
import type { Schema } from "../../amplify/data/resource";
import { createUser } from "../../amplify/graphql/mutations";
import { listUsers } from "../../amplify/graphql/queries";
import Table from "@cloudscape-design/components/table";
import { Box, Header, SpaceBetween } from "@cloudscape-design/components";
import { useState } from "react";

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
  console.log("attributes", attributes);
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
  // the editing options should only be available to the admin
  // can I add householdID and adminFlag info to cookie?

  return (
    <>
    <div>
      <h1>Household Name</h1>
      <span>
        {household?.householdName}
        <Form action="edit">
          <button type="submit">Edit</button>
        </Form>
      </span>
      </div>
      {users && Array.isArray(users) && users && (
        <Table
          columnDefinitions={[
            {
              id: "email",
              header: "email",
              cell: (x) => <Link to={`/user/${x.id}`}>{x.email}</Link>,
            },
            {
              id: "adminFlag",
              header: "Household admin",
              cell: (item) => (
                <input type="checkbox" checked={item.adminFlag} />
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
            <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
              <SpaceBetween size="m">
                <b>No resources</b>
              </SpaceBetween>
            </Box>
          }
          header={<Header>Family members with accounts</Header>}
        />
      )}

      <div>

      <Form action="add-anonymous-member">
        <input type="text" name="householdID" value={householdID} hidden />
        <button type="submit">Add another family member</button>
      </Form>
      </div>

      {users && Array.isArray(users) && (
        <Table
          columnDefinitions={[
            {
              id: "anonymousLabel",
              header: "Name",
              cell: (x) => <Link to={`/anonymous-label/${x.id}`}>{x.anonymousLabel}</Link>,
            },
            {
              id: "tags",
              header: "Dietary needs",
              cell: (item) => item.tags?.join(", ") ?? "",
            },
          ]}
          columnDisplay={[
            { id: "anonymousLabel", visible: true },
            { id: "tags", visible: true },
          ]}
          items={users.filter((user) => user.anonymousFlag)}
          loadingText="Loading resources"
          empty={
            <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
              <SpaceBetween size="m">
                <b>No resources</b>
              </SpaceBetween>
            </Box>
          }
          header={<Header>Other family members</Header>}
        />
      )}

    </>
  );
};

export default Household;
