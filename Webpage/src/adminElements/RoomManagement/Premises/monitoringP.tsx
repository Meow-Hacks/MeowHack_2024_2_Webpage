import Box from '@mui/material/Box';
import { UniversalTable } from '@/components/UniversalTable/Table';
import { useAdminInstitutes } from '@/api/useAdminInstitutes';
import { useAdminBranches } from '@/api/useAdminBranches';


export default function MonitoringPermises(){
    
    const { Institutes, loading: institutesLoading, error: institutesError, getInstitutes, addInstitute, updateInstitute, deleteInstitute } = useAdminInstitutes();
    const { branches, loading: branchesLoading, error: branchesError, getBranches, addBranch, updateBranch, deleteBranch } = useAdminBranches();

    return (
        <Box>
          {/* <Typography variant="h5">Выбранная вкладка: {currentNav?.title || 'Неизвестно'}</Typography> */}
          <div style={{ height: 400, width: '100%' }}>
            <UniversalTable columns={[{ label: 'Институт', key: 'name' }, { label: 'Филиал', key: 'branch_name' },]}
              data={
                Institutes.map((institute) => {
                  const branch = branches.find((b) => b.id == institute.branch_id);
                  return {
                    ...institute,
                    branch_name: branch ? branch.name : 'Не найдено', // Название филиала или сообщение о том, что он не найден
                  };
                })} />
          </div>
        </Box>
      );
}