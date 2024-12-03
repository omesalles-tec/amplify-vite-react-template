import "../../../styles/input.css";
import RecipesList from "./RecipesList";
import RecipesTop from "./RecipesTop";
import { Button } from "@cloudscape-design/components";
import { clsx } from "clsx";

interface ContainerLeftProps {
  recipeNames: string[];
  visibleRecipes: boolean[];
  handleSearch: any;
  toggleSelection: (recipeName: string) => void;
  resetClick: () => void;
  selectedRecipes: string[];
  totalSelected: number;
  searchValue: string;
  transferRecipes: () => void;
}

export default function ContainerLeft({
  recipeNames,
  visibleRecipes,
  handleSearch,
  toggleSelection,
  resetClick,
  selectedRecipes,
  totalSelected,
  searchValue,
  transferRecipes,
}: ContainerLeftProps) {

  return (
    <div className="h-full w-full flex flex-row">
      <div className="h-full w-[90%] flex flex-col bg-gray-100 p-4 rounded-lg">
        <div className="block h-[5%] min-h-14 z-10 bg-gray-100">
          <RecipesTop
            resetClick={resetClick}
            handleSearch={handleSearch}
            totalSelected={totalSelected}
            searchValue={searchValue}
          />
        </div>
        <div className="block h-[95%] overflow-y-scroll z-0">
          <RecipesList
            recipeNames={recipeNames}
            selectedRecipes={selectedRecipes}
            toggleSelection={toggleSelection}
            visibleRecipes={visibleRecipes}
          />
        </div>
      </div>
      <div
        className={`flex w-[10%] ${
          selectedRecipes.length ? "cursor-pointer" : null
        }`}
        onClick={transferRecipes}
      >
        <div className={clsx(
            selectedRecipes.length
              ? "bg-gray-100 hover:bg-gray-300"
              : "opacity-25"
          , "size-20", "flex justify-center items-center h-full")}>
        <Button iconName="angle-right-double" variant="icon" />
        </div>
      </div>
    </div>
  );
}
