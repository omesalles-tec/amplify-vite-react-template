import { Authenticator } from "@aws-amplify/ui-react";
//import "@aws-amplify/ui-react/styles.css";
//import "@cloudscape-design/global-styles"
import { Amplify } from "aws-amplify";
import output from "../amplify_outputs.json";

import Layout from "./components/Layout";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Household from "./pages/household/Household";
import Ingredients from "./pages/ingredients/Ingredients";
import Items from "./pages/items/Items";
import Dishes from "./pages/dishes/Dishes";
import Menus from "./pages/menus/Menus";
import MenuCreation from "./pages/menus/MenuCreation";
import Recipes from "./pages/Recipes";
import ShoppingList from "./pages/shoppingList/ShoppingList";
import Stock from "./pages/Stock";
import Supermarkets from "./pages/Supermarkets";
import Discounts from "./pages/Discounts";
import Root from "./pages/Root";
import NoPage from "./pages/NoPage";
import ActualShoppingList from "./pages/ActualShoppingList/ActualShoppingList";
import EditMenu from "./pages/menus/EditMenu";
//import Test from "./pages/test/Test";



Amplify.configure(output);
const existingConfig = Amplify.getConfig();

// Add existing resource to the existing configuration.
Amplify.configure({
  ...existingConfig,
  API: {
    ...existingConfig.API,
    REST: {
      ...existingConfig.API?.REST,
      "menu-planner-lambda": {
        endpoint:
          'https://a9g7lhpvu8.execute-api.eu-west-3.amazonaws.com',
        region: 'eu-west-3' // Optional
      }
    }
  }
});

/* THIS IS TO USE THE STATIC COGNITO 
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "eu-west-3_1agCCSjBs",
      userPoolClientId: "1q5sm5995fh0fjta30p4bgkgv0",
      identityPoolId: "eu-west-3:a9866a14-a489-4153-a415-3abde8b0b3ca",
      loginWith: {
        email: true,
      },
      signUpVerificationMethod: "code",
      userAttributes: {
        email: {
          required: true,
        },
      },
      allowGuestAccess: true,
      passwordFormat: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireNumbers: true,
        requireSpecialCharacters: true,
      },
    },
  },
})
*/

export default function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Root />,
        },
        {
          path: "household",
          element: <Household />,
        },
        {
          path: "ingredients",
          element: <Ingredients />,
        },
        {
          path: "ingredients/:uuid",
          element: <Items />,
        },
        {
          path: "dishes",
          element: <Dishes />,
        },        
        {
          path: "recipes",
          element: <Recipes />,
        },
        {
          path: "menus",
          element: <Menus />,
        },
        {
          path: "menus/:hid/:uuid",
          element: <EditMenu />,
        },
        {
          path: "menus/create",
          element: <MenuCreation />,
        },
        {
          path: "shoppinglist",
          element: <ShoppingList />,
        },
        {
          path: "shoppinglist/:uuid/:yyyymmdd",
          element: <ActualShoppingList />,
        },
        {
          path: "test",
          element: <Test />,
        },

        {
          path: "stock",
          element: <Stock />,
        },
        {
          path: "supermarkets",
          element: <Supermarkets />,
        },
        {
          path: "discounts",
          element: <Discounts />,
        },
        {
          path: "*",
          element: <NoPage />,
        },
      ],
    },
  ]);

  return (
    <Authenticator>{() => <RouterProvider router={routes} />}</Authenticator>
  );
}
