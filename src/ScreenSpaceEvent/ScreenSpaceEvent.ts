import React, { useEffect } from "react";

import { useCesiumContext } from "../core/context";

// @noCesiumElement

/*
@summary
`ScreenSpaceEvent` is an event callback for mouse or touch interactions.

See also: [ScreenSpaceEventHandler#setInputAction](https://cesiumjs.org/Cesium/Build/Documentation/ScreenSpaceEventHandler.html?classFilter=screenspa#setInputAction)
*/

/*
@scope
Only inside [ScreenSpaceEventHandler](/components/ScreenSpaceEventHandler).
*/

export interface ScreenSpaceEventProps {
  // If empty, the event will be removed even if there is the default event.
  action?: (e: { position: Cesium.Cartesian2 }) => void;
  // @type Cesium.KeyboardEventModifier
  modifier?: number;
  // @type Cesium.ScreenSpaceEventType
  type: number;
}

const ScreenSpaceEvent: React.FC<ScreenSpaceEventProps> = ({ action, modifier, type }) => {
  const ctx = useCesiumContext<{ screenSpaceEventHandler?: Cesium.ScreenSpaceEventHandler }>();

  useEffect(() => {
    if (!ctx.screenSpaceEventHandler || ctx.screenSpaceEventHandler.isDestroyed()) return;
    if (action) {
      ctx.screenSpaceEventHandler.setInputAction(action as () => void, type, modifier);
      return () => {
        if (!ctx.screenSpaceEventHandler || ctx.screenSpaceEventHandler.isDestroyed()) return;
        ctx.screenSpaceEventHandler.removeInputAction(type, modifier);
      };
    } else {
      ctx.screenSpaceEventHandler.removeInputAction(type, modifier);
    }
    return undefined;
  }, [action, ctx.screenSpaceEventHandler, modifier, type]);

  return null;
};

export default ScreenSpaceEvent;
