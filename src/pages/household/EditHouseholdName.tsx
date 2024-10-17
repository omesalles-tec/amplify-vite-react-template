import {
  Form as RouterForm,
  useLoaderData,
  redirect,
  useNavigate,
} from "react-router-dom";
import { fetchUserAttributes } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";
import { getHousehold } from "../../../amplify/graphql/queries";
import { updateHousehold } from "../../../amplify/graphql/mutations";
import Modal from "@cloudscape-design/components/modal";
import Button from "@cloudscape-design/components/button";
import CloudscapeForm from "@cloudscape-design/components/form";
import { useState } from "react";
import Header from "@cloudscape-design/components/header";
import Input from "@cloudscape-design/components/input";

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
  const [newName, setNewName] = useState(household?.householdName || "");

  return (
    <Modal
      visible={visible}
      onDismiss={() => {
        setVisible(false);
        navigate("/household");
      }}
    >
      <RouterForm method="post">
        <CloudscapeForm header={<Header>Change household name</Header>}>
          <span>New Name</span>
          <Input
            placeholder="Household Name"
            ariaLabel="Household Name"
            type="text"
            name="householdName"
            value={newName}
            onChange={({ detail }) => setNewName(detail.value)}
          />
          <input type="text" name="id" hidden value={household?.id} readOnly />
          <Button formAction="submit">Save</Button>
          <Button onClick={() => navigate(-1)}>Cancel</Button>
        </CloudscapeForm>
      </RouterForm>
    </Modal>
  );
}
