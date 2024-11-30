import "../../styles/input.css";
import { listDishes } from "../../../amplify/graphql/queries";
import MenuContainer from "./MenuContainer";
import { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/api";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const client = generateClient<Schema>();

interface Recipe {
  name: string;
  type: string[];
}

const MenuCreation = () => {
  const [searchParams, _setSearchParams] = useSearchParams();
  const [recipes, setRecipes] = useState<Recipe[]>(Array.from({ length: 100 } , () => ({ name: '', type: [] })))

  useEffect(() => {
    const fetchRecipes = () => {
      client
        .graphql({
          query: listDishes,
          variables: {
            limit: 1000,
          },
        })
        .then((result) => {
          if (
            result &&
            result.data &&
            result.data.listDishes &&
            result.data.listDishes.items
          ) {
            setRecipes(
              result.data.listDishes.items.map((v: any) => ({
                name: v.dishName.toLowerCase() || "",
                type: v.type.map((x: string) => x.toLowerCase()),
              }))
            );
          }
        })
        .catch((error) => {
          console.error("Error fetching recipes:", error);
        });
    };
    fetchRecipes();
  }, []);

  const types = [
    "altres",
    "snack",
    "dinar",
    "sopar",
    "esmorcar",
    "acompanyament",
  ];
  const date = searchParams.get("startingDate") || "";
  const days = Number(searchParams.get("days")) || 0;
  //const users = searchParams['anonymousIndividuals'];
  const menuName = searchParams.get("menuName") || "";
  const isRandom = searchParams.get("isRandom") == "true";
  const users: string[] = [];
  searchParams.forEach((value, key) => {
    if (
      ![
        "menuName",
        "startingDate",
        "days",
        "anonymousIndividuals",
        "isRandom",
      ].includes(key)
    ) {
      if (value === "on") {
        users.push(key);
      } else {
        users.push(value);
      }
    }
  });

  return (
    <div className="h-[calc(100%-30px)]">
      <MenuContainer
        recipes={recipes}
        types={types}
        date={date}
        days={days}
        users={users}
        proposedMenuName={menuName}
        isRandom={isRandom}
      />
    </div>
  );
};

export default MenuCreation;
