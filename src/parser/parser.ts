import { Reference, Sensor, SensorType } from "../types";
import { isAValidSensorType } from "../utils/utils";

const dynamicallyParseSensorsReference = (sensors: string[]): Reference => {
  const tempReference: Reference = {};
  sensors.forEach((sensor) => {
    const [sensorType, referenceValue] = sensor.split(":");
    if (isAValidSensorType(sensorType)) {
      const readingValue = parseFloat(referenceValue);
      if (isNaN(readingValue))
        throw new Error(`Invalid sensor reference value: ${referenceValue}`);
      tempReference[sensorType] = readingValue;
    } else {
      throw new Error(`Invalid sensor type: ${sensorType}`);
    }
  });
  return tempReference;
};

export function parseLogFile(content: string): {
  reference: Reference;
  sensors: Sensor[];
} {
  const lines = content.split("\n");
  let reference: Reference = {};
  const sensors: Sensor[] = [];
  let currentSensor: Sensor | null = null;

  lines.forEach((line) => {
    const parts = line.trim().split(" ");
    if (parts[0] === "reference") {
      reference = dynamicallyParseSensorsReference(parts.slice(1));
    } else if (Object.values(SensorType).includes(parts[0] as SensorType)) {
      if (currentSensor) {
        sensors.push(currentSensor);
      }
      currentSensor = {
        type: parts[0] as SensorType,
        id: parts[1],
        readings: [],
      };
    } else if (currentSensor) {
      const readingValue = parseFloat(parts[1]);
      if (isNaN(readingValue))
        throw new Error(`Invalid sensor reading value: ${parts[1]}`);
      currentSensor.readings.push({
        timestamp: parts[0],
        value: readingValue,
      });
    }
  });

  // to push the last sensor
  if (currentSensor) {
    sensors.push(currentSensor);
  }

  return { reference, sensors };
}
