"use client";

import { io } from "socket.io-client";

const socket = io(
    // "http://localhost:5000"
      process.env.NEXT_PUBLIC_API_URL!
);

export default socket;