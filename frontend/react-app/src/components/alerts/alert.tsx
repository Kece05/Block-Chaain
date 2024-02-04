import React from 'react';

interface AlertProps {
    message: string;
    type: 'error' | 'info' | 'success';
    onClose: () => void;
}

const CustomAlert: React.FC<AlertProps> = ({ message, type, onClose }) => {
    return (
        <div className={`custom-alert custom-alert-${type}`}>
            <span>{message}</span>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default CustomAlert;
