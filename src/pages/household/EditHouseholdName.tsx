import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { fetchUserAttributes } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";
import { getHousehold } from "../../../amplify/graphql/queries";
import { updateHousehold } from "../../../amplify/graphql/mutations";
import Modal from "@cloudscape-design/components/modal";
import { useState } from "react";

const client = generateClient<Schema>();

export async function loader() {
  const attributes = await fetchUserAttributes();
  const householdID = String(attributes["custom:householdID"]) || "";
  const result = await client.graphql({
    query: getHousehold,
    variables: { id: householdID },
  });
  return { household: result.data.getHousehold };
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const householdName = formData.get("householdName") as string;
  const id = formData.get("id") as string;
  await client.graphql({
    query: updateHousehold,
    variables: { input: { id, householdName } },
  });
  return redirect(`/household`);
}

type LoaderResult = Awaited<ReturnType<typeof loader>>;

export default function EditHouseholdName() {
  const { household } = useLoaderData() as LoaderResult;
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);

  return (
    <Modal
      visible={visible}
      onDismiss={() => {
        setVisible(false);
        navigate("/household");
      }}
    >
      <Form method="post">
        <p>
          <span>Name</span>
          <input
            placeholder="Household Name"
            aria-label="Household Name"
            type="text"
            name="householdName"
            defaultValue={household?.householdName}
          />
          <input type="text" name="id" hidden value={household?.id} />
        </p>
        <p>
          <button type="submit">Save</button>
          <button type="button" onClick={() => navigate("/household")}>
            Cancel
          </button>
        </p>
      </Form>
    </Modal>
  );
}
