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
  setSelectedItem: (arg0: {}[]) => void;
};

const defaultRender = (value: any) => value;
export default function TableRow({
  index,
  areAllChecked,
  columns,
  item,
  selectedItem,
  setSelectedItem,
}: Props) {
  const [checked, setChecked] = useState(false);
  const onSelectedChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    setSelectedItem([...selectedItem, item]);
  };

  return (
    <tr key={index} className="row_table">
      <td>
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
        }) => (
          <td key={column.accessor as string}>
            {column.render
              ? column.render(item[column.accessor])
              : defaultRender(item[column.accessor])}
          </td>
        )
      )}
    </tr>
  );
}
