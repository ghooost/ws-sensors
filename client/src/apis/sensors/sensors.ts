import { wsClient } from "@clients/ws-client";
import { Callback, Sensor, url } from "./constants";
import { throttledBufferedUpdate } from "./utils";

const buffer: Sensor[] = [];
let subscribers: Callback[] = [];

export function sensorApi() {
  const bufferedUpdate = throttledBufferedUpdate();

  const client = wsClient(url, {
    onMessage: (dataStr) => {
      const newSensor = JSON.parse(dataStr) as Sensor;
      bufferedUpdate(buffer, newSensor, subscribers);
    },
  });

  return {
    switchSensor(id: string, state: boolean) {
      client.send(
        JSON.stringify({ command: state ? "connect" : "disconnect", id })
      );
    },
    subscribe(onMessage: Callback) {
      if (subscribers.find((item) => item === onMessage)) {
        return;
      }
      subscribers = [...subscribers, onMessage];
    },
    unSubscribe(onMessage: Callback) {
      subscribers = subscribers.filter((item) => item === onMessage);
    },
  };
}

export type SensorApi = ReturnType<typeof sensorApi>;
