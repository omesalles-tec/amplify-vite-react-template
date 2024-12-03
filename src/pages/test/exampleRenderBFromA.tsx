import React, { useState, useRef, forwardRef, useImperativeHandle } from "react";

// Component A: A checkbox list
const A = forwardRef(({onChange}, ref) => {
  const options = ["Option 1", "Option 2"];
  const selectedValues = useRef([]);

  // Expose selected values to parent
  useImperativeHandle(ref, () => ({
    getSelectedValues: () => selectedValues.current,
  }));

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      selectedValues.current.push(value);
    } else {
      selectedValues.current = selectedValues.current.filter(
        (item) => item !== value
      );
    }

    // Notify the parent about changes
    onChange([...selectedValues.current]);
  };

  return (
    <div>
      {options.map((option) => (
        <label key={option}>
          <input
            type="checkbox"
            value={option}
            onChange={handleCheckboxChange}
          />
          {option}
        </label>
      ))}
    </div>
  );
});

// Component B: Displays the selected values
const B = ({ selectedValues }) => {
  return (
    <div>
      <h3>Selected Values:</h3>
      <ul>
        {selectedValues.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
    </div>
  );
};

// Parent Component
const Parent = () => {
  const aRef = useRef();
  const [selectedValues, setSelectedValues] = useState([]);

  // Handle changes from A
  const handleAChange = (values) => {
    setSelectedValues(values);
  };

  return (
    <div>
      <h1>Checkbox Example</h1>
      <A ref={aRef} onChange={handleAChange} />
      <button onClick={() => alert(aRef.current.getSelectedValues())}>
        Get Selected Values
      </button>
      <B selectedValues={selectedValues} />
    </div>
  );
};

export default Parent;
