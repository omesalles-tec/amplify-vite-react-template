import "../../styles/input.css";
import { createMenu } from "../../../amplify/graphql/mutations";
import { useState, useEffect } from "react";
import {Container} from "./MenuContainer";
import {
  parse,
  startOfWeek,
  addDays,
  eachDayOfInterval,
  differenceInCalendarDays,
} from "date-fns";
import { generateClient } from "aws-amplify/api";
import { Schema } from "../../../amplify/data/resource";
import { useParams } from "react-router-dom";
import { getMenu, listDishes } from "../../../amplify/graphql/queries";

const client = generateClient<Schema>();

const fetchRecipes = async (setRecipes: any) => {
  client
    .graphql({
      query: listDishes,
      variables: {
        limit: 1000,
      },
    })
    .then((result) => {
      if (
        result &&
        result.data &&
        result.data.listDishes &&
        result.data.listDishes.items
      ) {
        setRecipes(
          result.data.listDishes.items.map((v: any) => ({
            name: v.dishName.toLowerCase() || "",
            type: v.type.map((x: string) => x.toLowerCase()),
          }))
        );
      }
    })
    .catch((error) => {
      console.error("Error fetching recipes:", error);
    });
};
const fetchMenuDetails = async (
  menuId: string,
  householdId: string,
  setMenuObj: any
) => {
  try {
    const response = await client.graphql({
      query: getMenu,
      variables: {
        id: menuId,
        householdId: householdId,
      },
    });
    if (response.data.getMenu?.menuDetails) {
      setMenuObj({
        ...response.data.getMenu,
        menuDetails: JSON.parse(response.data.getMenu.menuDetails),
      });
    }
  } catch (error) {
    console.error("Error fetching menu details:", error);
  }
};

interface MenuDetails {
  day: number;
  menu_id: string;
  number_of_individual_untis: number;
  person: string;
  type_id: string;
}
interface MenuObj {
  menuName: string;
  startDate: string;
  days: number;
  householdId: string;
  menuDetails: MenuDetails[];
}
interface EditMenuDetailsProps {
  menuObj: MenuObj;
  theMenuId: string;
  recipes: any;
  types: any;
}
const EditMenu = () => {
  const { uuid, hid } = useParams<string>();
  const menuId = uuid || "";
  const householdId = hid || "";
  const [menuObj, setMenuObj] = useState<any>({
    menuName: "loading",
    startDate: "2024-01-01",
    days: 1,
    menuDetails: [{ day: 1, menu_id: "", number_of_individual_units: 1, person: "", type_id: "altres" }],
  });
  const [recipes, setRecipes] = useState<any[]>([]);
  const types = [
    { type: "altres" },
    { type: "snack" },
    { type: "dinar" },
    { type: "sopar" },
    { type: "esmorcar" },
    { type: "acompanyament" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      await fetchRecipes(setRecipes); // Awaiting fetchRecipes with arguments
      await fetchMenuDetails(menuId, householdId, setMenuObj); // Awaiting fetchMenuDetails with arguments
    };

    fetchData(); // Invoking the async function
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="h-[calc(100%-30px)]">
        <EditMenuDetails
          menuObj={menuObj}
          theMenuId={menuId}
          recipes={recipes}
          types={types}
        />
      </div>
    </div>
  );
};
export default EditMenu;

const EditMenuDetails = ({
  menuObj,
  theMenuId,
  recipes,
  types,
}: EditMenuDetailsProps) => {
  const [menuName, setMenuName] = useState<string>(menuObj["menuName"]);
  const [menuId, setMenuId] = useState<string | undefined>(theMenuId);
  const [householdId, _setHouseholdId] = useState<string>("");
  const handleMenuName = (value: string) => {
    setMenuName(value);
  };

  const setMenuIdChildren = async (menuName: string) => {
    if (menuName) {
      const data = await client.graphql({
        query: createMenu,
        variables: {
          input: {
            menuName: menuName,
            startDate: date,
            days: Number(days),
            householdId: householdId,
            menuDetails: JSON.stringify({}),
          },
        },
      });
      setMenuId(data.data.createMenu.id);
      return data.data.createMenu.id;
    }
  };
  const date: string = menuObj.startDate;
  const days: number = menuObj.days;
  const users = [...new Set(menuObj.menuDetails.map((x: any) => x.person))];

  const listOfMealTypes = types.map((x: any) => x.type);
  const [addedDays, daysArray, emptyMenuObj] = createEmptyMenuObj(
    listOfMealTypes,
    date,
    days
  );

  const startMenuObj = transformArrayToObject(menuObj, emptyMenuObj, addedDays);

  return (
    <Container
      recipes={recipes}
      types={types}
      listOfMealTypes={listOfMealTypes}
      date={date}
      users={users}
      menuId={menuId}
      setMenuIdChildren={setMenuIdChildren}
      menuName={menuName}
      handleMenuName={handleMenuName}
      addedDays={addedDays}
      daysArray={daysArray}
      startMenuArray={startMenuObj}
      householdId={householdId}
    />
  );
};

function transformArrayToObject(
  arrWithData: MenuObj,
  arrAllEmpty: any[],
  addedDays: number
) {
  const thisArray = structuredClone(arrAllEmpty);
  const intAddedDays = Number(addedDays);
  arrWithData.menuDetails.forEach((item: any) => {
    const { type, day, recipe, person, units } = item;
    if (!thisArray[type]) {
      thisArray[type] = [];
    }

    if (!thisArray[type][intAddedDays + day]) {
      thisArray[type][intAddedDays + day] = {};
    }

    if (!thisArray[type][intAddedDays + day][recipe]) {
      thisArray[type][intAddedDays + day][recipe] = {};
    }
    thisArray[type][intAddedDays + day][recipe][person] = units;
  });
  return thisArray;
}
function createEmptyMenuObj(
  listOfMealTypes: string[],
  starting_date: string,
  days: number
) {
  // add aditional days to start on a monday
  const startDate = parse(starting_date, "yyyy-MM-dd", new Date());
  const startMonday = startOfWeek(startDate, { weekStartsOn: 1 });
  const endDate = addDays(startDate, days - 1);
  const daysArray = eachDayOfInterval({ start: startMonday, end: endDate });
  const n = differenceInCalendarDays(startDate, startMonday);
  const emptyMenuObj = createEmptyStructure(
    listOfMealTypes,
    Number(days) + Number(n)
  );

  return [n, daysArray, emptyMenuObj];
}

function createEmptyStructure(listOfMealTypes: string[], days: number) {
  if (days > 0) {
    const result: any = {};

    listOfMealTypes.forEach((key: string) => {
      result[key] = Array(Number(days))
        .fill(null)
        .map(() => ({}));
    });

    return result;
  }
}
