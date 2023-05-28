import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Modal, Typography } from '@mui/material';

import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";

import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import PersonAddDisabledOutlinedIcon from "@mui/icons-material/PersonAddDisabledOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";

import { mockDataStudent } from 'data/mockData';
import { Link } from 'react-router-dom';
import config from 'config';
import { If } from 'components/If';

const StudentRow = ({
    id,
    fullname,
    email,
    actions,
    isHover,
    registered,
    ...props
}) => {
    const [register, setRegister] = useState(registered);

    return (
        <div className='student-row' {...props}>
            <div className="check">
                <Checkbox
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    // defaultChecked={register}
                    checked={register}
                />
            </div>
            <div className='id'>{id}</div>
            <div className='name'>{fullname}</div>
            <div className='email'>{email}</div>
            <div className='actions'>
                <If condition={isHover}>
                    {register ? (
                        <PersonAddDisabledOutlinedIcon
                            className="icon"
                            fontSize="large"
                            onClick={() => setRegister(false)}
                        />
                    ) : (
                        <PersonAddOutlinedIcon
                            className="icon"
                            fontSize="large"
                            onClick={() => setRegister(true)}
                        />
                    )}
                    <DriveFileRenameOutlineOutlinedIcon className="icon" fontSize="large" />
                </If>
            </div>
        </div>
)}

const ModalAddStudentLesson = ({
    isOpenModalAddStudent,
    handleCloseModalAddStudent,
}) => {
    const [listStudent, setListStudent] = useState([]);
    const [hoverRow, setHoverRow] = useState("");

    useEffect(() => {
    
        setListStudent(mockDataStudent);
    }, [])


    return (
        <Modal
        className='modal-add-student-lesson'
            open={isOpenModalAddStudent}
            onClose={handleCloseModalAddStudent}
            aria-labelledby="modal-add-student-to-lesson"
            aria-describedby="modal-add-student-to-lesson-page"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "10%",
                    bottom: "10%",
                    left: "10%",
                    right: "10%",

                    // transform: "translate(-50%, -50%)",
                    width: "80vw",
                    bgcolor: "background.paper",
                    border: "2px solid #000",
                    boxShadow: 24,
                    p: 4,

                    overflow:'scroll',
                    display:'block'
                }}
            >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Add Student
                </Typography>
                <Box
                    display="flex"
                    flexDirection="column"
                    
                >
                    {listStudent.map(student => {
                        
                        return (
                            <StudentRow 
                                {...student}
                                registered={true}
                                isHover={hoverRow === student.id}
                                onMouseEnter={()=>setHoverRow(student.id)}
                                onMouseLeave={()=>setHoverRow("")}
                            />
                        )
                    })}
                </Box>
            </Box>
        </Modal>
    );
};

ModalAddStudentLesson.propTypes = {
    
};

export default ModalAddStudentLesson;