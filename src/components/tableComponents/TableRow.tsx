import {
  ChangeEvent,
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useState,
} from "react";

type Props = {
  index: number;
  areAllChecked: boolean;
  columns: any;
  item: any;
  selectedItem: {}[];
  hiddenColumns: string[];
  setHiddenColumns: (arg0: string[]) => void;
  setSelectedItem: (arg0: {}[]) => void;
};

const defaultRender = (value: any) => value;
export default function TableRow({
  index,
  areAllChecked,
  columns,
  item,
  selectedItem,
  hiddenColumns,
  setSelectedItem,
}: Props) {
  const [checked, setChecked] = useState(false);
  // This function is called when a checkbox in a row is clicked
  const onSelectedChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    setSelectedItem([...selectedItem, item]);
  };

  return (
    <tr key={index} className="row_table">
      {/* Renders a checkbox in the first column of the row */}
      <td className="table_checkbox">
        <input
          type="checkbox"
          // Sets the checked state of the checkbox based on whether all checkboxes are checked or not
          checked={areAllChecked === true ? areAllChecked : checked}
          // Calls the onSelectedChange function when the checkbox is clicked
          onChange={(e) => onSelectedChange(e)}
        ></input>
      </td>
      {/* Renders the data for each column in the row */}
      {columns.map(
        (column: {
          accessor: string;
          render: (
            arg0: any
          ) =>
            | string
            | number
            | boolean
            | ReactElement<any, string | JSXElementConstructor<any>>
            | ReactFragment
            | ReactPortal
            | null
            | undefined;
        }) =>
          // Only renders columns that are not hidden
          !hiddenColumns.includes(column.accessor) && (
            <td key={column.accessor as string} style={{ padding: "0px 10px" }}>
              {column.render
                ? column.render(item[column.accessor])
                : defaultRender(item[column.accessor])}
            </td>
          )
      )}
    </tr>
  );
}
