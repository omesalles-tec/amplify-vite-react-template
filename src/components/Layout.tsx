// Layout.tsx
import React, { useEffect, useState } from "react";
//import '@cloudscape-design/global-styles/index.css';
import { TopNavigation } from "@cloudscape-design/components";
import { Outlet } from "react-router-dom";
import { fetchUserAttributes, signOut } from "aws-amplify/auth";
import { getCurrentUser } from "aws-amplify/auth";
import "../styles/input.css";
import { listDishes, listUsers } from "../../amplify/graphql/queries";
import { generateClient } from "aws-amplify/api";
import { Schema } from "../../amplify/data/resource";
import { save } from "../utils/localStorage";
import { clientSchema } from "../utils/clients";

const client = generateClient<Schema>();

/*interface LayoutProps {
  children: React.ReactNode;
}*/

/*const Layout: React.FC<LayoutProps> = ({ children }) => {*/
const Layout: React.FC = () => {
  const [theUser, setTheUser] = useState<string>();

  useEffect(() => {
    const loadUsername = async () => {
      try {
        const user = await getCurrentUser();
        setTheUser(user.signInDetails?.loginId);
      } catch (error) {
        console.error("Error loading username:", error);
      }
    };
    loadUsername();
  }, []);

  useEffect(() => {
    const loadDishes = async () => {
      try {
        const response = await client.graphql({
          query: listDishes,
          variables: {
            limit: 1000,
          },
        });
        const dishes = response.data?.listDishes?.items;
        save("dishes", dishes);
      } catch (error) {
        console.error("Error loading dishes:", error);
      }
    };
    loadDishes();
  }, []);

  useEffect(() => {
    // Define an asynchronous function to fetch data
    const loadUsers = async () => {
      try {
        const attributesData = await fetchUserAttributes();
        const { data: dataUsers } = await clientSchema.graphql({
          query: listUsers,
          variables: {
            filter: {
              householdID: { eq: attributesData["custom:householdID"] || "" },
            },
          },
        });
        const users = dataUsers.listUsers.items;
        save("users", users);
      } catch (error) {
        console.error("Error loading users:", error);
      }
    };
    loadUsers();
  }, []);

  return (
    <div className="app-container">
      {/* Top navigation bar */}
      <TopNavigation
        identity={{
          title: "MyApp",
          href: "/",
          logo: { src: "/logo.png", alt: "MyApp Logo" }, // Your logo here
        }}
        utilities={[
          {
            type: "button",
            text: "test",
            href: "/test?days=14&startDate=2024-12-04",
          },
          {
            type: "button",
            text: "Sign Out",
            onClick: () => signOut(),
          },
          {
            type: "button",
            text: "Household",
            href: "/household",
          },
          {
            type: "button",
            text: "Ingredients",
            href: "/ingredients",
          },
          {
            type: "button",
            text: "Dishes",
            href: "/dishes",
          },
          {
            type: "button",
            text: "Menus",
            href: "/menus",
          },
          {
            type: "button",
            text: "Shopping List",
            href: "/shoppinglist",
          },
          {
            type: "button",
            text: "Stock",
            href: "/stock",
          },
          {
            type: "button",
            text: "Supermarkets",
            href: "/supermarkets",
          },
          {
            type: "button",
            text: "Discounts",
            href: "/discounts",
          },
          {
            type: "button",
            text: `${theUser}`,
            href: "#",
            iconName: "user-profile",
            variant: "primary-button", // Changed from 'normal' to 'link'
          },
        ]}
        i18nStrings={{
          searchIconAriaLabel: "Open search",
          searchDismissIconAriaLabel: "Close search",
          overflowMenuTriggerText: "More",
          overflowMenuDismissIconAriaLabel: "Close menu",
        }}
      />
      {/* If you don't want to use the Outlet, you can use the following code
      <div className="content">
        {children}
      </div>
      */}
      <main className="content h-screen">
        <Outlet /> {/* Outlet will render the child routes here */}
      </main>
    </div>
  );
};

export default Layout;
