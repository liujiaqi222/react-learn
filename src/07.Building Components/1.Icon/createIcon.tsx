import { forwardRef, ReactNode,  } from 'react'
import { Icon, IconProps } from '.'


type CreateIconOptions = {
  content: ReactNode;
  iconProps?: IconProps;
  viewBox?: string;
};

export const createIcon = (options: CreateIconOptions) => {
  const {content,iconProps={},viewBox='0 0 1024 1024'} = options
    return forwardRef<SVGSVGElement, IconProps>((props, ref) => {
      return (
        <Icon ref={ref} viewBox={viewBox} {...iconProps} {...props}>
          {content}
        </Icon>
      );
    });
}

