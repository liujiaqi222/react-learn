import { CSSProperties, PropsWithChildren, useCallback, useEffect, useRef } from "react";
import useWaterMark from "./hooks/useWatermark";

export interface WaterMarkProps extends PropsWithChildren {
  style?: CSSProperties;
  className?: string;
  zIndex?: string | number;
  width?: number;
  height?: number;
  rotate?: number;
  image?: string;
  content?: string | string[];
  fontStyle?: {
    color?: string;
    fontFamily?: string;
    fontSize?: number | string;
    fontWeight?: number | string;
  };
  gap?: [number, number]; //gap 是两个水印之间的空白距离。
  offset?: [number, number];
  getContainer?: () => HTMLElement;
}

const WaterMark = (props: WaterMarkProps) => {
  const {
    className,
    style,
    getContainer: getContainerProp,
  } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const getContainer = useCallback(() => {
    return getContainerProp ? getContainerProp?.() : containerRef.current!;
  }, [getContainerProp]);
  const { generateWaterMark } = useWaterMark({ ...props, getContainer });

  useEffect(() => {
    generateWaterMark({
      ...props,
      getContainer,
    });
  }, [props, getContainer]);

  return props.children ? (
    <div className={className} style={style} ref={containerRef}>
      {props.children}
    </div>
  ) : null;
};

export default WaterMark;
