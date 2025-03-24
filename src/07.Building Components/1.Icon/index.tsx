import { CSSProperties, ForwardedRef, PropsWithChildren,  SVGAttributes } from "react";
import { cs } from "../../04.React Calendar/2.calendar component/utils";

type BaseIconProps = {
  className?: string;
  style?: CSSProperties;
  size?: string | string[];
  spin?: boolean;
};

//如果 BaseIconProps 中定义的属性（例如 size 或 color）与 SVGAttributes<SVGElement> 中的属性重名，TypeScript 会报错，因为同名属性可能有不同的类型或用途。
export type IconProps = BaseIconProps & Omit<SVGAttributes<SVGElement>, keyof BaseIconProps>;

export const getSize = (size: IconProps["size"]) => {
  if (Array.isArray(size) && size.length === 2) {
    return size as string[];
  }

  const width = (size as string) || "1em";
  const height = (size as string) || "1em";

  return [width, height];
};

export const Icon = (props: PropsWithChildren<IconProps & { ref: ForwardedRef<SVGSVGElement> }>) => {
  const { style, className, spin, size = "1em", children, ref, ...rest } = props;
  const [width, height] = getSize(size);

  return (
    <svg
      ref={ref}
      style={style}
      width={width}
      height={height}
      className={cs(className, { "animate-spin": spin })}
      fill="currentColor"
      {...rest}
    >
      {children}
    </svg>
  );
};
