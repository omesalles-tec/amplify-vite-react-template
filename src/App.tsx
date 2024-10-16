import { Authenticator } from "@aws-amplify/ui-react";
//import "@aws-amplify/ui-react/styles.css";
//import "@cloudscape-design/global-styles"
import { Amplify } from "aws-amplify";
import output from "../amplify_outputs.json";

import Layout from "./components/Layout";
import {
  createBrowserRouter,
  RouterProvider,
  LoaderFunctionArgs,
} from "react-router-dom";
import Household, {
  loader as householdLoader,
} from "./pages/Household";
import EditHouseholdName, {
  loader as householdEditLoader,
  action as householdEditAction,
} from "./pages/household/EditHouseholdName";
import EditUser, { loader as origUserLoader, action as editUserAction } from "./pages/user/EditUser";
import EditAnonymousUser, { loader as origAnonymousUserLoader, action as editAnonymousUserAction } from "./pages/user/EditAnonymousUser";
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
    return user;
  }
  throw new Error("User ID is required");
};

const anonymousUserLoader = async ({ params }: LoaderFunctionArgs) => {
  if ("id" in params) {
    const user = await origAnonymousUserLoader({ params: { id: params.id ?? "" } });
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
          path: "edit-user/:id",
          element: <EditUser />,
          loader: userLoader,
          action: editUserAction,
        },
        {
          path: "edit-anonymous-user/:id",
          element: <EditAnonymousUser />,
          loader: anonymousUserLoader,
          action: editAnonymousUserAction,
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
