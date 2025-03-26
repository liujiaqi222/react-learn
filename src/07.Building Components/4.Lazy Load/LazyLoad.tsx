import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";

type LazyLoadProps = {
  className?: string;
  style?: CSSProperties;
  placeholder?: ReactNode;
  offset?: string | number;
  width?: number | string;
  height?: string | number;
  onContentVisible?: () => void;
  children: ReactNode;
};

const LazyLoad = (props: LazyLoadProps) => {
  const { className = "", style, offset = 0, width, onContentVisible, placeholder, height, children } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const elementObserver = useRef<IntersectionObserver>(null);
  const styles = { height, width, ...style };

  function lazyLoadHandler(entries: IntersectionObserverEntry[]) {
    console.log(entries);
    // 当 isIntersecting 为 true 的时候，就是从不相交到相交
    if (entries[0].isIntersecting) {
      setVisible(true);
      onContentVisible?.(); //设置 visible 为 true，回调 onContentVisible，然后去掉监听
      const node = containerRef.current;
      if (node && node instanceof HTMLElement) {
        elementObserver.current?.unobserve(node);
      }
    }
  }

  useEffect(() => {
    elementObserver.current = new IntersectionObserver(lazyLoadHandler, {
      threshold: 0,
      rootMargin: typeof offset === "number" ? `${offset}px` : offset || "0px",
    });
    const node = containerRef.current;
    if (node instanceof HTMLElement) {
      elementObserver.current.observe(node);
    }
    return () => {
      if (node && node instanceof HTMLElement) {
        elementObserver.current?.unobserve(node);
        elementObserver.current?.disconnect();
      }
    };
  }, [offset]);

  return (
    <div ref={containerRef} className={className} style={styles}>
      {visible ? children : placeholder}
    </div>
  );
};

export default LazyLoad;
