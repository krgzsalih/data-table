import {
  ChangeEvent,
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useEffect,
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
  setHiddenColumns,
  setSelectedItem,
}: Props) {
  const [checked, setChecked] = useState(false);
  const onSelectedChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    setSelectedItem([...selectedItem, item]);
  };
  useEffect(() => {
    if (areAllChecked) {
      setChecked(true);
    }
  }, [checked, areAllChecked]);

  return (
    <tr key={index} className="row_table">
      <td className="table_checkbox">
        <input
          type="checkbox"
          checked={areAllChecked === true ? areAllChecked : checked}
          onChange={(e) => onSelectedChange(e)}
        ></input>
      </td>
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
