import React, { useState, useContext } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import headCells from './headCells';
import Context from './context';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid blue',
    boxShadow: 24,
    p: 4,
};

function ModalBtn() {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [checked, setChecked] = useState(false);
    const { setHeadCheck, headCheck, checkedColumnsBtn } = useContext(Context)



    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);


    const onChange = (item, id) => {
        if (item.id === id) {
            setChecked(item.checked = !item.checked)
        }
    };

    const headCheckedBtn = () => {
        setHeadCheck(headCells.filter(item => item.checked))        
    }



    const handleClick = () => {
        localStorage.setItem('columns', JSON.stringify(headCheck))
        headCheckedBtn();
        checkedColumnsBtn();
        handleClose()
    }

    return (
        <div>
            <Button onClick={handleOpen} variant="outlined" >Open modal</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>

                        <Typography id="transition-modal-title" variant="h6" component="h5">
                            Select columns
                        </Typography>

                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={headCells}
                            sx={{ width: 300 }}
                            value={value}
                            onChange={(event, newValue) => {
                                setOptions(newValue ? [newValue, ...options] : options);
                                setValue(newValue);
                            }}
                            onInputChange={(event, newInputValue) => {
                                setInputValue(newInputValue);
                            }}

                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    label="Search columns..." />}
                        />
                        {headCells.map((item) => {
                            return (
                                <Typography id="transition-modal-title" component="p" key={item.id}>
                                    <Checkbox
                                        color="primary"
                                        checked={item.checked}
                                        onChange={() => onChange(item, item.id)} />
                                    {item.label}
                                </Typography>
                            )

                        })}
                        <Button variant="outlined"
                            onClick={handleClick}
                        >
                            Apply
                        </Button>
                        <Button onClick={handleClose} variant="outlined">
                            Close
                        </Button>


                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
export default ModalBtn;
