import copy from "copy-to-clipboard";
import { Children, cloneElement, ReactElement } from "react";

type CopyToClipboardProps = {
  text: string;
  onCopy?: (text: string, result: boolean) => void;
  children: ReactElement<{ onClick: (e: MouseEvent) => void }>;
  options?: {
    debug?: boolean;
    message?: string;
    format?: string;
  };
};
const CopyToClipboard = (props: CopyToClipboardProps) => {
  const { text, onCopy, children, options } = props;
  const elem = Children.only(children);
  function onClick(e: MouseEvent) {
    const elem = Children.only(children);
    const result = copy(text, options);
    if (onCopy) {
      onCopy(text, result);
    }
    if (typeof elem?.props?.onClick === "function") {
      elem.props.onClick(e);
    }
  }
  // 给children加上onClick事件
  return cloneElement(elem, { onClick });
};

export default function TestCopy() {
  return (
    <CopyToClipboard text="hello world" onCopy={(text, result) => console.log(text, result)}>
      <div onClick={(e) => console.log(e)}>复制</div>
    </CopyToClipboard>
  );
}
