type Column = {
  header: string;
  accessor: string;
  className?: string;
};

const Table = <T,>({
  columns,
  renderRow,
  data,
}: {
  columns: Column[];
  renderRow: (item: T) => React.ReactNode;
  data: T[];
}) => {
  return (
    <table className="w-full mt-4">
      <thead>
        <tr className="text-left text-muted-foreground text-sm border-b border-border">
          {columns.map((col) => (
            <th key={col.accessor} className={col.className}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{data.map((item) => renderRow(item))}</tbody>
    </table>
  );
};

export default Table;
