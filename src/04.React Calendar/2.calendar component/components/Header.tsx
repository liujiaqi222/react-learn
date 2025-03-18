import { Dayjs } from "dayjs";
import { useContext } from "react";
import LocaleContext from "../context/LocaleContext";
import locales from "../locale";

type HeaderProps = {
  curMonth: Dayjs;
  preMonthHandler: () => void;
  nextMonthHandler: () => void;
  todayHandler: () => void;
};

const Header = (props: HeaderProps) => {
  const { curMonth, preMonthHandler, nextMonthHandler, todayHandler } = props;
  const iconStyle = "w-7 h-7 leading-7 text-center rounded-full text-xs cursor-pointer hover:bg-gray-300";
  const localeContext = useContext(LocaleContext);
  const CalendarContext = locales[localeContext.locale];
  return (
    <div className="flex items-center gap-1 h-7 leading-7">
      <div className={iconStyle} onClick={preMonthHandler}>
        &lt;
      </div>
      <div className="text-lg">{curMonth.format(CalendarContext.formatMonth)}</div>
      <div className={iconStyle} onClick={nextMonthHandler}>
        &gt;
      </div>
      <div className="bg-gray-100 cursor-pointer border-0 px-4 leading-7 hover:bg-gray-300" onClick={todayHandler}>
        {CalendarContext.today}
      </div>
    </div>
  );
};

export default Header;
