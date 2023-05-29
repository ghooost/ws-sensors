import { useCallback, useEffect, useRef, useState } from "react";
import { SensorApi, sensorApi } from ".";
import { stateUpdater } from "./utils";
import { Sensor } from "./constants";

export const useSensorApi = (): [
  Sensor[],
  (id: string, state: boolean) => void
] => {
  const api = useRef<SensorApi>();
  const [sensors, setSensors] = useState<Sensor[]>([]);

  useEffect(() => {
    const bulkSetter = (buffer: Sensor[]) => {
      setSensors(stateUpdater(buffer));
    };
    api.current = sensorApi();
    api.current.subscribe(bulkSetter);
    return () => api.current?.unSubscribe(bulkSetter);
  }, []);

  const switchSensor = useCallback((id: string, state: boolean) => {
    api.current?.switchSensor(id, state);
  }, []);

  return [sensors, switchSensor];
};
