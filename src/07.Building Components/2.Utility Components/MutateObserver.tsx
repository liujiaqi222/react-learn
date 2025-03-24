import { cloneElement,  ReactElement, useLayoutEffect, useRef, useState } from "react";
import useMutateObserver from "./useMutateObserver";

type MutationObserverProps<T extends HTMLElement = HTMLElement> = {
  options?: MutationObserverInit;
  onMutate?: (mutations: MutationRecord[], observer: MutationObserver) => void;
  children: ReactElement<{ ref?: React.Ref<T> }>;
};

const MutateObserver = <T extends HTMLElement = HTMLElement>(
  props: MutationObserverProps<T>
) => {
  const { options, onMutate = () => {}, children } = props;
  const elementRef = useRef<T>(null);

  const [target, setTarget] = useState<T>();
  useMutateObserver(target!, onMutate, options);
  //在 useLayoutEffect 里拿到 ref 通过 setState 触发更新。
  useLayoutEffect(() => {
    if (elementRef.current) {
      setTarget(elementRef.current);
    }
  }, []);

  if (!children) return null;
  //通过 React.cloneElement 给 children 加上 ref 来获取 dom 节点。
  return cloneElement(children, { ref: elementRef });
};

export default MutateObserver;
