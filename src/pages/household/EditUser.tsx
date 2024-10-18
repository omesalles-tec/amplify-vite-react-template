import { useState } from "react";
import { updateUser } from "../../../amplify/graphql/mutations";
import { Button } from "@aws-amplify/ui-react";
import { Box, SpaceBetween } from "@cloudscape-design/components";
import { clientSchema as client } from "../../utils/clients"; // Fixed the import statement
import TagInput from "../../components/TagInput"; // Import the new TagInput component

interface EditUserProps {
  users: any[];
  userID: string;
  setUsers: (users: any[]) => void;
  closeModal: () => void;
}

const EditUser: React.FC<EditUserProps> = ({
  users,
  userID,
  setUsers,
  closeModal,
}) => {
  const user = users.find((x: any) => x.id === userID);
  const [tags, setTags] = useState<string[]>(
    user?.tags?.filter((tag: string): tag is string => tag !== null) || []
  ); 

  function updateUserTags(
    theUsers: any,
    theUserID: string,
    theNewTags: string[]
  ) {
    // Create a deep copy of the array and its objects
    const newArray = theUsers.map((item: any) => ({
      ...item,
      tags: [...item.tags],
    }));
    const obj = newArray.find((item: any) => item.id === theUserID);

    // If the object is found, update its "d" field
    if (obj) {
      obj.tags = theNewTags;
    } else {
      console.log(`No object found with c = "${theUserID}"`);
    }
    // Return the updated array
    return newArray;
  }

  const action = async () => {
    await client.graphql({
      query: updateUser,
      variables: {
        input: {
          id: userID,
          tags: tags,
        },
      },
    });
    setUsers(updateUserTags(users, userID, tags));
    closeModal();
  };

  return (
    <>
      <Box margin={{ bottom: "s" }}>
          <span>{user.email || user.anonymousLabel}</span>
      </Box>

      <TagInput tags={tags} setTags={setTags} /> {/* Use TagInput here */}

      <SpaceBetween size="m" direction="horizontal">
        <Button onClick={action}>Submit</Button>
        <Button onClick={closeModal}>Cancel</Button>
      </SpaceBetween>
    </>
  );
};

export default EditUser;
