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
import Ingredients from "./pages/Ingredients";
import Recipes from "./pages/Recipes";
import ShoppingList from "./pages/ShoppingList";
import Stock from "./pages/Stock";
import Supermarkets from "./pages/Supermarkets";
import Discounts from "./pages/Discounts";
import Menus from "./pages/Menus";
import Root from "./pages/Root";
import NoPage from "./pages/NoPage";


Amplify.configure(output);


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
