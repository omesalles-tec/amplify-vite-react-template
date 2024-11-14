import { useState, useEffect } from "react";
import {
  AppLayout,
  Button,
  Header,
  Icon,
  Input,
  Link,
  Modal,
  Pagination,
  SpaceBetween,
  SplitPanel,
  Table,
  TextFilter,
} from "@cloudscape-design/components";
import { useCollection } from "@cloudscape-design/collection-hooks";
import { useColumnWidths } from "../../utils/use-columns-width";
import { useLocalStorage } from "../../utils/use-local-storage";
import { clientSchema } from "../../utils/clients"; // Fixed the import statement
import { Ingredients as ingredientsType } from "../../../amplify/graphql/API";
import { listIngredients, listItems } from "../../../amplify/graphql/queries";
import {
  deleteIngredients,
  updateIngredients,
} from "../../../amplify/graphql/mutations";
import AddIngredient from "./AddIngredient";
import { INGREDIENT_PREFERENCES, ITEM_PREFERENCES } from "./constants";

const Ingredients = () => {
  const [ingredients, setIngredients] = useState<ingredientsType[]>([]);
  const [_loading, setLoading] = useState(true);
  const [_error, setError] = useState();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [panelContent, setPanelContent] = useState<any>({header: "No ingredient selected", body: <div>"Select an igredient from the left"</div>})
  const { items, collectionProps, filterProps, paginationProps } =
    useCollection(ingredients, {
      filtering: {},
      pagination: { pageSize: INGREDIENT_PREFERENCES.pageSize },
      sorting: {},
      selection: {},
    });
  const {
    splitPanelOpen,
    onSplitPanelToggle,
    splitPanelSize,
    onSplitPanelResize,
  } = useSplitPanel(collectionProps.selectedItems);

  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (event: any) => {
    await clientSchema.graphql({
      query: deleteIngredients,
      variables: { input: { id: event.id } },
    });
    setIngredients(ingredients.filter((x: any) => x.id !== event.id));
  };

  const columnDefinitions = [
    {
      id: "id",
      sortingField: "id",
      header: "Ingredient ID",
      cell: (item: any) => (
        <div>
          <Link href={`items/${item.id}`}>{item.name}</Link>
        </div>
      ),
      minWidth: 10,
    },
    {
      id: "name",
      sortingField: "name",
      header: "Ingredient",
      cell: (item: any) => <Link href={`items/${item.id}`}>{item.name}</Link>,
      minWidth: 40,
    },
    {
      id: "unit",
      cell: (item: any) => item.unit,
      header: "Unit",
      minWidth: 40,
      isRowHeader: true,
    },
    {
      id: "maxLifespan",
      sortingField: "maxLifespan",
      header: "Life span in days",
      cell: (item: any) => item.maxLifespan,
      minWidth: 40,
      editConfig: {
        ariaLabel: "Name",
        editIconAriaLabel: "editable",
        errorIconAriaLabel: "Name Error",
        editingCell: (
          item: any,
          {
            currentValue,
            setValue,
          }: {
            currentValue: string | undefined;
            setValue: (value: string) => void;
          }
        ) => {
          return (
            <Input
              autoFocus={true}
              value={currentValue ?? item.maxLifespan}
              onChange={(event) => setValue(event.detail.value)}
            />
          );
        },
        disabledReason: (item: any) => {
          if (item.type === "1A") {
            return "You cannot change the name of Type 1A variables.";
          }
          return undefined;
        },
        validation: (value: string) => {
          if (value && !Number.isInteger(parseInt(value))) {
            return "Life span has to be an integer";
          }
          return undefined;
        },
      },
    },
    {
      id: "delete",
      header: "Delete",
      minWidth: 40,
      cell: (item: any) => (
        <Button
          onClick={() => handleDelete(item)}
          disabled={true}
          disabledReason="You can delete only ingredients you created"
          >
          <Icon name="remove" />
        </Button>
      ),
    },
  ];
  
  useEffect(() => {
    // Define an asynchronous function to fetch data
    const dataLoader = async () => {
      try {
        // Start the loading process
        setLoading(true);

        const { data: ingredientsData } = await clientSchema.graphql({
          query: listIngredients,
          variables: {
            limit: 1000,
          },
        });
        setIngredients(ingredientsData.listIngredients.items);
      } catch (error: any) {
        setError(error.message); // Set any errors
      } finally {
        setLoading(false); // Stop loading whether success or failure
      }
    };

    // Call the fetch function
    dataLoader();
  }, []); // Ensure this runs only once when the component mounts

  useEffect(() => {
    const fetchPanelContent = async () => {
      const newPanelContent = await getPanelContent(collectionProps.selectedItems);
      setPanelContent(newPanelContent); // Update the panel content state
    };

    fetchPanelContent();
  }, [collectionProps.selectedItems]); // Dependency array to trigger on selected items change

  return (
    <>
      <AppLayout
        content={
          <TableContent
            items={items}
            collectionProps={collectionProps}
            filterProps={filterProps}
            paginationProps={paginationProps}
            origColumnDefinitions={columnDefinitions}
            setIngredients={setIngredients}
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
          />
        }
        contentType="table"
        navigationHide={true}
        toolsHide={true}
        splitPanel={<SplitPanel header={panelContent.header}>{panelContent.body}</SplitPanel>}
        splitPanelOpen={splitPanelOpen}
        onSplitPanelToggle={onSplitPanelToggle}
        splitPanelSize={splitPanelSize}
        onSplitPanelResize={onSplitPanelResize}
      />
      {/* Modal that opens when a row is clicked */}
      {isModalOpen && (
        <Modal
          onDismiss={handleCloseModal}
          visible={isModalOpen}
          closeAriaLabel="Close"
          header="Item Details"
        >
          <AddIngredient
            ingredients={ingredients}
            setIngredients={setIngredients}
            closeModal={handleCloseModal}
          />
        </Modal>
      )}
    </>
  );
};

function TableContent({
  items,
  collectionProps,
  filterProps,
  paginationProps,
  origColumnDefinitions,
  setIngredients,
  setIsModalOpen,
  isModalOpen,
}: {
  items: any;
  collectionProps: any;
  filterProps: any;
  paginationProps: any;
  origColumnDefinitions: any[];
  setIngredients: any;
  setIsModalOpen: any;
  isModalOpen: any;
}) {
  const [columnDefinitions, saveWidths] = useColumnWidths(
    "React-Table-Widths",
    origColumnDefinitions
  );
  const [preferences] = useLocalStorage(
    "React-Table-Preferences",
    INGREDIENT_PREFERENCES
  );
  const handleSubmit = async (item: any, column: any, newValue: any) => {
    setIngredients((prevItems: any) =>
      prevItems.map((prevItem: any) =>
        prevItem.id === item.id
          ? { ...prevItem, [column.id]: newValue }
          : prevItem
      )
    );
    await clientSchema.graphql({
      query: updateIngredients,
      variables: {
        input: {
          id: item.id,
          maxLifespan: newValue,
        },
      },
    });
  };

  return (
    <Table
      {...collectionProps}
      enableKeyboardNavigation={true}
      columnDefinitions={columnDefinitions}
      columnDisplay={preferences.contentDisplay}
      items={items}
      selectionType="single"
      variant="full-page"
      stickyHeader={true}
      resizableColumns={true}
      onColumnWidthsChange={saveWidths}
      wrapLines={preferences.wrapLines}
      stripedRows={preferences.stripedRows}
      stickyColumns={preferences.stickyColumns}
      header={
        <IngredientsPageHeader
          title={"Ingredients"}
          createButtonText={"Create ingredient"}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
        />
      }
      filter={
        <TextFilter
          {...filterProps}
          filteringAriaLabel="Filter ingredients"
          filteringPlaceholder="Find ingredients"
          filteringClearAriaLabel="Clear"
        />
      }
      pagination={<Pagination {...paginationProps} />}
      /*preferences={
        <Preferences
          preferences={preferences}
          disabled={false}
          setPreferences={setPreferences}
        />
      }*/
      submitEdit={handleSubmit}
    />
  );
}

const IngredientsPageHeader = ({
  title,
  createButtonText,
  setIsModalOpen,
  isModalOpen,
}: {
  title: string;
  createButtonText: string;
  setIsModalOpen: (isModalOpen: boolean) => void;
  isModalOpen: boolean;
}) => {
  return (
    <Header
      variant="awsui-h1-sticky"
      actions={
        <SpaceBetween size="xs" direction="horizontal">
          <Button
            data-testid="header-btn-create"
            variant="primary"
            onClick={() => {
              setIsModalOpen(!isModalOpen);
            }}
          >
            {createButtonText}
          </Button>
        </SpaceBetween>
      }
    >
      {title}
    </Header>
  );
};

const useSplitPanel = (selectedItems: any) => {
  const [splitPanelSize, setSplitPanelSize] = useState(300);
  const [splitPanelOpen, setSplitPanelOpen] = useState(false);
  const [hasManuallyClosedOnce, setHasManuallyClosedOnce] = useState(false);

  const onSplitPanelResize = ({ detail }: { detail: { size: number } }) => {
    const { size } = detail;
    setSplitPanelSize(size);
  };

  const onSplitPanelToggle = ({ detail }: { detail: { open: boolean } }) => {
    const { open } = detail;
    setSplitPanelOpen(open);

    if (!open) {
      setHasManuallyClosedOnce(true);
    }
  };

  useEffect(() => {
    if (selectedItems.length && !hasManuallyClosedOnce) {
      setSplitPanelOpen(true);
    }
  }, [selectedItems.length, hasManuallyClosedOnce]);  

  return {
    splitPanelOpen,
    onSplitPanelToggle,
    splitPanelSize,
    onSplitPanelResize,
  };
};

const getPanelContent = async (items: any) => {
  if (!items.length) {
    return {header: "No ingredient selected", body: <div>"Select an igredient from above"</div>};
  } else {
    const item = items[0];
    const { data: itemData } = await clientSchema.graphql({
      query: listItems,
      variables: {
        limit: 10000,
        filter: { ingredientId: { eq: item.id } },
      },
    });
    
    const handleDelete = (event: any) => {
      console.log(event);
    };

    const columnDefinitions = [
      {
        id: "id",
        sortingField: "id",
        header: "Item ID",
        cell: (item: any) => (
          <div>
            <Link href="item.id">{item.id}</Link>
          </div>
        ),
        minWidth: 180,
      },
      {
        id: "description",
        header: "Desc",
        cell: (item: any) => (
          <Link href={item.link} target="new">
            {item.description}
          </Link>
        ),
        minWidth: 120,
      },
      {
        id: "price",
        sortingField: "price",
        cell: (item: any) => item.price,
        header: "Price",
        minWidth: 160,
        isRowHeader: true,
      },
      {
        id: "quantity",
        header: "Quantity",
        cell: (item: any) => item.quantity,
        minWidth: 100,
      },
      {
        id: "price_per_unit",
        header: "Price per unit",
        sortingField: "price_per_unit",
        cell: (item: any) => Math.round(100*Number(item.price)/Number(item.quantity))/100,
        minWidth: 100,
      },
      {
        id: "delete",
        header: "Delete",
        minWidth: 100,
        cell: (item: any) => (
          <Button onClick={() => handleDelete(item)}>
            <Icon name="remove" />
          </Button>
        ),
      },
    ];
    return {
      header: item.name,
      body: (
        <Table
          enableKeyboardNavigation={true}
          columnDefinitions={columnDefinitions}
          items={itemData.listItems.items}
          columnDisplay={ITEM_PREFERENCES.contentDisplay}
          header = {<Header actions={<Button>Add ingredient</Button>} />}
        ></Table>
      ),
    };
  }
};

export default Ingredients;
