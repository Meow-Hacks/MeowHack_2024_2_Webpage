import './App.css'
import TableWidget from './components/TableWidget/TableWidget';
import AuthPage from './pages/AuthPage';

const App: React.FC = () => {
  const columns = ["ID", "Name", "Age"];
  const data = [
    { ID: 1, Name: "John Doe", Age: 28 },
    { ID: 2, Name: "Jane Doe", Age: 32 },
  ];
  return (
    <>
      {/* <TableWidget
        columns={columns}
        data={data}
        rowKey="ID"
        onRowClick={(row) => console.log("Row clicked:", row)}
        onRowDelete={(row) => console.log("Row deleted:", row)}
        onRowEdit={(row) => console.log("Row edited:", row)}
        onSort={(column) => console.log("Sorted by column:", column)}
        onFilter={(column, filterValue) => console.log(`Filter by ${column}: ${filterValue}`)}
        onExport={() => console.log("Export")}
        onImport={() => console.log("Import")}
        onExportToExcel={() => console.log("Export to Excel")}
        onExportToCsv={() => console.log("Export to CSV")}
        onExportToJson={() => console.log("Export to JSON")}
      /> */}
      <AuthPage />
    </>
  )
}

export default App