import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Table } from "@cloudscape-design/components";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "../../styles/test.css";

const ROW_TYPE = "ROW";

const DragDropRow = ({ row, field, removeRow }) => {
  const [, dragRef] = useDrag({
    type: ROW_TYPE,
    item: { row, removeRow },
  });

  return (<div ref={dragRef} className="draggable-row">{row[field]}</div>);
};


const DropTable = ({ rows, setRows, dropType }) => {
  const [, dropRef] = useDrop({
    accept: ROW_TYPE,
    drop: (item) => {
      setRows((prevRows) => [...prevRows, item.row]);
      item.removeRow(item.index); // Remove from source table
    },
  });

  const removeRow = (id) => {
    setRows((prevRows) => prevRows.filter((x) => x.id !== id));
  };

  return (
    <div ref={dropRef}>
      <Table
        columnDefinitions={[
          { id: "id", header: "ID", cell: (item) => <DragDropRow row={item} field ={"id"} removeRow={()=>removeRow(item.id)} />},
          { id: "name", header: "Name", cell: (item) => <DragDropRow row={item} field ={"name"} removeRow={()=>removeRow(item.id)} />},
          { id: "status", header: "Status", cell: (item) => <DragDropRow row={item} field={"status"} removeRow={()=>removeRow(item.id)} /> },
        ]}
        items={rows}
        header={<h4>{dropType}</h4>}
      >
      </Table>
    </div>
  );
};

export default function App() {
  const [table1Rows, setTable1Rows] = useState([
    { id: "1", name: "Row 1", status: "Pending" },
    { id: "2", name: "Row 2", status: "Pending" },
  ]);
  const [table2Rows, setTable2Rows] = useState([]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: "flex", gap: "20px" }}>
        <DropTable
          rows={table1Rows}
          setRows={setTable1Rows}
          dropType="Table 1"
        />
        <DropTable
          rows={table2Rows}
          setRows={setTable2Rows}
          dropType="Table 2"
        />
      </div>
    </DndProvider>
  );
}
