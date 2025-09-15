import React from "react";

/* Simplified grid — in production fetch room status from /api/rooms
export default function RoomMatrix({ units=20 }: { units?: number }){
  const rooms = Array.from({length: units}, (_,i)=>({
    id: i+1,
    status: i%7===0 ? "vacant" : (i%3===0 ? "overdue" : (i%2===0 ? "paid" : "pending"))
  }));
  const color = (s:string)=>{
    if(s==="paid") return "bg-green-500";
    if(s==="pending") return "bg-yellow-400";
    if(s==="overdue") return "bg-red-500";
    return "bg-gray-300";
  };
  return (
    <div>
      <h2 className="text-lg mb-2">Room Matrix</h2>
      <div className="grid grid-cols-6 gap-2">
        {rooms.map(r=>(
          <div key={r.id} className={`p-3 rounded ${color(r.status)} text-white text-sm`}>
            Room {r.id} <div className="text-xs opacity-90">{r.status}</div>
          </div>
        ))}
      </div>
    </div>
  )
}*/


/*import React from "react";
import "../styles/index.css";

type RoomStatus = "vacant" | "occupied" | "overdue";

interface Room {
  id: number;
  number: string;
  status: RoomStatus;
}

const generateRooms = (): Room[] => {
  const rooms: Room[] = [];
  for (let i = 1; i <= 74; i++) {
    const status: RoomStatus =
      i % 7 === 0 ? "overdue" : i % 3 === 0 ? "vacant" : "occupied";
    rooms.push({
      id: i,
      number: `R${i.toString().padStart(2, "0")}`,
      status,
    });
  }
  return rooms;
};

const RoomMatrix: React.FC = () => {
  const rooms = generateRooms();

  return (
    <div>
      {/* Legend */}
      /*<div className="flex gap-4 mb-4">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded bg-green-500 inline-block" /> Occupied
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded bg-blue-500 inline-block" /> Vacant
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded bg-red-500 inline-block" /> Overdue
        </div>
      </div>*/

      {/* Room grid */}
  /*    <div className="grid grid-cols-8 gap-2">
        {rooms.map((room) => (
          <div
            key={room.id}
            className={`
              p-4 text-center text-white font-bold rounded cursor-pointer shadow
              ${
                room.status === "occupied"
                  ? "bg-green-500"
                  : room.status === "vacant"
                  ? "bg-blue-500"
                  : "bg-red-500"
              }
            `}
          >
            {room.number}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomMatrix;*/

//RoomMatrix with Live Data

import React from "react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../lib/apiClient";

type RoomStatus = "vacant" | "occupied" | "overdue";

interface Room {
  id: number;
  number: string;
  status: RoomStatus;
}

const fetchRooms = async (): Promise<Room[]> => {
  const { data } = await apiClient.get<Room[]>("/rooms");
  return data;
};

const RoomMatrix: React.FC = () => {
  const { data: rooms, isLoading, error } = useQuery(["rooms"], fetchRooms, {
    refetchInterval: 5000, // poll every 5s (until websockets)
  });

  if (isLoading) return <p>Loading rooms...</p>;
  if (error) return <p>Error loading rooms</p>;

  return (
    <div>
      {/* Legend */}
      <div className="flex gap-4 mb-4">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded bg-green-500 inline-block" /> Occupied
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded bg-blue-500 inline-block" /> Vacant
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded bg-red-500 inline-block" /> Overdue
        </div>
      </div>

      {/* Room grid */}
      <div className="grid grid-cols-8 gap-2">
        {rooms?.map((room) => (
          <div
            key={room.id}
            className={`
              p-4 text-center text-white font-bold rounded cursor-pointer shadow
              ${
                room.status === "occupied"
                  ? "bg-green-500"
                  : room.status === "vacant"
                  ? "bg-blue-500"
                  : "bg-red-500"
              }
            `}
          >
            {room.number}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomMatrix;

/*Real-Time Updates (WebSockets)

Once your backend is ready, replace polling with Socket.IO:

Server emits roomUpdated when a tenant pays / moves in/out.

Client listens and updates cache:*/


// inside RoomMatrix.tsx
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import io from "socket.io-client";

const socket = io("http://localhost:4000");

const RoomMatrix: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: rooms, isLoading } = useQuery(["rooms"], fetchRooms);

  useEffect(() => {
    socket.on("roomUpdated", () => {
      queryClient.invalidateQueries(["rooms"]);
    });
    return () => {
      socket.off("roomUpdated");
    };
  }, [queryClient]);

  // ... same JSX as before
};
