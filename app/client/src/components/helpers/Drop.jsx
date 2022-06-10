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

export default function Example({data, handleChangeSelected, selectData}) {
  
  return (
    <span
      data-toggle="popover"
      data-trigger="focus"
      data-content=""
    >
      <ReactSelect
        options={data}
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
