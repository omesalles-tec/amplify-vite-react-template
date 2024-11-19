"use client";
import { useState, useEffect, ReactNode } from "react";
import { useCollection } from "@cloudscape-design/collection-hooks";
import {
  Cards,
  CollectionPreferences,
  Header,
  HeaderProps,
  Multiselect,
  Pagination,
  TextFilter,
} from "@cloudscape-design/components";
import {
  AppLayout,
  Box,
  Button,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useLocalStorage } from "../../utils/use-local-storage";
import {
  VISIBLE_CONTENT_OPTIONS,
  PAGE_SIZE_OPTIONS,
  DEFAULT_PREFERENCES,
} from "./cards-config";
import Link, { LinkProps } from "@cloudscape-design/components/link";
import { listDishes } from "../../../amplify/graphql/queries";
import { generateClient } from "aws-amplify/api";
import { Schema } from "../../../amplify/data/resource";
import { Link as RouterLink } from "react-router-dom";
import { Icon } from "@cloudscape-design/components";
import { capitalizeFirstLetter } from "../../utils/functions";
import { updateDishes } from "../../../amplify/graphql/mutations";
//import { getCurrentUser } from "aws-amplify/auth";

const client = generateClient<Schema>();

type Preferences = {
  [key: string]: number; // Allow indexing with a string
};

const Dishes = () => {
  return <AppLayout content={<DetailsCards />} contentType="cards" />;
};

const DetailsCards = () => {
  const [modifiedValues, setModifiedValues] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [dishes, setDishes] = useState<any>([]);
  const [selectedOptions, setSelectedOptions] = useState<any>([]);

  const [preferences, setPreferences] = useLocalStorage(
    "React-Cards-Preferences",
    DEFAULT_PREFERENCES
  );
  const { items, actions, collectionProps, filterProps, paginationProps } =
    useCollection(dishes, {
      filtering: {
        empty: <TableEmptyState resourceName="Distribution" />,
        noMatch: (
          <TableNoMatchState onClearFilter={() => actions.setFiltering("")} />
        ),
      },
      pagination: { pageSize: preferences.pageSize },
      selection: {},
    });
  const cardDefinition = {
    header: (item: any) => (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>
          {" "}
          <RouterLink to={`${item.id}`}>{item.dishName}</RouterLink>
        </span>
        <div style={{ display: "flex", alignItems: "end" }}>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering card click
              toggleFavorite(item);
            }}
            aria-label={
              item.isFavorite ? "Remove from favorites" : "Add to favorites"
            }
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: item.isFavorite ? "#ff8000" : "#ccc",
            }}
          >
            {item.isFavorite ? (
              <Icon name="thumbs-up-filled" />
            ) : (
              <Icon name="thumbs-up" />
            )}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering card click
              toggleNotFavorite(item);
            }}
            aria-label={
              item.isFavorite ? "Remove from favorites" : "Add to favorites"
            }
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: item.isNotFavorite ? "#ff8000" : "#ccc",
            }}
          >
            {item.isNotFavorite ? (
              <Icon name="thumbs-down-filled" />
            ) : (
              <Icon name="thumbs-down" />
            )}
          </button>
        </div>
      </div>
    ),
    sections: [
      {
        id: "type",
        header: "Type",
        content: (item: any) => (
          <Multiselect
            selectedOptions={selectedOptions[item.position]}
            onChange={({ detail }) =>
              handleChangingTypes(item, detail.selectedOptions)
            }
            options={[
              {
                label: "Dinar",
                value: "dinar",
              },
              {
                label: "Acompanyament",
                value: "acompanyament",
              },
              {
                label: "Esmorcar",
                value: "esmorcar",
              },
              {
                label: "Snack",
                value: "snack",
              },
              {
                label: "Sopar",
                value: "sopar",
              },
              { label: "Altres", value: "altres" },
              { label: "Ingredient", value: "ingredient" },
            ]}
            placeholder="Choose options"
          />
        ),
      },
      {
        id: "avgCost",
        header: "Average cost",
        content: (item: any) => item.avgCost,
      },
      {
        id: "avgTime",
        header: "Average time",
        content: (item: any) => item.avgTime,
      },
      {
        id: "recipesArray",
        header: "Recipes",
        content: (item: any) =>
          item.recipesArray.map((x: any) =>
            JSON.stringify(JSON.parse(x)["ingredientsArray"])
          ),
      },
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      
      try {
        // const user = await getCurrentUser();
        // query the preferences, it'll be a json object or null
        const preferences:Preferences ={'4e8956bd-8f5a-4d41-bc18-77b08d457e85':-1, 'ac2e2e11-42f5-44e5-b51f-0ef1ba3158d6':1}
        const temp = await client.graphql({
          query: listDishes,
          variables: {
            limit: 1000,
          },
        });
        if (temp.data && temp.data.listDishes && temp.data.listDishes.items) {
          setDishes(
            temp.data.listDishes.items.map((v, i) => ({
              ...v,
              isFavorite: preferences[v.id]===1?true:false,
              isNotFavorite: preferences[v.id]===-1?true:false,
              position: i,
            }))
          );
          setLoading(false);
          const origSelectedOptions = temp.data.listDishes.items.map((v) => {
            return v.type
              ? v.type.map((w) => ({
                  value: w,
                  label: capitalizeFirstLetter(w ? w : ""),
                }))
              : [];
          });
          setSelectedOptions(origSelectedOptions);
        }
        // Update data state
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchData();
  }, []);

  const handleChangingTypes = (item: any, theSeletectedOptions: any) => {
    const oldSelectedOptions = structuredClone(selectedOptions);
    oldSelectedOptions[item.position] = theSeletectedOptions;
    setSelectedOptions(oldSelectedOptions);
    const newTypes = theSeletectedOptions.map((x: any) => x["value"]);
    setDishes((prevItems: any[]) =>
      prevItems.map((it) =>
        it.id === item.id ? { ...it, type: newTypes } : it
      )
    );
    setModifiedValues({...modifiedValues, [item.position]: {...item, type: newTypes}});
  };

  const toggleFavorite = (item: any) => {
    setDishes((prevItems: any[]) =>
      prevItems.map((it) =>
        it.id === item.id
          ? {
              ...it,
              isFavorite: !it.isFavorite,
              isNotFavorite: !it.isFavorite ? false : it.isNotFavorite,
            }
          : it
      )
    );
    setModifiedValues({...modifiedValues, [item.position]: item})
  };

  const toggleNotFavorite = (item: any) => {
    setDishes((prevItems: any[]) =>
      prevItems.map((it) =>
        it.id === item.id
          ? {
              ...it,
              isNotFavorite: !it.isNotFavorite,
              isFavorite: !it.isNotFavorite ? false : it.isFavorite,
            }
          : it
      )
    );
    setModifiedValues({...modifiedValues, [item.position]: item})
  };

  const handleSave = async () => {
    console.log(modifiedValues);
    //loop thru the modifiedValues and save them
    for (const [_key, value] of Object.entries(modifiedValues)) {
      await client.graphql({
        query: updateDishes,
        variables: {
          input: {
            id: (value as { id: unknown }).id as string,
            type: (value as { type: unknown[] }).type as string[],
          },
        },
      });
    }
    setModifiedValues({});
  }

  return (
    <Cards
      {...collectionProps}
      stickyHeader={true}
      cardDefinition={cardDefinition}
      visibleSections={preferences.visibleContent}
      loading={loading}
      loadingText="Loading dishes"
      items={items}
      variant="full-page"
      header={
        <FullPageHeader
          selectedItemsCount={
            collectionProps.selectedItems
              ? collectionProps.selectedItems.length
              : 0
          }
          counter={
            loading
              ? undefined
              : getHeaderCounterText(dishes, collectionProps.selectedItems)
          }
          handleSave={handleSave}
        />
      }
      filter={
        <TextFilter
          {...filterProps}
          filteringAriaLabel="Filter dishes"
          filteringPlaceholder="Find dishes"
          filteringClearAriaLabel="Clear"
          disabled={loading}
        />
      }
      pagination={<Pagination {...paginationProps} disabled={loading} />}
      preferences={
        <CollectionPreferences
          title="Preferences"
          confirmLabel="Confirm"
          cancelLabel="Cancel"
          disabled={loading}
          preferences={preferences}
          onConfirm={({ detail }) =>
            setPreferences({
              ...detail,
              pageSize: detail.pageSize ?? 10,
              visibleContent: detail.visibleContent
                ? [...detail.visibleContent]
                : [],
            })
          }
          pageSizePreference={{
            title: "Page size",
            options: PAGE_SIZE_OPTIONS,
          }}
          visibleContentPreference={{
            title: "Select visible columns",
            options: VISIBLE_CONTENT_OPTIONS,
          }}
        />
      }
    />
  );
};
const TableEmptyState = ({ resourceName }: { resourceName: string }) => (
  <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
    <SpaceBetween size="xxs">
      <div>
        <b>No {resourceName.toLowerCase()}s</b>
        <Box variant="p" color="inherit">
          No {resourceName.toLowerCase()}s associated with this resource.
        </Box>
      </div>
      <Button>Create {resourceName.toLowerCase()}</Button>
    </SpaceBetween>
  </Box>
);

const TableNoMatchState = ({
  onClearFilter,
}: {
  onClearFilter: () => void;
}) => (
  <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
    <SpaceBetween size="xxs">
      <div>
        <b>No matches</b>
        <Box variant="p" color="inherit">
          We can't find a match.
        </Box>
      </div>
      <Button onClick={onClearFilter}>Clear filter</Button>
    </SpaceBetween>
  </Box>
);

interface FullPageHeaderProps extends HeaderProps {
  counter?: string;
  selectedItemsCount: number;
  handleSave: () => void;
  onInfoLinkClick?: () => void;
}

export function FullPageHeader({
  selectedItemsCount,
  handleSave,
  onInfoLinkClick,
  ...props
}: FullPageHeaderProps) {
  /*const isOnlyOneSelected = selectedItemsCount === 1;*/

  return (
    <Header
      variant="awsui-h1-sticky"
      info={onInfoLinkClick && <InfoLink onFollow={onInfoLinkClick} />}
      actions={
        <SpaceBetween size="xs" direction="horizontal">
          <Button data-testid="header-btn-view-details" onClick={handleSave}>Save</Button>
          <Button data-testid="header-btn-create" variant="primary">
            {"New dish"}
          </Button>
        </SpaceBetween>
      }
      {...props}
    >
      Dishes
    </Header>
  );
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

const getHeaderCounterText = (
  items: ReadonlyArray<unknown>,
  selectedItems: ReadonlyArray<unknown> | undefined
) => {
  return selectedItems && selectedItems?.length > 0
    ? `(${selectedItems.length}/${items.length})`
    : `(${items.length})`;
};

export default Dishes;
