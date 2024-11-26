import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import DropdownFilter from '@/components/FilterComponent/Filter';
import { useAdminInstitutes } from '@/api/useAdminInstitutes';
import { useAdminGroups } from '@/api/useAdminGroups';
import { useAdminLessons } from '@/api/useAdminLessons';
import { useAdminSubjects } from '@/api/useAdminSubjects';
import { useAdminAuditories } from '@/api/useAdminAuditories';
import { useAdminTeachers } from '@/api/useAdminTeachers';
import { UniversalTable } from '@/components/UniversalTable/Table';
import moment from 'moment';


  export default function DashboardPage () {

    const { Institutes, loading: institutesLoading, error: institutesError, getInstitutes, addInstitute, updateInstitute, deleteInstitute } = useAdminInstitutes();
    const { Groups, loading: groupsLoading, error: groupsError, getGroups, getGroupById, addGroup, updateGroup, deleteGroup } = useAdminGroups();
    const { Lessons, loading: lessonsLoading, error: lessonsError, getLessons, getLessonById, addLesson, updateLesson, deleteLesson } = useAdminLessons();
    const { subjects, loading: subjectsLoading, error: subjectsError, getSubjects, getSubjectById, addSubject, updateSubject, deleteSubject } = useAdminSubjects();
    const { auditories, loading: auditoriesLoading, error: auditoriesError, getauditories, getAuditoryById, addAuditory, updateAuditory, deleteAuditory } = useAdminAuditories();
    const { Teachers, loading: teachersLoading, error: teachersError, getTeachers, getTeacherById, addTeacher, updateTeacher, deleteTeacher } = useAdminTeachers();
    
    const [selectedInstitute, setSelectedInstitute] = useState<string | null>(null);
    const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

    const fetchGroups = async () => {
        if (!Groups) return [];
        return Groups.map((group) => group.group_code);
      };
      const fetchInstitutes = async () => {
        if (!Institutes) return [];
        return Institutes.map((institute) => institute.name);
      };
    
      const filteredLessons = Lessons.filter((lesson) => {
        const institute = Institutes.find((i) => i.id === lesson.institute_id);
        const group = Groups.find((g) => g.id === lesson.group_id);
    
        const matchesInstitute = !selectedInstitute || (institute && institute.name === selectedInstitute);
        const matchesGroup = !selectedGroup || (group && group.group_code === selectedGroup);
    
        return matchesInstitute && matchesGroup;
      });

      const formatDateTime = (isoString: string): string => {
        return moment(isoString).format('DD.MM.YYYY HH:mm');
      };
    
    return (
        <Box>
            <div style={{ height: 400, width: '100%' }}>
                <Box padding={2}>
                <DropdownFilter
                    label="Факультет"
                    fetchOptions={fetchInstitutes}
                    onChange={(value) => setSelectedInstitute(value)}
                />
                <DropdownFilter
                    label="Группа"
                    fetchOptions={fetchGroups}
                    onChange={(value) => setSelectedGroup(value)}
                />
                </Box>
                <UniversalTable columns={[
                { label: 'Предмет', key: 'subject_name' },
                { label: 'Группа', key: 'group_name' },
                { label: 'Преподователь', key: 'teacher_name' },
                { label: 'Аудитория', key: 'auditory_number' },
                { label: 'Тип пары', key: 'lessons' },
                { label: 'Начало', key: 'start_time' },
                { label: 'Конец', key: 'end_time' },
                { label: 'Институт', key: 'institute_name' },

                ]}
                data={
                    filteredLessons.map((lesson) => {
                    const subject = subjects.find((s) => s.id == lesson.subject_id);
                    const group = Groups.find((g) => g.id == lesson.group_id);
                    const teacher = Teachers.find((t) => t.id == lesson.teacher_id);
                    const auditory = auditories.find((a) => a.id == lesson.auditory_id);
                    const lessons = lesson.type_of_lesson;
                    const start_time = formatDateTime(lesson.start_time);
                    // const start_time = lesson.start_time;
                    const end_time = formatDateTime(lesson.end_time);
                    const institute = Institutes.find((i) => i.id == lesson.institute_id);
                    return {
                        subject_name: subject ? subject.name : 'Не найдено',
                        group_name: group ? group.group_code : 'Не найдено',
                        teacher_name: teacher ? `${teacher.name} ${teacher.secondname} ${teacher.lastname}` : 'Не найдено',
                        auditory_number: auditory ? auditory.name : 'Не найдено',
                        lessons,
                        start_time,
                        end_time,
                        institute_name: institute ? institute.name : 'Не найдено',
                    }
                    })
                }
                />
            </div>
        </Box>
    );
}