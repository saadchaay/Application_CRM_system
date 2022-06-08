


const EditCategory = (props) => {
    return (
        <tr key={props.id}>
                  <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                    ## {props.id}
                    <dl className="font-normal lg:hidden">
                      <dt className="sr-only">Created at</dt>
                      <dd className="mt-1 truncate text-gray-700">
                        {props.created_at}
                      </dd>
                      <dt className="sr-only sm:hidden">Title</dt>
                      <dd className="mt-1 truncate text-gray-500 sm:hidden">
                        {props.title}
                      </dd>
                    </dl>
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                    {props.created_at}
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                    {props.title}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {props.description}
                  </td>
                  <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <button
                      onClick={() => displayModalUpdate(props.id)}
                      className="text-green-500 hover:text-green-700"
                    >
                     <Edit />
                    </button>
                    <button
                      onClick={() => handleDelete(props.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Delete />
                    </button>
                  </td>
                </tr>
    );
}