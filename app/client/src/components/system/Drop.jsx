import {useState} from "react";
import { default as ReactSelect } from "react-select";

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
          options={selectedOption}
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