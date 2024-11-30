import "../../styles/input.css";
import ContainerLeft from "./left-side/ContainerLeft";
import ContainerRight from "./right-side/ContainerRight";
import { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import Meals from "./header-meals";
import Users from "./right-side/UsersHeader";
import {
  parse,
  startOfWeek,
  addDays,
  eachDayOfInterval,
  differenceInCalendarDays,
} from "date-fns";
import { createMenu, updateMenu} from "../../../amplify/graphql/mutations"
import Modal from "./SaveMenuModal";
import { generateClient } from "aws-amplify/api";
import { Schema } from "../../../amplify/data/resource";
import { fetchUserAttributes } from "aws-amplify/auth";


const client = generateClient<Schema>();

interface MenuContainerProps {
  recipes: any;
  types: string[];
  date: string;
  days: number;
  users: string[];
  proposedMenuName: string;
  isRandom: boolean;
}

interface ContainerProps {
  recipes: any;
  types: string[];
  listOfMealTypes: string[];
  date: string;
  users: string[];
  menuId?: string;
  setMenuIdChildren: (menuName: string) => Promise<string | undefined>;
  menuName: string;
  handleMenuName: (value: string) => void;
  addedDays: number;
  daysArray: Date[];
  startMenuArray: any;
  householdId: string;
}

// Define the type for handleSearch
export default function MenuContainer({ 
  recipes, 
  types, 
  date, 
  days, 
  users, 
  proposedMenuName, 
  isRandom 
}: MenuContainerProps) {
  const [menuName, setMenuName] = useState(proposedMenuName);
  const [menuId, setMenuId] = useState<string | undefined>(undefined);
  const handleMenuName = (value: string) => {
    setMenuName(value);
  };
  const [householdId, setHouseholdId] = useState<string>("");
  
  const setMenuIdChildren = async (menuName: string) => {
    if (menuName) {
      const data = (await client.graphql({
        query: createMenu,
        variables: {
          input: {
            menuName: menuName,
            startDate: date,
            days: Number(days),
            householdId:householdId,
            menuDetails:JSON.stringify({})
          }
        }}))
      setMenuId(data.data.createMenu.id);
      return data.data.createMenu.id
    }
  };

  useEffect(() => {
    const temp = async () => {
      const userAttributes = await fetchUserAttributes();
      setHouseholdId(userAttributes["custom:householdID"] || "");
      await setMenuIdChildren("");
    }
    temp();
  }, [menuId]);

  const listOfMealTypes = [...types];
  const createMenuObj = isRandom ? createRandomMenuObj : createEmptyMenuObj;
  const [addedDays, daysArray, startMenuArray] = createMenuObj(listOfMealTypes, date, days, users, recipes);
  
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
      startMenuArray={startMenuArray}
      householdId = {householdId}
    />
  );
}

export function Container({
  recipes,
  types,
  listOfMealTypes,
  date,
  /*days,*/
  users,
  menuId,
  setMenuIdChildren,
  menuName,
  handleMenuName,
  addedDays,
  daysArray,
  startMenuArray,
  householdId,
}: ContainerProps) {
  const recipeNames = recipes.map((x:any) => x.name || "");
  const recipeTypes = recipes.map((x:any) => x.type || "");

  // Users header
  const [allUsersChecked, setAllUsersChecked] = useState(true);
  const [usersArray, setUsersArray] = useState(
    users.map((x) => ({
      name: x,
      units: 1,
      checked: true,
    }))
  );

  // Recipe Type header
  const [selectedRecipeType, setSelectedRecipeType] = useState("snack");
  // List of recipes
  const [visibleRecipesByType, setVisibleRecipesByType] = useState(
    recipeTypes.map((x:string[]) => x.includes(selectedRecipeType))); // identifying recipes of the right type
  const [_visibleRecipesByName, setVisibleRecipesByName] = useState(
    recipeNames.map((_x:any) => true)
  ); // starting with no search txt
  const [visibleRecipes, setVisibleRecipes] = useState(
    recipeTypes.map((x:string[]) => x.includes(selectedRecipeType))//.map(
//      (typeVisible: boolean, i: number) => (typeVisible ? visibleRecipesByName[i]: false)
//    )
  );
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [totalSelected, setTotalSelected] = useState(0);

  // Serching recipes from the list
  const [searchValue, setSearchValue] = useState("");

  // Calendar
  const [menuArray, setMenuArray] = useState(startMenuArray);
  const [daysArraySelected, setDaysArraySelected] = useState(
    daysArray.map((_x:any) => false)
  );
  const [quantities, setQuantities] = useState(() =>
    menuArray[selectedRecipeType].map((x:any) => sumNestedValues(x))
  );

  // Save modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    // Logic to update visibleRecipesByType based on selectedRecipeType
    const updatedVisibleRecipesByType = recipeTypes.map((x: string[]) => x.includes(selectedRecipeType));
    setVisibleRecipesByType(updatedVisibleRecipesByType);
    
    // Logic to update visibleRecipes based on searchValue
    const updatedVisibleRecipesByName = recipeNames.map((name: string) => name.toLowerCase().includes(searchValue.toLowerCase()));
    setVisibleRecipesByName(updatedVisibleRecipesByName);
    
    // Combine visibleRecipesByType and visibleRecipesByName to get the final visibleRecipes
    const combinedVisibleRecipes = recipeTypes.map((_type: any, index: number) => updatedVisibleRecipesByType[index] && updatedVisibleRecipesByName[index]);
    setVisibleRecipes(combinedVisibleRecipes);
  }, [recipes, selectedRecipeType, searchValue]);
  
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  // Users selection
  const handleUsersAllChange = (e: any) => {
    setAllUsersChecked(e.target.checked);
    const prevUsersArray = structuredClone(usersArray);
    setUsersArray(
      prevUsersArray.map((x) => {
        x["checked"] = e.target.checked;
        return x;
      })
    );
  };

  const handleUsersChange = (i: number) => {
    const prevUsersArray = structuredClone(usersArray);
    prevUsersArray[i]["checked"] = !prevUsersArray[i]["checked"];
    setUsersArray(prevUsersArray);
  };

  const handleUnitsChange = (i: number, value: string) => {
    const prevUsersArray = structuredClone(usersArray);
    prevUsersArray[i]["units"] = parseInt(value);
    setUsersArray(prevUsersArray);
  };

  // Recipe type selected
  const resetClick = () => {
    setSelectedRecipes([]);
    setTotalSelected(0);
  };

  const handleAllMeals = (_e: React.FormEvent<HTMLInputElement>) => {
    setSelectedRecipeType("All");
    setSearchValue("");
    setVisibleRecipesByName(recipeNames.map((_x: any) => true));
    setVisibleRecipesByType(recipeTypes.map((_x: any) => true));
    setVisibleRecipes(recipeTypes.map((_x: any) => true));
    resetClick();
    setAllUsersChecked(false); // don't allow adding recipes to menu when viewing all types
    const prevUsersArray = structuredClone(usersArray);
    prevUsersArray[0]["checked"] = false;
    setUsersArray(prevUsersArray);
  };

  const handleMeals = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchValue("");
    setVisibleRecipesByName(recipeNames.map((_x: any) => true));
    const newValue =(e.target as HTMLInputElement).value;
    setSelectedRecipeType(newValue);
    setVisibleRecipesByType(
      recipeTypes.map((x: string[]) =>x.includes(newValue)
      )
    );
    setVisibleRecipes(recipeTypes.map((x: string[]) =>x.includes(newValue)
  ))
    resetClick();
    setQuantities(menuArray[(e.target as HTMLInputElement).value].map((x: any) => sumNestedValues(x)));
  };

  // Calendar
  const handleOnDayClick = (i: number) => {
    if (i >= addedDays) {
      const prevDaysArraySelected = daysArraySelected.slice();
      prevDaysArraySelected[i] = !prevDaysArraySelected[i];
      setDaysArraySelected(prevDaysArraySelected);
    } else {
      window.alert(
        `This date is before the ${date}, the requested starting date for the menu`
      );
    }
  };

  const selectWeek = (value: boolean, day: number) => {
    const thisWeekIndexNumbers = Array(7)
      .fill(0)
      .map((_x: any, i: number) => i + Number(day));
    const prevDaysArraySelected = daysArraySelected.slice();
    setDaysArraySelected(
      prevDaysArraySelected.map((_x: any, i) => {
        return i >= addedDays && thisWeekIndexNumbers.includes(i)
          ? value
          : prevDaysArraySelected[i];
      })
    );
  };

  // Managing recipes in calendar
  const handleDeleteRecipe = (d: number, r: string) => {
    const prevMenuArray = structuredClone(menuArray);
    delete prevMenuArray[selectedRecipeType][d][r];
    setMenuArray(prevMenuArray);
  };

  const handleIndividualDelete = (d: number, r: string, i: string) => {
    const prevMenuArray = structuredClone(menuArray);
    delete prevMenuArray[selectedRecipeType][d][r][i];
    setMenuArray(prevMenuArray);
    setQuantities(
      prevMenuArray[selectedRecipeType].map((x: number) => sumNestedValues(x))
    );
    if (Object.keys(prevMenuArray[selectedRecipeType][d][r]).length === 0)
      handleDeleteRecipe(d, r);
  };

  const handleIndividualInputChange = (d: number, r: string, i: string, newValue: string) => {
    const prevMenuArray = structuredClone(menuArray);
    prevMenuArray[selectedRecipeType][d][r][i] = parseInt(newValue, 10);
    setMenuArray(prevMenuArray);
    setQuantities(
      prevMenuArray[selectedRecipeType].map((x: number) => sumNestedValues(x))
    );
  };

  // managing recipes selected in recipes list
  const toggleSelection = (item: any) => {
    setSelectedRecipes((prevSelectedItems: any) => {
      if (prevSelectedItems.includes(item)) {
        setTotalSelected(totalSelected > 0 ? totalSelected - 1 : 0);
        return prevSelectedItems.filter((i: any) => i !== item);
      } else {
        setTotalSelected(totalSelected + 1);
        return [...prevSelectedItems, item];
      }
    });
  };

  // Update the handleSearch function with the defined type
  const handleSearch = useDebouncedCallback((searchString: string) => {
    setSearchValue(searchString);
    setVisibleRecipesByName(
      recipeNames.map((x: string) =>
        x.includes(searchString.toLowerCase())
      )
    );
    setVisibleRecipes(
      recipeNames.map(
        (x: string, i: number) =>
          visibleRecipesByType[i] &&
          x.includes(searchString.toLowerCase())
      )
    );
  }, 100);

  // Transfer Recipes to Calendar
  const transferRecipes = () => {
    // should only transfer if there are individuals selected
    if (usersArray.map((x: any) => x["checked"]).includes(true)) {
      const prevMenuArray = structuredClone(menuArray);
      let newPerson: any = {};
      let newRecipe: any = {};
      let temp = {};
      for (let d = 0; d < daysArraySelected.length; d++) {
        if (daysArraySelected[d]) {
          temp = structuredClone(prevMenuArray[selectedRecipeType][d]);
          newRecipe = temp
            ? structuredClone(prevMenuArray[selectedRecipeType][d])
            : {};
          for (let r in selectedRecipes) {
            temp = structuredClone(prevMenuArray[selectedRecipeType][d][r]);
            newPerson = temp
              ? structuredClone(prevMenuArray[selectedRecipeType][d][r])
              : {};
              for (let p = 0; p < usersArray.length; p++) {
                if (usersArray[p]["checked"]) {
                  newPerson[usersArray[p]["name"]] = usersArray[p]["units"];
                }
              }
            newRecipe[selectedRecipes[r] as keyof typeof newRecipe] = structuredClone(newPerson);
            prevMenuArray[selectedRecipeType][d] = structuredClone(newRecipe);
          }
        }
      }
      setMenuArray(prevMenuArray);
      setQuantities(
        prevMenuArray[selectedRecipeType].map((x: any) => sumNestedValues(x))
      );
    }
  };

  const handleSubmit = async (menuName: string) => {
    let thisId = menuId || "";
    if (!menuId) {
      thisId = await setMenuIdChildren(menuName) || "";
    }
    try {
      // add new menu to menu table, need a name and the starting date and returns menu_id
      const outputArray = transformObjectToArray(
        thisId,
        menuArray,
        addedDays,
        types,
        recipes
      );
      await client.graphql({
        query: updateMenu,
        variables: {
          input: {
            id: thisId!,
            menuDetails: JSON.stringify(outputArray),
            householdId: householdId // Adding required householdId field
          }
        }
      })
      //addMenuDetails(thisId, outputArray);
      setIsModalOpen(false);
    } catch (e) {
      console.log(e);
      window.alert("This menu name already exists");
    }
  };

  return (
    <div className="flex flex-row h-full w-full">
      <div className="flex flex-col h-full rounded-lg mx-1 w-1/4">
        <Meals
          handleMeals={handleMeals}
          listOfMealTypes={listOfMealTypes}
          handleAllMeals={handleAllMeals}
          selectedRecipeType={selectedRecipeType}
        />
        <ContainerLeft
          recipeNames={recipeNames}
          visibleRecipes={visibleRecipes}
          handleSearch={handleSearch}
          toggleSelection={toggleSelection}
          resetClick={resetClick}
          selectedRecipes={selectedRecipes}
          totalSelected={totalSelected}
          searchValue={searchValue}
          transferRecipes={transferRecipes}
        />
      </div>
      <div className="flex flex-col h-full rounded-lg mx-1 w-3/4">
        <Users
          allChecked={allUsersChecked}
          usersArray={usersArray}
          handleUsersAllChange={handleUsersAllChange}
          handleUsersChange={handleUsersChange}
          handleUnitsChange={handleUnitsChange}
        />
        <button
          onClick={openModal}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        >
          Save Menu
        </button>
        {isModalOpen && (
          <Modal closeModal={closeModal} handleSubmit={handleSubmit} menuName={menuName} handleMenuName={handleMenuName} />
        )}
        <ContainerRight
          menuArray={menuArray[selectedRecipeType]}
          handleOnDayClick={handleOnDayClick}
          daysArray={daysArray}
          daysArraySelected={daysArraySelected}
          quantities={quantities}
          handleDeleteRecipe={handleDeleteRecipe}
          handleIndividualDelete={handleIndividualDelete}
          handleIndividualInputChange={handleIndividualInputChange}
          selectWeek={selectWeek}
        />
      </div>
    </div>
  );
}

function createEmptyStructure(listOfMealTypes: any[], days: number) {
  const result: any = {};

  listOfMealTypes.forEach((key) => {
    result[key] = Array(Number(days)).fill({});
  });

  return result;
}

function createEmptyMenuObj(
  listOfMealTypes: string[], 
  starting_date: string, 
  days: number
): [number, Date[], Record<string, any>] {
  // add aditional days to start on a monday
  const startDate = parse(starting_date, "yyyy-MM-dd", new Date());
  const startMonday = startOfWeek(startDate, { weekStartsOn: 1 });
  const endDate = addDays(startDate, days - 1);
  const daysArray = eachDayOfInterval({ start: startMonday, end: endDate });
  const n = differenceInCalendarDays(startDate, startMonday);
  const menuArray = createEmptyStructure(
    listOfMealTypes,
    Number(days) + Number(n)
  );

  return [n, daysArray, menuArray];
}

const sumNestedValues = (obj: any) => {
  const result:any = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const nestedObject = obj[key];
      let sum = 0;

      for (const nestedKey in nestedObject) {
        if (nestedObject.hasOwnProperty(nestedKey)) {
          sum += nestedObject[nestedKey];
        }
      }
      result[key] = sum;
    }
  }
  return result;
};

function transformObjectToArray(menuId: string, input: any, addedDays: number, types: any[], recipes: any[]) {
  const result: any = [];
  let recipeId = null;
  let typeId = null;

  for (const type in input) {
    if (input.hasOwnProperty(type)) {
      input[type].forEach((dayRecipes: any[], dayIndex: number) => {
        typeId = returnTypeId(types, type);
        for (const recipe in dayRecipes) {
          recipeId = returnRecipeId(recipes, recipe);
          if (dayRecipes.hasOwnProperty(recipe)) {
            for (const person in dayRecipes[recipe]) {
              if (dayRecipes[recipe].hasOwnProperty(person)) {
                result.push({
                  menu_id: menuId,
                  type_id: typeId,
                  day: dayIndex - addedDays,
                  recipe_id: recipeId,
                  person: person,
                  number_of_individual_units: dayRecipes[recipe][person],
                });
              }
            }
          }
        }
      });
    }
  }

  return result;
}

function returnRecipeId(recipes: any[], recipeName: string) {
  return recipes.find((x) => x.name === recipeName)["id"];
}

function returnTypeId(_types: any[], typeName: string) {
  return typeName;
}


function createRandomMenuObj(
  listOfMealTypes: string[], 
  starting_date: string, 
  days: number, 
  users: string[], 
  recipes: { name: string; types: string[]; id: string }[]
): [number, Date[], Record<string, any>[]] {
  // add aditional days to start on a monday
  const startDate = parse(starting_date, "yyyy-MM-dd", new Date());
  const startMonday = startOfWeek(startDate, { weekStartsOn: 1 });
  const endDate = addDays(startDate, days - 1);
  const daysArray = eachDayOfInterval({ start: startMonday, end: endDate });
  const n = differenceInCalendarDays(startDate, startMonday);
  let menuArray = createEmptyStructure(
    listOfMealTypes,
    Number(days) + Number(n)
  );

  menuArray = updateMenuArray(users, listOfMealTypes, Number(days), Number(n), recipes, menuArray)

  return [n, daysArray, menuArray];
}

function updateMenuArray(
  users: string[], 
  listOfMealTypes: string[], 
  days: number, 
  n: number, 
  recipes: { name: string; types: string[]; id: string }[], 
  menuArray: Record<string, any>[]
): Record<string, any>[] {
  // Helper function to get a random element from an array
  function getRandomElement(arr: any[]): any {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // Loop through each meal type
  listOfMealTypes.forEach((type: any) => {
    // Filter recipes by the current meal type
    const filteredRecipes = recipes.filter(recipe => recipe.types && recipe.types.includes(type));

    // Ensure there are enough recipes to choose from
    if (filteredRecipes.length === 0) {
      console.warn(`No recipes found for meal type: ${type}`);
      return;
    }

    // Loop through the number of meals needed
    for (let i = 0; i < days; i++) {
      // Select a random recipe from the filtered list
      const selectedRecipe = getRandomElement(filteredRecipes);

      // Update the menuArray
      if (!menuArray[type][n + i][selectedRecipe.name]) {
        menuArray[type][n + i] = { ...menuArray[type][n + i], [selectedRecipe["name"]]: {} };
      }
      users.forEach(user => {
        // Loop through each user
        menuArray[type][n + i][selectedRecipe.name] = { ...menuArray[type][n + i][selectedRecipe.name], [user]: 1 };
      });
    }
  });

  return menuArray;
}
