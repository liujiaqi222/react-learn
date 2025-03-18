import { useContext } from "react";
import { Dayjs } from "dayjs";
import type { CalendarProps } from "../Calendar";
import { cs, DaysInfo, getAllDays } from "../utils";
import LocaleContext from "../context/LocaleContext";
import locales from "../locale";

interface MonthCalendarProps extends CalendarProps {
  selectHandler?: (date: Dayjs) => void;
  curMonth: Dayjs;
}

function renderDays(
  days: DaysInfo,
  dateRender: MonthCalendarProps["dateRender"],
  dateInnerContent: MonthCalendarProps["dateInnerContent"],
  value: Dayjs,
  selectHandler: MonthCalendarProps["selectHandler"]
) {
  return Array.from({ length: 6 }).map((_, i) => (
    <div className="h-24 flex" key={i}>
      {Array.from({ length: 7 }).map((_, j) => {
        const item = days[i * 7 + j];
        return (
          <div
            className={cs(
              "flex-1 border border-gray-200 cursor-pointer",
              item.currentMonth ? "text-black" : "text-gray-400"
            )}
            key={j}
            onClick={() => selectHandler?.(item.date)}
          >
            {dateRender ? (
              dateRender(item.date)
            ) : (
              <div className="p-2">
                <div
                  className={cs({
                    "bg-blue-500 w-7 h-7 leading-7 text-center text-white rounded-full":
                      value.format("YYYY-MM-DD") === item.date.format("YYYY-MM-DD"),
                  })}
                >
                  {item.date.date()}
                </div>
                <div>{dateInnerContent?.(item.date)}</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  ));
}

function MonthCalendar(props: MonthCalendarProps) {
  const { value, curMonth, dateRender, dateInnerContent, selectHandler } = props;
  const weekList = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

  const localeContext = useContext(LocaleContext);
  const CalendarLocale = locales[localeContext.locale];

  const allDays = getAllDays(curMonth);
  return (
    <div>
      <div className="flex border-b w-full">
        {weekList.map((week) => (
          <div className="flex-1 text-left px-5 py-4 text-gray-500" key={week}>
            {CalendarLocale.week[week]}
          </div>
        ))}
      </div>
      <div>{renderDays(allDays, dateRender, dateInnerContent, value, selectHandler)}</div>
    </div>
  );
}

export default MonthCalendar;
