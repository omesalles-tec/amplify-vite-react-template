import { listDishes, listUsers } from "../../../amplify/graphql/queries";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useCollection } from "@cloudscape-design/collection-hooks";
import {
  Box,
  Button,
  Container,
  ContentLayout,
  Input,
  Multiselect,
  Select,
  Table,
} from "@cloudscape-design/components";
import { useColumnWidths } from "../../utils/use-columns-width";
import { Link } from "@cloudscape-design/components";
import { Header, HeaderProps } from "@cloudscape-design/components";
import { TableProps } from "@cloudscape-design/components";
import { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/api";
import { Dishes } from "../../../amplify/graphql/API";
import "../../styles/test.css";
import { fetchUserAttributes } from "aws-amplify/auth";


const client = generateClient<Schema>();

function prepareSelectOptions(
  field: string,
  defaultOption: any,
  dishesList: Dishes[]
) {
  const optionSet: any = [];
  // Building a non redundant list of the field passed as parameter.
  dishesList.forEach((item: Dishes) => {
    const fieldValue = item[field as keyof Dishes];
    if (Array.isArray(fieldValue)) {
      fieldValue.forEach((subItem: any) => {
        if (optionSet.indexOf(subItem) === -1) {
          optionSet.push(subItem);
        }
      });
    } else {
      if (optionSet.indexOf(item[field as keyof Dishes]) === -1) {
        optionSet.push(item[field as keyof Dishes]);
      }
    }
  });
  optionSet.sort();

  // The first element is the default one.
  const options = [defaultOption];

  // Adding the other element ot the list.
  optionSet.forEach((item: any, index: number) =>
    options.push({ label: item, value: (index + 1).toString() })
  );
  return options;
}

function matchesDishType(
  item: any,
  selectedDishType: any,
  defaultDishType: any
) {
  return (
    selectedDishType.value === defaultDishType.value ||
    (Array.isArray(item.type)
      ? item.type.includes(selectedDishType.label)
      : false)
  );
}

function matchesDiet(item: any, selectedDiet: any, defaultDiet: any) {
  return (
    selectedDiet.value === defaultDiet.value ||
    (Array.isArray(item.diet) ? item.diet.includes(selectedDiet.label) : false)
  );
}

const TableSelectFilter: React.FC<{
  dishesList: Dishes[];
  handleAddDishesToMenu: (selectedItems: any) => void;
  usersList: any;
}> = ({ dishesList, handleAddDishesToMenu, usersList }) => {
  const [columnDefinitions, saveWidths] = useColumnWidths(
    "React-TableSelectFilter-Widths",
    COLUMN_DEFINITIONS
  );
  const defaultDishType = { value: "0", label: "Any Dish Type" };
  const defaultDiet = { value: "0", label: "Any Diet" };
  const selectDishTypeOptions = prepareSelectOptions(
    "type",
    defaultDishType,
    dishesList
  );
  const selectDietOptions = prepareSelectOptions(
    "diet",
    defaultDiet,
    dishesList
  );

  const [dishType, setDishType] = useState(defaultDishType);
  const [dishDiet, setDishDiet] = useState(defaultDiet);
  const preferences = {
    pageSize: 1000,
    contentDisplay: [
      { id: "id", visible: false },
      { id: "dishName", visible: true },
      { id: "type", visible: false },
      { id: "season", visible: false },
      { id: "avgCost", visible: false },
      { id: "diet", visible: false },
    ],
    wrapLines: false,
    stripedRows: false,
    contentDensity: "compact",
    custom: "table",
  };
  const { items, actions, filteredItemsCount, collectionProps, filterProps } =
    useCollection(dishesList, {
      filtering: {
        empty: <></>,
        noMatch: <></>,
        filteringFunction: (item: any, filteringText: any) => {
          if (!matchesDishType(item, dishType, defaultDishType)) {
            return false;
          }
          if (!matchesDiet(item, dishDiet, defaultDiet)) {
            return false;
          }
          const filteringTextLowerCase = filteringText.toLowerCase();

          return SEARCHABLE_COLUMNS.map((key: any) => item[key]).some(
            (value) =>
              typeof value === "string" &&
              value.toLowerCase().indexOf(filteringTextLowerCase) > -1
          );
        },
      },
      pagination: { pageSize: preferences.pageSize },
      sorting: {
        defaultState: { sortingColumn: (columnDefinitions as any)[0] },
      },
      selection: { keepSelection: false },
    });
  useLayoutEffect(() => {
    collectionProps.ref.current?.scrollToTop();
  }, [dishDiet, dishType, collectionProps.ref, filterProps.filteringText]);

  return (
    <Table
      {...collectionProps}
      enableKeyboardNavigation={true}
      columnDefinitions={columnDefinitions as readonly any[]}
      columnDisplay={preferences.contentDisplay}
      items={items}
      variant="borderless"
      stickyHeader={true}
      resizableColumns={true}
      onColumnWidthsChange={saveWidths as any}
      wrapLines={preferences.wrapLines}
      stripedRows={preferences.stripedRows}
      contentDensity={
        preferences.contentDensity as "compact" | "comfortable" | undefined
      }
      selectionType="multi"
      ariaLabels={{
        itemSelectionLabel: (_data, row) => `${row.dishName}`,
        allItemsSelectionLabel: () => "Select all dishes",
        selectionGroupLabel: "",
      }}
      header={
        <FullPageHeader
          title="Total"
          counter={`${
            collectionProps.selectedItems?.length ?? 0
          }/${filteredItemsCount?.toString()}`}
          actions={
            <Button
              disabled={
                collectionProps.selectedItems?.length === 0 ||
                usersList.length === 0
              }
              variant="primary"
              onClick={() =>
                handleAddDishesToMenu(collectionProps.selectedItems)
              }
            >
              Add to menu
            </Button>
          }
        />
      }
      filter={
        <div className="input-container">
          <div className="input-filter">
            <Input
              data-testid="input-filter"
              type="search"
              value={filterProps.filteringText}
              onChange={(event) => {
                actions.setFiltering(event.detail.value);
              }}
              ariaLabel="Find dishes"
              placeholder="Find dishes"
              clearAriaLabel="clear"
            />
          </div>
          <div className="select-filter">
            <Select
              data-testid="type-filter"
              options={selectDishTypeOptions}
              selectedAriaLabel="Selected"
              selectedOption={dishType}
              onChange={(event: any) => {
                setDishType(event.detail.selectedOption);
              }}
              expandToViewport={true}
            />
          </div>
          <div className="select-filter">
            <Select
              data-testid="diet-filter"
              options={selectDietOptions}
              selectedAriaLabel="Selected"
              selectedOption={dishDiet}
              onChange={(event: any) => {
                setDishDiet(event.detail.selectedOption);
              }}
              expandToViewport={true}
            />
          </div>
        </div>
      }
    />
  );
};

const MenuPage = () => {
  const [dishesList, setDishesList] = useState<Dishes[]>([
    {
      id: "",
      dishName: "",
      diet: [""],
      type: [""],
      __typename: "Dishes",
      createdAt: "",
      updatedAt: "",
    },
  ]);
  const [householdId, setHouseholdId] = useState<string>("");
  const [_isLoading, setIsLoading] = useState(true);
  const [_error, setError] = useState<Error | null>(null);
  const [_selectedItems, setSelectedItems] = useState<Dishes[] | null>(null);

  const listOfUsers = ["loading"];
  const [selectedUsers, setSelectedUsers] = useState<
    { value: string; label: string }[]
  >(listOfUsers.map((x) => ({ value: x, label: x })));

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const userAttributes = await fetchUserAttributes();
        setHouseholdId(userAttributes["custom:householdID"] || "");

        const response = await client.graphql({
          query: listDishes,
          variables: {
            limit: 1000,
          },
        });

        setDishesList(response.data.listDishes.items);
        const responseUsers = await client.graphql({
          query: listUsers,
          variables: {
            filter: {
              householdID: { eq: userAttributes["custom:householdID"] || "" },
            },
          },
        });
        setSelectedUsers(
          responseUsers.data.listUsers.items.map((x) => ({
            value: x.id,
            label: x.email || x.anonymousLabel || "unknown",
          }))
        );
      } catch (error) {
        setError(error instanceof Error ? error : new Error(String(error)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChangeOfUsers = (detail: any) => {
    setSelectedUsers(detail.selectedOptions);
  };

  const handleAddDishesToMenu = (selectedItems: Dishes[]) => {
    setSelectedItems(selectedItems);
    console.log("Users:", selectedUsers);
    console.log("Dishes:", selectedItems);
  };

  return (
    <div className="page-container">
      <div className="left-container">
        <TableSelectFilter
          dishesList={dishesList}
          handleAddDishesToMenu={handleAddDishesToMenu}
          usersList={selectedUsers.map((x) => x.value)}
        />
      </div>
      <div className="right-container">
        <ContentLayout
          defaultPadding
          header={
            <Users
              usersList={listOfUsers}
              onChange={handleChangeOfUsers}
              selectedOptions={selectedUsers}
            />
          }
        >
          <Container
            header={
              <Header variant="h2" description="Container description">
                Container header
              </Header>
            }
          >
            <ol>
              <a href="https://blog.logrocket.com/best-react-scheduler-component-libraries/">
                React calendar libraries:
              </a>
              <li>
                <a href="https://schedule-x.dev/docs/frameworks/react">
                  X-scheduler
                </a>
              </li>
            </ol>
          </Container>
        </ContentLayout>{" "}
      </div>
    </div>
  );
};

export default MenuPage;

const rawColumns = [
  {
    id: "id",
    header: "uuid",
    cell: (item: any) => <Link href="#">{item.id}</Link>,
    sortingComparator: (item1: any, item2: any) =>
      item1.id.substring(13, item2.length) -
      item2.id.substring(13, item1.length),
  },
  {
    id: "season",
    header: "Season",
    cell: (item: Dishes) => item.season,
    sortingField: "season",
  },
  {
    id: "dishName",
    header: "Dish",
    cell: (item: Dishes) => <Box fontSize="body-s">{item.dishName}</Box>,
    sortingField: "dishName",
  },
  {
    id: "type",
    header: "Dish type",
    cell: (item: Dishes) => (item.type ? item.type.join(",") : "N/A"),
    sortingField: "type",
  },
  {
    id: "avgCost",
    header: "Avg cost",
    cell: (item: Dishes) => item.avgCost,
    sortingField: "avgCost",
  },
  {
    id: "diet",
    header: "Diet",
    cell: (item: Dishes) => (item.diet ? item.diet.join(",") : "N/A"),
    sortingField: "diet",
  },
];

const COLUMN_DEFINITIONS = rawColumns.map((column) => ({
  ...column,
  ariaLabel: createTableSortLabelFn(column),
}));

const SEARCHABLE_COLUMNS = ["dishName", "type", "season", "diet"];

interface FullPageHeaderProps extends HeaderProps {
  title?: string;
}

function FullPageHeader({ title, ...props }: FullPageHeaderProps) {
  return (
    <Header variant="awsui-h1-sticky" {...props}>
      {title}
    </Header>
  );
}

function createTableSortLabelFn(
  column: TableProps.ColumnDefinition<unknown>
): TableProps.ColumnDefinition<unknown>["ariaLabel"] {
  if (!column.sortingField && !column.sortingComparator && !column.ariaLabel) {
    return;
  }
  return ({ sorted, descending }) => {
    return `${column.header}, ${
      sorted
        ? `sorted ${descending ? "descending" : "ascending"}`
        : "not sorted"
    }.`;
  };
}

interface UsersProps {
  usersList: string[];
  onChange: (selectedOptions: { value: string; label: string }[]) => void;
  selectedOptions: { value: string; label: string }[];
}

const Users: React.FC<UsersProps> = ({
  usersList,
  onChange,
  selectedOptions,
}) => {
  return (
    <Multiselect
      selectedOptions={selectedOptions}
      onChange={({ detail }: any) => {
        onChange(detail);
      }}
      options={usersList.map((x) => ({ value: x, label: x }))}
      placeholder="Choose individuals"
    />
  );
};
