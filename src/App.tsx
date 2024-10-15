import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import output from "../amplify_outputs.json";

import Layout from "./components/Layout";
import {
  createBrowserRouter,
  RouterProvider,
  LoaderFunctionArgs,
} from "react-router-dom";
import Household, {
  action as householdAction,
  loader as householdLoader,
} from "./pages/Household";
import EditHouseholdName, {
  loader as householdEditLoader,
  action as householdEditAction,
} from "./pages/household/EditHouseholdName";
import User, { loader as origUserLoader } from "./pages/User";
import Ingredients from "./pages/Ingredients";
import Recipes from "./pages/Recipes";
import ShoppingList from "./pages/ShoppingList";
import Stock from "./pages/Stock";
import Supermarkets from "./pages/Supermarkets";
import Discounts from "./pages/Discounts";
import Menus from "./pages/Menus";
import Root from "./pages/Root";
import NoPage from "./pages/NoPage";
import AddAnonymousMember, {
  action as householdAnonymousAction,
} from "./pages/household/AddAnonymousMember";

Amplify.configure(output);

const userLoader = async ({ params }: LoaderFunctionArgs) => {
  if ("id" in params) {
    const user = await origUserLoader({ params: { id: params.id ?? "" } });
    console.log("user", user);
    return user;
  }
  throw new Error("User ID is required");
};

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
          loader: householdLoader,
          action: householdAction,
        },
        {
          path: "household/edit",
          element: <EditHouseholdName />,
          loader: householdEditLoader,
          action: householdEditAction,
        },
        {
          path: "household/add-anonymous-member",
          element: <AddAnonymousMember />,
          action: householdAnonymousAction,
        },
        {
          path: "user/:id",
          element: <User />,
          loader: userLoader,
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
    }
  ]);

  return (
    <Authenticator>{() => <RouterProvider router={routes} />}</Authenticator>
  );
}
