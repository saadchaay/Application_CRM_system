import React, { useState } from "react";
import { default as ReactSelect } from "react-select";
import { components } from "react-select";

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.id}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
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
        options={colors}
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
