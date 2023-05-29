export interface Sensor {
  id: string;
  name: string;
  connected: boolean;
  unit: string;
  value: number | null;
}

export type Callback = (data: Sensor[]) => void;

export const url = "ws://localhost:5000";
export const throttlingTimeOut = 100;
