import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import { Student } from '../../types/Student';
import CollapsibleTable from '../TableCollapsible/TableCollapsible';
import { useAdminInstitutes } from '@/api/useAdminInstitutes';
import { useAdminGroups } from '@/api/useAdminGroups';
import { useGPA, usePercentile } from '@/api/useAdminEducationalGrade';

interface StudentCardProps {
    student: Student;
}

const StudentCardComponent: React.FC<StudentCardProps> = ({ student }) => {
    const { Institutes } = useAdminInstitutes();
    const { Groups } = useAdminGroups();
    const { gpa, loading: gpaLoading, error: gpaError } = useGPA(student.id);
    const { percentile, loading: percentileLoading, error: percentileError } = usePercentile(student.id);

    const getInstituteName = (id: number | undefined) => {
        if (!id) return '—';
        const institute = Institutes.find((inst) => inst.id === id);
        return institute ? institute.name : 'Не найден';
    };

    const getGroupName = (id: number | undefined) => {
        if (!id) return '—';
        const group = Groups.find((group) => group.id === id);
        return group ? group.group_code : 'Не найден';
    };
    return (
        <Card sx={{ maxWidth: 600, margin: 'auto' }}>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={10} sm={4} display="flex">
                    <CardMedia
                        component="img"
                        height="150"
                        image={student.photo}
                        alt={`${student.name} photo`}
                        style={{ objectFit: 'contain' }}
                    />
                </Grid>
                <Grid item xs={10} sm={8}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {student.name} {student.secondname} {student.lastname}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            <strong>Институт:</strong> {getInstituteName(student.institute_id)}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            <strong>Курс:</strong> {student.course}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            <strong>Группа:</strong> {getGroupName(student.group_id)}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            <strong>Телефон:</strong> {student.phone}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            <strong>Почта:</strong> {student.mail}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            <strong>GPA:</strong>{' '}
                            {gpaLoading
                                ? 'Загрузка...'
                                : gpaError
                                ? 'Ошибка'
                                : gpa !== null
                                ? gpa
                                : '0'}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            <strong>Percentile:</strong>{' '}
                            {percentileLoading
                                ? 'Загрузка...'
                                : percentileError
                                ? 'Ошибка'
                                : percentile !== null
                                ? percentile
                                : '0'}
                        </Typography>
                    </CardContent>
                </Grid>
                <CollapsibleTable studentId={student.id} />
            </Grid>
        </Card>
    );
};

export default StudentCardComponent;
