import { EvaluationAction, SensorType, ThermometerPrecision } from "../types";
import { SensorEvaluator } from "./SensorEvaluator";

describe("SensorEvaluator", () => {
  const reference = {
    [SensorType.THERMOMETER]: 70.0,
    [SensorType.HUMIDITY]: 45.0,
    [SensorType.MONOXIDE]: 6,
  };
  const evaluator = new SensorEvaluator(reference);

  describe("evaluateThermometer", () => {
    test("ultra precise thermometer", () => {
      const ultraPrecise = {
        type: SensorType.THERMOMETER,
        id: "ultra",
        readings: [
          { timestamp: "2023-01-01T00:00:00", value: 70.1 },
          { timestamp: "2023-01-01T00:01:00", value: 69.9 },
          { timestamp: "2023-01-01T00:02:00", value: 70.0 },
        ],
      };

      expect(evaluator.evaluateSensor(ultraPrecise)).toBe(
        ThermometerPrecision.ULTRA_PRECISE
      );
    });

    test("very precise thermometer", () => {
      const veryPrecise = {
        type: SensorType.THERMOMETER,
        id: "very",
        readings: [
          { timestamp: "2023-01-01T00:00:00", value: 70.5 },
          { timestamp: "2023-01-01T00:01:00", value: 69.5 },
          { timestamp: "2023-01-01T00:02:00", value: 73.0 },
          { timestamp: "2023-01-01T00:03:00", value: 63.5 },
          { timestamp: "2023-01-01T00:04:00", value: 75.0 },
          { timestamp: "2023-01-01T00:05:00", value: 69.0 },
          { timestamp: "2023-01-01T00:06:00", value: 72.0 },
          { timestamp: "2023-01-01T00:07:00", value: 64.0 },
        ],
      };
      expect(evaluator.evaluateSensor(veryPrecise)).toBe(
        ThermometerPrecision.VERY_PRECISE
      );
    });

    test("precise thermometer", () => {
      const precise = {
        type: SensorType.THERMOMETER,
        id: "precise",
        readings: [
          { timestamp: "2023-01-01T00:00:00", value: 71.0 },
          { timestamp: "2023-01-01T00:01:00", value: 69.0 },
          { timestamp: "2023-01-01T00:02:00", value: 72.0 },
        ],
      };
      expect(evaluator.evaluateSensor(precise)).toBe(
        ThermometerPrecision.PRECISE
      );
    });
  });

  describe("evaluateHumidity", () => {
    test("keep humidity sensor", () => {
      const keepHumidity = {
        type: SensorType.HUMIDITY,
        id: "keep",
        readings: [
          { timestamp: "2023-01-01T00:00:00", value: 45.5 },
          { timestamp: "2023-01-01T00:01:00", value: 44.5 },
          { timestamp: "2023-01-01T00:02:00", value: 45.0 },
        ],
      };
      expect(evaluator.evaluateSensor(keepHumidity)).toBe(
        EvaluationAction.KEEP
      );
    });

    test("discard humidity sensor", () => {
      const discardHumidity = {
        type: SensorType.HUMIDITY,
        id: "discard",
        readings: [
          { timestamp: "2023-01-01T00:00:00", value: 46.5 },
          { timestamp: "2023-01-01T00:01:00", value: 43.5 },
          { timestamp: "2023-01-01T00:02:00", value: 45.0 },
        ],
      };
      expect(evaluator.evaluateSensor(discardHumidity)).toBe(
        EvaluationAction.DISCARD
      );
    });
  });

  describe("evaluateMonoxide", () => {
    test("keep monoxide sensor", () => {
      const keepMonoxide = {
        type: SensorType.MONOXIDE,
        id: "keep",
        readings: [
          { timestamp: "2023-01-01T00:00:00", value: 7 },
          { timestamp: "2023-01-01T00:01:00", value: 5 },
          { timestamp: "2023-01-01T00:02:00", value: 6 },
        ],
      };
      expect(evaluator.evaluateSensor(keepMonoxide)).toBe(
        EvaluationAction.KEEP
      );
    });

    test("discard monoxide sensor", () => {
      const discardMonoxide = {
        type: SensorType.MONOXIDE,
        id: "discard",
        readings: [
          { timestamp: "2023-01-01T00:00:00", value: 10 },
          { timestamp: "2023-01-01T00:01:00", value: 3 },
          { timestamp: "2023-01-01T00:02:00", value: 6 },
        ],
      };
      expect(evaluator.evaluateSensor(discardMonoxide)).toBe(
        EvaluationAction.DISCARD
      );
    });
  });
});
