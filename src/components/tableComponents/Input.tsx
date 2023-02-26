type InputProps = {
  setSearchedData: (e: string) => void;
};

export default function Input({ setSearchedData }: InputProps) {
  // Holds values data in entered input tag and assign it to setStateAction which comes from parant component
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchedData(e.currentTarget.value);
  };
  return (
    <input
      className="input"
      type="text"
      placeholder="Search"
      onChange={(e) => handleChange(e)}
    />
  );
}
