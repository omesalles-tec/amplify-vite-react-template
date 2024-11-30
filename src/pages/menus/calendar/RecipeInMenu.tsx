import "../../../styles/input.css";
import React, { useState, useRef, useEffect } from "react";
import { clsx } from "clsx";
import { Button, Icon } from "@cloudscape-design/components";

interface RecipeInMenuProps {
  menuObj: Record<string, any>;
  quantities: any[];
  day: number;
  recipe: string;
  handleDeleteRecipe: (day: number, recipe: string) => void;
  handleIndividualDelete: (day: number, recipe: string, individual: string) => void;
  handleIndividualInputChange: (day: number, recipe: string, individual: string, value: string) => void;
}

const RecipeInMenu: React.FC<RecipeInMenuProps> = ({
  menuObj,
  quantities,
  day,
  recipe,
  handleDeleteRecipe,
  handleIndividualDelete,
  handleIndividualInputChange,
}) => {
  const [modalPosition, setModalPosition] = useState<[number, number]>([0, 0]);
  const [messagePosition, setMessagePosition] = useState<[number, number]>([0, 0]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isMessageOpen, setMessageOpen] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const maxAcceptedLength = 20;

  const openModal = () => {
    setMessageOpen(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const sendModalPosition = (e: React.MouseEvent<HTMLDivElement>) => {
    setModalPosition([e.clientX, e.clientY]);
  };

  const openMessage = (e: React.MouseEvent<HTMLDivElement>) => {
    if (String(recipe).length > maxAcceptedLength) {
      setMessagePosition([e.clientX, e.clientY]);
      timerRef.current = setTimeout(() => setMessageOpen(true), 250);
    }
  };

  const closeMessage = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setMessageOpen(false);
  };

  return (
    <div className="inline-block relative">
      <div className="group w-[300px] flex flex-row justify-left m-1 p-1 bg-white rounded-lg shadow hover:bg-gray-100 border-gray-500 border-1">
        <Button iconName="remove" variant="icon"
          onClick={() => handleDeleteRecipe(day, recipe)}
        />
        <div
          className="flex flex-row justify-start"
          onMouseDown={sendModalPosition}
          onClick={openModal}
          onMouseEnter={openMessage}
          onMouseLeave={closeMessage}
        >
          <span className=" group-hover:bg-gray-100 mr-2">
            {String(recipe).length > maxAcceptedLength
              ? String(recipe).slice(0, maxAcceptedLength) + "... :"
              : recipe + ":"}
          </span>
          {isMessageOpen && (
            <span
              className="fixed bg-gray-500 p-1 rounded-lg z-10"
              style={{ top: messagePosition[1], left: messagePosition[0] }}
            >
              {recipe}
            </span>
          )}
          <span className="flex items-center group-hover:bg-gray-100">
            {`${quantities[day][recipe]} units`}
            <div className="group-hover:bg-gray-100 size-4">
              <Icon name="caret-down" />
            </div>
          </span>
        </div>
        <span></span>
      </div>
      <div
        className={clsx(!isModalOpen && "hidden", isModalOpen && "absolute")}
      >
        <DropdownMealsIndividuals
          menuObj={menuObj}
          day={day}
          recipe={recipe}
          handleIndividualDelete={handleIndividualDelete}
          handleIndividualInputChange={handleIndividualInputChange}
          position={modalPosition}
          closeModal={closeModal}
        />
      </div>
    </div>
  );
};

export default RecipeInMenu;

interface DropdownMealsIndividualsProps {
  menuObj: Record<string, any>;
  day: number;
  recipe: string;
  handleIndividualDelete: (day: number, recipe: string, individual: string) => void;
  handleIndividualInputChange: (day: number, recipe: string, individual: string, value: string) => void;
  position: [number, number];
  closeModal: () => void;
  individuals?: Record<string, number>;
}

const DropdownMealsIndividuals: React.FC<DropdownMealsIndividualsProps> = ({
  menuObj,
  day,
  recipe,
  handleIndividualDelete,
  handleIndividualInputChange,
  position,
  closeModal,
}) => {
  useEffect(() => {
    window.addEventListener("resize", closeModal);
    return () => {
      window.removeEventListener("resize", closeModal);
    };
  }, [closeModal]);

  return (
    <div
      className="modal-container fixed inset-0 bg-black bg-opacity-50 z-10"
      onClick={(e) => {
        if ((e.target as HTMLElement).classList.contains("modal-container")) closeModal();
      }}
    >
      <div
        className="fixed bg-gray-500 rounded-lg m-2"
        style={{ top: position[1], left: position[0] }}
      >
        {Object.keys(menuObj[day][recipe]).map((i) => (
          <div
            key={i}
            className="group relative flex items-center justify-between m-1 p-1 bg-white rounded-lg shadow hover:bg-gray-100 border-gray-500 border-1"
          >
            <button
              onClick={() => handleIndividualDelete(day, recipe, i)}
              className="text-gray-500 mx-2"
            >
              <div className="size-5">
                <Icon name="remove" />
              </div>
            </button>
            <span className="group-hover:bg-gray-100 mr-2 truncate w-24">
              {i}
            </span>
            <input
              type="number"
              value={menuObj[day][recipe][i]}
              onChange={(e) =>
                handleIndividualInputChange(day, recipe, i, e.target.value)
              }
              className="group-hover:bg-gray-100 bg-white w-12"
              min="1"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
