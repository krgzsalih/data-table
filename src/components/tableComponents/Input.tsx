type InputProps = {
  setSearchedData: (e: string) => void;
};

export default function Input({ setSearchedData }: InputProps) {
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchedData(e.currentTarget.value);
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
}
