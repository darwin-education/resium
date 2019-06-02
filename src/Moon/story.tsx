import React from "react";
import { storiesOf } from "@storybook/react";
import Cesium from "cesium";

import Viewer from "../Viewer";
import Moon from "./Moon";

const radius = Cesium.Math.LUNAR_RADIUS * 10;

storiesOf("Moon", module).add("Basic", () => (
  <Viewer full>
    <Moon ellipsoid={new Cesium.Ellipsoid(radius, radius, radius)} />
  </Viewer>
));
