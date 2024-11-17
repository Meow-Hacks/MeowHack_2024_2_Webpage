import React from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import StudentCardComponent from '../StudentCardComponent/StudentCardComponent';
import { Student } from '../../types/Student';

interface StudentPopupProps {
    open: boolean;
    onClose: () => void;
    student: Student;
}

const StudentPopupComponent: React.FC<StudentPopupProps> = ({ open, onClose, student }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ m: 0, p: 2 }}>
                Информация о студенте
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <StudentCardComponent student={student} />
            </DialogContent>
        </Dialog>
    );
};

export default StudentPopupComponent;
