import React from "react";
import { CesiumWidget as CesiumCesiumWidget } from "cesium";

import {
  createCesiumComponent,
  EventManager,
  eventManagerContextKey,
  RootEventProps,
  Context,
  PickCesiumProps,
  UnusedCesiumProps,
  AssertNever,
  Merge,
} from "../core";

/*
@summary
`CesiumWidget` is the simplest root component of resium. All components of resium except the root components have to be mounted inside it.

`Viewer` is also a root component. It is a component with some widgets (info box, timeline, and so on) added to `CesiumWidget`.
*/

/*
@example
<CesiumWidget full />
*/

/*
@scope
Everywhere. `CesiumWidget` is a root component. 
*/

type Target = Merge<
  CesiumCesiumWidget,
  NonNullable<ConstructorParameters<typeof CesiumCesiumWidget>[1]>
>;

export type CesiumWidgetCesiumProps = PickCesiumProps<CesiumCesiumWidget, typeof cesiumProps>;

export type CesiumWidgetCesiumReadonlyProps = PickCesiumProps<Target, typeof cesiumReadonlyProps>;

export type CesiumWidgetOtherProps = RootEventProps & {
  /** Applied to outer `div` element */
  className?: string;
  /** Applied to outer `div` element */
  id?: string;
  /** Applied to outer `div` element */
  style?: React.CSSProperties;
  /** Same as `style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}` if it is true. */
  full?: boolean;
  /** All props applied to outer `div` element */
  containerProps?: any;
  children?: React.ReactNode;
};

const cesiumProps = [
  "resolutionScale",
  "useDefaultRenderLoop",
  "targetFrameRate",
  "useBrowserRecommendedResolution",
] as const;

const cesiumReadonlyProps = [
  "clock",
  "imageryProvider",
  "terrainProvider",
  "skyBox",
  "skyAtmosphere",
  "sceneMode",
  "scene3DOnly",
  "orderIndependentTranslucency",
  "mapMode2D",
  "mapProjection",
  "globe",
  "showRenderLoopErrors",
  "contextOptions",
  "creditContainer",
  "creditViewport",
  "terrainExaggeration",
  "shadows",
  "terrainShadows",
  "requestRenderMode",
  "maximumRenderTimeChange",
] as const;

export type CesiumWidgetProps = CesiumWidgetCesiumProps &
  CesiumWidgetCesiumReadonlyProps &
  CesiumWidgetOtherProps;

const CesiumWidget = createCesiumComponent<
  CesiumCesiumWidget,
  CesiumWidgetProps,
  Context,
  Context,
  EventManager
>({
  name: "CesiumWidget",
  create(_context, props, container) {
    if (!container) return;
    const v = new CesiumCesiumWidget(container, props);
    if (!v) return;

    if (typeof props.resolutionScale === "number") {
      v.resolutionScale = props.resolutionScale;
    }

    // common event manager for managing events of Entity and Primitives
    const eventManager = new EventManager(v.scene);

    return [v, eventManager];
  },
  destroy(element, _context, _ref, state) {
    if (state && !state.isDestroyed()) {
      state.destroy();
    }
    if (!element.isDestroyed()) {
      element.destroy();
    }
  },
  provide(element, _props, state) {
    return {
      cesiumWidget: element,
      scene: element.scene,
      camera: element.scene.camera,
      imageryLayerCollection: element.scene.globe.imageryLayers,
      primitiveCollection: element.scene.primitives,
      globe: element.scene.globe,
      [eventManagerContextKey]: state,
    };
  },
  containerProps: ({ id, className, style, full, containerProps }) => ({
    className,
    id,
    style: {
      ...(full
        ? {
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            top: "0",
          }
        : {}),
      ...style,
    },
    ...containerProps,
  }),
  cesiumProps,
  cesiumReadonlyProps,
  renderContainer: true,
  useCommonEvent: true,
  useRootEvent: true,
});

export default CesiumWidget;

// Unused prop check
type IgnoredProps = never;
type UnusedProps = UnusedCesiumProps<Target, keyof CesiumWidgetProps>;
type AssertUnusedProps = AssertNever<Exclude<UnusedProps, IgnoredProps>>;
