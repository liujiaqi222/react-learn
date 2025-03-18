import { useEffect, useImperativeHandle, useRef, useState } from "react";
import type { ForwardedRef } from "react";
import "./calendar.css";

type CalendarMethods = {
  getDate: () => Date;
  setDate: (date: Date) => void;
};

type CalendarProps = {
  defaultValue: Date;
  onChange?: (date: Date) => void;
  ref: ForwardedRef<CalendarMethods>;
};


const daysOfMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

// 每月第一天是周几
const firstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};


function Calendar({ defaultValue, onChange, ref }: CalendarProps) {
  const [date, setDate] = useState(defaultValue);
  useImperativeHandle(ref, () => {
    return {
      getDate() {
        return date;
      },
      setDate(date) {
        setDate(date);
      },
    };
  });
  const handlePrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };
  const renderDates = () => {
    const days = [];
    const daysCount = daysOfMonth(date.getFullYear(), date.getMonth());
    const firstDay = firstDayOfMonth(date.getFullYear(), date.getMonth());

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="empty"></div>);
    }
    const clickHandler = (index: number) => {
      const curDate = new Date(date.getFullYear(), date.getMonth(), index);
      setDate(curDate);
      onChange?.(curDate);
    };
    for (let i = 1; i <= daysCount; i++) {
      days.push(
        <div key={i} className={i === date.getDate() ? "day selected" : "day"} onClick={() => clickHandler(i)}>
          {i}
        </div>
      );
    }

    return days;
  };
  const monthNames = [
    "一月",
    "二月",
    "三月",
    "四月",
    "五月",
    "六月",
    "七月",
    "八月",
    "九月",
    "十月",
    "十一月",
    "十二月",
  ];
  const handleNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };
  return (
    <div className="calendar">
      <div className="header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <div>
          {date.getFullYear()} 年 {monthNames[date.getMonth()]}{" "}
        </div>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="days">
        <div className="day">日</div>
        <div className="day">一</div>
        <div className="day">二</div>
        <div className="day">三</div>
        <div className="day">四</div>
        <div className="day">五</div>
        <div className="day">六</div>
        {renderDates()}
      </div>
    </div>
  );
}

function App() {
  const calendarRef = useRef<CalendarMethods>(null);
  useEffect(() => {
    console.log(calendarRef.current?.getDate().toLocaleDateString(),'hello');

    setTimeout(() => {
      calendarRef.current?.setDate(new Date(2024, 3, 1));
    }, 3000);
  }, []);
  return <Calendar ref={calendarRef} defaultValue={new Date("2024-8-15")}></Calendar>;
}

export default App;
