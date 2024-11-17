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
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.subject}
                </TableCell>
                <TableCell align="right">{row.teacher}</TableCell>
                <TableCell align="right">{row.percentile}%</TableCell>
                <TableCell align="right">{row.gpa}</TableCell>
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
                                        <TableCell>Дисциплина</TableCell>
                                        <TableCell>Оценка</TableCell>
                                        <TableCell>Преподаватель</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.performance.map((perfRow, index) => (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">
                                                {perfRow.discipline}
                                            </TableCell>
                                            <TableCell>{perfRow.grade}</TableCell>
                                            <TableCell>{perfRow.teacher}</TableCell>
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
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Предмет</TableCell>
                        <TableCell align="right">Преподаватель</TableCell>
                        <TableCell align="right">Перцентиль</TableCell>
                        <TableCell align="right">GPA</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <Row key={index} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
