import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid'; // Changed to Grid (Grid2 is not necessary unless you're using it specifically)
import Avatar from '@mui/material/Avatar'; // Importing Avatar for sender's image
import MicIcon from '@mui/icons-material/Mic'; // Importing microphone icon
import {useSpeechRecognition} from "../hooks/useSpeechRecognition.ts";

const ChatMessage = ({ message, sender }) => {
    const isSender = sender === 'me'; // Assuming 'me' indicates your messages
    const { readMessage } = useSpeechRecognition(); // Destructure readMessage from the hook

    return (
        <Grid container justifyContent={isSender ? 'flex-end' : 'flex-start'} margin="10px 0">
            <Grid item xs={isSender ? 10 : 11}>
                <Paper
                    elevation={3}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        backgroundColor: isSender ? '#dcf8c6' : '#ffffff',
                        maxWidth: '90%', // Allow more space for wider screens
                        boxShadow: isSender ? '0 2px 10px rgba(76, 175, 80, 0.3)' : '0 2px 10px rgba(0, 0, 0, 0.2)',
                    }}
                >
                    {!isSender && ( // Display an avatar for the other sender inside the message bubble
                        <Avatar sx={{ bgcolor: 'secondary.main', marginRight: '8px' }}>AI</Avatar>
                    )}
                    <Typography variant="body1" style={{ margin: 0, lineHeight: 1.5, flexGrow: 1 }}>
                        {message}
                    </Typography>
                    {!isSender && ( // Add microphone icon for non-user messages
                        <Box onClick={() => readMessage(message)} sx={{ cursor: 'pointer', marginLeft: '8px' }}>
                            <MicIcon />
                        </Box>
                    )}
                </Paper>
            </Grid>
        </Grid>
    );
};

export { ChatMessage };
