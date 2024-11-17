import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import StudentPopupComponent from '../StudentPopupComponent/StudentPopupComponent';
import { Student } from '../../types/Student';

const students: Student[] = [
    {
        id: 1,
        fullName: 'Иванов Иван Вольдемарабдулшизомедович',
        institute: 'ИПТИП',
        course: 3,
        group: 'ЭФБО-02-22',
        photo: 'https://yt3.googleusercontent.com/qbWmlj0bPSdlsHE0qSQEP0S-RrN1N-pdTBiJ253XlZ1j2P4xPf-8JvWrfbTmnoOFX5jNQm9nlzU=s900-c-k-c0x00ffffff-no-rj',
    },
    {
        id: 2,
        fullName: 'Смирнова Мария Вольдемарабдулшизомедовна',
        institute: 'ИИТ',
        course: 4,
        group: 'ЭФБО-01-22',
        photo: 'https://yt3.googleusercontent.com/qbWmlj0bPSdlsHE0qSQEP0S-RrN1N-pdTBiJ253XlZ1j2P4xPf-8JvWrfbTmnoOFX5jNQm9nlzU=s900-c-k-c0x00ffffff-no-rj',
    },
    {
        id: 3,
        fullName: 'Бухарестов Вольдемарабдулшизомед Акпантокпантураркожанович-Ибадуллаулывич',
        institute: 'ИПТИП',
        course: 1,
        group: 'ЭФБО-07-22',
        photo: 'https://yt3.googleusercontent.com/qbWmlj0bPSdlsHE0qSQEP0S-RrN1N-pdTBiJ253XlZ1j2P4xPf-8JvWrfbTmnoOFX5jNQm9nlzU=s900-c-k-c0x00ffffff-no-rj',
    },
];

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement>,
        newPage: number,
    ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

export default function TableTest() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [open, setOpen] = React.useState(false);
    const [selectedStudent, setSelectedStudent] = React.useState<Student | null>(null);

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - students.length) : 0;

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleRowClick = (student: Student) => {
        setSelectedStudent(student);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedStudent(null);
    };

    return (
        <>
            <TableContainer component={Paper} sx={{ margin: '10px' }}>
                <Table sx={{ minWidth: 700 }} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ФИО</TableCell>
                            <TableCell align="right">Институт</TableCell>
                            <TableCell align="right">Курс</TableCell>
                            <TableCell align="right">Группа</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? students.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : students
                        ).map((student) => (
                            <TableRow
                                key={student.id}
                                hover
                                onClick={() => handleRowClick(student)}
                                style={{ cursor: 'pointer' }}
                            >
                                <TableCell component="th" scope="row">
                                    {student.fullName}
                                </TableCell>
                                <TableCell align="right">{student.institute}</TableCell>
                                <TableCell align="right">{student.course}</TableCell>
                                <TableCell align="right">{student.group}</TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={4} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, 50]}
                                colSpan={4}
                                count={students.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>


            {selectedStudent && (
                <StudentPopupComponent
                    open={open}
                    onClose={handleClose}
                    student={selectedStudent}
                />
            )}
        </>
    );
}
