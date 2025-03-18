import dayjs, { Dayjs } from "dayjs";
import MonthCalendar from "./components/MonthCalendar";
import Header from "./components/Header";
import { CSSProperties, ReactNode, useState } from "react";
import { cs } from "./utils";
import LocaleContext from "./context/LocaleContext";

export type CalendarProps = {
  value: Dayjs;
  style?: CSSProperties; //用于修改 Calendar 组件外层容器的样式
  className?: string | string[];
  // 定制日期显示，会完全覆盖日期单元格
  dateRender?: (currentDate: Dayjs) => ReactNode;
  // 定制日期单元格，内容会被添加到单元格内，只在全屏日历模式下生效。
  dateInnerContent?: (currentDate: Dayjs) => ReactNode;
  // 国际化相关
  locale?: "zh-CN" | "en-US";
  onChange?: (date: Dayjs) => void;
};

const Calendar = (props: CalendarProps) => {
  const { value, style, className, locale: propLocale = navigator.language, onChange } = props;
  const locale = propLocale === "zh-CN" || propLocale === "en-US" ? propLocale : "en-US";
  const [curValue, setCurValue] = useState<Dayjs>(value);
  const [curMonth, setCurMonth] = useState<Dayjs>(value);
  const changeDate = (date: Dayjs) => {
    setCurValue(date);
    onChange?.(date);
    setCurMonth(date);
  };
  const selectHandler = (date: Dayjs) => {
    changeDate(date);
  };

  const preMonthHandler = () => {
    setCurMonth(curMonth.subtract(1, "month"));
  };
  const nextMonthHandler = () => {
    setCurMonth(curMonth.add(1, "month"));
  };

  const todayHandler = () => {
    const date = dayjs(Date.now());
    changeDate(date);
  };

  return (
    <LocaleContext.Provider value={{ locale: locale }}>
      <div className={cs("width-full p-4", className)} style={style}>
        <Header
          curMonth={curMonth}
          preMonthHandler={preMonthHandler}
          nextMonthHandler={nextMonthHandler}
          todayHandler={todayHandler}
        />
        <MonthCalendar {...props} value={curValue} curMonth={curMonth} selectHandler={selectHandler} />
      </div>
    </LocaleContext.Provider>
  );
};

export default function App() {
  return (
    <div>
      <Calendar value={dayjs(Date.now())}></Calendar>
    </div>
  );
}
