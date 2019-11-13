import React from "react";
import { mount } from "enzyme";

import { Provider } from "./context";
import { createCameraOperation } from "./CameraOperation";

describe("core/cameraop", () => {
  it("should call proper methods", () => {
    const camera = {
      cancelFlight: jest.fn(),
    };
    const cameraOperationStart = jest.fn();
    const DummyCameraOperation = createCameraOperation<{ test: number }>(
      "dummy",
      cameraOperationStart,
    );

    const Test: React.FC<{ test: number }> = ({ test }) => (
      <Provider value={{ camera }}>
        <DummyCameraOperation test={test} />
      </Provider>
    );
    const wrapper = mount(<Test test={0} />);

    expect(cameraOperationStart).toHaveBeenCalledTimes(1);
    expect(camera.cancelFlight).toHaveBeenCalledTimes(1);

    wrapper.update();

    expect(cameraOperationStart).toHaveBeenCalledTimes(1);
    expect(camera.cancelFlight).toHaveBeenCalledTimes(1);

    wrapper.setProps({ test: 1 });

    expect(cameraOperationStart).toHaveBeenCalledTimes(2);
    expect(camera.cancelFlight).toHaveBeenCalledTimes(2);
  });

  it("should call cancelFlight", () => {
    const camera = {
      cancelFlight: jest.fn(),
    };

    const DummyCameraOperation = createCameraOperation("dummy", () => {});

    const wrapper = mount(
      <Provider value={{ camera }}>
        <DummyCameraOperation cancelCameraFlightOnUnmount />
      </Provider>,
    );

    expect(camera.cancelFlight).toHaveBeenCalledTimes(1);

    wrapper.unmount();

    expect(camera.cancelFlight).toHaveBeenCalledTimes(2);
  });
});
