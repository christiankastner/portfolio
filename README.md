# React Three Fiber starter

## How to implement keyboard / GamePad controls

The Yallzilla demo branch implements this and can be followed.

To make it easy to get references to those files while working in another branch, temporarily check out yallzilla and then copy the contents of these files into new blank files:

- Scene.tsx
- Yallzilla.tsx

Cut your demo's branch from the branch starter/fiber, which includes all the necessary hooks, components and consts for the system.

To implement, you can flexibly migrate the following bits from Yallzilla's
files:

### Scene:

- migrate and set `inputAxis` and `hasMainAction` consts for your demo. It's handy to keep these inside the Scene function body for hot reload on change.
- for keyboard support, copy the `useKeyInputRelay` hook instance
- for `GamePad` support copy the `GamePad` component in the scene
- if you want to be able to toggle the `GamePad` on desktop, follow the example that adds `useKeyControls(topLevelKeyHandlers, !isMobile);` which sets the `showButtonsDesk` state (and `_showButtonsDesk` ref) on toggle. The state is also passed into `GamePad` as a prop.
- finally, copy and manually update the `customIntroText` in `DemoCanvas` props to tell the user what's going on

### Game Characters / Components that listen for events:

- from your copy of the Yallzilla file, look at how `useInputEvents` is implemented.
- In short, many different types of inputs are translated into standardized 'Start/End' events, like `rightStart`.

### Limitations:

- Currently 45 angles are supported as combinations of cardinal directions, not separate events
- "circle" and "circleTop" axes are supported which include 45 angles, but "cross" and "crossTop" (cardinals only) are not yet. That will require tracking key-down and canceling existing states on each new press.
