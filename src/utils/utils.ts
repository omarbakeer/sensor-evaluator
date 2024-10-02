import { SensorType } from "../types";

export function calculateMean(values: number[]): number {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export function calculateStandardDeviation(values: number[]): number {
  const mean = calculateMean(values);
  const squaredDifferences = values.map((value) => Math.pow(value - mean, 2));
  const variance = calculateMean(squaredDifferences);
  return Math.sqrt(variance);
}

export function isAValidSensorType(value: string): value is SensorType {
  return Object.values(SensorType).includes(value as SensorType);
}
