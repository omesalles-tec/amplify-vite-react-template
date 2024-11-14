import { useState } from "react";
import { createItems } from "../../../amplify/graphql/mutations";
import { Button } from "@aws-amplify/ui-react";
import {
  Select,
  SpaceBetween,
  SelectProps
} from "@cloudscape-design/components";
import { clientSchema as client } from "../../utils/clients"; // Fixed the import statement
import Form from "@cloudscape-design/components/form";
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import FormField from "@cloudscape-design/components/form-field";
import Input from "@cloudscape-design/components/input";
import supermarkets from "../../utils/supermakets";

interface AddItemProps {
  ingredientId: string;
  closeModal: () => void;
}

const AddItem: React.FC<AddItemProps> = ({ ingredientId, closeModal }) => {
  const [description, setDescription] = useState("");
  const [changeOfUnit, setChangeOfUnit] = useState("1");
  const [link, setLink] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [supermarket, setSupermarket] = useState<SelectProps.Option | null>({
    label: supermarkets["1"],
    value: "1",
  });
  const [unit, setUnit] = useState("kg");

  const handleSubmit = async () => {
    // update with graphql
    await client.graphql({
      query: createItems,
      variables: {
        input: {
          description: description,
          unit: unit,
          price: parseFloat(price),
          quantity: parseFloat(quantity),
          link: link,
          supermarketId: supermarket ? Number(supermarket.value) : 1,
          changeOfUnit: changeOfUnit,
          ingredientId: ingredientId,
        },
      },
    });
    closeModal();
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Form
        actions={
          <SpaceBetween direction="horizontal" size="xs">
            <Button formAction="none" onClick={closeModal}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </SpaceBetween>
        }
        header={<Header variant="h1">Form header</Header>}
      >
        <Container header={<Header variant="h2">Form container header</Header>}>
          <SpaceBetween direction="vertical" size="l">
            <FormField label="Item description">
              <Input
                onChange={({ detail }) => setDescription(detail.value)}
                value={description}
              />
            </FormField>
            <FormField label="Link">
              <Input
                onChange={({ detail }) => setLink(detail.value)}
                value={link}
              />
            </FormField>
            <FormField label="Unit">
              <Input
                onChange={({ detail }) => setUnit(detail.value)}
                value={unit}
              />
            </FormField>
            <FormField label="Price">
              <Input
                onChange={({ detail }) =>
                  setPrice(detail.value)
                }
                value={String(price)}
              />
            </FormField>
            <FormField label="Quantity">
              <Input
                onChange={({ detail }) =>
                  setQuantity(detail.value)
                }
                value={String(quantity)}
              />
            </FormField>
            <FormField label="Unit transformation">
              <Input
                onChange={({ detail }) => setChangeOfUnit(detail.value)}
                value={changeOfUnit}
              />
            </FormField>
            <FormField label="Supermarket">
              <Select
                selectedOption={supermarket}
                onChange={({ detail }) => {console.log(detail.selectedOption); setSupermarket(detail.selectedOption)}}
                options={ Object.keys(supermarkets).map(function (key) {
                  return { 
                    value: key, 
                    label: supermarkets[key as keyof typeof supermarkets] || 'Unknown'
                  };
                })}
              />
            </FormField>
          </SpaceBetween>
        </Container>
      </Form>
    </form>
  );
};

export default AddItem;
