type DataSource = {
  id: string;
  [key: string]: any; // Дополнительные свойства могут быть любыми
};

type ColumnConfig = {
  key: string;
  header: string;
  render?: (value: any, row: DataSource) => React.ReactNode;
  className?: string;
};

type TableProps = {
  title: string;
  data: DataSource[];
  columns: ColumnConfig[];
  emptyMessage?: string;
  className?: string;
};

const Table = ({ title, data, columns, emptyMessage = "Данные не найдены.", className = "" }: TableProps) => {
  return (
    <section className={`bg-white rounded-lg shadow p-6 ${className}`}>
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <span className="w-2 h-6 bg-green-500 mr-2 rounded-full"></span>
        {title}
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.className || ""}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length > 0 ? (
              data.map((row) => (
                <tr key={row.id}>
                  {columns.map((column) => (
                    <td
                      key={`${row.id}-${column.key}`}
                      className={`px-6 py-4 whitespace-nowrap text-sm ${column.key === 'name' ? 'font-medium text-gray-900' : 'text-gray-500'} ${column.className || ""}`}
                    >
                      {column.render ? column.render(row[column.key], row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-4 text-center text-sm text-gray-500">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export { Table };