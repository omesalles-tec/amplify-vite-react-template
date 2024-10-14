import { generateClient } from "aws-amplify/data";
import { fetchUserAttributes, FetchUserAttributesOutput } from "aws-amplify/auth";
import { Form, useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Schema } from "../../amplify/data/resource";
/*import { createUser } from "../../amplify/graphql/mutations";*/


const client = generateClient<Schema>();

export async function action({request}: {request: Request}) {
  console.log("action", request);
  /*const formData = await request.formData();
  /*const email = formData.get('email') as string;
  const householdID = formData.get('householdID') as string;
  const householdName = formData.get('householdName') as string;

  const result = [] /*await client.graphql({
    query: createUser,
    variables: {
      input: {
        email,
        householdID,
        householdName,
      },
    },
  });
return { user: result.data.createUser };*/
  return null; //{ user: result.data.createUser };
}

export async function loader() {
  const attributes = await fetchUserAttributes();
  console.log("attributes", attributes);
  const { data: users } = await client.models.User.list({
    filter: {
      householdID: {
        eq: String(attributes['custom:householdID']) || "",
      },
    },
  });  
  console.log("users", users);
  return { users };
}

const Household = () => {
  console.log("Household");

  const [attributes, setAttributes] = useState<FetchUserAttributesOutput | null>(null);
  const { users } = useLoaderData() as { users: Schema["User"][] }; // Use indexed access type

  useEffect(() => {
    const getAttributes = async () => {
      const attrs = await fetchUserAttributes();
      setAttributes(attrs);
    };
    getAttributes();
  }, []);

  return (
    <>
      <Form method="post">
        <input type="email" name="email" />
        <input type="text" name="householdID" hidden value={attributes?.householdID}/>
        <input type="text" name="householdName" hidden value={attributes?.householdName}/>
        <button type="submit">Add user</button>
      </Form>
  
      <ul>
        {users && users.map((user) => <li key={user.id}>{user.email}</li>)}
      </ul>
    </>
  );
};

export default Household;
