import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function createRow(
    subject: string,
    teacher: string,
    percentile: number,
    gpa: number,
    performance: Array<{ discipline: string; grade: string; teacher: string }>
) {
    return { subject, teacher, percentile, gpa, performance };
}

const rows = [
    createRow('Матан', 'Иванов Иван Иванович', 85, 4.7, [
        { discipline: 'Лекции', grade: '5', teacher: 'Иванов И.И.' },
        { discipline: 'Семинары', grade: '4', teacher: 'Сидоров С.С.' },
    ]),
    createRow('Физика', 'Петров Петр Петрович', 78, 4.3, [
        { discipline: 'Лекции', grade: '4', teacher: 'Петров П.П.' },
        { discipline: 'Лабораторные', grade: '5', teacher: 'Смирнов С.С.' },
    ]),
];

function Row(props: { row: ReturnType<typeof createRow> }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell sx={{ padding: '8px 16px' }}>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row" sx={{ padding: '8px 16px' }}>
                    {row.subject}
                </TableCell>
                <TableCell align="right" sx={{ padding: '8px 16px' }}>{row.teacher}</TableCell>
                <TableCell align="right" sx={{ padding: '8px 16px' }}>{row.percentile}%</TableCell>
                <TableCell align="right" sx={{ padding: '8px 16px' }}>{row.gpa}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Успеваемость
                            </Typography>
                            <Table size="small" aria-label="performance">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ padding: '8px 16px' }}>Дисциплина</TableCell>
                                        <TableCell sx={{ padding: '8px 16px' }}>Оценка</TableCell>
                                        <TableCell sx={{ padding: '8px 16px' }}>Преподаватель</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.performance.map((perfRow, index) => (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row" sx={{ padding: '8px 16px' }}>
                                                {perfRow.discipline}
                                            </TableCell>
                                            <TableCell sx={{ padding: '8px 16px' }}>{perfRow.grade}</TableCell>
                                            <TableCell sx={{ padding: '8px 16px' }}>{perfRow.teacher}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function CollapsibleTable() {
    return (
        <Box sx={{ p: 4 }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ padding: '8px 16px' }} />
                            <TableCell sx={{ padding: '8px 16px' }}>Предмет</TableCell>
                            <TableCell align="right" sx={{ padding: '8px 16px' }}>Преподаватель</TableCell>
                            <TableCell align="right" sx={{ padding: '8px 16px' }}>Перцентиль</TableCell>
                            <TableCell align="right" sx={{ padding: '8px 16px' }}>GPA</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <Row key={index} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
