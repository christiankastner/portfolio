import { FC, useEffect, useRef } from 'react';
import tw from 'twin.macro';
import { AnimationOptionsWithOverrides, animate } from 'motion';

export type LoaderProps = {
  loaded: boolean;
};

const LOADER_ANIMATION = {
  duration: 1,
  easing: [0.165, 0.84, 0.44, 1],
} as AnimationOptionsWithOverrides;

/**
 *
 */
export const Loader: FC<LoaderProps> = ({ loaded }) => {
  const ref = useRef<HTMLDivElement>(null);
  const targetDiv = document.querySelector('.hero-canvas');

  useEffect(() => {
    if (loaded) {
      if (targetDiv && ref.current) {
        const { height, width, top, left } = targetDiv?.getBoundingClientRect();
        console.log(typeof left);
        animate(
          ref.current,
          {
            y: `${top}px`,
            x: `${left}px`,
            width: `${width}px`,
            height: `${height}px`,
            opacity: 0,
          },
          {
            ...LOADER_ANIMATION,
            opacity: {
              duration: 0.5,
              delay: 1,
              easing: 'ease-in-out',
            },
          },
        );
      }
    }
  }, [loaded]);

  return (
    <div
      ref={ref}
      css={tw`absolute top-0 left-0 h-[100vh] w-[100vw] bg-[rgb(100,100,100)] z-[10]`}
    ></div>
  );
};
