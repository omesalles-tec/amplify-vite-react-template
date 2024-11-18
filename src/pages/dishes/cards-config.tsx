// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { Link as RouterLink } from "react-router-dom";
import { Icon } from "@cloudscape-design/components";

/*const toggleFavorite = (id) => {
  setItems((prevItems) =>
    prevItems.map((item) =>
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    )
  );
};*/

const toggleFavorite = (id) => {
  console.log(id);
}

export const CARD_DEFINITIONS = {
  header: (item) => (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <span>
        {" "}
        <RouterLink to={`${item.id}`}>{item.dishName}</RouterLink>
      </span>
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering card click
          toggleFavorite(item.id);
        }}
        aria-label={
          item.isFavorite ? "Remove from favorites" : "Add to favorites"
        }
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: item.isFavorite ? "#ff8000" : "#ccc",
        }}
      >
        {item.isFavorite ? <Icon name="star-filled" /> : <Icon name="star" />}
      </button>
    </div>
  ),
  sections: [
    {
      id: "avgCost",
      header: "Average cost",
      content: (item) => item.avgCost,
    },
    {
      id: "avgTime",
      header: "Average time",
      content: (item) => item.avgTime,
    },
    {
      id: "recipesArray",
      header: "Recipes",
      content: (item: any) =>
        item.recipesArray.map((x, i) =>
          JSON.stringify(JSON.parse(x)["ingredientsArray"])
        ),
    },
  ],
};

export const VISIBLE_CONTENT_OPTIONS = [
  {
    label: "Main distribution properties",
    options: [
      { id: "avgCost", label: "Average cost" },
      { id: "avgTime", label: "Average Time" },
      { id: "recipesArray", label: "Recipes" },
    ],
  },
];

export const PAGE_SIZE_OPTIONS = [
  { value: 10, label: "10 Distributions" },
  { value: 30, label: "30 Distributions" },
  { value: 50, label: "50 Distributions" },
];

export const DEFAULT_PREFERENCES = {
  pageSize: 30,
  visibleContent: ["avgCost", "avgTime", "recipesArray"],
};
