import "../../styles/input.css";
import { fetchUserAttributes } from "aws-amplify/auth";
import { useEffect, useState } from "react";
import { listMenus, listUsers } from "../../../amplify/graphql/queries";
import { generateClient } from "aws-amplify/api";
import { Schema } from "../../../amplify/data/resource";
import MenuSelectionOrCreation from "./MenuSelectionOrCreation";
import { Menu, User } from "../../../amplify/graphql/API";

const client = generateClient<Schema>();

const Menus = () => {
  const [householdId, setHouseholdId] = useState<string>("");
  const [menuList, setMenuList] = useState<Menu[]>([]);
  const [_usersArray, setUsersArray] = useState<User[]>([]);
  const menuTempName =  "menu" + new Date().getTime();


  useEffect(() => {
    const getHouseholdIdAndSetMenuList = async () => {
      try {
        const userAttributes = await fetchUserAttributes();
        if (userAttributes["custom:householdID"]) {
          setHouseholdId(userAttributes["custom:householdID"]);
          const { data } = await client.graphql({
            query: listMenus,
            variables: {
              filter: {
                householdId: { eq: userAttributes["custom:householdID"] }
              },
              limit: 1000,
            },
          });
          setMenuList(data.listMenus.items);
          const { data: usersData } = await client.graphql({
            query: listUsers,
            variables: {
              filter: {
                householdID: { eq: userAttributes["custom:householdID"] }
              },
              limit: 30,
            },
          });
          setUsersArray([...usersData.listUsers.items]);
        } else {
          console.error("No household ID found in user attributes");
        }
      } catch (error) {
        console.error("Error fetching household ID:", error);
      }
    };

    getHouseholdIdAndSetMenuList();
  }, []);


  return <MenuSelectionOrCreation menusArray={menuList} menuTempName={menuTempName} householdId={householdId}/>

};

export default Menus;


