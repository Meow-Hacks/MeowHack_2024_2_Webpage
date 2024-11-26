import Box from '@mui/material/Box';
import TableTest from '@/components/TableStudentList/TableStudentList';

export default function MonitoringStudents(){
    return (
        <Box>
          {/* <Typography variant="h5">Выбранная вкладка: {currentNav?.title || 'Неизвестно'}</Typography> */}
          <div style={{ height: 400, width: '100%' }}>
            <TableTest />
          </div>
        </Box>
      );
}