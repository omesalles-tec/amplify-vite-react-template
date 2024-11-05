"use client";
import {
  AppLayout,
  Container,
  ContentLayout,
  Input,
  Header,
  Link,
} from "@cloudscape-design/components";
import { useState, useEffect } from "react";
import { IngredientsShoppingLists } from "../../../amplify/graphql/API";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";
import Table from "@cloudscape-design/components/table";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import TextFilter from "@cloudscape-design/components/text-filter";
import { useCollection } from "@cloudscape-design/collection-hooks";
import debounce from "../../utils/debounce";

import {
  createIngredientsShoppingLists,
  createPendingCalculations,
  deleteIngredientsShoppingLists,
  updateIngredientsShoppingLists,
  updatePendingCalculations,
} from "../../../amplify/graphql/mutations";
import { fetchUserAttributes } from "aws-amplify/auth";
import Form from "@cloudscape-design/components/form";
import { listIngredients } from "../../../amplify/graphql/queries";


const client = generateClient<Schema>();
let userAttributes: any;

export default function ShoopingListPage() {
  const [allShoppingLists, setAllShoppingLists] = useState<
    IngredientsShoppingLists[]
  >([]);

  const [currentSelection, setCurrentSelection] = useState<any>();
  const [allIngredients, setAllIngredients] = useState<any>([]);

  useEffect(() => {
    const dataLoader = async () => {
      userAttributes = await fetchUserAttributes();
      const sub = client.models.IngredientsShoppingLists.observeQuery({
        filter: {
          householdId: { eq: userAttributes["custom:householdID"] },
        },
      }).subscribe({
        next: ({ items }) => {
          setAllShoppingLists(
            items.map((item) => ({
              ...item,
              __typename: "IngredientsShoppingLists",
            }))
          );
        },
      });
      const { data: ingredientsData } = await client.graphql({
        query: listIngredients,
        variables: {
          limit: 1000,
        },
      });
      setAllIngredients(ingredientsData.listIngredients.items);
      return () => sub.unsubscribe();
    };
    dataLoader();
  }, []);

  return (
    <>
      <AppLayout
        navigationOpen={true}
        navigation={
          <MySideNavigationTable
            items={allShoppingLists}
            setItems={setAllShoppingLists}
            currentSelection={currentSelection}
            setCurrentSelection={setCurrentSelection}
          />
        }
        toolsHide={true}
        content={
          <MainContent
            items={allShoppingLists}
            currentSelection={currentSelection}
            setCurrentSelection={setCurrentSelection}
            ingredients={allIngredients}
          />
        }
      />
    </>
  );
}

const MainContent: React.FC<{
  items: any;
  currentSelection: any;
  setCurrentSelection: any;
  ingredients: any;
}> = ({ items, currentSelection, setCurrentSelection, ingredients }) => {
  return (
    currentSelection && (
      <ContentLayout
        header={
          <Header variant="h1" info={<Link variant="info">Info</Link>}>
            {`Add ingredients to "${currentSelection[0]["name"]}"`}
          </Header>
        }
      >
        <SpaceBetween direction="horizontal" size="xs">
          <IngredientsTable
            ingredients={ingredients}
            shoppingListSelected={currentSelection}
            setShoppingListSelected={setCurrentSelection}
          />
          <ThisListTable
            shoppingListItems={items}
            shoppingListSelected={currentSelection}
            setShoppingListSelected={setCurrentSelection}
          />
        </SpaceBetween>
      </ContentLayout>
    )
  );
};

const ThisListTable: React.FC<{
  shoppingListItems: any;
  shoppingListSelected: any;
  setShoppingListSelected:any
}> = ({ shoppingListItems, shoppingListSelected, setShoppingListSelected }) => {
  const thisShoppingList =
  shoppingListSelected.length > 0
      ? shoppingListItems.filter((x: any) => x.id === shoppingListSelected[0].id)
      : []; // Handle case when currentSelection is empty

  const tableOfIngredients =
  shoppingListSelected.length > 0
      ? ((thisShoppingList.length > 0 && thisShoppingList[0]["ingredientsId"]) || []).reduce(
          (acc: any, element: any, index: any) => {
            return [
              ...acc,
              {
                id: element,
                name: thisShoppingList[0]["ingredientsName"][index],
                quantity: thisShoppingList[0]["ingredientsQty"]
                  ? thisShoppingList[0]["ingredientsQty"][index]
                  : 1,
              },
            ];
          },
          []
        )
      : [];

  const { items, filterProps } = useCollection(tableOfIngredients, {
    filtering: {},
    pagination: { pageSize: 300 },
    sorting: {},
    selection: {},
  });

  const handleQtyChange = debounce(async (thisItem: any, newValue: number) => {
    const newShoppingListSelected = structuredClone(shoppingListSelected);
    newShoppingListSelected[0]["ingredientsQty"] = newShoppingListSelected[0]["ingredientsId"].map(
      (x: any, i: any) => {
        return x !== thisItem.id
          ? newShoppingListSelected[0]["ingredientsQty"][i]
          : newValue;
      }
    );

    await client.graphql({
      query: updateIngredientsShoppingLists,
      variables: {
        input: {
          id: newShoppingListSelected[0].id,
          ingredientsQty: newShoppingListSelected[0]["ingredientsQty"],
        },
      },
    });
    setShoppingListSelected(newShoppingListSelected);
  },
  500);

  const handleDelete = async (thisItem: any) => {
    const newShoppingListSelected = structuredClone(shoppingListSelected)
    newShoppingListSelected[0]["ingredientsName"] = newShoppingListSelected[0]["ingredientsName"].filter(
      (_x: any, i: any) =>
        newShoppingListSelected[0]["ingredientsId"][i] !== thisItem.id
    );
    
    newShoppingListSelected[0]["ingredientsQty"] = newShoppingListSelected[0]["ingredientsQty"].filter(
      (_x: any, i: any) =>
        newShoppingListSelected[0]["ingredientsId"][i] !== thisItem.id
    );

    newShoppingListSelected[0]["ingredientsId"] = newShoppingListSelected[0]["ingredientsId"].filter(
      (x: any) => x !== thisItem.id
    );
    await client.graphql({
      query: updateIngredientsShoppingLists,
      variables: {
        input: {
          id: newShoppingListSelected[0].id,
          ingredientsId: newShoppingListSelected[0]["ingredientsId"],
          ingredientsName: newShoppingListSelected[0]["ingredientsName"],
          ingredientsQty: newShoppingListSelected[0]["ingredientsQty"],
        },
      },
    });
    setShoppingListSelected(newShoppingListSelected);
  };

  const handleSubmit = async () => {
    console.log(shoppingListSelected);
    try{
      const result = await client.graphql({
        query: createPendingCalculations,
        variables:{
          input:{
            id: shoppingListSelected[0].id,
            householdId: shoppingListSelected[0].householdId,
            name: shoppingListSelected[0].name,
          }
        }
      })
      console.log(result);
    }catch(error){
      console.log(error)
      await client.graphql({
        query: updatePendingCalculations,
        variables:{
          input:{
            id:shoppingListSelected[0].id,
          }
        }
      })
    }
  }

  return (
    <SpaceBetween size="m" direction="vertical" >

    <Table
      columnDefinitions={[
        {
          id: "id",
          header: "",
          cell: (e: any) => e.id,
        },
        {
          id: "name",
          header: "Ingredient",
          cell: (e: any) => e.name,
        },
        {
          id: "quantity",
          header: "Quantity",
          cell: (e) => (
            <Input
              type="number"
              inputMode={"numeric"}
              step={0.1}
              onChange={({ detail }) =>
                handleQtyChange(e, Number(detail.value))
              }
              value={e.quantity}
            />
          ),
        },
        {
          id: "delete",
          header: "",
          cell: (e) => (
            <Button onClick={() => handleDelete(e)} iconName="remove" />
          ),
        },
      ]}
      columnDisplay={[
        { id: "id", visible: false },
        { id: "name", visible: true },
        { id: "quantity", visible: true },
        { id: "delete", visible: true },
      ]}
      enableKeyboardNavigation
      items={items}
      loadingText="Loading resources"
      trackBy="name"
      empty={
        <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
          <SpaceBetween size="m">
            <b>No resources</b>
          </SpaceBetween>
        </Box>
      }
      filter={
        <TextFilter
        {...filterProps}
        filteringAriaLabel="Filter ingredients"
        filteringPlaceholder="Find ingredients"
        filteringClearAriaLabel="Clear"
        />
      }
      header={<Header>Your shopping list</Header>}
      />
      <Button onClick={handleSubmit}>Submit shopping list</Button>
    </SpaceBetween>
  );
};

const IngredientsTable: React.FC<{
  ingredients: any;
  shoppingListSelected: any;
  setShoppingListSelected: any;
}> = ({ ingredients, shoppingListSelected, setShoppingListSelected }) => {
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const { items, filterProps } = useCollection(ingredients, {
    filtering: {},
    pagination: { pageSize: 300 },
    sorting: {},
    selection: {},
  });
  const addingSelected = async () => {
    if (selectedItems.length > 0) {
      const newShoppingListSelected = structuredClone(shoppingListSelected);
      if (!newShoppingListSelected[0]["ingredientsId"]) {
        newShoppingListSelected[0]["ingredientsId"]=[];
        newShoppingListSelected[0]["ingredientsName"]=[];
        newShoppingListSelected[0]["ingredientsQty"]=[];
      }
      for (const x of selectedItems){
        const i = newShoppingListSelected[0]["ingredientsId"].findIndex((y: any) => y === x.id);
        if (i >= 0){
          newShoppingListSelected[0]["ingredientsQty"][i]++;
        }else{
          newShoppingListSelected[0]["ingredientsId"].push(x.id);
          newShoppingListSelected[0]["ingredientsName"].push(x.name);
          newShoppingListSelected[0]["ingredientsQty"].push(1);
          }
        }        

      await client.graphql({
        query: updateIngredientsShoppingLists,
        variables: {
          input: {
            id: newShoppingListSelected[0]["id"],
            ingredientsId: newShoppingListSelected[0]["ingredientsId"],
            ingredientsName: newShoppingListSelected[0]["ingredientsName"],
            ingredientsQty: newShoppingListSelected[0]["ingredientsQty"],
          },
        },
      });
      setShoppingListSelected(newShoppingListSelected);
    }

    // update the shopping list ingredientsId and IngredientsName list
  };
  return (
    <Table
      renderAriaLive={({ firstIndex, lastIndex, totalItemsCount }) =>
        `Displaying items ${firstIndex} to ${lastIndex} of ${totalItemsCount}`
      }
      onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
      selectedItems={selectedItems}
      ariaLabels={{
        selectionGroupLabel: "Items selection",
        allItemsSelectionLabel: () => "select all",
        itemSelectionLabel: (_c, item) => item.name,
        //itemSelectionLabel: ({ selectedItems }, item) => {console.log(selectedItems); return item.name},
      }}
      columnDefinitions={[
        {
          id: "id",
          header: "",
          cell: (e: any) => e.id,
        },
        {
          id: "name",
          header: "",
          cell: (e: any) => e.name,
        },
      ]}
      columnDisplay={[
        { id: "id", visible: false },
        { id: "name", visible: true },
      ]}
      enableKeyboardNavigation
      items={items}
      loadingText="Loading resources"
      selectionType="multi"
      trackBy="name"
      empty={
        <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
          <SpaceBetween size="m">
            <b>No resources</b>
          </SpaceBetween>
        </Box>
      }
      filter={
        <TextFilter
          {...filterProps}
          filteringAriaLabel="Filter ingredients"
          filteringPlaceholder="Find ingredients"
          filteringClearAriaLabel="Clear"
        />
      }
      header={
        <Header
          actions={
            <Button variant="primary" onClick={addingSelected}>
              Add selected
            </Button>
          }
        >
          Select and add ingredients
        </Header>
      }
    />
  );
};

const MySideNavigationTable: React.FC<{
  items: any;
  setItems: any;
  currentSelection: any;
  setCurrentSelection: any;
}> = ({ items, currentSelection, setCurrentSelection }) => {
  const [newName, setNewName] = useState("");

  const handleNewList = async () => {
    if (newName) {
      await client.graphql({
        query: createIngredientsShoppingLists,
        variables: {
          input: {
            householdId: userAttributes["custom:householdID"],
            name: newName,
          },
        },
      });
    } else {
      window.alert("Introduce a name for the new list");
    }
    setNewName("");
  };

  const handleInlineEditing = async (item: any, _c: any, newValue: any) => {
    //setItems(items.map(i => i.id===item.id?{...i, name:newValue}: i ));
    // should call the graphql update function
    await client.graphql({
      query: updateIngredientsShoppingLists,
      variables: {
        input: { id: item.id, name: newValue },
      },
    });
  };

  const handleDelete = async (item: any) => {
    await client.graphql({
      query: deleteIngredientsShoppingLists,
      variables: {
        input: { id: item.id },
      },
    });
  };

  const handleSelectionChange = (detail: { selectedItems: any[] }) => {
    setCurrentSelection(detail.selectedItems);
  };

  return (
    <SpaceBetween size="m">
      <form onSubmit={(event) => event.preventDefault()}>
        <Container header={<Header variant="h2">New shopping list</Header>}>
          <Form
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <Button variant="primary" onClick={handleNewList}>
                  Create
                </Button>
              </SpaceBetween>
            }
          >
            <Input
              onChange={({ detail }) => {
                setNewName(detail.value);
              }}
              value={newName}
              placeholder="Shopping list name"
              autoFocus={true}
              type="text"
            />{" "}
          </Form>
        </Container>
      </form>
      <Table
        header={<Header>Current lists</Header>}
        onSelectionChange={(event) =>
          handleSelectionChange({ selectedItems: event.detail.selectedItems })
        }
        selectedItems={currentSelection}
        columnDefinitions={[
          {
            id: "name",
            header: "name",
            cell: (item) => <Link href="#">{item.name}</Link>,
            sortingField: "name",
            isRowHeader: true,
            editConfig: {
              ariaLabel: "Name",
              editIconAriaLabel: "editable",
              errorIconAriaLabel: "Name Error",
              editingCell: (item, { currentValue, setValue }) => {
                return (
                  <Input
                    autoFocus={true}
                    value={currentValue ?? item.name}
                    onChange={(event) => setValue(event.detail.value)}
                  />
                );
              },
            },
          },
          {
            id: "id",
            header: "name",
            cell: (item: any) => item.id,
            sortingField: "name",
            isRowHeader: true,
          },
          {
            id: "delete",
            header: "",
            cell: (item: any) => (
              <Button onClick={() => handleDelete(item)} iconName="remove" />
            ),
          },
        ]}
        columnDisplay={[
          { id: "name", visible: true },
          { id: "delete", visible: true },
        ]}
        enableKeyboardNavigation
        items={items}
        loadingText="Loading resources"
        selectionType="single"
        trackBy="id"
        empty={
          <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
            <SpaceBetween size="m">
              <b>No lists</b>
            </SpaceBetween>
          </Box>
        }
        filter={
          <TextFilter
            filteringPlaceholder="Find shopping lists"
            filteringText=""
          />
        }
        submitEdit={(item, c, newValue) =>
          handleInlineEditing(item, c, newValue)
        }
      />
    </SpaceBetween>
  );
};
