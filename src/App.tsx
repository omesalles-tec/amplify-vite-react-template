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
import Household from "./pages/Household";
import Ingredients from "./pages/Ingredients/Ingredients";
import Items from "./pages/Items";
import Recipes from "./pages/Recipes";
import ShoppingList from "./pages/ShoppingList";
import Stock from "./pages/Stock";
import Supermarkets from "./pages/Supermarkets";
import Discounts from "./pages/Discounts";
import Menus from "./pages/Menus";
import Root from "./pages/Root";
import NoPage from "./pages/NoPage";


Amplify.configure(output);

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
          path: "items/:theIngredientId",
          element: <Items />,
        },        
        {
          path: "recipes",
          element: <Recipes />,
        },
        {
          path: "shoppinglist",
          element: <ShoppingList />,
        },
        {
          path: "menus",
          element: <Menus />,
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
