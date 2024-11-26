import React from 'react';
import { Container, Typography } from '@mui/material';
import TableTest from '@/components/TableStudentList/TableStudentList';


const TestPage: React.FC = () => {
    return (
        <Container>
            <Typography variant="h4" align="center" gutterBottom>
                Список студентов
            </Typography>
            {/* <TableTest /> */}
        </Container>
    );
};

export default TestPage;
