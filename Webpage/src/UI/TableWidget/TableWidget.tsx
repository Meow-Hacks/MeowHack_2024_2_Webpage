import React from "react";
import './TableWidget.scss';

interface TableProps {
    data: unknown[];
    columns: string[];
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

const TableWidget: React.FC<TableProps> = () => {

    return (
        <>
            {/* Table */}
        </>
    )
}

export default TableWidget;