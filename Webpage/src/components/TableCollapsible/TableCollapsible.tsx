import React, { useEffect, useState } from 'react';
import {
    Box,
    Collapse,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useAdminStudents } from '@/api/useAdminStudents';

interface StudentMark {
    id: number;
    student_id: number;
    lesson_id: number;
    mark: number;
}

interface LessonRow {
    lesson_id: number;
    teacher: string;
    marks: StudentMark[];
}

interface CollapsibleTableProps {
    studentId: number;
}

const CollapsibleTable: React.FC<CollapsibleTableProps> = ({ studentId }) => {
    const { getStudentMarks } = useAdminStudents();
    const [lessons, setLessons] = useState<LessonRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);

    useEffect(() => {
        if (!studentId) {
            setError('Invalid student ID.');
            setLoading(false);
            return;
        }

        const fetchMarks = async () => {
            try {
                setLoading(true);
                const marks: StudentMark[] = await getStudentMarks(studentId);

                // Группировка оценок по lesson_id
                const lessonsMap: { [lesson_id: number]: StudentMark[] } = {};
                marks.forEach((mark) => {
                    if (!lessonsMap[mark.lesson_id]) {
                        lessonsMap[mark.lesson_id] = [];
                    }
                    lessonsMap[mark.lesson_id].push(mark);
                });

                // Преобразование в массив
                const lessonsArray: LessonRow[] = Object.keys(lessonsMap).map((lesson_id) => ({
                    lesson_id: Number(lesson_id),
                    teacher: 'Иванов И.И.',
                    marks: lessonsMap[Number(lesson_id)],
                }));

                setLessons(lessonsArray);
                setError(null);
            } catch (err) {
                console.error('Error loading marks:', err);
                setError('Error loading data.');
            } finally {
                setLoading(false);
            }
        };

        fetchMarks();
    }, [studentId]);

    if (loading) return <Typography>Загрузка...</Typography>;
    if (error) return <Typography>{error}</Typography>;

    return (
        <Box padding={4}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Lesson ID</TableCell>
                            <TableCell>Преподаватель</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {lessons.map((lesson) => (
                            <LessonRowComponent key={lesson.lesson_id} lesson={lesson} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

const LessonRowComponent: React.FC<{ lesson: LessonRow }> = ({ lesson }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow>
                <TableCell>
                    <IconButton onClick={() => setOpen(!open)} size="small">
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>{lesson.lesson_id}</TableCell>
                <TableCell>{lesson.teacher}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={3} style={{ padding: 0 }}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={2}>
                            <Typography variant="h6">Оценки</Typography>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Lesson ID</TableCell>
                                        <TableCell>Оценка</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {lesson.marks.map((mark) => (
                                        <TableRow key={mark.id}>
                                            <TableCell>{mark.lesson_id}</TableCell>
                                            <TableCell>{mark.mark}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

export default CollapsibleTable;
