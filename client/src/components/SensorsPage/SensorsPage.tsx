import { useSensorApi } from "@apis/sensors";
import { Filter } from "@components/Filter";
import { SensorsList } from "@components/SensorsList";
import { useCallback, useMemo, useState } from "react";

const filterValues = ["All", "Connected"] as const;
type FilterValue = (typeof filterValues)[number];

export const SensorsPage = function () {
  const [sensors, setSensorConnection] = useSensorApi();
  const [filter, setFilter] = useState<FilterValue>("All");

  const handleChangeConnection = useCallback(
    (id: string, state: boolean) => {
      setSensorConnection(id, state);
    },
    [setSensorConnection]
  );

  const handleFilterClick = useCallback(
    (value: string) => {
      setFilter(value as FilterValue);
    },
    [setFilter]
  );

  const sensorsToShow = useMemo(() => {
    if (filter === "All") {
      return sensors;
    }
    return sensors.filter(({ connected }) => connected);
  }, [sensors, filter]);

  return (
    <>
      <header>
        <Filter
          options={filterValues}
          value={filter}
          onChange={handleFilterClick}
        />
      </header>
      <main>
        <SensorsList
          sensors={sensorsToShow}
          onChangeConnection={handleChangeConnection}
        />
      </main>
    </>
  );
};
