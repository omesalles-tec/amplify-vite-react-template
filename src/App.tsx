import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Household from "./pages/Household";
import Ingredients from "./pages/Ingredients";
import Recipes from "./pages/Recipes";
import ShoppingList from "./pages/ShoppingList";
import Stock from "./pages/Stock";
import Supermarkets from "./pages/Supermarkets";
import NoPage from "./pages/Menus";
import Todos from "./pages/Todos";
import { Amplify } from "aws-amplify";
import output from "../amplify_outputs.json";

Amplify.configure(output);

export default function App() {
  return (
    <Authenticator>
      {({ signOut }) => (
        <>
        <Todos />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Household />} />
                <Route path="household" element={<Household />} />
                <Route path="ingredients" element={<Ingredients />} />
                <Route path="recipes" element={<Recipes />} />
                <Route path="shoppinglist" element={<ShoppingList />} />
                <Route path="stock" element={<Stock />} />
                <Route path="supermarkets" element={<Supermarkets />} />
                <Route path="*" element={<NoPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
          <button onClick={signOut}>Sign out</button>
        </>
      )}
    </Authenticator>
  );
}
