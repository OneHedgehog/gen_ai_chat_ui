import React, { useState, useRef } from 'react';
import { Box, IconButton, TextareaAutosize, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MicIcon from '@mui/icons-material/Mic';
import { useSpeechRecognition } from "../hooks/useSpeechRecognition.ts";

const MessageInput = ({ onSend }) => {
    const [message, setMessage] = useState('');
    const [fileName, setFileName] = useState('');
    const [fileSize, setFileSize] = useState('');
    const textareaRef = useRef(null);
    const { isRecording, startRecording, stopRecording, transcript, setTranscript } = useSpeechRecognition();

    // Update message with transcript when it changes
    React.useEffect(() => {
        if (transcript) {
            setMessage(transcript);
        }
    }, [transcript]);

    const handleInputChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSend = () => {
        if (message.trim() !== '') {
            onSend(message, fileName);
            setMessage('');
            setFileName('');
            setFileSize('');
            setTranscript(''); // Clear transcript after sending
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
            setFileSize((file.size / 1024).toFixed(2) + ' KB'); // Size in KB
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        textareaRef.current.style.borderColor = 'blue'; // Change border color on drag over
    };

    const handleDragLeave = () => {
        textareaRef.current.style.borderColor = ''; // Reset border color
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            setFileName(file.name);
            setFileSize((file.size / 1024).toFixed(2) + ' KB'); // Size in KB
        }
        textareaRef.current.style.borderColor = ''; // Reset border color
    };

    const handleMicClick = () => {
        if (isRecording) {
            stopRecording(); // Stop recording if currently recording
        } else {
            startRecording(); // Start recording
        }
    };

    return (
        <Box
            display="flex"
            alignItems="center"
            padding="12px"
            boxShadow={2}
            borderRadius="8px"
            backgroundColor="#f9f9f9" // Lighter background
            sx={{ border: '1px solid #ccc' }} // Subtle border
        >
            <input
                type="file"
                accept="*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="file-input"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            />
            <label htmlFor="file-input">
                <IconButton component="span" color="primary">
                    <AttachFileIcon />
                </IconButton>
            </label>
            <TextareaAutosize
                ref={textareaRef}
                value={message}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                    }
                }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                minRows={1}
                maxRows={4}
                style={{
                    flexGrow: 1,
                    resize: 'none',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    marginLeft: '8px',
                    outline: 'none',
                    backgroundColor: '#fff', // White background for textarea
                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)', // Subtle shadow
                }}
                placeholder="Type a message..."
            />
            <IconButton
                color="primary"
                onClick={handleSend}
                disabled={!message.trim()} // Disable if the message is empty
                sx={{
                    transition: 'background-color 0.3s',
                    '&:hover': {
                        backgroundColor: '#e0e0e0', // Light gray on hover
                    },
                }}
            >
                <SendIcon />
            </IconButton>
            <IconButton
                color="primary"
                onClick={handleMicClick} // Handle microphone click
                sx={{
                    transition: 'background-color 0.3s',
                    '&:hover': {
                        backgroundColor: '#e0e0e0', // Light gray on hover
                    },
                }}
            >
                <MicIcon />
            </IconButton>
            {fileName && (
                <Box sx={{ marginLeft: '10px', fontSize: '12px', color: '#555', whiteSpace: 'nowrap' }}>
                    <Typography variant="body2">{fileName} ({fileSize})</Typography>
                </Box>
            )}
        </Box>
    );
};

export default MessageInput;
