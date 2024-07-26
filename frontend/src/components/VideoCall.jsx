// src/components/VideoCall.jsx
import React, { useEffect, useRef, useState } from 'react';
import SimplePeer from 'simple-peer';
import io from 'socket.io-client';

const VideoCall = () => {
    const [stream, setStream] = useState(null);
    const [peer, setPeer] = useState(null);
    const videoRef = useRef();
    const remoteVideoRef = useRef();
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = io.connect('ws://localhost:8080');

        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            setStream(stream);
            videoRef.current.srcObject = stream;
        });

        socketRef.current.on('signal', (data) => {
            if (peer) {
                peer.signal(data);
            }
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    const callPeer = () => {
        const peer = new SimplePeer({
            initiator: true,
            trickle: false,
            stream: stream,
        });

        peer.on('signal', (data) => {
            socketRef.current.emit('signal', data);
        });

        peer.on('stream', (remoteStream) => {
            remoteVideoRef.current.srcObject = remoteStream;
        });

        setPeer(peer);
    };

    const answerCall = () => {
        const peer = new SimplePeer({
            initiator: false,
            trickle: false,
            stream: stream,
        });

        peer.on('signal', (data) => {
            socketRef.current.emit('signal', data);
        });

        peer.on('stream', (remoteStream) => {
            remoteVideoRef.current.srcObject = remoteStream;
        });

        setPeer(peer);
    };

    return (
        <div>
            <video ref={videoRef} autoPlay muted />
            <video ref={remoteVideoRef} autoPlay />
            <button onClick={callPeer}>Call</button>
            <button onClick={answerCall}>Answer</button>
        </div>
    );
};

export default VideoCall;