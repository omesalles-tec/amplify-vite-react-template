import "../../../styles/input.css";

interface User {
  name: string;
  checked: boolean;
  units: number;
}

interface UsersHeaderProps {
  allChecked: boolean;
  handleUsersAllChange: React.ChangeEventHandler<HTMLInputElement>;
  usersArray: User[];
  handleUsersChange: (index: number) => void;
  handleUnitsChange: (index: number, value: string) => void;
}

export default function UsersHeader({
  allChecked,
  handleUsersAllChange,
  usersArray,
  handleUsersChange,
  handleUnitsChange,
}: UsersHeaderProps) {
  const users = usersArray.length;
  return users > 0 && usersArray[0]["name"] !== null && (
    <div className="flex items-center">
      {users > 1 && (
        <label className="border border-gray-200 rounded-lg mr-1 px-1">
          <input
            type="checkbox"
            checked={allChecked}
            onChange={handleUsersAllChange}
            className="ml-3 mr-1"
          />
          All
        </label>
      )}
      {usersArray.map((m, i) => {console.log(m); return (
        <div key={i}>
          <label className="border border-gray-200 rounded-lg mr-1 px-1">
            <input
              type="checkbox"
              onChange={() => handleUsersChange(i)}
              checked={m["checked"]}
              className="ml-3 mr-1"
            />
            {m["name"] ? `${m["name"].charAt(0).toUpperCase() + m["name"].slice(1)} - units:` : ''}
            <input
              type="number"
              min="1"
              defaultValue={m["units"]}
              className="ml-3 w-10 mr-1"
              onChange={(e) => handleUnitsChange(i, e.target.value)}
            />
          </label>
        </div>
      )})}
    </div>
  );
}
