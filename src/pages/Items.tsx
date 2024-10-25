import { useState, useEffect } from "react";
import {
  AppLayout,
  Button,
  Icon,
  Link,
  Pagination,
  Table,
  TextFilter,
} from "@cloudscape-design/components";
import { useCollection } from "@cloudscape-design/collection-hooks";
import { useColumnWidths } from "../utils/use-columns-width";
import { useLocalStorage } from "../utils/use-local-storage";
import { Preferences } from "../components/TableConfig";
import { clientSchema } from "../utils/clients"; // Fixed the import statement
import { Items as itemsType } from "../../amplify/graphql/API";
import { listItems } from "../../amplify/graphql/queries";
import { useParams } from 'react-router-dom';

const Items = (params: any) => {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [items, setItems] = useState<itemsType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const {theIngredientId} = useParams();
  console.log(theIngredientId)

  const handleDelete = (event) => {
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
      sortingField: "description",
      header: "Desc",
      cell: (item: any) => <Link href={item.link} target="new">{item.description}</Link>,
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
      id: "link",
      sortingField: "link",
      header: "link",
      cell: (item: any) => item.link,
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

  const DEFAULT_PREFERENCES = {
    pageSize: 30,
    contentDisplay: [
      { id: "id", visible: false },
      { id: "description", visible: true },
      { id: "link", visible: true },
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

        const { data: itemsData } = await clientSchema.graphql({
          query: listItems,
          variables: {
            limit : 10000,
            filter: {ingredientId: {eq: theIngredientId}
            },
          },
        });
        console.log(itemsData.listItems.items);
        setItems(itemsData.listItems.items);
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
    <AppLayout
      content={
        <TableContent
          dataItems={items}
          origColumnDefinitions={columnDefinitions}
          defaultPreferences={DEFAULT_PREFERENCES}
        />
      }
      contentType="table"
      toolsOpen={toolsOpen}
      onToolsChange={({ detail }) => setToolsOpen(detail.open)}
    />
  );
};

function TableContent({
  dataItems,
  origColumnDefinitions,
  defaultPreferences,
}: {
  dataItems: itemsType[];
  origColumnDefinitions: any[];
  defaultPreferences: any;
}) {
  const [columnDefinitions, saveWidths] = useColumnWidths(
    "React-Table-Widths",
    origColumnDefinitions
  );
  const [preferences, setPreferences] = useLocalStorage(
    "React-Table-Preferences",
    defaultPreferences
  );
  const {
    items,
    actions,
    filteredItemsCount,
    collectionProps,
    filterProps,
    paginationProps,
  } = useCollection(dataItems, {
    filtering: {},
    pagination: { pageSize: preferences.pageSize },
    sorting: {},
    selection: {},
  });
  return (
    <Table
      {...collectionProps}
      enableKeyboardNavigation={true}
      columnDefinitions={columnDefinitions}
      columnDisplay={preferences.contentDisplay}
      items={items}
      selectionType="multi"
      variant="full-page"
      stickyHeader={true}
      resizableColumns={true}
      onColumnWidthsChange={saveWidths}
      wrapLines={preferences.wrapLines}
      stripedRows={preferences.stripedRows}
      stickyColumns={preferences.stickyColumns}
      header={<></>}
      filter={
        <TextFilter
          {...filterProps}
          filteringAriaLabel="Filter items"
          filteringPlaceholder="Find items"
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
    />
  );
}

export default Items;
