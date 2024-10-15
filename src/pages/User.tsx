import { generateClient } from "aws-amplify/data";
import { useLoaderData } from "react-router-dom";
import type { Schema } from "../../amplify/data/resource";
import { getUser } from "../../amplify/graphql/queries";

const client = generateClient<Schema>();

export async function loader({params}: {params: {id: string}}) {
  const { data } = await client.graphql({
    query: getUser,
    variables: {
      id: params.id,
    },
  });
  
  console.log("user", data.getUser);
  return data.getUser;
}

const User = () => {
  const user = useLoaderData() as { user: Schema["User"] }; // Use indexed access type

  return (
    <>{JSON.stringify(user)}</>
  );
};

export default User;
