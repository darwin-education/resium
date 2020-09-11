import { SkyBox as CesiumSkyBox } from "cesium";

import { createCesiumComponent, PickCesiumProps, UnusedCesiumProps, AssertNever } from "../core";

/*
@summary
`SkyBox` can operate the SkyBox in the scene.
All properties are applied to single SkyBox in the scene.
*/

/*
@scope
SkyBox can be mounted inside[Viewer](/components/Viewer) or [CesiumWidget](/components/CesiumWidget) components.
It can not be mounted more than once for each Viewer or CesiumWidget.
*/

export type SkyBoxCesiumProps = PickCesiumProps<CesiumSkyBox, typeof cesiumProps>;

export type SkyBoxProps = SkyBoxCesiumProps;

const cesiumProps = ["sources", "show"] as const;

const SkyBox = createCesiumComponent<CesiumSkyBox, SkyBoxProps>({
  name: "SkyBox",
  create: context => context.scene?.skyBox,
  cesiumProps,
  setCesiumPropsAfterCreate: true,
});

export default SkyBox;

// Unused prop check
type IgnoredProps = never;
type UnusedProps = UnusedCesiumProps<CesiumSkyBox, keyof SkyBoxProps>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type AssertUnusedProps = AssertNever<Exclude<UnusedProps, IgnoredProps>>;
