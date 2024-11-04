import { useState } from "react";
import { createIngredients } from "../../../amplify/graphql/mutations";
import { Button } from "@aws-amplify/ui-react";
import { SpaceBetween } from "@cloudscape-design/components";
import { clientSchema as client } from "../../utils/clients"; // Fixed the import statement
import Form from "@cloudscape-design/components/form";
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import FormField from "@cloudscape-design/components/form-field";
import Input from "@cloudscape-design/components/input";

interface AddIngredientProps {
  ingredients: any[];
  setIngredients: (ingredients: any[]) => void;
  closeModal: () => void;
}

const AddIngredient: React.FC<AddIngredientProps> = ({
  ingredients,
  setIngredients,
  closeModal,
}) => {
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("kg");
  const [maxLifespan, setMaxLifespan] = useState(0);

  const handleSubmit = async () => {
    // update with graphql
    const { data: newItem } = await client.graphql({
      query: createIngredients,
      variables: {
        input: {
          name: name,
          unit: unit,
          maxLifespan: maxLifespan,
        },
      },
    });
    console.log(newItem.createIngredients);
    setIngredients([...ingredients, newItem.createIngredients]);
    closeModal();
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Form
        actions={
          <SpaceBetween direction="horizontal" size="xs">
            <Button formAction="none" variant="link" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </SpaceBetween>
        }
        header={<Header variant="h1">Form header</Header>}
      >
        <Container header={<Header variant="h2">Form container header</Header>}>
          <SpaceBetween direction="vertical" size="l">
            <FormField label="Ingredient Name">
              <Input
                onChange={({ detail }) => setName(detail.value)}
                value={name}
              />
            </FormField>
            <FormField label="Unit">
              <Input
                onChange={({ detail }) => setUnit(detail.value)}
                value={unit}
              />
            </FormField>
            <FormField label="Product life span">
              <Input
                onChange={({ detail }) =>
                  setMaxLifespan(Number.parseInt(detail.value))
                }
                value={String(maxLifespan)}
              />
            </FormField>
          </SpaceBetween>
        </Container>
      </Form>
    </form>
  );
};

export default AddIngredient;
