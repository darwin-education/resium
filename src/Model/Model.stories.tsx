import React from "react";
import { Meta, Story } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Viewer from "../Viewer";
import Model, { ModelProps } from "./Model";
import CameraFlyTo from "../CameraFlyTo";
import glb from "assets/Cesium_Air.glb";
import { Transforms, Cartesian3 } from "cesium";

const origin = Cartesian3.fromDegrees(-95.0, 40.0, 200000.0);
const cameraDest = Cartesian3.fromDegrees(-95.0, 40.0, 210000);
const modelMatrix = Transforms.eastNorthUpToFixedFrame(origin);

export default {
  title: "Model",
  component: Model,
} as Meta;

export const Basic: Story<ModelProps> = args => (
  <Viewer full>
    <CameraFlyTo destination={cameraDest} duration={0} />
    <Model
      {...args}
      url={glb}
      modelMatrix={modelMatrix}
      minimumPixelSize={128}
      maximumScale={20000}
      onReady={action("onReady")}
      onClick={action("onClick")}
    />
  </Viewer>
);
