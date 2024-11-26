import { Lesson } from '@/api/useAdminLessons';
import { Subject } from '@/api/useAdminSubjects';


export const getInstituteName = (id: number | undefined, institutes: { id: number; name: string }[]) => {
    if (!id) return '—';
    const institute = institutes.find((inst) => inst.id === id);
    return institute ? institute.name : 'Не найден';
};

export const getGroupName = (id: number | undefined, groups: { id: number; group_code: string }[]) => {
    if (!id) return '—';
    const group = groups.find((grp) => grp.id === id);
    return group ? group.group_code : 'Не найден';
};

// Функция для получения названия предмета по lesson_id
export const getSubjectName = (
    lessonId: number | undefined,
    lessons: Lesson[],
    subjects: Subject[]
): string => {
    if (!lessonId) return '—';
    const lesson = lessons.find((lesson) => lesson.id === lessonId);
    if (!lesson) return 'Не найден';
    const subject = subjects.find((subj) => subj.id === lesson.subject_id);
    return subject ? subject.name : 'Не найден';
};
