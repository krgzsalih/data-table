import { useEffect, useState } from "react";

type SelectboxProps = {
  setPageSize: (n: number) => void;
};

// Define the options for the selectbox
const options: any[] = [
  { value: "10", label: "10" },
  { value: "15", label: "15" },
  { value: "25", label: "25" },
  { value: "50", label: "50" },
  { value: "100", label: "100" },
];
// user can select any numbers listed on the component to resize pageSize
export default function Selectbox({ setPageSize }: SelectboxProps) {
  // Initialize the state of the selectbox to the first option in the options array
  const [selectedOption, setSelectedOption] = useState(options[0].value);

  // Call setPageSize with the number value of the selected option when the selected option changes
  useEffect(() => {
    setPageSize(Number(selectedOption));
  }, [selectedOption, setPageSize]);

  return (
    <div className="selectbox">
      <label htmlFor="select">Select displayed data size</label>
      <select
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        {options.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}
