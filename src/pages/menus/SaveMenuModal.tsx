import "../../styles/input.css";
import React from "react";

interface SaveMenuModalProps {
  closeModal: () => void;
  handleSubmit: (menuName: string) => void;
  menuName: string;
  handleMenuName: (value: string) => void;
}

export default function SaveMenuModal({closeModal, handleSubmit, menuName, handleMenuName}: SaveMenuModalProps) {
    const myHandleSubmit = (_e: React.MouseEvent<HTMLButtonElement>) => {
      //e.preventDefault();
      if (!menuName) {
        window.alert("Give a name to the menu.");
      } else {
        handleSubmit(menuName);
      }
    }


    return  (
        <div className="modal-container z-20 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            onClick={(e) => {
            if (e.target instanceof HTMLElement && e.target.className.includes("modal-container")) closeModal();
          }}
    >
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center">Save Menu</h2>
              <div className="flex items-center">
                <label htmlFor="name" className="mr-4 w-1/3">Menu name</label>
                <input
                  type="text"
                  name="name"
                  className="w-2/3 p-2 border border-gray-300 rounded"
                  onChange={(e)=>handleMenuName(e.target.value)}
                  value={menuName}
                  />
              </div>
              <div className="text-center">
                <button
                  onClick={(e) => myHandleSubmit(e)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                >
                  Submit
                </button>
              </div>
          </div>
        </div>
      )
}
