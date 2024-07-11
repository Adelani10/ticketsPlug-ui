"use client";
import Seat from "./seat";

export default function SeatPage({setToggleSeat}: any) {
  return (
    <div className="top-1/2 left-1/2 absolute -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b to-cyan-300 z-30 p-3 from-sky-50 flex flex-col gap-y-16 w-1/2">
      <div className="flex justify-between items-center text-2xl">
        <h1 className="">UFC Miami</h1>
        <button onClick={() => setToggleSeat(false)} className=" text-red-600 font-semibold">x</button>
      </div>
      <div className="grid grid-cols-3 gap-y-2">
        <Seat />
        <Seat />
        <Seat />
        <Seat />
        <Seat />
        <Seat />
        <Seat />
        <Seat />
        <Seat />
        <Seat />
        <Seat />
        <Seat />
        <Seat />
        <Seat />
        <Seat />
        <Seat />
        <Seat />
      </div>
    </div>
  );
}
