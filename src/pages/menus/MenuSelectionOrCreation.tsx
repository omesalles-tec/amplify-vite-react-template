import "../../styles/input.css";
import { Link as BrowserLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu } from "../../../amplify/graphql/API";
import { listUsers } from "../../../amplify/graphql/queries";
import { generateClient } from "aws-amplify/api";
import { Schema } from "../../../amplify/data/resource";

const client = generateClient<Schema>();

type UserWithChecked = {
  name: string;
  checked: boolean;
};

export default function MenusSelectionOrCreation({
  menusArray,
  menuTempName,
  householdId,
}: {
  menusArray: Menu[];
  menuTempName: string;
  householdId: string;
}) {
  return (
    <div className="min-h-screen h-full flex flex-row items-center justify-center bg-gray-100 p-4">
      <ListOfMenus existingMenusArray={menusArray} householdId={householdId} />
      <FormNewMenu menuTempName={menuTempName} householdId={householdId} />
    </div>
  );
}

const ListOfMenus = ({
  existingMenusArray,
  householdId,
}: {
  existingMenusArray: Menu[];
  householdId: string;
}) => {
  return (
    <>
      <h2 className="text-xl font-bold mb-2">Current menus</h2>
      <div className="overflow-y-auto max-h-40">
        <ul>
          {existingMenusArray.map((x: Menu) => {
            return (
              <li key={x.id}>
                <BrowserLink
                  to={`${householdId}/${x.id}`}
                  className="flex text-blue-500 hover:underline"
                >
                  <span> {x.menuName} </span>
                </BrowserLink>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

const FormNewMenu = ({
  menuTempName,
  householdId,
}: {
  menuTempName: string;
  householdId: string;
}) => {
  const [usersArray, setUsersArray] = useState<any[]>([]);
  const [numberOfKnownUsers, setNumberOfKnownUsers] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Added loading state

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const formattedDate = tomorrow.toISOString().split("T")[0];

  const [count, setCount] = useState(0);

  const [isRandom, setIsRandom] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getHouseholdIdAndSetMenuList = async () => {
      try {
        const { data: usersData } = await client.graphql({
          query: listUsers,
          variables: {
            filter: {
              householdID: { eq: householdId },
            },
            limit: 30,
          },
        });
        const temp = [...usersData.listUsers.items];
        setNumberOfKnownUsers(temp.length);
        setUsersArray(
          temp.map((x) => ({
            name: x.anonymousLabel ? x.anonymousLabel : x.email ?? "",
            checked: true,
          }))
        );
      } catch (error) {
        console.error("Error fetching household ID:", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching data
      }
    };

    getHouseholdIdAndSetMenuList();
  }, [householdId]);

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCount = parseInt(e.target.value, 10);
    if (newCount >= 0) {
      setCount(newCount);
      updateInputs(newCount);
    }
  };

  const updateInputs = (newCount: number) => {
    const newInputs = structuredClone(usersArray.slice(0, numberOfKnownUsers));
    for (let i = 0; i < newCount; i++) {
      newInputs.push({ name: `person${i + 1}`, checked: true });
    }
    setUsersArray(newInputs);
  };

  const handleChanges = (
    fieldName: string,
    itemNumber: number,
    newValue: any
  ) => {
    const prevUsersArray = usersArray.map((x, k) => {
      const y = { ...x };
      if (itemNumber === k) {
        if (fieldName === "checked") {
          y[fieldName] = !y[fieldName];
        } else if (fieldName === "name") {
          y[fieldName] = newValue;
        }
      }
      return y;
    });
    setUsersArray(prevUsersArray);
  };

  const createRandom = () => {
    setIsRandom(true);
    navigate("menus/create");
  };

  return (
    <div className="h-full border rounded-lg p-4">
      <h2 className="text-xl font-bold mb-2">Create new menu</h2>
      <form
        action="menus/create"
        method="GET"
        className="overflow-y-auto space-y-6"
      >
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 mr-1 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          >
            New Empty Menu
          </button>
          <button
            onClick={() => createRandom()}
            /*type="submit"*/
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          >
            New Random Menu
          </button>
        </div>
        <input type="hidden" name="isRandom" value={isRandom.toString()} />
        <div className="h-full mb-4">
          <label
            htmlFor="menuName"
            className="block text-sm font-medium text-gray-700"
          >
            Menu name
          </label>
          <input
            type="text"
            id="menuName"
            name="menuName"
            defaultValue={menuTempName}
            className="mt-1 block w-full p-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="startingDate"
            className="block text-sm font-medium text-gray-700"
          >
            Starting date
          </label>
          <input
            type="date"
            id="startingDate"
            name="startingDate"
            defaultValue={formattedDate}
            className="mt-1 block w-full p-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="days"
            className="block text-sm font-medium text-gray-700"
          >
            Number of Days
          </label>
          <input
            type="number"
            id="days"
            name="days"
            defaultValue="7"
            className="w-2/3 p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="border rounded-lg p-4 mb-4">
          <h3 className="text-lg font-bold mb-2">Individuals</h3>
          {!isLoading ? (
            usersArray.slice(0, numberOfKnownUsers).map((x, i) => {
              return (
                <div key={x.name}>
                  <label className="inline-flex items-center mt-2">
                    <input
                      name={x.name}
                      type="checkbox"
                      className="form-checkbox text-indigo-600"
                      onChange={(e) =>
                        handleChanges("checked", i, e.target.value)
                      }
                      checked={x.checked}
                    />
                    <span className="ml-2">{x.name}</span>
                  </label>
                </div>
              );
            })
          ) : (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
              <span className="ml-4 text-lg font-semibold text-gray-700">
                Loading individuals, please wait...
              </span>
            </>
          )}

          <DynamicInputList
            count={count}
            anonymousUsersArray={usersArray.slice(numberOfKnownUsers)}
            numberOfKnownUsers={numberOfKnownUsers}
            handleChanges={handleChanges}
            handleCountChange={handleCountChange}
          />
        </div>
      </form>
    </div>
  );
};

interface DynamicInputListProps {
  count: number;
  anonymousUsersArray: UserWithChecked[];
  numberOfKnownUsers: number;
  handleChanges: (fieldName: string, itemNumber: number, newValue: any) => void;
  handleCountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DynamicInputList: React.FC<DynamicInputListProps> = ({
  count,
  anonymousUsersArray,
  numberOfKnownUsers,
  handleChanges,
  handleCountChange,
}) => {
  return (
    <div className="mt-4">
      <div className="mb-4">
        <label
          htmlFor="numberInput"
          className="block text-sm font-medium text-gray-700"
        >
          Anonymous individuals
        </label>
        <input
          type="number"
          id="anonymousIndividuals"
          name="anonymousIndividuals"
          min="0"
          value={count}
          onChange={handleCountChange}
          className="mt-1 block w-full p-2 border rounded-md"
        />
      </div>
      <div>
        {anonymousUsersArray.map((inputValue, index) => (
          <div key={index} className="mb-4">
            <label
              htmlFor={`personInput${index}`}
              className="block text-sm font-medium text-gray-700"
            >
              Name person {index + 1}
            </label>
            <input
              type="text"
              name={`personInput${index}`}
              onChange={(e) =>
                handleChanges(
                  "name",
                  numberOfKnownUsers + index,
                  e.target.value
                )
              }
              defaultValue={inputValue.name}
              className="mt-1 block w-full p-2 border rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
