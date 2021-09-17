import React from "react";
import CircularProgress from '@mui/material/CircularProgress';


const Spinner = (props) => {
    return (
        <CircularProgress size={props.size} color={props.color ?? 'secondary'} />
    );
};

export default Spinner;