// File: src/components/TableTest/TableTest.tsx

import * as React from 'react';
import {
    useTheme,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TablePagination,
    TableRow,
    TableHead,
    Paper,
    IconButton,
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
} from '@mui/material';
import {
    FirstPage as FirstPageIcon,
    KeyboardArrowLeft,
    KeyboardArrowRight,
    LastPage as LastPageIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Add as AddIcon,
} from '@mui/icons-material';
import StudentPopupComponent from '../StudentPopupComponent/StudentPopupComponent';
import { Student } from '../../types/Student';
import { useAdminStudents } from '@/api/useAdminStudents';
import { useAdminInstitutes } from '@/api/useAdminInstitutes';
import { useAdminGroups } from '@/api/useAdminGroups';

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

const TableTest: React.FC = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [openEditDialog, setOpenEditDialog] = React.useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const [openStudentCard, setOpenStudentCard] = React.useState(false);
    const [openAddDialog, setOpenAddDialog] = React.useState(false); // New state for Add Dialog
    const [selectedStudent, setSelectedStudent] = React.useState<Student | null>(null);
    const [editedStudent, setEditedStudent] = React.useState<Partial<Student>>({});
    const [newStudent, setNewStudent] = React.useState<Partial<Student>>({
        name: '',
        lastname: '',
        secondname: '',
        role_id: 2,
        group_id: undefined,
        institute_id: undefined,
        phone: '',
        mail: '',
    });

    const { Students, loading, error, addStudent, updateStudent, deleteStudent } = useAdminStudents();
    const { Institutes } = useAdminInstitutes();
    const { Groups } = useAdminGroups();

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка загрузки данных.</div>;
    }

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

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Students.length) : 0;

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
        setOpenStudentCard(true);
    };

    const handleEditClick = (event: React.MouseEvent, student: Student) => {
        event.stopPropagation(); // Prevent opening student card when clicking the button
        setSelectedStudent(student);
        setEditedStudent({
            name: student.name || '',
            lastname: student.lastname || '',
            secondname: student.secondname || '',
            group_id: student.group_id || undefined,
            institute_id: student.institute_id || undefined,
            phone: student.phone || '',
            mail: student.mail || '',
        });
        setOpenEditDialog(true);
    };

    const handleDeleteClick = (event: React.MouseEvent, student: Student) => {
        event.stopPropagation(); // Prevent opening student card when clicking the button
        setSelectedStudent(student);
        setOpenDeleteDialog(true);
    };

    const handleEditChange = (field: string, value: unknown) => {
        setEditedStudent((prevState) => ({ ...prevState, [field]: value }));
    };

    const handleEditSave = async () => {
        if (selectedStudent && editedStudent) {
            try {
                await updateStudent(selectedStudent.id, editedStudent);
                setOpenEditDialog(false);
                setSelectedStudent(null);
                setEditedStudent({});
            } catch (err) {
                console.error('Ошибка при обновлении студента:', err);
            }
        } else {
            console.log('No student selected or editedStudent is empty');
        }
    };

    const handleDeleteConfirm = async () => {
        if (selectedStudent) {
            await deleteStudent(selectedStudent.id);
            setOpenDeleteDialog(false);
            setSelectedStudent(null);
        }
    };

    const handleCloseStudentCard = () => {
        setOpenStudentCard(false);
        setSelectedStudent(null);
    };

    // Handlers for Add Student
    const handleAddClick = () => {
        setNewStudent({
            name: '',
            lastname: '',
            secondname: '',
            role_id: 2, // Assuming role_id for student is 2
            group_id: undefined,
            institute_id: undefined,
            phone: '',
            mail: '',
        });
        setOpenAddDialog(true);
    };

    const handleAddChange = (field: string, value: unknown) => {
        setNewStudent((prevState) => ({ ...prevState, [field]: value }));
    };

    const handleAddSave = async () => {
        try {
            if (newStudent.name && newStudent.lastname && newStudent.mail) {
                await addStudent([newStudent]);
                setOpenAddDialog(false);
                setNewStudent({});
            } else {
                console.error('Необходимо заполнить обязательные поля');
            }
        } catch (err) {
            console.error('Ошибка при добавлении студента:', err);
        }
    };

    return (
        <Box sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddClick}>
                    Добавить студента
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ФИО</TableCell>
                            <TableCell align="right">Институт</TableCell>
                            <TableCell align="right">Курс</TableCell>
                            <TableCell align="right">Группа</TableCell>
                            <TableCell align="right">Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? Students.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : Students
                        ).map((student) => (
                            <TableRow
                                key={student.id}
                                hover
                                onClick={() => handleRowClick(student)}
                                style={{ cursor: 'pointer' }}
                            >
                                <TableCell component="th" scope="row">
                                    {student.lastname} {student.name} {student.secondname}
                                </TableCell>
                                <TableCell align="right">{getInstituteName(student.institute_id) || '—'}</TableCell>
                                <TableCell align="right">{student.course || '—'}</TableCell>
                                <TableCell align="right">{getGroupName(student.group_id) || '—'}</TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        onClick={(event) => handleEditClick(event, student)}
                                        onMouseDown={(event) => event.stopPropagation()}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={(event) => handleDeleteClick(event, student)}
                                        onMouseDown={(event) => event.stopPropagation()}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={5} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, 50]}
                                colSpan={5}
                                count={Students.length}
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

            {/* Диалоговое окно добавления студента */}
            <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
                <DialogTitle>Добавить студента</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Имя"
                        fullWidth
                        required
                        value={newStudent.name || ''}
                        onChange={(e) => handleAddChange('name', e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Фамилия"
                        fullWidth
                        required
                        value={newStudent.lastname || ''}
                        onChange={(e) => handleAddChange('lastname', e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Отчество"
                        fullWidth
                        value={newStudent.secondname || ''}
                        onChange={(e) => handleAddChange('secondname', e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Телефон"
                        fullWidth
                        value={newStudent.phone || ''}
                        onChange={(e) => handleAddChange('phone', e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Почта"
                        fullWidth
                        required
                        value={newStudent.mail || ''}
                        onChange={(e) => handleAddChange('mail', e.target.value)}
                    />
                    <TextField
                        select
                        margin="dense"
                        label="Институт"
                        fullWidth
                        value={newStudent.institute_id || ''}
                        onChange={(e) => handleAddChange('institute_id', Number(e.target.value))}
                    >
                        {Institutes.map((institute) => (
                            <MenuItem key={institute.id} value={institute.id}>
                                {institute.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        margin="dense"
                        label="Группа"
                        fullWidth
                        value={newStudent.group_id || ''}
                        onChange={(e) => handleAddChange('group_id', Number(e.target.value))}
                    >
                        {Groups.map((group) => (
                            <MenuItem key={group.id} value={group.id}>
                                {group.group_code}
                            </MenuItem>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddDialog(false)}>Отмена</Button>
                    <Button onClick={handleAddSave}>Добавить</Button>
                </DialogActions>
            </Dialog>

            {/* Диалоговое окно редактирования */}
            <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
                <DialogTitle>Редактировать студента</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Имя"
                        fullWidth
                        value={editedStudent.name || ''}
                        onChange={(e) => handleEditChange('name', e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Фамилия"
                        fullWidth
                        value={editedStudent.lastname || ''}
                        onChange={(e) => handleEditChange('lastname', e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Отчество"
                        fullWidth
                        value={editedStudent.secondname || ''}
                        onChange={(e) => handleEditChange('secondname', e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Телефон"
                        fullWidth
                        value={editedStudent.phone || ''}
                        onChange={(e) => handleEditChange('phone', e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Почта"
                        fullWidth
                        value={editedStudent.mail || ''}
                        onChange={(e) => handleEditChange('mail', e.target.value)}
                    />
                    <TextField
                        select
                        margin="dense"
                        label="Институт"
                        fullWidth
                        value={editedStudent.institute_id || ''}
                        onChange={(e) => handleEditChange('institute_id', Number(e.target.value))}
                    >
                        {Institutes.map((institute) => (
                            <MenuItem key={institute.id} value={institute.id}>
                                {institute.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        margin="dense"
                        label="Группа"
                        fullWidth
                        value={editedStudent.group_id || ''}
                        onChange={(e) => handleEditChange('group_id', Number(e.target.value))}
                    >
                        {Groups.map((group) => (
                            <MenuItem key={group.id} value={group.id}>
                                {group.group_code}
                            </MenuItem>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEditDialog(false)}>Отмена</Button>
                    <Button onClick={handleEditSave}>Сохранить</Button>
                </DialogActions>
            </Dialog>

            {/* Диалоговое окно подтверждения удаления */}
            <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                <DialogTitle>Удалить студента</DialogTitle>
                <DialogContent>
                    Вы уверены, что хотите удалить студента {selectedStudent?.lastname} {selectedStudent?.name}?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteDialog(false)}>Отмена</Button>
                    <Button onClick={handleDeleteConfirm} color="error">Удалить</Button>
                </DialogActions>
            </Dialog>

            {/* Компонент карточки студента */}
            {selectedStudent && openStudentCard && (
                <StudentPopupComponent
                    open={openStudentCard}
                    onClose={handleCloseStudentCard}
                    student={selectedStudent}
                />
            )}
        </Box>
    );
};

export default TableTest;