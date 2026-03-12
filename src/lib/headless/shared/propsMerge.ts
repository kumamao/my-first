/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from '$lib/utils';
import type { ClassValue } from 'svelte/elements';
import type { ComponentInstance } from './types';

type Props = {
  class?: ClassValue;
  style?: string; // | CSSStyleDeclaration;
  ref?: (ref?: Element | ComponentInstance | null) => void;
} & Partial<Record<`on${string}`, (...args: unknown[]) => void>>;

const style2object = (str: string) =>
  Object.fromEntries(
    str
      .split(';')
      .map((i) => i.trim())
      .filter((i) => i)
      .map((i) => i.split(':').map((j) => j.trim()))
  );
// TODO: 合并 style 对象（自定义覆盖默认）
// const mergeStyle = (defaultStyle, customStyle) => ({ ...defaultStyle, ...customStyle });

// 合并 style 字符串（转对象后再合并，避免重复）
const mergeStyleStr = (defaultStr: string = '', customStr: string = '') => {
  if (customStr) {
    const mergedObj = { ...style2object(defaultStr), ...style2object(customStr) };
    return Object.entries(mergedObj)
      .map(([k, v]) => `${k}: ${v}`)
      .join('; ');
  }
  return defaultStr;
};

// const styleMerge = (defaultStyle, customStyle) => {

// }

export const propsMerge = (defaultProps: Props | undefined = {}, customProps: Props) => {
  const className = cn(defaultProps.class, customProps.class);

  const mergeProps = {} as Props;

  if (customProps.style) {
    mergeProps.style = mergeStyleStr(defaultProps.style, customProps.style);
  }

  let events = {} as Record<`on${string}`, (...args: unknown[]) => void>;
  const eventEntries = Object.entries(customProps).filter(([key]) => key.startsWith('on')) as [
    `on${string}`,
    (...args: unknown[]) => void
  ][];
  if (eventEntries.length) {
    events = eventEntries.reduce((result, [name, handler]) => {
      result[name] = (event, ...args: unknown[]) => {
        defaultProps[name]?.(event, ...args);
        if (!(event as Event)?.defaultPrevented) {
          handler(event, ...args);
        }
      };
      return result;
    }, events);
  }

  if (customProps.ref) {
    mergeProps.ref = (ref) => {
      defaultProps.ref?.(ref);
      customProps.ref?.(ref);
    };
  }

  return { ...defaultProps, ...customProps, class: className, ...mergeProps, ...events };
};
