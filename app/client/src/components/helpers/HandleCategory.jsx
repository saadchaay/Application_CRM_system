import { Delete, Edit } from "@material-ui/icons";

const HandleCategory = ({ item, handleClick, handleDelete }) => {
  return (
    <tr key={item.id} >
      <td className="max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
        ## {item.id}
        <dl className="font-normal lg:hidden">
          <dt className="sr-only">Title</dt>
          <dd className="mt-1 truncate text-gray-700">
            {item.title}
          </dd>
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
        {item.title}
      </td>
      <td className="px-3 py-4 text-sm text-gray-500">
        {item.description}
      </td>
      <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
        <button
            onClick={(event) => handleClick(event, item)}
          className="text-green-500 hover:text-green-700"
        >
          <Edit />
        </button>
        <button
            onClick={(e) => handleDelete(e, item.id)}
            className="text-red-500 hover:text-red-600"
        >
          <Delete />
        </button>
      </td>
      </tr>
  );
};


export default HandleCategory;
