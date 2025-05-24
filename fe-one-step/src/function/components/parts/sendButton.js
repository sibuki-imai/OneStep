import React from 'react';
import PropTypes from 'prop-types';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import Box from '@mui/material/Box';

function SendButton({ onClick }) {
    return (
        <div>
            <Box sx={{ fontSize: 'large' }}>
                <SendRoundedIcon
                    onClick={onClick}
                    sx={{
                        fontSize: '200%',
                        color: '#77A6D0',
                        cursor: 'pointer',
                    }}
                />
            </Box>
        </div>
    );
}
export default SendButton;

SendButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};
