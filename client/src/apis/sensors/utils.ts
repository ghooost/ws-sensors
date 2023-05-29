import { Callback, Sensor, throttlingTimeOut } from "./constants";

const mutateSensors = (buffer: Sensor[], newSensor: Sensor) => {
  const oldSensorIndex = buffer.findIndex(({ id }) => id === newSensor.id);
  if (oldSensorIndex === -1) {
    buffer.push(newSensor);
  }
  buffer[oldSensorIndex] = newSensor;
};

const deliverSensors = (subscribers: Callback[], sensors: Sensor[]) => {
  subscribers.forEach((cb) => cb(sensors));
};

export const throttledBufferedUpdate = () => {
  let throttled = false;
  return (buffer: Sensor[], sensor: Sensor, subscribers: Callback[]) => {
    mutateSensors(buffer, sensor);
    if (throttled) {
      return;
    }
    throttled = true;
    deliverSensors(subscribers, buffer);
    buffer.splice(0);
    setTimeout(() => {
      deliverSensors(subscribers, buffer);
      throttled = false;
      buffer.splice(0);
    }, throttlingTimeOut);
  };
};

const isSameSensor = (a: Sensor, b: Sensor) =>
  a.connected === b.connected && a.value === b.value && a.name === b.name;

const updateSensors = (sensors: Sensor[], newSensor: Sensor) => {
  const oldSensor = sensors.find(({ id }) => id === newSensor.id);
  if (!oldSensor) {
    return [...sensors, newSensor];
  }
  if (isSameSensor(oldSensor, newSensor)) {
    return sensors;
  }
  return sensors.map((sensor) => (sensor === oldSensor ? newSensor : sensor));
};

const bulkUpdateSensors = (sensors: Sensor[], newSensors: Sensor[]) => {
  const ret = newSensors.reduce((acc, sensor) => {
    return updateSensors(acc, sensor);
  }, sensors);
  return ret;
};

export const stateUpdater = (buffer: Sensor[]) => (curSensors: Sensor[]) =>
  bulkUpdateSensors(curSensors, buffer);
