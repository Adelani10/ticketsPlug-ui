"use client";
import { useEffect, useState } from "react";
import Seat from "./seat";
import { MdClose } from "react-icons/md";

interface dateTypes {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function SeatPage({
  setToggleSeat,
  currEvent,
  ticketsPlug,
  signer,
}: any) {
  const [date, setDate] = useState<dateTypes>({
    days: 5,
    hours: 5,
    minutes: 5,
    seconds: 5,
  });
  const [seatArray, setSeatArray] = useState<any[]>([]);
  useEffect(() => {
    let intervalId: any;
    if (currEvent) {
      displaySeat();
      intervalId = setInterval(setCountDown, 1000);
    }

    return () => clearInterval(intervalId);
  }, [currEvent]);

  //   {new Date(Date.now()).toLocaleDateString(undefined, {
  //     weekday: "long",
  //     month: "long",
  //     day: "numeric",
  //     year: "numeric",
  //   })}

  const setCountDown = async () => {
    let eventDate;
    let oneSec = 1000;
    let oneMin = 60 * 1000;
    let oneHour = 60 * 1000 * 60;
    let oneDay = 60 * 1000 * 60 * 24;

    if (currEvent.date.includes("Aug 31")) {
      eventDate = new Date(2024, 7, 31, 23);
    } else if (currEvent.date.includes("Aug 2")) {
      eventDate = new Date(2024, 7, 2, 17);
    } else if (currEvent.date.includes("Aug 9")) {
      eventDate = new Date(2024, 7, 9, 8);
    } else if (currEvent.date.includes("Sep 11")) {
      eventDate = new Date(2024, 8, 11, 20, 30);
    } else if (currEvent.date.includes("Sep 23")) {
      eventDate = new Date(2024, 8, 23, 16);
    }

    const eventMilliSec = eventDate!.getTime();

    const todayDate = new Date();
    const todayMilliSec = todayDate.getTime();

    const milliSecDifference = eventMilliSec - todayMilliSec;
    const days = Math.floor(milliSecDifference / oneDay);
    const hours = Math.floor((milliSecDifference % oneDay) / oneHour);
    const mins = Math.floor((milliSecDifference % oneHour) / oneMin);
    const secs = Math.floor((milliSecDifference % oneMin) / oneSec);

    setDate((prev) => {
      return {
        ...prev,
        days: days,
        hours: hours,
        minutes: mins,
        seconds: secs,
      };
    });
  };

  const displaySeat = () => {
    const arr: number[] = [];
    for (let i = 0; i < currEvent.maxTickets; i++) {
      arr.push(i + 1);
    }
    setSeatArray(arr);
  };

  const allNonZero =
    date.days !== 0 &&
    date.hours !== 0 &&
    date.minutes !== 0 &&
    date.seconds !== 0;

  return (
    <div className="top-1/2 left-1/2 absolute -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b to-cyan-300 z-30 p-3 from-sky-50 flex flex-col gap-y-16 w-[85%] md:w-1/2">
      <div className="flex justify-between items-center font-bold text-2xl">
        <h1 className="">{currEvent.name}</h1>
        <button
          onClick={() => setToggleSeat(false)}
          className=" text-red-600 font-semibold"
        >
          <MdClose />
        </button>
      </div>

      {!allNonZero ? (
        <div>Event already happened!</div>
      ) : (
        <div>
          <h2 className="font-semibold">COUNTDOWN ⏳⏳⏳</h2>
          <div className="flex justify-between">
            <div className="flex flex-col items-start tracking-normal md:tracking-tighter">
              <h5>{date.days > 1 ? "Days" : "Day"}</h5>
              <p>{date.days < 10 ? "0" + date.days.toString() : date.days}</p>
            </div>
            <div className="flex flex-col items-start tracking-tighter">
              <h5>{date.hours > 1 ? "Hours" : "Hour"}</h5>
              <p>{date.hours < 10 ? "0" + date.hours : date.hours}</p>
            </div>
            <div className="flex flex-col items-start tracking-tighter">
              <h5>{date.minutes > 1 ? "Mins" : "Mins"}</h5>
              <p>{date.minutes < 10 ? "0" + date.minutes : date.minutes}</p>
            </div>
            <div className="flex flex-col items-start tracking-tighter">
              <h5>{date.seconds > 1 ? "Secs" : "Sec"}</h5>
              <p>{date.seconds < 10 ? "0" + date.seconds : date.seconds}</p>
            </div>
          </div>
        </div>
      )}

      {allNonZero ? (
        <div>
          <p className="italic font-semibold">
            First 5 seats are frontrow...😎
          </p>

          <div
            className={`grid ${
              seatArray.length >= 50 ? "grid-cols-8" : "grid-cols-4"
            } gap-y-2`}
          >
            {seatArray.map((seat, index) => {
              return (
                <Seat
                  key={index}
                  seat={seat}
                  ticketsPlug={ticketsPlug}
                  signer={signer}
                  currEvent={currEvent}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div>DONE</div>
      )}
    </div>
  );
}
