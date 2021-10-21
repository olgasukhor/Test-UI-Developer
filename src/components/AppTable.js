import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Link from '@mui/material/Link';
import Context from './context';
import { useHistory } from 'react-router-dom';
import EnhancedTableHead from './EnhancedTableHead'

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1]

    });
    return stabilizedThis.map((el) => el[0]);
}

function AppTable() {
    const { profiles, setProfiles } = useContext(Context);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('profileName');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [row, setRow] = useState([]);
    let history = useHistory();

    // let profilesNew = [];

    // const checkedColumnsNew = () => {
    //     let element = [];
    //     for (let i = 0; i < row.length; i++) {
    //         element.push(row[i].id)
    //     }
    //     let checkedColumns = element.join(', ');

    //     for (let i = 0; i < profiles.length; i++) {
    //         const element = profiles[i];
    //         const keys = Object.keys(element).filter(key => checkedColumns.includes(key));
    //         const sortedObj = Object.fromEntries(
    //             keys.map(key => [key, element[key]])
    //         );
    //         profilesNew.push(sortedObj)
    //     }
    //     setProfiles(profilesNew)    
    // }


    useEffect(() => {

        const row = localStorage.getItem('columns' || [])
        setRow(JSON.parse(row))
        // checkedColumnsNew()
    }, [])
    // console.log(profiles)

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = profiles.map((profile) => profile.profileName);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };



    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - profiles.length) : 0;

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>

                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={profiles.length}
                            row={row}
                        />
                        <TableBody>

                            {stableSort(profiles, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((profile, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            key={profile.profileName}
                                        >
                                            <TableCell padding="checkbox">
                                            </TableCell>

                                            {profile.profileName && <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                <Link onClick={() => history.push(`/summary/${profile.id}`)}
                                                >{profile.profileName}</Link>
                                            </TableCell>}

                                            {profile.profileStatus && <TableCell align="right">{profile.profileStatus}</TableCell>}
                                            {profile.creationDate && <TableCell align="right">{profile.creationDate}</TableCell>}
                                            {profile.currency && <TableCell align="right" > &#36; {profile.currency}</TableCell>}
                                            {profile.percentage && <TableCell align="right" > {profile.percentage} &#37;</TableCell>}
                                            {profile.progress && <TableCell align="right"><progress id="file" max="100" value={profile.progress}></progress></TableCell>}
                                            {profile.image && <Tooltip title="Image">
                                                <TableCell align="right">
                                                    <img src={profile.image} alt="" />
                                                </TableCell>
                                            </Tooltip>}

                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={profiles.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
            { }
        </Box>
    );
}

export default AppTable;
