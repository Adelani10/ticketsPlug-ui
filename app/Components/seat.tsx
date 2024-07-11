"use client";

export default function Seat({seat}: any) {
  return (
    <div className="h-8 w-8 hover:bg-cyan-300 cursor-pointer bg-cyan-600 text-white p-2 rounded-full flex items-center justify-center">
      <h1>{seat}</h1>
    </div>
  );
}
