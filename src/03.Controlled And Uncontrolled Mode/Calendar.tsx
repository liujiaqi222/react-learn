import { useEffect, useState } from "react";


interface CalendarProps {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
  dates: Date[];
}

function Calendar(props: CalendarProps) {
  // 受控模式：父组件传入propsValue
  // 非受控模式：父组件传入defaultValue和onChange
  const { value: propsValue, defaultValue, onChange, dates } = props;

  // 初始化内部状态（非受控模式使用）
  const [internalValue, setInternalValue] = useState<Date | undefined>(propsValue ?? defaultValue);


  // 处理日期选择
  const changeValue = (date: Date) => {
    if (propsValue === undefined) {
      setInternalValue(date); // 仅非受控模式更新内部状态
    }
    onChange?.(date); 
  };

  // 最终显示值
  const mergedValue = propsValue ?? internalValue;

  return (
    <div>
      <div>当前选中：{mergedValue?.toLocaleDateString() || "未选择"}</div>
      {dates.map((date) => (
        <div key={date.toISOString()} onClick={() => changeValue(date)} style={{ cursor: "pointer", margin: "8px 0" }}>
          {date.toLocaleDateString()}
        </div>
      ))}
    </div>
  );
}

// export default function App() {
//   const dates = [new Date(2025, 4, 1), new Date(2025, 4, 2), new Date(2025, 4, 3)];

//   return (
//     <Calendar
//       dates={dates}
//       onChange={(date) => {
//         console.log(date);
//       }}
//       defaultValue={new Date(2025, 4, 1)}
//     />
//   );
// }

export default function App() {
  const dates = [new Date(2025, 4, 1), new Date(2025, 4, 2), new Date(2025, 4, 3)];

  const [date, setDate] = useState(new Date(2025, 4, 1));
  return (
    <Calendar
      dates={dates}
      value={date}
      onChange={(date) => {
        setDate(date);
      }}
    />
  );
}