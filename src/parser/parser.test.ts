import { SensorType } from "../types";
import { parseLogFile } from "./parser";

describe("Parser", () => {
  test("parseLogFile", () => {
    const content = `
  reference thermometer:70.0 humidity:45.0 monoxide:6
  thermometer temp-1
  2023-01-01T00:00 70.1
  2023-01-01T00:01 69.9
  2023-01-01T00:02 70.0
  humidity hum-1
  2023-01-01T00:00 45.5
  2023-01-01T00:01 44.5
  2023-01-01T00:02 45.0
  monoxide mon-1
  2023-01-01T00:00 7
  2023-01-01T00:01 5
  2023-01-01T00:02 6`;

    const { reference, sensors } = parseLogFile(content);

    expect(reference).toEqual({
      [SensorType.THERMOMETER]: 70,
      [SensorType.HUMIDITY]: 45,
      [SensorType.MONOXIDE]: 6,
    });
    expect(sensors).toHaveLength(3);

    expect(sensors[0]).toEqual({
      type: "thermometer",
      id: "temp-1",
      readings: [
        { timestamp: "2023-01-01T00:00", value: 70.1 },
        { timestamp: "2023-01-01T00:01", value: 69.9 },
        { timestamp: "2023-01-01T00:02", value: 70.0 },
      ],
    });

    expect(sensors[1]).toEqual({
      type: "humidity",
      id: "hum-1",
      readings: [
        { timestamp: "2023-01-01T00:00", value: 45.5 },
        { timestamp: "2023-01-01T00:01", value: 44.5 },
        { timestamp: "2023-01-01T00:02", value: 45.0 },
      ],
    });

    expect(sensors[2]).toEqual({
      type: "monoxide",
      id: "mon-1",
      readings: [
        { timestamp: "2023-01-01T00:00", value: 7 },
        { timestamp: "2023-01-01T00:01", value: 5 },
        { timestamp: "2023-01-01T00:02", value: 6 },
      ],
    });
  });

  test("parseLogFile with undefined SensorType", () => {
    const content = `
  reference thermometer:70.0 UNDEFINED:45.0 monoxide:6
  thermometer temp-1
  2023-01-01T00:00 70.1
  2023-01-01T00:01 72.5
  2023-01-01T00:02 70.0
  humidity hum-1
  2023-01-01T00:00 45.5`;

    expect(() => parseLogFile(content)).toThrow('Invalid sensor type:');
  });

  test("parseLogFile with invalid data", () => {
    const content = `
  reference thermometer:70.0 humidity:45.0 monoxide:6
  thermometer temp-1
  2023-01-01T00:00 70.1
  2023-01-01T00:01 INVALID
  2023-01-01T00:02 70.0
  humidity hum-1
  2023-01-01T00:00 45.5`;

    expect(() => parseLogFile(content)).toThrow('Invalid sensor reading value:');
  });
});
