import { createUser } from "../../../amplify/graphql/mutations";
import { useState } from "react";
import { clientSchema as client } from "../../utils/clients"; // Fixed the import statement
import { Button, Input } from "@aws-amplify/ui-react";
import { Box, SpaceBetween } from "@cloudscape-design/components";
import TagInput from "../../components/TagInput"; // Import the new TagInput component

interface AddAnonymousMemberProps {
  users: any[];
  setUsers: (users: any[]) => void;
  setModal: (value: boolean) => void;
}

const AddAnonymousMember: React.FC<AddAnonymousMemberProps> = ({
  users,
  setUsers,
  setModal,
}) => {
  const [anonymousLabel, setAnonymousLabel] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const householdID = users.length > 0 ? users[0].householdID : "";

  const action = async () => {
    if (anonymousLabel) {
      const newUser = await client.graphql({
        query: createUser,
        variables: {
          input: {
            householdID: householdID,
            anonymousFlag: true,
            adminFlag: false,
            anonymousLabel: anonymousLabel,
            tags: tags,
          },
        },
      });
      console.log(newUser);
      setUsers([...users, newUser.data.createUser]);
      setModal(false);
    } else {
      alert("Name can not be empty");
    }
  };

  return (
    <>
      {householdID && (
        <>
          <Box margin={{ bottom: "s" }}>
            <span>Name</span>
          </Box>
          <Input
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setAnonymousLabel(event.target.value)
            }
            value={anonymousLabel}
            placeholder="Anonymous member name"
            aria-label="Anonymous member name"
            type="text"
            required
          />
          <TagInput tags={tags} setTags={setTags} /> {/* Use TagInput here */}
          <SpaceBetween size="m" direction="horizontal">
            <Button onClick={action}>Submit</Button>
            <Button onClick={() => setModal(false)}>Cancel</Button>
          </SpaceBetween>
        </>
      )}
    </>
  );
};

export default AddAnonymousMember;
