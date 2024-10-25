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
import { Preferences } from "../../components/TableConfig";
import { clientSchema } from "../../utils/clients"; // Fixed the import statement
import { Ingredients as ingredientsType } from "../../../amplify/graphql/API";
import { listIngredients } from "../../../amplify/graphql/queries";
import {
  deleteIngredients,
  updateIngredients,
} from "../../../amplify/graphql/mutations";
import AddIngredient from "./AddIngredient";

const Ingredients = () => {
  const [ingredients, setIngredients] = useState<ingredientsType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleCloseModal = () => {
    console.log("close modal");
    setIsModalOpen(false);
  };

  const handleDelete = async (event: any) => {
    await clientSchema.graphql({
      query: deleteIngredients,
      variables: { input: { id: event.id } },
    });
    setIngredients(ingredients.filter((x:any) => x.id !== event.id))
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
      minWidth: 180,
    },
    {
      id: "name",
      sortingField: "name",
      header: "Ingredient",
      cell: (item: any) => <Link href={`items/${item.id}`}>{item.name}</Link>,
      minWidth: 120,
    },
    {
      id: "unit",
      cell: (item: any) => item.unit,
      header: "Unit",
      minWidth: 160,
      isRowHeader: true,
    },
    {
      id: "maxLifespan",
      sortingField: "maxLifespan",
      header: "Life span in days",
      cell: (item: any) => item.maxLifespan,
      minWidth: 100,
      editConfig: {
        ariaLabel: "Name",
        editIconAriaLabel: "editable",
        errorIconAriaLabel: "Name Error",
        editingCell: (item: any, { currentValue, setValue }) => {
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
        validation: (item: any, value: string) => {
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
      minWidth: 100,
      cell: (item: any) => (
        <Button onClick={() => handleDelete(item)} disabled={true} disabledReason="You can delete only ingredients you created">
          <Icon name="remove" />
        </Button>
      ),
    },
  ];

  const DEFAULT_PREFERENCES = {
    pageSize: 30,
    contentDisplay: [
      { id: "id", visible: false },
      { id: "name", visible: true },
      { id: "unit", visible: true },
      { id: "maxLifespan", visible: true },
      { id: "delete", visible: true },
    ],
    wrapLines: false,
    stripedRows: false,
    contentDensity: "comfortable",
    stickyColumns: { first: 0, last: 1 },
  };

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

  return (
    <>
      <AppLayout
        content={
          <TableContent
            ingredients={ingredients}
            origColumnDefinitions={columnDefinitions}
            defaultPreferences={DEFAULT_PREFERENCES}
            setIngredients={setIngredients}
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
          />
        }
        contentType="table"
        navigationHide={true}
        toolsHide={true}
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
  ingredients,
  origColumnDefinitions,
  defaultPreferences,
  setIngredients,
  setIsModalOpen,
  isModalOpen,
}: {
  ingredients: ingredientsType[];
  origColumnDefinitions: any[];
  defaultPreferences: any;
  setIngredients: any;
  setIsModalOpen: any;
  isModalOpen: any;
}) {
  const [columnDefinitions, saveWidths] = useColumnWidths(
    "React-Table-Widths",
    origColumnDefinitions
  );
  const [preferences, setPreferences] = useLocalStorage(
    "React-Table-Preferences",
    defaultPreferences
  );
  const { items, collectionProps, filterProps, paginationProps } =
    useCollection(ingredients, {
      filtering: {},
      pagination: { pageSize: preferences.pageSize },
      sorting: {},
      selection: {},
    });
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
      preferences={
        <Preferences
          preferences={preferences}
          disabled={false}
          setPreferences={setPreferences}
        />
      }
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
              console.log(isModalOpen);
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

  const onSplitPanelResize = ({ detail: { size } }) => {
    setSplitPanelSize(size);
  };

  const onSplitPanelToggle = ({ detail: { open } }) => {
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

export default Ingredients;

