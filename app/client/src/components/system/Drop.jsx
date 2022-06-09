import React, { useState } from "react";
import { default as ReactSelect } from "react-select";
import { components } from "react-select";

const colorsOptions = [
  { value: "ocean1", label: "Ocean" },
  { value: "blue", label: "Blue" },
  { value: "purple", label: "Purple" },
  { value: "red", label: "Red" },
  { value: "orange", label: "Orange" },
  { value: "yellow", label: "Yellow" },
  { value: "green", label: "Green" },
  { value: "forest", label: "Forest" },
  { value: "slate", label: "Slate" },
  { value: "silver", label: "Silver" },
];

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.id}
          onChange={() => null}
        />{" "}
        <label>{props.value}</label>
      </components.Option>
    </div>
  );
};

export default function Example({colors, handleChangeSelected, selectData}) {
  
  return (
    <span
      class="d-inline-block"
      data-toggle="popover"
      data-trigger="focus"
      data-content="Please selecet account(s)"
    >
      <ReactSelect
        options={colorsOptions}
        isMulti
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        components={{
          Option,
        }}
        onChange={(selected) => handleChangeSelected(selected)}
        allowSelectAll={true}
        value={selectData}
      />
    </span>
  );
}
