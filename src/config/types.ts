import { Theme } from '@emotion/react';
import { CSSInterpolation, CSSObject } from '@emotion/serialize';
import { StyledComponent } from '@emotion/styled';
import {
  DetailedHTMLProps,
  ElementType,
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from 'react';

/** Y'all: convenience alias for customCss props */
export type TwinCSS = CSSInterpolation;

/** Y'all: convenience alias for a custom `style` prop that will be used in twin css */
export type TwinStyleObject = CSSObject;

/** Y'all: convenience alias for a styled.div, or you can pass in an element type */
export type TwinStyledComponent<T = HTMLDivElement> = StyledComponent<
  {
    theme?: Theme | undefined;
    as?: ElementType<T> | undefined;
  },
  DetailedHTMLProps<HTMLAttributes<T>, T>,
  {}
>;

/**
 * Component accepts `customCss` in any Twin format (css, tw, style object, array)
 */
export type CustomCssProps = {
  customCss?: TwinCSS;
};

/** Component has one or more children and `customCss` */
export type ChildrenAndCustomCssProps = CustomCssProps & {
  children: ReactNode;
};

/** Component has one or more children */
export type ChildrenProps = {
  children: ReactNode;
};

/** Component children must be exactly one element */
export type OneChildProps = {
  children: ReactElement;
};

/** Component optionally accepts children */
export type OptionalChildrenProps = {
  children?: ReactNode;
};
