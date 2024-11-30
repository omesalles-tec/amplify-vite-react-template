import "../../../styles/input.css";
import { format } from "date-fns";
import { clsx } from "clsx";
import RecipeInMenu from "./RecipeInMenu";

interface CalendarProps {
  menuArray: Record<string, any>;
  handleOnDayClick: (dayIndex: number) => void;
  daysArray: Date[];
  daysArraySelected: boolean[];
  quantities: any[];
  handleDeleteRecipe: (day: number, recipe: string) => void;
  handleIndividualDelete: (day: number, recipe: string, individual: string) => void;
  handleIndividualInputChange: (day: number, recipe: string, individual: string, value: string) => void;
  selectWeek: (checked: boolean, dayIndex: number) => void;
}

export default function Calendar({
  menuArray,
  handleOnDayClick,
  daysArray,
  daysArraySelected,
  quantities,
  handleDeleteRecipe,
  handleIndividualDelete,
  handleIndividualInputChange,
  selectWeek,
}: CalendarProps) {
  return (
    <div className="w-full h-full p-4">
      <div className="grid grid-cols-7 gap-1 h-[5%]">
        <div className="col-end-1 w-14"></div>
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, idx) => (
          <div key={idx} className="font-bold text-left">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 h-[90%]">
        {daysArray.map((day, dayIndex) => (
          <>
            {dayIndex % 7 === 0 && (
              <div className="col-end-1 w-14" >
                <input
                  type="checkbox"
                  onChange={(e) =>
                    selectWeek(e.currentTarget.checked, dayIndex)
                  }
                />
              </div>
            )}
            <div className="border border-gray-600 rounded-md h-full">
              <div
                className={clsx(
                  daysArraySelected[dayIndex] ? "bg-green-100" : "bg-gray-100",
                  "text-left pt-2 pl-2 rounded-md"
                )}
                onClick={() => handleOnDayClick(dayIndex)}
              >
                {day ? format(day, "d") : ""}
              </div>
              <div className="overflow-auto">
                {menuArray[dayIndex] &&
                  Object.keys(menuArray[dayIndex]).map((r) => {
                    return (
                      <RecipeInMenu
                        key={r}
                        menuObj={menuArray}
                        quantities={quantities}
                        day={dayIndex}
                        recipe={r}
                        handleDeleteRecipe={handleDeleteRecipe}
                        handleIndividualDelete={handleIndividualDelete}
                        handleIndividualInputChange={
                          handleIndividualInputChange
                        }
                      />
                    );
                  })}
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
