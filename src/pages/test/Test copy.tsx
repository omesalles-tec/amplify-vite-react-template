import { listDishes } from "../../../amplify/graphql/queries";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useCollection } from "@cloudscape-design/collection-hooks";
import {
  AppLayout,
  Button,
  Input,
  Pagination,
  SpaceBetween,
  Select,
  Table,
} from "@cloudscape-design/components";
import { useColumnWidths } from "../../utils/use-columns-width";
import { useLocalStorage } from "../../utils/use-local-storage";
import {
  CollectionPreferences,
  Link,
} from "@cloudscape-design/components";
import { Header, HeaderProps } from "@cloudscape-design/components";
import Icon from "@cloudscape-design/components/icon";
import Container from "@cloudscape-design/components/container";
import { TableProps } from "@cloudscape-design/components";
import { LinkProps } from "@cloudscape-design/components/link";
import { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/api";
import { Dishes } from "../../../amplify/graphql/API";
//import "../styles/table-select.scss"

const client = generateClient<Schema>();

function prepareSelectOptions(field: string, defaultOption: any, dishesList: Dishes[]) {
  const optionSet: any = [];
  // Building a non redundant list of the field passed as parameter.
  console.log(dishesList);
  dishesList.forEach((item: Dishes) => {
    const fieldValue = item[field as keyof Dishes];
    if (Array.isArray(fieldValue)) {
      fieldValue.forEach((subItem: any) => {
        if (optionSet.indexOf(subItem) === -1) {
          optionSet.push(subItem);
        }
      });
    } else {
      if (optionSet.indexOf((item[field as keyof Dishes])) === -1) {
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
  console.log(item, selectedDishType, defaultDishType)
  return (
    selectedDishType.value === defaultDishType.value || (Array.isArray(item.type)?item.type.includes(selectedDishType.label):false)
  );
}

function matchesDiet(item: any, selectedDiet: any, defaultDiet: any) {
  return selectedDiet.value === defaultDiet.value || (Array.isArray(item.diet)?item.diet.includes(selectedDiet.label): false)
}

function TableSelectFilter({dishesList}: {dishesList: Dishes[]}) {
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
  const selectDietOptions = prepareSelectOptions("diet", defaultDiet, dishesList);

  const [dishType, setDishType] = useState(defaultDishType);
  const [instanceDiet, setInstanceDiet] = useState(defaultDiet);
  const [preferences, setPreferences] = useLocalStorage(
    "React-TableSelectFilter-Preferences",
    {
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
    }
  );
  const {
    items,
    actions,
    filteredItemsCount,
    collectionProps,
    filterProps,
    paginationProps,
  } = useCollection(dishesList, {
    filtering: {
      empty: <></>,
      noMatch: <></>,
      filteringFunction: (item: any, filteringText: any) => {
        if (!matchesDishType(item, dishType, defaultDishType)) {
          return false;
        }
        if (!matchesDiet(item, instanceDiet, defaultDiet)) {
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
    sorting: { defaultState: { sortingColumn: (columnDefinitions as any)[0] } },
    selection: {},
  });
  useLayoutEffect(() => {
    collectionProps.ref.current?.scrollToTop();
  }, [instanceDiet, dishType, collectionProps.ref, filterProps.filteringText]);

  return (
    <Table
      {...collectionProps}
      enableKeyboardNavigation={true}
      columnDefinitions={columnDefinitions as readonly any[]}
      columnDisplay={preferences.contentDisplay}
      items={items}
      variant="full-page"
      stickyHeader={true}
      resizableColumns={true}
      onColumnWidthsChange={saveWidths as any}
      wrapLines={preferences.wrapLines}
      stripedRows={preferences.stripedRows}
      contentDensity={preferences.contentDensity as "compact" | "comfortable" | undefined}
      selectionType="multi"
      ariaLabels={{
        itemSelectionLabel: (_data, row) => `Select dishes ${row.id}`,
        allItemsSelectionLabel: () => "Select all dishes",
        selectionGroupLabel: "Dish selection",
      }}
      header={
        <FullPageHeader
          title="Dishes"
          selectedItemsCount={collectionProps.selectedItems?.length ?? 0}
          counter={filteredItemsCount?.toString()}
          actions={<Button variant="primary">Save</Button>}
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
              inlineLabelText="Filter dish type"
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
              inlineLabelText="Filter diet"
              data-testid="diet-filter"
              options={selectDietOptions}
              selectedAriaLabel="Selected"
              selectedOption={instanceDiet}
              onChange={(event: any) => {
                setInstanceDiet(event.detail.selectedOption);
              }}
              expandToViewport={true}
            />
          </div>
        </div>
      }
      /*pagination={<Pagination {...paginationProps} />}*/
      /*preferences={
        <Preferences
          disabled={false}
          preferences={preferences}
          setPreferences={setPreferences}
          contentDisplayOptions={CONTENT_DISPLAY_OPTIONS}
        />
      }*/
    />
  );
}

export default function App() {
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
  const [_isLoading, setIsLoading] = useState(true);
  const [_error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await client.graphql({
          query: listDishes,
          variables: {
            limit: 1000,
          },
        });
        setDishesList(response.data.listDishes.items);
      } catch (error) {
        setError(error instanceof Error ? error : new Error(String(error)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <AppLayout
      content={<TableSelectFilter dishesList={dishesList} />}
      contentType="table"
      toolsHide={true}
      navigationHide={true}
    />
  );
}

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
    cell: (item: Dishes) => item.dishName,
    sortingField: "dishName",
  },
  {
    id: "type",
    header: "Dish type",
    cell: (item: Dishes) => item.type ? item.type.join(",") : "N/A",
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
    cell: (item: Dishes) => item.diet ? item.diet.join(",") : "N/A",
    sortingField: "diet",
  },
];

const COLUMN_DEFINITIONS = rawColumns.map((column) => ({
  ...column,
  ariaLabel: createTableSortLabelFn(column),
}));

const SEARCHABLE_COLUMNS = ["dishName", "type", "season", "diet"];

const CONTENT_DISPLAY_OPTIONS = [
  { id: "id", label: "uuid" },
  { id: "season", label: "Season" },
  { id: "dishName", label: "Dish", alwaysVisible: true },
  { id: "type", label: "Dish type" },
  { id: "avgCost", label: "Avg Cost" },
  { id: "diet", label: "Diet" },
];

const PAGE_SIZE_OPTIONS = [
  { value: 10, label: "10 Distributions" },
  { value: 30, label: "30 Distributions" },
  { value: 50, label: "50 Distributions" },
];

const Preferences = ({
  preferences,
  setPreferences,
  disabled,
  pageSizeOptions = PAGE_SIZE_OPTIONS,
  contentDisplayOptions = CONTENT_DISPLAY_OPTIONS,
}: {
  preferences: any;
  setPreferences: (detail: any) => void;
  disabled: boolean;
  pageSizeOptions?: { value: number; label: string }[];
  contentDisplayOptions?: { id: string; label: string; alwaysVisible?: boolean }[];
}) => (
  <CollectionPreferences
    disabled={disabled}
    preferences={preferences}
    onConfirm={({ detail }) => setPreferences(detail)}
    pageSizePreference={{ options: pageSizeOptions }}
    wrapLinesPreference={{}}
    stripedRowsPreference={{}}
    contentDensityPreference={{}}
    contentDisplayPreference={{ options: contentDisplayOptions }}
    stickyColumnsPreference={{
      firstColumns: {
        title: "Stick first column(s)",
        description:
          "Keep the first column(s) visible while horizontally scrolling the table content.",
        options: [
          { label: "None", value: 0 },
          { label: "First column", value: 1 },
          { label: "First two columns", value: 2 },
        ],
      },
      lastColumns: {
        title: "Stick last column",
        description:
          "Keep the last column visible while horizontally scrolling the table content.",
        options: [
          { label: "None", value: 0 },
          { label: "Last column", value: 1 },
        ],
      },
    }}
  />
);

interface FullPageHeaderProps extends HeaderProps {
  title?: string;
  createButtonText?: string;
  extraActions?: React.ReactNode;
  selectedItemsCount: number;
  onInfoLinkClick?: () => void;
}

function FullPageHeader({
  title,
  createButtonText,
  extraActions = null,
  selectedItemsCount,
  onInfoLinkClick,
  ...props
}: FullPageHeaderProps) {
  const isOnlyOneSelected = selectedItemsCount === 1;

  return (
    <Header
      variant="awsui-h1-sticky"
      info={onInfoLinkClick && <InfoLink onFollow={onInfoLinkClick} />}
      actions={
        <SpaceBetween size="xs" direction="horizontal">
          {extraActions}
          <Button
            data-testid="header-btn-view-details"
            disabled={!isOnlyOneSelected}
          >
            View details
          </Button>
          <Button data-testid="header-btn-edit" disabled={!isOnlyOneSelected}>
            Edit
          </Button>
          <Button
            data-testid="header-btn-delete"
            disabled={selectedItemsCount === 0}
          >
            Delete
          </Button>
          <Button data-testid="header-btn-create" variant="primary">
            {createButtonText}
          </Button>
        </SpaceBetween>
      }
      {...props}
    >
      {title}
    </Header>
  );
}

interface ExternalLinkItemProps {
  href: string;
  text: string;
}

interface ExternalLinkGroupProps {
  variant?: "default" | "container";
  header?: string;
  groupAriaLabel?: string;
  items: Array<ExternalLinkItemProps>;
}

function ExternalLinkItem({ href, text }: ExternalLinkItemProps) {
  return (
    <Link href={href} target="_blank">
      {text}
    </Link>
  );
}

export function ExternalLinkGroup({
  header = "Learn more",
  groupAriaLabel,
  items,
  variant = "default",
}: ExternalLinkGroupProps) {
  const externalIcon = (
    <span role="img" aria-label="Links open in a new tab">
      <Icon name="external" size="inherit" />
    </span>
  );

  const headerId = "test";

  if (variant === "container") {
    return (
      <Container
        header={
          <Header>
            <span id={headerId}>
              {header} {externalIcon}
            </span>
          </Header>
        }
      >
        <SeparatedList
          ariaLabel={groupAriaLabel}
          ariaLabelledBy={groupAriaLabel ? undefined : headerId}
          items={items.map((item, index) => (
            <ExternalLinkItem key={index} href={item.href} text={item.text} />
          ))}
        />
      </Container>
    );
  }

  return (
    <>
      <h3 id={headerId}>
        {header} {externalIcon}
      </h3>
      <ul
        aria-label={groupAriaLabel}
        aria-labelledby={groupAriaLabel ? undefined : headerId}
      >
        {items.map((item, index) => (
          <li key={index}>
            <ExternalLinkItem href={item.href} text={item.text} />
          </li>
        ))}
      </ul>
    </>
  );
}

export const baseTableAriaLabels: TableProps.AriaLabels<unknown> = {
  allItemsSelectionLabel: () => "select all",
};

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

interface InfoLinkProps {
  id?: string;
  ariaLabel?: string;
  onFollow: LinkProps["onFollow"];
}
const InfoLink = (props: InfoLinkProps) => (
  <Link variant="info" {...props}>
    Info
  </Link>
);

interface SeparatedListProps {
  ariaLabel?: string;
  ariaLabelledBy?: string;
  items: Array<React.ReactNode>;
}

function SeparatedList({
  ariaLabel,
  ariaLabelledBy,
  items,
}: SeparatedListProps) {
  return (
    <ul
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
    >
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
