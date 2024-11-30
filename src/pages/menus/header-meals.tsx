import "../../styles/input.css";
import React from "react";
interface CheckboxComponentProps {
  handleMeals: (e: React.FormEvent<HTMLInputElement>) => void;
  listOfMealTypes: string[];
  handleAllMeals: (e: React.FormEvent<HTMLInputElement>) => void;
  selectedRecipeType: string;
}

export default function CheckboxComponent({
  handleMeals,
  listOfMealTypes,
  handleAllMeals,
  selectedRecipeType,
}: CheckboxComponentProps) {
  return (
    <fieldset>
      <div className="flex flex-nowrap overflow-auto pb-2">
        {selectedRecipeType === "All" ? (
          <label className="flex flex-nowrap border border-gray-200 rounded-lg mr-1 px-1">
            All
            <input
              type="radio"
              name="meals"
              value="all"
              onChange={handleAllMeals}
              defaultChecked
              className="mr-1"
              disabled={true}
            />
          </label>
        ) : (
          <label className="flex flex-nowrap border border-gray-200 rounded-lg mr-1 px-1">
            All
            <input
              type="radio"
              name="meals"
              value="all"
              onChange={handleAllMeals}
              disabled={true}
            />
          </label>
        )}
        {listOfMealTypes.map((m) => {
          return selectedRecipeType === m ? (
            <label key={m} className="flex flex-nowrap border border-gray-200 rounded-lg mr-1 px-1">
              {m}
              <input
                type="radio"
                name="meals"
                value={m}
                onChange={handleMeals}
                defaultChecked
              />
            </label>
          ) : (
            <label key={m} className="flex flex-nowrap border border-gray-200 rounded-lg mr-1 px-1">
              {m}
              <input
                type="radio"
                name="meals"
                value={m}
                onChange={handleMeals}
              />
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
