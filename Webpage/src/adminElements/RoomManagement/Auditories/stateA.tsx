import Box from '@mui/material/Box';
import { UniversalTable } from '@/components/UniversalTable/Table';


const columns = [
    { label: 'Аудитория', key: 'name' },
    { label: 'Описание', key: 'hours' },
    { label: 'Статус', key: 'status' },
  ];
  
  const data = [
    { name: 'А-10', hours: 12, status: 'занят' },
    { name: 'А-11', hours: 24, status: 'свободен' },
    { name: 'А-12', hours: 32, status: 'зарезервирован' },
  ];
  
export default function StateAuditories(){
    return (
        <Box>
          {/* <Typography variant="h5">Выбранная вкладка: {currentNav?.title || 'Неизвестно'}</Typography> */}
          <div style={{ height: 400, width: '100%' }}>
            <UniversalTable columns={columns} data={data} />
          </div>
        </Box>
      );
}