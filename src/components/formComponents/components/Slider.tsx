import { Slider } from "@nextui-org/react";
import { RangeInputType } from "../types/input.types";

const Range = (props: RangeInputType) => {
  const handleChange = (val: number | number[]) => {
    const e = {
      target: {
        name: props.name,
        type: "range-picker",
        value: Array.isArray(val) ? val[0] : val,
      },
    };
    props.onChange(e);
  };

  return (
    <div className="flex gap-2 flex-col">
      {props.header! && (
        <div
          className={`text-xs text-[var(--text-secondary-color)] bg-[var(--background-color)] ml-2 absolute top-[-2px] px-1 rounded-md`}
        >
          {props.header}
        </div>
      )}
      <Slider
        size="sm"
        color="foreground"
        step={0.01}
        maxValue={1}
        minValue={0}
        aria-label="Temperature"
        defaultValue={0.2}
        className="max-w-md"
        onChange={handleChange}
      />
    </div>
  );
};

export default Range;
