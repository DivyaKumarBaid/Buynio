// utils/socket.ts
import { baseURL } from '@/lib/axios';
import { io, Socket } from 'socket.io-client';

const socket: Socket = io(baseURL); // Update the URL to match your NestJS server

export default socket;
