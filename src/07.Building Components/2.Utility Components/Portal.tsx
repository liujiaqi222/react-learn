import { PropsWithChildren, } from "react";
import { createPortal } from "react-dom";

type PortalProps = {
  attach?: HTMLElement | string;
};

const getAttach = (attach: PortalProps["attach"]) => {
  if (typeof attach === "string") return document.querySelector(attach) ?? document.body;
  if (typeof attach === "object" && attach instanceof window.HTMLElement) return attach;
  return document.body;
};

const Portal = (props: PropsWithChildren<PortalProps>) => {
  const { attach = document.body, children } = props;
  return createPortal(children, getAttach(attach));
};

const PortalTest = () => {
  
  return <Portal attach='body'>
    <button>hello world</button>
  </Portal>
}

export default PortalTest;
