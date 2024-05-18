import { CheckboxType } from "../types/input.types";

const Checkbox = ({
  multiSelect,
  options,
  name,
  header,
  onChange,
  value,
  type,
}: CheckboxType) => {
  const handleClick = (val: string) => {
    if (multiSelect) {
      let newValue;
      if (value)
        newValue = value.includes(val)
          ? value.filter((opt) => opt !== val)
          : [...value, val];
      else newValue = [val];
      const e = {
        target: {
          name,
          type,
          value: newValue,
        },
      };
      onChange(e);
    } else {
      const e = {
        target: {
          name,
          type,
          value: val,
        },
      };
      onChange(e);
    }
  };

  return (
    <div className="flex flex-wrap max-w-[300px] m-4 gap-16">
      <div className="text-xl">{header}</div>
      {options.map((opt, index) => {
        return (
          <div
            className="w-max flex justify-center items-center group gap-2 cursor-pointer"
            onClick={() => handleClick(opt.value)}
            key={opt.value + index}
          >
            <div
              className={`border-[2px] border-[var(--card-border-hover-color)] rounded-sm min-w-[30px] min-h-[30px] group-hover:border-[var(--border-focus-color)] p-1`}
            >
                <div className={`${(multiSelect ? value?.includes(opt.value) : value == opt.value) ? "bg-[var(--border-focus-color)]" : "bg-transparent"} rounded-sm w-[20px] h-[20px]`}></div>
            </div>
            <div className={`text-[var(--text-secondary-color)] text-xl`}>
              {opt.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Checkbox;
