import { generateClient } from "aws-amplify/data";

import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { getUser } from "../../../amplify/graphql/queries";
import { Schema } from "../../../amplify/data/resource";
import { useState } from "react";
import { Modal } from "@cloudscape-design/components";
import { updateUser } from "../../../amplify/graphql/mutations";

const client = generateClient<Schema>();

export async function loader({ params }: { params: { id: string } }) {
  const { data } = await client.graphql({
    query: getUser,
    variables: {
      id: params.id,
    },
  });

  return data.getUser;
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const id = formData.get("id") as string;
  const tags = [];
  let i = 0;
  while (formData.get(`tag${i}`)) {
    tags[i] = formData.get(`tag${i}`) as string;
    i = i + 1;
  }
  console.log(id, tags);
  await client.graphql({
    query: updateUser,
    variables: {
      input: {
        id: id,
        tags: tags,
      },
    },
  });
  return redirect(`/household`);
}

type LoaderResult = Awaited<ReturnType<typeof loader>>;
export default function EditUser() {
  const user = useLoaderData() as LoaderResult;
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();
  const [tags, setTags] = useState<string[]>(
    user?.tags?.filter((tag): tag is string => tag !== null) || []
  ); // Filter out null values

  // Function to handle the change in each input field
  const handleTagChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newTags = [...tags];
    newTags[index] = event.target.value;
    setTags(newTags);
  };

  // Function to add a new input field
  const handleAddTag = () => {
    const allFilled = tags.every((tag) => tag.trim() !== "");
    if (allFilled) {
      setTags([...tags, ""]);
    } else {
      alert("Please fill out all fields before adding a new one.");
    }
  };

  // Function to delete a specific input field
  const handleDeleteTag = (index: number) => {
    const newTags = tags.map((x) => x);
    newTags.splice(index, 1); // Remove the input at the specified index
    setTags(newTags);
  };

  return (
    user && (
      <Modal
        visible={visible}
        onDismiss={() => {
          setVisible(false);
          navigate(-1);
        }}
      >
        <Form method="post">
          <span>{user.email}</span>
          {tags.map((tag, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <input type="text" name="id" value={user.id} hidden readOnly/>
              <input
                type="text"
                value={tag || ""}
                onChange={(event) => handleTagChange(index, event)}
                placeholder="Tag"
                name={`tag${index}`}
              />
              <button
                type="button"
                onClick={() => handleDeleteTag(index)}
                style={{ marginLeft: "10px" }}
              >
                Delete
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddTag}>
            Add More Tags
          </button>
          <button type="submit">Save</button>
          <button type="button" onClick={() => navigate("/household")}>
            Cancel
          </button>
        </Form>
      </Modal>
    )
  );
}
