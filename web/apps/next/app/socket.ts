'use client';

import { io } from 'socket.io-client';
import { socketUrl } from './socket-url';

export const socket = io(socketUrl);
