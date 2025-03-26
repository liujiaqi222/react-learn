import { merge } from "lodash";
import { WaterMarkProps } from "../WaterMark";
import { useEffect, useRef, useState } from "react";

const defaultOptions = {
  rotate: -20,
  zIndex: 1,
  width: 100,
  gap: [100, 100],
  fontStyle: {
    fontSize: "16px",
    color: "rgba(0, 0, 0, 0.15)",
    fontFamily: "sans-serif",
    fontWeight: "normal",
  },
  getContainer: () => document.body,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isNumber(obj: any): obj is number {
  return Object.prototype.toString.call(obj) === "[object Number]" && obj === obj;
}

//toNumber 会把第一个参数转为 number，如果不是数字的话就返回第二个参数的默认值：
const toNumber = (value?: string | number, defaultValue?: number) => {
  if (value == null) return defaultValue;
  if (isNumber(value)) return value;
  const numberVal = parseFloat(value);
  return isNumber(numberVal) ? numberVal : defaultValue;
};

const getMergedOptions = (o: Partial<WaterMarkOptions>) => {
  const options = o || {};
  const mergedOptions = {
    ...options,
    rotate: options.rotate || defaultOptions.rotate,
    zIndex: options.zIndex || defaultOptions.zIndex,
    fontStyle: { ...defaultOptions.fontStyle, ...options.fontStyle },
    width: toNumber(options.width, options.image ? defaultOptions.width : undefined),
    height: toNumber(options.height, undefined),
    gap: [
      toNumber(options.gap?.[0], defaultOptions.gap[0])!,
      toNumber(options.gap?.[1] || options.gap?.[0], defaultOptions.gap[1])!,
    ],
  } as Required<WaterMarkOptions>;

  const mergedOffsetX = toNumber(mergedOptions.offset?.[0], 0)!;
  const mergedOffsetY = toNumber(mergedOptions.offset?.[1] || mergedOptions.offset?.[0], 0)!;
  mergedOptions.offset = [mergedOffsetX, mergedOffsetY];

  return mergedOptions;
};

const measureTextSize = (ctx: CanvasRenderingContext2D, content: string[], rotate: number) => {
  let width = 0;
  let height = 0;
  const lineSize: { width: number; height: number }[] = [];
  content.forEach((item) => {
    // fontBoundingAscent 是 baseline 到顶部的距离，而 fontBoundingBoxDescent 是到底部的距离：
    const { width: textWidth, fontBoundingBoxAscent, fontBoundingBoxDescent } = ctx.measureText(item);
    const textHeight = fontBoundingBoxAscent + fontBoundingBoxDescent;
    if (textWidth > width) {
      width = textWidth;
    }
    height += textHeight;
    lineSize.push({ height: textHeight, width: textWidth });
  });
  const angle = (rotate * Math.PI) / 180;
  return {
    originWidth: width,
    originHeight: height,
    width: Math.ceil(Math.abs(Math.sin(angle) * height) + Math.abs(Math.cos(angle) * width)),
    height: Math.ceil(Math.abs(Math.sin(angle) * width) + Math.abs(height * Math.cos(angle))),
    lineSize,
  };
};

const getCanvasData = async (
  options: Required<WaterMarkOptions>
): Promise<{ width: number; height: number; base64Url: string }> => {
  const { rotate, image, content, fontStyle, gap } = options;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  const ratio = window.devicePixelRatio;
  const configCanvas = (size: { width: number; height: number }) => {
    const canvasWidth = gap[0] + size.width;
    const canvasHeight = gap[1] + size.height;
    //不同屏幕的设备像素比不一样，也就是 1px 对应的物理像素不一样，所以要在单位后面乘以 devicePixelRatio
    canvas.setAttribute("width", `${canvasWidth * ratio}px`);
    canvas.setAttribute("height", `${canvasHeight * ratio}px`);
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;
    // 用 translate 移动中心点到 宽高的一半的位置再 scale、rotate。
    ctx?.translate((canvasWidth * ratio) / 2, (canvasHeight * ratio) / 2);
    ctx?.scale(ratio, ratio);
    ctx?.rotate((rotate * Math.PI) / 180);
  };
  const drawText = () => {
    const { fontSize, color, fontWeight, fontFamily } = fontStyle;

    const realFontSize = toNumber(fontSize, 0) || defaultOptions.fontStyle.fontSize;
    ctx.font = `${fontWeight} ${realFontSize}px ${fontFamily}`;
    const measureSize = measureTextSize(ctx, [...content], rotate);

    const width = options.width || measureSize.width;
    const height = options.height || measureSize.height;

    configCanvas({ width, height });

    ctx.fillStyle = color!;
    ctx.font = `${fontWeight} ${realFontSize}px ${fontFamily}`;
    ctx.textBaseline = "top"; //设置 textBaseline 为 top，顶部对齐
    [...content].forEach((item, index) => {
      const { height: lineHeight, width: lineWidth } = measureSize.lineSize[index];

      const xStartPoint = -lineWidth / 2;
      const yStartPoint = -(options.height || measureSize.originHeight) / 2 + lineHeight * index;
      ctx.fillText(item, xStartPoint, yStartPoint, options.width || measureSize.originWidth);
    });
    return Promise.resolve({ base64Url: canvas.toDataURL(), height, width });
  };
  const drawImage = () => {
    return new Promise<{ width: number; height: number; base64Url: string }>((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous"; //跨域的时候不携带 cookie
      img.referrerPolicy = "no-referer"; // refererPolicy 设置 no-referrer 是不携带 referer
      img.src = image;
      img.onload = () => {
        let { width, height } = options;
        if (!width || !height) {
          if (width) {
            height = (img.height / img.height) * +width;
          } else {
            width = (img.width / img.height) * +height;
          }
        }
        configCanvas({ width, height });
        ctx.drawImage(img, -width / 2, -height / 2, width, height);
        return resolve({ base64Url: canvas.toDataURL(), width, height });
      };

      img.onerror = () => {
        return drawText();
      };
    });
  };
  return image ? drawImage() : drawText();
};

export type WaterMarkOptions = Omit<WaterMarkProps, "className" | "style" | "children">;
export default function useWaterMark(params: WaterMarkOptions) {
  const [options, setOptions] = useState(params || {});
  const watermarkDiv = useRef<HTMLDivElement>(null);
  const mutationObserver = useRef<MutationObserver>(null);
  const mergedOptions = getMergedOptions(options);
  const container = mergedOptions.getContainer?.();
  const { zIndex, gap } = mergedOptions;
  function drawWatermark() {
    if (!container) return;
    getCanvasData(mergedOptions).then(({ base64Url, width, height }) => {
      const offsetLeft = mergedOptions.offset[0] + "px";
      const offsetTop = mergedOptions.offset[1] + "px";
      const wmStyle = `
      width:100%;
      height:100%;
      position:absolute;
      top:${offsetTop};
      left:${offsetLeft};
      bottom:0;
      right:0;
      pointer-events: none;
      z-index:${zIndex};
      background-position: 0 0;
      background-size:${gap[0] + width}px ${gap[1] + height}px;
      background-repeat: repeat;
      background-image:url(${base64Url})`;

      if (!watermarkDiv.current) {
        const div = document.createElement("div");
        watermarkDiv.current = div;
        container.append(div);
        container.style.position = "relative";
      }

      watermarkDiv.current?.setAttribute("style", wmStyle.trim());

      mutationObserver.current?.disconnect();
      mutationObserver.current = new MutationObserver((mutations) => {
        console.log(mutations)
        const isChanged = mutations.some((mutation) => {
          let flag = false;
          if (mutation.removedNodes.length) {
            // 判断删除的是否是waterMarkDiv
            flag = Array.from(mutation.removedNodes).some((node) => node === watermarkDiv.current);
          }
          // 改的是waterMark的属性
          if (mutation.type === "attributes" && mutation.target === watermarkDiv.current) {
            flag = true;
          }
          return flag;
        });
        if (isChanged) {
          watermarkDiv.current = null;
          drawWatermark();
        }
      });
      mutationObserver.current.observe(container, {
        attributes: true,
        subtree: true,
        childList: true,
      });
    });
  }
  useEffect(() => {
    drawWatermark();
  }, [options]);

  return {
    generateWaterMark: (newOptions: Partial<WaterMarkOptions>) => {
      setOptions(merge({}, options, newOptions));
    },
    destroy: () => {},
  };
}
