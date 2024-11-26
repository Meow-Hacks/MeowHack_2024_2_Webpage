import Box from '@mui/material/Box';
import { UniversalTable } from '@/components/UniversalTable/Table';
import { useAdminGroups } from '@/api/useAdminGroups';
import { useAdminInstitutes } from '@/api/useAdminInstitutes';
import { useAdminStudents } from '@/api/useAdminStudents';



export default function StateStudents(){

    const { Institutes, loading: institutesLoading, error: institutesError, getInstitutes, addInstitute, updateInstitute, deleteInstitute } = useAdminInstitutes();
    const { Groups, loading: groupsLoading, error: groupsError, getGroups, getGroupById, addGroup, updateGroup, deleteGroup } = useAdminGroups();
    const { Students, loading: studentsLoading, error: studentsError, getStudents, getStudentById, getStudentMarks, addStudent, updateStudent, deleteStudent } = useAdminStudents();

    return (
        <Box>
          {/* <Typography variant="h5">Выбранная вкладка: {currentNav?.title || 'Неизвестно'}</Typography> */}
          <div style={{ height: 400, width: '100%' }}>
            <UniversalTable columns={[{
              label: 'ФИО', key: 'name'
            }, { label: 'Группа', key: 'group' }, { label: 'Факультет', key: 'institute' }, { label: 'Кафедра', key: 'department' }]}
              data={
                Students.map((student) => {
                //   const name = student.name;
                  const group = Groups.find((g) => g.id == student.group_id);
                  const inst = Institutes.find((i) => i.id == student.institute_id);
                  return {
                    name: `${student.lastname} ${student.name} ${student.secondname}`,
                    group: group ? group.group_code : 'Не найдено',
                    institute: inst ? inst.name : 'Не найдено',
                  }
                })
              }
            />
          </div>
        </Box>
      );
}