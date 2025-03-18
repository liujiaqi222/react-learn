import { Dayjs } from "dayjs";
import classNames from "classnames";
export const cs = classNames;
export type DaysInfo = { date: Dayjs; currentMonth: boolean }[];

/**
   默认是 周日 周一 ... 周六 即 0 1 2 3 4 5 6
   想要改成 周一 周二 ... 周日
   相当于把周一往前移动一天，所以把此处的startDay进行减一即可
   但假设startDay是周日则返回0，减去1得-1，在for循环中，i永远小于startDay，会导致逻辑错误
   所以减一后加上7，再对7取余，就能将周日从0变成6
   原startDay=0 → (0-1 +7)=6 → 6
   原startDay=1 → 0
   原startDay=2 →1
   ...
   原startDay=6 →5
*/
export function getAllDays(date: Dayjs) {
  const startDate = date.startOf("month");
  const startDay = (startDate.day() - 1 + 7) % 7; // 这个月第一天是周几
  const daysInfo: DaysInfo = new Array(6 * 7); // 永远展示42个日期
  for (let i = 0; i < daysInfo.length; i++) {
    // 这个月第一天之前的用第一天的日期 -1、-2、-3 这样计算出来
    if (i < startDay) {
      daysInfo[i] = {
        date: startDate.subtract(startDay - i, "day"),
        currentMonth: false,
      };
    } else {
      const calcDate = startDate.add(i - startDay, "day");
      daysInfo[i] = {
        date: calcDate,
        currentMonth: calcDate.month() === date.month(),
      };
    }
  }
  return daysInfo;
}
