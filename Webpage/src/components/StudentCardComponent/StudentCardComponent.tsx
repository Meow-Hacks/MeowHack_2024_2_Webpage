import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import { Student } from '../../types/Student';
import TableCollapsible from '../TableCollapsible/TableCollapsible';

interface StudentCardProps {
    student: Student;
}

const StudentCardComponent: React.FC<StudentCardProps> = ({ student }) => {
    return (
        <Card sx={{ maxWidth: 600, margin: 'auto' }}>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={10} sm={4} display="flex">
                    <CardMedia
                        component="img"
                        height="150"
                        image={student.photo}
                        alt={`${student.fullName} photo`}
                        style={{ objectFit: 'contain' }}
                    />
                </Grid>
                <Grid item xs={10} sm={8}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {student.fullName}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            <strong>Институт:</strong> {student.institute}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            <strong>Курс:</strong> {student.course}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            <strong>Группа:</strong> {student.group}
                        </Typography>
                    </CardContent>
                </Grid>
                <TableCollapsible />
            </Grid>
        </Card>
    );
};

export default StudentCardComponent;
