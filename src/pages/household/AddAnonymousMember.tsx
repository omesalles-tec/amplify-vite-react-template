import { Form, redirect, useNavigate, useSearchParams } from "react-router-dom";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";
import { createUser } from "../../../amplify/graphql/mutations";
import Modal from "@cloudscape-design/components/modal";
import { useState } from "react";

const client = generateClient<Schema>();

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const householdID = formData.get("householdID") as string;
  const anonymousLabel = formData.get("anonymousMemberName") as string;
  const tags = [];
  let i = 0;
  while (formData.get(`tag${i}`)) {
    tags[i] = formData.get(`tag${i}`) as string;
    i = i + 1;
  }
  await client.graphql({
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
  return redirect(`/household`);
}

export default function AddAnonymousMember() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  const [searchParams, ] = useSearchParams();
  const householdID = searchParams.get('householdID');
  console.log(householdID);
  const [inputs, setInputs] = useState([{ value: "" }]); // State for input fields  //const [submittedData, setSubmittedData] = useState([]); // State to hold submitted data

  // Function to handle the change in each input field
  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newInputs = [...inputs];
    newInputs[index].value = event.target.value;
    setInputs(newInputs);
  };

  // Function to add a new input field
  const handleAddInput = () => {
    const allFilled = inputs.every((input) => input.value.trim() !== "");
    if (allFilled) {
      setInputs([...inputs, { value: "" }]);
    } else {
      alert("Please fill out all fields before adding a new one.");
    }
  };

  // Function to delete a specific input field
  const handleDeleteInput = (index: number) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1); // Remove the input at the specified index
    setInputs(newInputs);
  };

  return (
    <Modal
      visible={visible}
      onDismiss={() => {
        setVisible(false);
        navigate("/household");
      }}
    >
      <Form method="post">
        <span>Name</span>
        <input
          placeholder="Anonymous member name"
          aria-label="Anonymous member name"
          type="text"
          name="anonymousMemberName"
          required
        />
        <input type="text" name="householdID" hidden value={householdID || ''} />
        {inputs.map((input, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <input
              type="text"
              value={input.value}
              onChange={(event) => handleInputChange(index, event)}
              placeholder="Tag"
              name={`tag${index}`}
            />
            <button
              type="button"
              onClick={() => handleDeleteInput(index)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddInput}>
          Add More Tags
        </button>
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate("/household")}>
          Cancel
        </button>
      </Form>
    </Modal>
  );
}
