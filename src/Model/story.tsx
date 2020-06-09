import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Viewer from "../Viewer";
import Model from "./Model";
import CameraFlyTo from "../CameraFlyTo";

import glb from "assets/Cesium_Air.glb";
import { Transforms, Cartesian3 } from "cesium";

const origin = Cartesian3.fromDegrees(-95.0, 40.0, 200000.0);
const cameraDest = Cartesian3.fromDegrees(-95.0, 40.0, 210000);
const modelMatrix = Transforms.eastNorthUpToFixedFrame(origin);

storiesOf("Model", module).add("Basic", () => (
  <Viewer full>
    <CameraFlyTo destination={cameraDest} duration={0} />
    <Model
      url={glb}
      modelMatrix={modelMatrix}
      minimumPixelSize={128}
      maximumScale={20000}
      onReady={action("onReady")}
      onClick={action("onClick")}
    />
  </Viewer>
));
