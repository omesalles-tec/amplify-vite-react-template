import "../../../styles/input.css";
import clsx from 'clsx';

interface RecipesListProps {
  recipeNames: string[];
  selectedRecipes: string[];
  toggleSelection: (recipe: string) => void;
  visibleRecipes: boolean[];
}

const RecipesList: React.FC<RecipesListProps> = ({ recipeNames, selectedRecipes, toggleSelection, visibleRecipes }) => {
  return (
    <div className="flex flex-col">
        {recipeNames.map((item: any, index: number) => {
          return (
            <div
              key={index}
              onClick={() => toggleSelection(item)}
              className={clsx(!visibleRecipes[index] && "hidden", 
              "p-0 m-1 rounded cursor-pointer hover:bg-gray-100",
              selectedRecipes.includes(item) ? "bg-gray-300 " : "bg-white"
            )}
            >
              {item}
            </div>
          );
        })}
        <div>&nbsp;</div>
    </div>
  );
};

export default RecipesList;
