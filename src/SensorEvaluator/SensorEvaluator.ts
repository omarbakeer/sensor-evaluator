import {
  EvaluationAction,
  Reference,
  Sensor,
  SensorType,
  ThermometerPrecision,
} from "../types";
import { calculateMean, calculateStandardDeviation } from "../utils/utils";

export class SensorEvaluator {
  private readonly reference: Reference;

  constructor(reference: Reference) {
    this.reference = reference;
  }

  private getReferenceValue(sensorType: SensorType): number {
    return this.reference[sensorType] ?? 0;
  }

  private evaluateThermometer(sensor: Sensor): ThermometerPrecision {
    const values = sensor.readings.map((r) => r.value);
    const mean = calculateMean(values);
    const stdDev = calculateStandardDeviation(values);
    const referenceTemp = this.getReferenceValue(SensorType.THERMOMETER);

    if (Math.abs(mean - referenceTemp) <= 0.5 && stdDev < 3) {
      return ThermometerPrecision.ULTRA_PRECISE;
    } else if (Math.abs(mean - referenceTemp) <= 0.5 && stdDev < 5) {
      return ThermometerPrecision.VERY_PRECISE;
    } else {
      return ThermometerPrecision.PRECISE;
    }
  }

  private evaluateHumidity(sensor: Sensor): boolean {
    const referenceHumidity = this.getReferenceValue(SensorType.HUMIDITY);
    return sensor.readings.every(
      (reading) => Math.abs(reading.value - referenceHumidity) <= 1
    );
  }

  private evaluateMonoxide(sensor: Sensor): boolean {
    const referenceMonoxide = this.getReferenceValue(SensorType.MONOXIDE);
    return sensor.readings.every(
      (reading) => Math.abs(reading.value - referenceMonoxide) <= 3
    );
  }

  evaluateSensor(sensor: Sensor): string {
    switch (sensor.type) {
      case SensorType.THERMOMETER:
        return this.evaluateThermometer(sensor);
      case SensorType.HUMIDITY:
        return this.evaluateHumidity(sensor)
          ? EvaluationAction.KEEP
          : EvaluationAction.DISCARD;
      case SensorType.MONOXIDE:
        return this.evaluateMonoxide(sensor)
          ? EvaluationAction.KEEP
          : EvaluationAction.DISCARD;
      default:
        throw new Error(`Unknown sensor type: ${sensor.type}`);
    }
  }
}
