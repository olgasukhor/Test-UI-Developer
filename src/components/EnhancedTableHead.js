import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import headCells from './headCells';

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort, row } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    let checkedHeadCell = []

    for (let k = 0; k < row.length; k++) {

        for (let i = 0; i < headCells.length; i++) {
            if (row[k].id === headCells[i].id) {
                checkedHeadCell.push(headCells[i])
            }

        }
    }

    return (
        <TableHead>
            <TableRow sx={{ backgroundColor: 'lightgray' }}>
                <TableCell padding="checkbox">

                </TableCell>
                {checkedHeadCell.map((headCell) => (
                    <TableCell

                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
export default EnhancedTableHead;

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};