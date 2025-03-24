import { useEffect } from "react";

const defaultOptions: MutationObserverInit = {
  subtree: true,
  childList: true,
  attributeFilter: ["style", "class"],
};


const useMutateObserver = (
  nodeOrList: HTMLElement | HTMLElement[],
  callback: MutationCallback,
  options: MutationObserverInit = defaultOptions
) => {
  useEffect(() => {
    if (!nodeOrList) return
    
    let instance: MutationObserver;

    const nodeList = Array.isArray(nodeOrList) ? nodeOrList : [nodeOrList]
    if ('MutationObserver' in window) {
      instance = new MutationObserver(callback)
      nodeList.forEach(ele=>instance.observe(ele,options))
    }

    return () => {
      instance?.takeRecords()
      instance?.disconnect()

    }
  },[options,nodeOrList])
};

export default useMutateObserver;