import { EllipsoidGraphics as CesiumEllipsoidGraphics } from "cesium";

import createCesiumComponent, { EventkeyMap } from "../core/CesiumComponent";

/*
@summary
`EllipsoidGraphics` is a ellipsoid visualization for the entity.
*/

/*
@scope
EllipsoidGraphics is only inside [Entity](/components/Entity) components,
and can not be used more than once for each entity.
*/

export interface EllipsoidGraphicsCesiumProps {
  heightReference?: Cesium.Property | Cesium.HeightReference;
  radii?: Cesium.Property | Cesium.Cartesian3;
  show?: Cesium.Property | boolean;
  fill?: Cesium.Property | boolean;
  innerRadii?: Cesium.Property | Cesium.Cartesian3;
  material?: Cesium.MaterialProperty | Cesium.Color | string;
  maximumClock?: Cesium.Property | number;
  maximumCone?: Cesium.Property | number;
  minimumClock?: Cesium.Property | number;
  minimumCone?: Cesium.Property | number;
  outline?: Cesium.Property | boolean;
  outlineColor?: Cesium.Property | Cesium.Color;
  outlineWidth?: Cesium.Property | number;
  subdivisions?: Cesium.Property | number;
  stackPartitions?: Cesium.Property | number;
  slicePartitions?: Cesium.Property | number;
  shadows?: Cesium.Property | Cesium.ShadowMode;
  distanceDisplayCondition?: Cesium.Property | Cesium.DistanceDisplayCondition;
}

export interface EllipsoidGraphicsCesiumEvents {
  onDefinitionChange?: () => void;
}

export interface EllipsoidGraphicsProps
  extends EllipsoidGraphicsCesiumProps,
    EllipsoidGraphicsCesiumEvents {}

export interface EllipsoidGraphicsContext {
  entity?: Cesium.Entity;
}

const cesiumProps: (keyof EllipsoidGraphicsCesiumProps)[] = [
  "heightReference",
  "radii",
  "show",
  "fill",
  "innerRadii",
  "material",
  "maximumClock",
  "maximumCone",
  "minimumClock",
  "minimumCone",
  "outline",
  "outlineColor",
  "outlineWidth",
  "subdivisions",
  "stackPartitions",
  "slicePartitions",
  "shadows",
  "distanceDisplayCondition",
];

const cesiumEventProps: EventkeyMap<
  Cesium.EllipsoidGraphics,
  keyof EllipsoidGraphicsCesiumEvents
> = {
  definitionChanged: "onDefinitionChange",
};

const EllipsoidGraphics = createCesiumComponent<
  Cesium.EllipsoidGraphics,
  EllipsoidGraphicsProps,
  EllipsoidGraphicsContext
>({
  name: "EllipsoidGraphics",
  create(cprops) {
    return new CesiumEllipsoidGraphics(cprops as any);
  },
  mount(element, context) {
    if (context.entity) {
      context.entity.ellipsoid = element;
    }
  },
  unmount(element, context) {
    if (context.entity) {
      context.entity.ellipsoid = undefined as any;
    }
  },
  cesiumProps,
  cesiumEventProps,
});

export default EllipsoidGraphics;
