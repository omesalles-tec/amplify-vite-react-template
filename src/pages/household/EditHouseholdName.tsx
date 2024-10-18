import { clientSchema as client } from "../../utils/clients"; // Fixed the import statement
import { updateHousehold } from "../../../amplify/graphql/mutations";
import Button from "@cloudscape-design/components/button";
import CloudscapeForm from "@cloudscape-design/components/form";
import { useState } from "react";
import Header from "@cloudscape-design/components/header";
import Input from "@cloudscape-design/components/input";

export default function EditHouseholdName({
  household,
  setHousehold,
  setVisible,
}: {
  household: any;
  setVisible: any;
  setHousehold: any;
}) {
  const [newName, setNewName] = useState(household.householdName);
  const action = async () => {
    await client.graphql({
      query: updateHousehold,
      variables: { input: { id: household.id, householdName: newName } },
    });
    setHousehold({ ...household, householdName: newName });
    setVisible(false);
  };
  return (
    <CloudscapeForm header={<Header>Change household name</Header>}>
      <span>New Name</span>
      <Input
        placeholder="Household Name"
        ariaLabel="Household Name"
        type="text"
        name="householdName"
        value={newName}
        onChange={({ detail }) => {
          setNewName(detail.value);
        }}
      />
      <Button onClick={() => action()}>Save</Button>
      <Button onClick={() => setVisible(false)}>Cancel</Button>
    </CloudscapeForm>
  );
}
