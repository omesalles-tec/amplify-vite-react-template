import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import output from "../amplify_outputs.json";

import Layout from "./components/Layout";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  LoaderFunctionArgs,
} from "react-router-dom";
import Household, {
  action as householdAction,
  loader as householdLoader,
} from "./pages/Household";
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

Amplify.configure(output);

const userLoader = async ({ params }: LoaderFunctionArgs) => {
  if ('id' in params) {
    const user = await origUserLoader({ params: { id: params.id ?? '' } });
    console.log("user", user);
    return user;
  }
  throw new Error('User ID is required');
};

export default function App() {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Root />} />
        <Route
          path="household"
          element={<Household />}
          loader={householdLoader}
          action={householdAction}
        />
        <Route
          path="user/:id"
          element={<User />}
          loader={userLoader}
        />
        <Route path="ingredients" element={<Ingredients />} />
        <Route path="recipes" element={<Recipes />} />
        <Route path="shoppinglist" element={<ShoppingList />} />
        <Route path="menus" element={<Menus />} />
        <Route path="stock" element={<Stock />} />
        <Route path="supermarkets" element={<Supermarkets />} />
        <Route path="discounts" element={<Discounts />} />
        <Route path="*" element={<NoPage />} />
      </Route>
    )
  );
  return (
    <Authenticator>{() => <RouterProvider router={routes} />}</Authenticator>
  );
}
