// import { useState } from "react";
import { Cancel, SaveAlt } from "@material-ui/icons"

const EditCategory = ({item, handleCancel, handleEditChange}) => {

  return (
    <tr key={item.id}>
      <td className="max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
        ## {item.id}
        <dl className="font-normal lg:hidden">
          <dt className="sr-only sm:hidden">Created at</dt>
          <dd className="mt-1 truncate text-gray-500 sm:hidden">
            {item.created_at}
          </dd>
        </dl>
      </td>
      <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
        {item.created_at}
      </td>
      <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
        <input
          type="text"
          name="title"
          placeholder={item.title}
          onChange={handleEditChange}
          autoComplete="title"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
        />
      </td>
      <td className="px-3 py-4 text-sm text-gray-500">
        <textarea
          type="text"
          name="description"
          placeholder={item.description}
          onChange={handleEditChange}
          autoComplete="description"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
        />
      </td>
      <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
        <button
            className="text-green-500 hover:text-green-700"
        >
          <SaveAlt />
        </button>
        <button
            onClick={(e) => handleCancel(e)}
            className="text-red-500 hover:text-red-600"
        >
          <Cancel />
        </button>
      </td>
    </tr>
  );
};


export default EditCategory;
