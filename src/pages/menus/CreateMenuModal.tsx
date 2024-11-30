import "../../styles/input.css";
interface CreateMenuModalProps {
  closeModal: () => void;
}

export default function CreateMenuModal({closeModal}: CreateMenuModalProps) {

    const today = new Date().toISOString().split('T')[0];

    return  (
        <div className="modal-container fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
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
            <h2 className="text-2xl font-bold mb-6 text-center">Input Form</h2>
            <form action="menus/create" method="GET" className="space-y-6">
              <div className="flex items-center">
                <label htmlFor="date" className="mr-4 w-1/3">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  defaultValue={today}
                  className="w-2/3 p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="flex items-center">
                <label htmlFor="days" className="mr-4 w-1/3">Number of Days</label>
                <input
                  type="number"
                  id="days"
                  name="days"
                  defaultValue="7"
                  className="w-2/3 p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="flex items-center">
                <label htmlFor="users" className="mr-4 w-1/3">Number of Users</label>
                <input
                  type="number"
                  id="users"
                  name="users"
                  defaultValue="1"
                  className="w-2/3 p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )
}
