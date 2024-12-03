import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";
import { listItemsByIngredientId } from "../../../amplify/graphql/queries";
import Table from "@cloudscape-design/components/table";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Header from "@cloudscape-design/components/header";
import Link from "@cloudscape-design/components/link";
import supermarkets from "../../utils/supermakets";
import { useCollection } from "@cloudscape-design/collection-hooks";
import { capitalizeFirstLetter } from "../../utils/functions";
import { Button, Icon, Modal, Popover } from "@cloudscape-design/components";
import AddItem from "../items/AddItem";

const client = generateClient<Schema>();

export default function Items() {
  const [data, setData] = useState<any>([]);
  const { uuid } = useParams<string>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { items, collectionProps } = useCollection(data, {
    filtering: {},
    pagination: { pageSize: 1000 },
    sorting: {},
    selection: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const temp = await client.graphql({
          query: listItemsByIngredientId,
          variables: {
            ingredientId: uuid || "",
          },
        });
        if (temp.data && temp.data.listItemsByIngredientId) {
          setData(temp.data.listItemsByIngredientId.items);
        }
        // Update data state
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchData();
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Table
        {...collectionProps}
        columnDefinitions={[
          {
            id: "supermarket",
            header: "Supermarket",
            cell: (item: any) =>
              capitalizeFirstLetter(
                supermarkets[item.supermarketId as keyof typeof supermarkets]
              ) || "-",
            sortingField: "supermarket",
          },
          {
            id: "description",
            header: "Description",
            cell: (item: any) => (
              <Link external href={item.link || "-"} target="_blank">
                {item.description}
              </Link>
            ),
          },
          {
            id: "price_per_unit",
            header: "Price per unit",
            sortingField: "price_per_unit",
            cell: (item: any) =>
              Math.round((100 * Number(item.price)) / Number(item.quantity)) /
              100,
            minWidth: 100,
          },
          {
            id: "quantity",
            header: "Size",
            cell: (item: any) => item.quantity,
          },
          {
            id: "unit",
            header: "Unit",
            cell: (item: any) => item.unit,
          },
          {
            id: "transformUnit",
            header: (
              <>
                Unit transformation{" "}
                <Popover
                  triggerType="custom"
                  content="If the item unit doesn't match the ingredient unit you need to write an equivalent, for instance 0.5kg/l"
                  dismissButton={false} // Hides the close button for a cleaner tooltip look
                  position="right" // Positions the tooltip to the right of the icon
                >
                  <Icon name="status-info" variant="subtle" />
                </Popover>
              </>
            ),
            cell: (item: any) => item.changeOfUnit,
          },
          {
            id: "price",
            header: "Item price",
            cell: (item: any) => item.price,
          },
        ]}
        items={items}
        loadingText="Loading resources"
        empty={
          <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
            <SpaceBetween size="m">
              <b>No resources</b>
            </SpaceBetween>
          </Box>
        }
        header={
          <Header
            actions={
              <SpaceBetween size="xs" direction="horizontal">
                <Button
                  variant="primary"
                  onClick={() => {
                    setIsModalOpen(!isModalOpen);
                  }}
                >
                  Add new item
                </Button>
              </SpaceBetween>
            }
          >
            {" "}
            Items for ingredient {uuid}
          </Header>
        }
      />
      {isModalOpen && (
        <Modal
          onDismiss={handleCloseModal}
          visible={isModalOpen}
          closeAriaLabel="Close"
          header="Item Details"
        >
          <AddItem
            ingredientId={uuid || ''}
            closeModal={handleCloseModal}
          />
        </Modal>
      )}
    </>
  );
}
