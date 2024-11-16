import React from "react";
import './TableWidget.scss';

interface TableProps {
    columns: string[];
    data: Array<Record<string, unknown>>;
    rowKey: string;
    onRowClick?: (rowData: Record<string, unknown>) => void;
    onRowDelete?: (rowData: Record<string, unknown>) => void;
    onRowEdit?: (rowData: Record<string, unknown>) => void;
    onSort?: (columnKey: string) => void;
    onFilter?: (columnKey: string, filterValue: string) => void;
    onExport?: () => void;
    onImport?: () => void;
    onExportToExcel?: () => void;
    onExportToCsv?: () => void;
    onExportToJson?: () => void;
}

const TableWidget: React.FC<TableProps> = ({
    columns,
    data,
    rowKey,
    onRowClick,
    onRowDelete,
    onRowEdit,
    onSort,
    onExport,
    onImport,
    onExportToExcel,
    onExportToCsv,
    onExportToJson
}) => {

    return (
        <div className="table-widget">
            <div className="table-widget__header">
                {onExport && <button onClick={onExport}>Export</button>}
                {onImport && <button onClick={onImport}>Import</button>}
                {onExportToExcel && <button onClick={onExportToExcel}>Export to Excel</button>}
                {onExportToCsv && <button onClick={onExportToCsv}>Export to CSV</button>}
                {onExportToJson && <button onClick={onExportToJson}>Export to JSON</button>}
            </div>

            <table className="table-widget__table">
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th 
                                key={index} 
                                onClick={() => onSort ? onSort(column) : undefined}
                                className={onSort ? 'sortable' : ''}
                            >
                                {column}
                                {onSort && <span className="sort-indicator">↑↓</span>}
                            </th>
                        ))}
                        {(onRowEdit || onRowDelete) && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr 
                            key={row[rowKey] as React.Key} 
                            onClick={() => onRowClick && onRowClick(row)}
                            className={onRowClick ? 'clickable' : ''}
                        >
                            {columns.map((column, idx) => (
                                <td key={idx}>
                                    {row[column] as React.ReactNode}
                                </td>
                            ))}
                            {(onRowEdit || onRowDelete) && (
                                <td>
                                    {onRowEdit && 
                                        <button 
                                            onClick={(e) => { 
                                                e.stopPropagation(); 
                                                onRowEdit(row); 
                                            }}
                                        >
                                            Edit
                                        </button>
                                    }
                                    {onRowDelete && 
                                        <button 
                                            onClick={(e) => { 
                                                e.stopPropagation(); 
                                                onRowDelete(row); 
                                            }}
                                        >
                                            Delete
                                        </button>
                                    }
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableWidget;
