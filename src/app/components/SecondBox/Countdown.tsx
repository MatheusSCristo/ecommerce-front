"use client";
import React, { useEffect, useState } from "react";

const Countdown = () => {
  const [day, setDay] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const datas = [
    { unit: day, text: "dias" },
    { unit: hours, text: "horas" },
    { unit: minutes, text: "minutos" },
  ];

  const countingTime = () => {
    const currentMinutes = minutes;
    const currentHours = hours;
    if (currentMinutes > 0) {
      setMinutes((prevState) => prevState - 1);
    } else {
      if (currentHours > 0) {
        setHours((prevState) => prevState - 1);
        setMinutes(59);
      } else {
        setHours(23);
        setMinutes(59);
        setDay((prevState) => prevState - 1);
      }
    }
  };

  useEffect(() => {
    const timer = setInterval(countingTime, 60000);
    return () => clearInterval(timer);
  }, [minutes]);

  const getRandomDate = () => {
    const date = new Date();
    date.setTime(date.getTime() + (Math.random() * 8 + 2) * 24 * 3600 * 1000);
    const timeLeft = date.getTime() - Date.now();
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft - days * 86400000) / 3600000);
    const minutes = Math.floor(
      (timeLeft - days * 86400000 - hours * 3600000) / (1000 * 60)
    );
    setDay(days);
    setHours(hours);
    setMinutes(minutes);
  };
  useEffect(() => getRandomDate(), []);

  return (
    <div className="flex gap-2 justify-center">
      {datas.map((data) => (
        <div
          className="bg-gray-500 flex flex-col justify-center items-center px-2 py-1 md:p-2 rounded-lg"
          key={data.text}
        >
          <span className="text-xl text-white">{data.unit}</span>
          <span className="text-xl text-white capitalize">{data.text}</span>
        </div>
      ))}
    </div>
  );
};
export default Countdown;
