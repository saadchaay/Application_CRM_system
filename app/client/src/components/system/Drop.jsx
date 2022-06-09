import {useState} from "react";
import { colourOptions } from "./data.js";
import { default as ReactSelect } from "react-select";
import "./styles.css";

export default function Example({props}) {
    const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selected) => {
    setSelectedOption(selected);
  };
    return (
      <span
        className="d-inline-block"
        data-toggle="popover"
        data-trigger="focus"
        data-content="Please selecet account(s)"
      >
        <ReactSelect
          options={colourOptions}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{
            Option
          }}
          onChange={handleChange}
          allowSelectAll={true}
          value={selectedOption}
        />
      </span>
    );
  }