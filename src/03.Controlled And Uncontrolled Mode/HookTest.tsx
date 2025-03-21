import { useMergeState } from "./useMergeState";

interface CalendarProps {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
  dates: Date[];
}

function Calendar(props: CalendarProps) {
  // 受控模式：父组件传入propsValue
  // 非受控模式：父组件传入defaultValue和onChange
  const { value, defaultValue, onChange, dates } = props;
  const [date, updateValue] = useMergeState({ value, defaultValue, onChange });
  return (
    <div>
      <div>当前选中：{date?.toLocaleDateString() || "未选择"}</div>
      {dates.map((date) => (
        <div key={date.toISOString()} onClick={() => updateValue(date)} >
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

  return (
    <Calendar
      dates={dates}
      onChange={(date) => {
        console.log(date);
      }}
      defaultValue={new Date(2025, 4, 1)}
    />
  );
}