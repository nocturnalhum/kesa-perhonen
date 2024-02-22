interface DropdownInputProps {
  options: { label: string; value: string }[];
  selectedOption: string;
  onOptionChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
const DropdownInput: React.FC<DropdownInputProps> = ({
  options,
  selectedOption,
  onOptionChange,
}) => {
  return (
    <select
      value={selectedOption}
      onChange={onOptionChange}
      className='p-1 px-2 rounded-md border border-slate-300 bg-white hover:border-slate-500 text-center'
    >
      {options.map((option) => (
        <option key={option.value} value={option.label}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default DropdownInput;
