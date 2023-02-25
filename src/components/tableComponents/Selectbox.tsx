import { useEffect, useState } from "react";

type SelectboxProps = {
  setPageSize: (n: number) => void;
};

const options: any[] = [
  { value: "10", label: "10" },
  { value: "15", label: "15" },
  { value: "25", label: "25" },
  { value: "50", label: "50" },
  { value: "100", label: "100" },
];
export default function Selectbox({ setPageSize }: SelectboxProps) {
  const [selectedOption, setSelectedOption] = useState(options[0].value);

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
