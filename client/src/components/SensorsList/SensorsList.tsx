import { Sensor } from "@apis/sensors";
import { SensorItem } from "@components/SensorItem";
import styles from "./styles.module.css";

interface Props {
  sensors: Sensor[];
  onChangeConnection: (id: string, state: boolean) => void;
}

export const SensorsList = function ({ sensors, onChangeConnection }: Props) {
  if (!sensors.length) {
    return <div className={styles.empty}>There is nothing here</div>;
  }

  return (
    <table className={styles.root}>
      <tbody>
        {sensors.map((sensor) => (
          <SensorItem
            key={sensor.id}
            data={sensor}
            onChangeConnection={onChangeConnection}
          />
        ))}
      </tbody>
    </table>
  );
};
