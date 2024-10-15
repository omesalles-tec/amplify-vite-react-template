import { generateClient } from "aws-amplify/data";
import { fetchUserAttributes } from "aws-amplify/auth";
import { Form, useLoaderData } from "react-router-dom";
//import { useState, useEffect } from "react";
import type { Schema } from "../../amplify/data/resource";
import { createUser } from "../../amplify/graphql/mutations";
import { listUsers } from "../../amplify/graphql/queries";

const client = generateClient<Schema>();

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const email = formData.get("name") as string;
  const householdID = formData.get("householdID") as string;

  const result = await client.graphql({
    query: createUser,
    variables: {
      input: {
        email,
        householdID,
      },
    },
  });
  return { user: result.data.createUser };
}

export async function loader() {
  const attributes = await fetchUserAttributes();
  console.log("attributes", attributes);
  const householdID = String(attributes["custom:householdID"]) || "";

  const { data } = await client.graphql({
    query: listUsers,
    variables: {
      filter: {
        householdID: { eq: householdID },
      },
    },
  });

  const { data: household } = await client.models.Household.get({
    id: householdID,
  });

  console.log("users", data.listUsers.items);
  console.log("household", household);

  return { users: data.listUsers.items, household };
}

const Household = () => {
  const { users, household } = useLoaderData() as {
    users: Schema["User"][];
    household: Schema["Household"];
  };
  //const [attributes, setAttributes] = useState<FetchUserAttributesOutput | null>(null);
  //const users = useLoaderData() as { users: Schema["User"][] }; // Use indexed access type

  /*useEffect(() => {
    const getAttributes = async () => {
      const attrs = await fetchUserAttributes();
      setAttributes(attrs);
    };
    getAttributes();
  }, []);*/

  return (
    <>
      <h1>Household Name</h1>
      <div>{household.householdName}</div>
      <h1>Members</h1>
      <ul>
        {users &&
          Array.isArray(users) &&
          users
            .filter((user) => !user.anonymousFlag)
            .map((user) => <li key={user.id}>{user.email}</li>)}
      </ul>

      <h1>Anonymous user</h1>
      <ul>
        {users &&
          Array.isArray(users) &&
          users
            .filter((user) => user.anonymousFlag)
            .map((user) => <li key={user.id}>{user.email}</li>)}
      </ul>

      <Form method="post">
        <input type="email" name="email" />
        <button type="submit">Add anonymous member</button>
      </Form>
    </>
  );
};

export default Household;
