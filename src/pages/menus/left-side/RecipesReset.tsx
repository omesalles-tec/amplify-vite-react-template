import "../../../styles/input.css";

import { MouseEventHandler } from 'react';

export default function RecipesReset({ resetClick }:{resetClick: MouseEventHandler<HTMLButtonElement> }) {
  return (
  <button className="bg-red-500 hover:bg-red-600 text-white px-1 mx-1 rounded-full focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
  onClick = {resetClick}>Reset
        </button>
  );
}