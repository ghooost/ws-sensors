import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Sensor } from "@apis/sensors";

import styles from "./styles.module.css";

interface Props {
  data: Sensor;
  onChangeConnection: (id: string, state: boolean) => void;
}

const SensorItemRaw = function ({ data, onChangeConnection }: Props) {
  const { id, name, connected, unit, value } = data;

  const frozenProps = useRef<Sensor>();
  const [isChanging, setIsChanging] = useState(false);

  const handleClick = useCallback(() => {
    if (isChanging) {
      return;
    }
    frozenProps.current = data;
    setIsChanging(true);
    onChangeConnection(id, !connected);
  }, [connected, data, id, isChanging, onChangeConnection]);

  useEffect(() => {
    if (isChanging && data !== frozenProps.current) {
      setIsChanging(false);
    }
  }, [isChanging, data]);

  return (
    <tr className={styles.root}>
      <td className={styles.connected}>
        {!isChanging ? (
          <input type="checkbox" checked={connected} onChange={handleClick} />
        ) : (
          "x"
        )}
      </td>
      <td className={styles.name}>{name}</td>
      <td>{value ? `${value} ${unit}` : "-"}</td>
    </tr>
  );
};

export const SensorItem = memo(SensorItemRaw);
