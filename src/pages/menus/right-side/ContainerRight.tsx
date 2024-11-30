import "../../../styles/input.css";
import Calendar from "../calendar/Calendar";

// Define the props interface
interface ContainerRightProps {
  menuArray: any[]; // Adjust the type based on the actual structure of menuArray
  handleOnDayClick: (day: number) => void; // Adjust the parameter type if necessary
  daysArray: any[]; // Adjust the type based on the actual structure of daysArray
  daysArraySelected: any[]; // Adjust the type based on the actual structure of daysArraySelected
  quantities: any[]; // Assuming quantities is an array of numbers
  handleDeleteRecipe: (d: number, r: string) => void; // Adjust the parameter type if necessary
  handleIndividualDelete: (d: number, r: string, i: string) => void; // Adjust the parameter types if necessary
  handleIndividualInputChange: (d: number, r: string, i: string, newValue: string) => void; // Adjust the parameter types if necessary
  selectWeek?: (value: boolean, day: number) => void; // Optional prop
}

// Update the ContainerRight function to use the props interface
export default function ContainerRight({
  menuArray,
  handleOnDayClick,
  daysArray,
  daysArraySelected,
  quantities,
  handleDeleteRecipe,
  handleIndividualDelete,
  handleIndividualInputChange,
  selectWeek = (_value: boolean, _day: number) => {} // Default function for optional prop
}: ContainerRightProps): JSX.Element { // Added return type
  return (
    <div className="flex flex-wrap h-full overflow-y-auto w-full bg-gray-200 p-4 rounded-lg mx-1">
      <Calendar
        menuArray={menuArray}
        handleOnDayClick={handleOnDayClick}
        daysArray={daysArray}
        daysArraySelected={daysArraySelected}
        quantities={quantities}
        handleDeleteRecipe={handleDeleteRecipe}
        handleIndividualDelete={handleIndividualDelete}
        handleIndividualInputChange={handleIndividualInputChange}
        selectWeek={selectWeek}
      />
      <div>&nbsp;</div>
    </div>
  );
}
