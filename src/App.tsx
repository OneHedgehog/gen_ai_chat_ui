import React, { useState } from 'react';
import './App.css';
import {
    AppBar,
    Box,
    Drawer,
    IconButton,
    Link,
    List,
    ListItem,
    ListItemText,
    Toolbar,
    Typography,
    Divider,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { ChatMessage } from './components/Message.tsx';
import MessageInput from './components/MessageInput.tsx';
import MenuIcon from '@mui/icons-material/Menu';

const DRAWER_WIDTH = '269px';
const HEADER_HEIGHT = '64px'; // Default AppBar height

function App() {
    const [messages, setMessages] = useState([
        { id: 1, message: 'Hey! How have you been?', sender: 'other' },
        { id: 2, message: "I've been doing well! Just wrapped up a project at work.", sender: 'me' },
        { id: 3, message: "That’s great to hear! What project was it?", sender: 'other' },
        {
            id: 4,
            message:
                "I was working on a web app for managing tasks and deadlines. It was quite challenging, but I learned a lot. The project involved creating a user-friendly interface that allows users to add, edit, and delete tasks easily, while also setting reminders for important deadlines. I had to integrate various libraries and frameworks to achieve the desired functionality, and it was quite an adventure!",
            sender: 'me',
        },
        { id: 5, message: "Sounds interesting! Did you face any major challenges?", sender: 'other' },
        {
            id: 6,
            message:
                "Definitely! One major challenge was figuring out how to handle user authentication securely. I had to implement OAuth, which was a bit complicated at first. There were also some issues with managing state across different components, especially when dealing with asynchronous data fetching. But overall, I feel it was a valuable learning experience.",
            sender: 'me',
        },
        { id: 7, message: "I can imagine! I always find async programming to be a bit of a puzzle.", sender: 'other' },
        {
            id: 8,
            message: "For sure! It can be confusing at times. Have you been working on anything new?",
            sender: 'me',
        },
        {
            id: 9,
            message:
                "Yes! I'm diving into React for the first time. It's quite exciting but also overwhelming. The sheer number of concepts to grasp can feel daunting, especially with hooks and the component lifecycle. But I’m determined to push through!",
            sender: 'other',
        },
        {
            id: 10,
            message:
                "React is fun! There’s a lot to learn, but once you get the hang of it, it becomes easier. I remember my first few projects were tough, but building things step by step made a world of difference.",
            sender: 'me',
        },
        { id: 11, message: "What do you think is the most important concept to understand first?", sender: 'other' },
    ]);

    const [chats, setChats] = useState([
        { id: 'chat_1', message: 'Hello, how are you?' },
        { id: 'chat_2', message: 'What time is our meeting?' },
        { id: 'chat_3', message: 'Looking forward to the weekend!' },
    ]);

    const [drawerOpen, setDrawerOpen] = useState(true);

    const toggleDrawer = () => {
        setDrawerOpen((prev) => !prev);
    };

    return (
        <>
            <Drawer variant="persistent" anchor="left" open={drawerOpen}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
                <List>
                    {chats.map(({ id, message }) => (
                        <ListItem
                            key={id}
                            component={Link}
                            to={`/chat/${id}`}
                            sx={{
                                cursor: 'pointer',
                                textDecoration: 'none',
                                color: 'inherit',
                                '&:hover': {
                                    backgroundColor: '#e8f0fe',
                                },
                                padding: '8px 16px',
                                borderRadius: '4px',
                            }}
                        >
                            <ListItemText primary={message} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            <Box paddingLeft={drawerOpen ? DRAWER_WIDTH : '0'}>
                <AppBar
                    position="fixed" // Set the AppBar to fixed position
                    sx={{
                        backgroundColor: '#ffffff',
                        color: '#000000',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                        height: HEADER_HEIGHT, // Ensure it has the correct height
                    }}
                >
                    <Toolbar>
                        {!drawerOpen && (
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                                onClick={toggleDrawer}
                            >
                                <MenuIcon />
                            </IconButton>
                        )}
                        <Typography variant="h6" color="inherit">
                            Chat Application
                        </Typography>
                    </Toolbar>
                </AppBar>

                {/* Divider for visual separation */}
                <Divider sx={{ backgroundColor: '#e0e0e0', marginTop: `${HEADER_HEIGHT}px` }} /> {/* Adjust for header height */}

                <Box
                    height={'calc(100% - 64px)'} // Adjust the height to account for the header
                    overflowY="auto"
                    paddingBottom="114px"
                    paddingTop={'15px'}
                    marginTop={HEADER_HEIGHT} // Add margin top equal to header height
                    backgroundColor={'#f1f3f4'} // Slightly darker gray for chat area
                >
                    <Grid container spacing={2} flexDirection={'column'} padding="16px">
                        {messages.map((messageMetadata) => {
                            const { message, sender, id } = messageMetadata;
                            return (
                                <ChatMessage
                                    message={message}
                                    sender={sender}
                                    key={id}
                                    sx={{
                                        padding: '10px',
                                        marginBottom: '8px',
                                        borderRadius: '8px',
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                        backgroundColor: sender === 'me' ? '#d1e7dd' : '#ffffff', // Different background color for different senders
                                    }}
                                />
                            );
                        })}
                    </Grid>
                </Box>
                <Box
                    paddingLeft={drawerOpen ? DRAWER_WIDTH : '0'}
                    position="fixed"
                    bottom={0}
                    left={0}
                    right={0}
                    backgroundColor="#ffffff"
                    sx={{
                        borderTop: '1px solid #e0e0e0',
                        boxShadow: '0 -2px 5px rgba(0,0,0,0.1)',
                    }} // Adding a top border and shadow
                >
                    <MessageInput />
                </Box>
            </Box>
        </>
    );
}

export default App;
