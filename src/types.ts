export enum SensorType {
  THERMOMETER = "thermometer",
  HUMIDITY = "humidity",
  MONOXIDE = "monoxide",
}

export enum ThermometerPrecision {
  ULTRA_PRECISE = "ultra precise",
  VERY_PRECISE = "very precise",
  PRECISE = "precise",
}

export enum EvaluationAction {
  KEEP = "keep",
  DISCARD = "discard",
}

export interface Reading {
  timestamp: string;
  value: number;
}

export interface Sensor {
  type: SensorType;
  id: string;
  readings: Reading[];
}

export type Reference = Partial<{
  [K in SensorType]: number;
}>
