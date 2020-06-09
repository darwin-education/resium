import { createCesiumComponent, EventkeyMap } from "../core/component";
import {
  Globe as CesiumGlobe,
  Color,
  ClippingPlaneCollection,
  Material,
  ShadowMode,
  TerrainProvider,
  Scene,
} from "cesium";

/*
@summary
`Globe` can operate the globe of the scene.
All properties are applied to single globe of the scene.

**Note**: Following code is not recommended as occur extra rendering steps:

```
<Viewer>
  <Scene>
    <Globe>
      <Camera>
        <Entity />
      </Camera>
    </Globe>
  </Scene>
</Viewer>
```

`Globe` component's role is just changing fields of `Viewer#scene#globe`, so following code is recommended.

```
<Viewer>
  <Scene />
  <Globe />
  <Camera />
  <Entity />
</Viewer>
```

For details, refer to "Component location" chapter in [Guide](/guide).
*/

/*
@scope
Globe is available inside [Viewer](/components/Viewer) or [CesiumWidget](/components/CesiumWidget) components.
It can not be used more than once for each Viewer or CesiumWidget.
*/

export interface GlobeCesiumProps {
  atmosphereBrightnessShift?: number;
  atmosphereHueShift?: number;
  atmosphereSaturationShift?: number;
  backFaceCulling?: boolean;
  baseColor?: Color;
  clippingPlanes?: ClippingPlaneCollection;
  depthTestAgainstTerrain?: boolean;
  enableLighting?: boolean;
  lightingFadeInDistance?: number;
  lightingFadeOutDistance?: number;
  material?: Material;
  maximumScreenSpaceError?: number;
  nightFadeInDistance?: number;
  nightFadeOutDistance?: number;
  oceanNormalMapUrl?: string;
  shadows?: ShadowMode;
  show?: boolean;
  showGroundAtmosphere?: boolean;
  showWaterEffect?: boolean;
  terrainProvider?: TerrainProvider;
  tileCacheSize?: number;
}

export interface GlobeCesiumEvents {
  onImageryLayersUpdate?: () => void;
  onTerrainProviderChange?: (terrainProvider: TerrainProvider) => void;
  onTileLoadProgress?: (currentLoadQueueLength: number) => void;
}

const cesiumEventProps: EventkeyMap<CesiumGlobe, GlobeCesiumEvents> = {
  onImageryLayersUpdate: "imageryLayersUpdatedEvent",
  onTerrainProviderChange: "terrainProviderChanged",
  onTileLoadProgress: "tileLoadProgressEvent",
};

export interface GlobeProps extends GlobeCesiumProps, GlobeCesiumEvents {}

const cesiumProps: (keyof GlobeCesiumProps)[] = [
  "atmosphereBrightnessShift",
  "atmosphereHueShift",
  "atmosphereSaturationShift",
  "backFaceCulling",
  "baseColor",
  "clippingPlanes",
  "depthTestAgainstTerrain",
  "enableLighting",
  "lightingFadeInDistance",
  "lightingFadeOutDistance",
  "material",
  "maximumScreenSpaceError",
  "nightFadeInDistance",
  "nightFadeOutDistance",
  "oceanNormalMapUrl",
  "shadows",
  "show",
  "showGroundAtmosphere",
  "showWaterEffect",
  "terrainProvider",
  "tileCacheSize",
];

const Globe = createCesiumComponent<
  CesiumGlobe,
  GlobeProps,
  {
    scene?: Scene;
  }
>({
  name: "Globe",
  create: context => context.scene?.globe,
  cesiumProps,
  cesiumEventProps,
  setCesiumPropsAfterCreate: true,
});

export default Globe;
