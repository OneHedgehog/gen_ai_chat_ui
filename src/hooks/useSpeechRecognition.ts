// useSpeechRecognition.js
import { useEffect, useRef, useState } from 'react';

const useSpeechRecognition = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState('');
    const recognitionRef = useRef(null);

    useEffect(() => {
        // Set up the Speech Recognition API
        if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
            recognitionRef.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognitionRef.current.interimResults = true;
            recognitionRef.current.lang = 'en-US'; // Set language as per your requirement

            recognitionRef.current.onresult = (event) => {
                const newTranscript = event.results[0][0].transcript;
                setTranscript(newTranscript); // Set the recognized speech
            };

            recognitionRef.current.onend = () => {
                setIsRecording(false); // Reset recording state when recognition ends
            };
        } else {
            console.error('Speech Recognition not supported in this browser.');
        }

        // Clean up function to stop recognition on component unmount
        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.abort();
            }
        };
    }, []);

    const startRecording = () => {
        if (recognitionRef.current) {
            recognitionRef.current.start();
            setIsRecording(true);
        }
    };

    const stopRecording = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
    };

    // Function to read the message aloud
    const readMessage = (message) => {
        const msg = new SpeechSynthesisUtterance(message);
        msg.lang = 'en-US'; // Set the language as needed
        window.speechSynthesis.speak(msg);
    };

    return { isRecording, startRecording, stopRecording, transcript, setTranscript, readMessage };
};

export { useSpeechRecognition };
