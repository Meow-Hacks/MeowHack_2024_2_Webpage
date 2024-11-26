import Box from '@mui/material/Box';
import { UniversalTable } from '@/components/UniversalTable/Table';
import { useAdminAuditories } from '@/api/useAdminAuditories';
import { useAdminBranches } from '@/api/useAdminBranches';



export default function MonitoringAuditories(){

    const { auditories, loading: auditoriesLoading, error: auditoriesError, getauditories, getAuditoryById, addAuditory, updateAuditory, deleteAuditory } = useAdminAuditories();
    const { branches, loading: branchesLoading, error: branchesError, getBranches, addBranch, updateBranch, deleteBranch } = useAdminBranches();

    return (
        <Box>
          {/* <Typography variant="h5">Выбранная вкладка: {currentNav?.title || 'Неизвестно'}</Typography> */}
          <div style={{ height: 400, width: '100%' }}>
            <UniversalTable
              columns={[
                { label: 'Аудитория', key: 'name' },
                { label: 'Вместимость', key: 'capacity' },
                { label: 'Филиал', key: 'branch_name' },
                {
                  label: 'Статус',
                  key: 'status',
                  render: (status: boolean) => (
                    <Box display="flex" alignItems="center">
                      <Box
                        width={12}
                        height={12}
                        borderRadius="50%"
                        marginRight={1}
                        style={{
                          backgroundColor: status ? 'green' : 'red',
                        }}
                      />
                      {status ? '' : ''}
                    </Box>
                  ),
                },
              ]}
              data={auditories.map((aud) => {
                const branch = branches.find((b) => b.id === aud.branch_id);

                return {
                  name: aud.name,
                  capacity: aud.capacity,
                  branch_name: branch ? branch.name : 'Не найдено',
                  status: aud.status,
                };
              })}
            />

          </div>
        </Box>
      );
}