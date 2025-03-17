import { useEffect, useRef, useState } from "react";
import { isEqual } from "lodash";

type Options<T> = {
  value?: T;
  defaultValue?: T;
  onChange?: (data: T) => void;
};
export function useMergeState<T>(options: Options<T>) {
  const { defaultValue, value: propValue, onChange } = options || {};

  const [internalValue, setInternalValue] = useState<T | undefined>(propValue ?? defaultValue);
  const mergedValue = propValue ?? internalValue;
  const mergedValueRef = useRef<T | undefined>(mergedValue);
  mergedValueRef.current = mergedValue; 

  useEffect(() => {
    mergedValueRef.current = mergedValue;
  }, [mergedValue]);
  // 同步受控模式的外部值变化
  useEffect(() => {
    if (propValue === undefined) return;
    setInternalValue((prev) => {
      // 值未变化时返回 prev 以跳过渲染
      return isEqual(prev, propValue) ? prev : propValue;
    });
  }, [propValue]);

  const updateValue = (newValue: T) => {
    if (isEqual(mergedValueRef.current, newValue)) return;

    if (propValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };
  return [mergedValue, updateValue] as const;
}
