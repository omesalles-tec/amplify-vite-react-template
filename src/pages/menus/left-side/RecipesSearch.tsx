import "../../../styles/input.css";

export default function RecipesSearch({ handleSearch, searchValue }:
  {handleSearch: React.ChangeEventHandler<HTMLInputElement>, searchValue:string}) {
    
  return (
      <div className="w-80  dark:bg-slate-900 relative">
        <input
          type="text"
          className="w-full lg:flex items-center text-sm leading-6 rounded-md ring-1 ring-slate-900/10 shadow-sm py-1.5 pl-2 pr-3 hover:ring-slate-300 dark:bg-slate-800 dark:highlight-white/5 dark:hover:bg-slate-700"
          placeholder = "Quick search..."
          onChange={(e: any)=>handleSearch(e.target.value)}
          value={searchValue}
        >
        </input>
      </div>
  );
}
