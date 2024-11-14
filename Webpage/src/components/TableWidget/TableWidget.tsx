import React from "react";
import './TableWidget.scss';

interface TableProps {
    columns: string[];
    data: Array<Record<string, unknown>>;
    rowKey: string;
    onRowClick: (rowData: unknown) => void;
    onRowDelete: (rowData: unknown) => void;
    onRowEdit: (rowData: unknown) => void;
    onSort: (columnKey: string) => void;
    onFilter: (columnKey: string, filterValue: string) => void;
    onExport: () => void;
    onImport: () => void;
    onExportToExcel: () => void;
    onExportToCsv: () => void;
    onExportToJson: () => void;
}

const TableWidget: React.FC<TableProps> = ({
    columns,
    data,
    rowKey,
    onRowClick,
    onRowDelete,
    onRowEdit,
    onSort,
    onFilter,
    onExport,
    onImport,
    onExportToExcel,
    onExportToCsv,
    onExportToJson
}) => {

    return (
        <>
            <div className="table-widget">
            <div className="table-widget__header">
                <button onClick={onExport}>Export</button>
                <button onClick={onImport}>Import</button>
                <button onClick={onExportToExcel}>Export to Excel</button>
                <button onClick={onExportToCsv}>Export to CSV</button>
                <button onClick={onExportToJson}>Export to JSON</button>
            </div>

            <table className="table-widget__table">
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index} onClick={() => onSort(column)}>
                                {column}
                            </th>
                        ))}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row[rowKey]}>
                            {columns.map((column) => (
                                <td key={column}>
                                    {row[column]}
                                </td>
                            ))}
                            <td>
                                <button onClick={() => onRowEdit(row)}>Edit</button>
                                <button onClick={() => onRowDelete(row)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    )
}

export default TableWidget;