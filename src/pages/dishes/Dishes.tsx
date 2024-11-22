"use client";
import { useState, useEffect } from "react";
import { useCollection } from "@cloudscape-design/collection-hooks";
import {
  Cards,
  CollectionPreferences,
  Header,
  HeaderProps,
  Modal,
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
import {
  getFavouriteDishes,
  listDishes,
} from "../../../amplify/graphql/queries";
import { generateClient } from "aws-amplify/api";
import { Schema } from "../../../amplify/data/resource";
import { Link as RouterLink } from "react-router-dom";
import { Icon } from "@cloudscape-design/components";
import { capitalizeFirstLetter } from "../../utils/functions";
import {
  updateDishes,
  updateFavouriteDishes,
} from "../../../amplify/graphql/mutations";
import { getCurrentUser } from "aws-amplify/auth";
import { Alert } from "@cloudscape-design/components";

const client = generateClient<Schema>();

const Dishes = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [dirty, setDirty] = useState(false);
  useEffect(() => {
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  });

  const onBeforeUnload = (evt: any) => {
    if (dirty) {
      // Cancel the event as stated by the standard.
      evt.preventDefault();
      // Chrome requires returnValue to be set.
      evt.returnValue = '';
    }
  };

  return (
    <AppLayout
      content={
        <>
          <DetailsCards setDirty={setDirty} dirty={dirty}/>
          <Modal
            visible={modalVisible}
            header="Leave page"
            closeAriaLabel="Close modal"
            onDismiss={() => {
              setModalVisible(false);
            }}
            footer={
              <Box float="right">
                <SpaceBetween direction="horizontal" size="xs">
                  <Button
                    variant="link"
                    onClick={() => {
                      setModalVisible(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button variant="primary">Leave</Button>
                </SpaceBetween>
              </Box>
            }
          >
            <Alert type="warning" statusIconAriaLabel="Warning">
              Are you sure that you want to leave the current page? The changes
              that you made won't be saved.
            </Alert>
          </Modal>
        </>
      }
      contentType="cards"
      toolsHide={true}
      navigationHide={true}
    />
  );
};

const DetailsCards = ({setDirty, dirty}: {setDirty: React.Dispatch<React.SetStateAction<boolean>>, dirty: boolean}) => {
  const [modifiedValues, setModifiedValues] = useState<{[key: string]: any}>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [dishes, setDishes] = useState<any[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
  const [userID, setUserID] = useState<string>("");
  const [preferencesDishes, setPreferencesDishes] = useState<any>({});
  const [forceRefresh, setForceRefresh] = useState<boolean>(false);

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
        const user = await getCurrentUser();
        setUserID(user.username);
        // query the preferences, it'll be a json object or null
        const preferencesDishesTemp = await client.graphql({
          query: getFavouriteDishes,
          variables: {
            id: user.username,
          },
        });
        const preferencesString =
          preferencesDishesTemp.data.getFavouriteDishes?.preferences;
        const preferencesObj = JSON.parse(preferencesString || "");
        if (preferencesString) {
          setPreferencesDishes(preferencesObj);
        }
        console.log(JSON.parse(preferencesString || ""));
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
              isFavorite:
                preferencesObj?.[v.id as keyof typeof preferencesObj] === 1
                  ? true
                  : false,
              isNotFavorite:
                preferencesObj?.[v.id as keyof typeof preferencesObj] === -1
                  ? true
                  : false,
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
  }, [forceRefresh]);

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
    setModifiedValues({
      ...modifiedValues,
      [item.position]: { ...item, type: newTypes },
    });
    setDirty(true);
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
    setModifiedValues({
      ...modifiedValues,
      [item.position]: {
        ...item,
        isFavorite: !item.isFavorite,
        isNotFavorite: !item.isFavorite ? false : item.isNotFavorite,
      },
    });
    setDirty(true);

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
    setModifiedValues({
      ...modifiedValues,
      [item.position]: {
        ...item,
        isNotFavorite: !item.isNotFavorite,
        isFavorite: !item.isNotFavorite ? false : item.isFavorite,
      },
    });
    setDirty(true);

  };

  const handleSave = async () => {
    console.log(modifiedValues);
    //loop thru the modifiedValues and save them
    let temp = { ...preferencesDishes };
    for (const [_key, value] of Object.entries(modifiedValues)) {
      const typedValue = value as {
        id: unknown;
        type: unknown[];
        isFavorite: boolean;
        isNotFavorite: boolean;
      };
      await client.graphql({
        query: updateDishes,
        variables: {
          input: {
            id: typedValue.id as string,
            type: typedValue.type as string[],
          },
        },
      });
      if (typedValue.isFavorite) {
        console.log({ ...preferencesDishes, [String(typedValue.id)]: 1 });
        temp = { ...temp, [String(typedValue.id)]: 1 };
      } else if (typedValue.isNotFavorite) {
        temp = { ...temp, [String(typedValue.id)]: -1 };
      } else {
        delete temp[String(typedValue.id)];
      }
    }
    setPreferencesDishes(temp);
    await client.graphql({
      query: updateFavouriteDishes,
      variables: {
        input: {
          id: userID,
          preferences: JSON.stringify(temp),
        },
      },
    });
    setModifiedValues({});
    setDirty(false);
  };

  const handleRefresh = () => {
    setDirty(false);
    setModifiedValues({});
    setForceRefresh(!forceRefresh);
  };

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
          dirty={dirty}
          counter={
            loading
              ? undefined
              : getHeaderCounterText(dishes, collectionProps.selectedItems ?? [])
          }
          selectedItemsCount={collectionProps.selectedItems?.length ?? 0}
          handleSave={handleSave}
          handleRefresh={handleRefresh}
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
  selectedItemsCount: number;
  dirty: boolean;
  handleRefresh: () => void;
  handleSave: () => void;
  onInfoLinkClick?: () => void;
}

export function FullPageHeader({
  selectedItemsCount,
  dirty,
  handleRefresh,
  handleSave,
  onInfoLinkClick,
  ...props
}: FullPageHeaderProps) {

  return (
    <Header
      variant="awsui-h1-sticky"
      info={onInfoLinkClick && <InfoLink onFollow={onInfoLinkClick} />}
      actions={
        <SpaceBetween size="xs" direction="horizontal">
          <Button onClick={handleRefresh} disabled={!dirty}>
            <Icon name="refresh" />
          </Button>
          <Button onClick={handleSave} disabled={!dirty}>Save</Button>
          <Button variant="primary">New dish</Button>
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
