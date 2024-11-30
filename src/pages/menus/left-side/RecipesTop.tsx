import "../../../styles/input.css";

import RecipesSearch from "./RecipesSearch";
import RecipesReset from "./RecipesReset";
import CountSelected from "./CountSelected";

export default function RecipesTop({
  resetClick,
  handleSearch,
  totalSelected,
  searchValue,
}: {
  resetClick: React.MouseEventHandler<HTMLButtonElement>;
  handleSearch: any;
  totalSelected: number;
  searchValue: string;
}) {
  return (
    <>
      <div className="ml-0.5 flex justify-between">
        <RecipesSearch handleSearch={handleSearch} searchValue={searchValue} />
        <CountSelected value={totalSelected} />
        <RecipesReset resetClick={resetClick} />
      </div>
    </>
  );
}
