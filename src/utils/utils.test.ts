import { SensorType } from "../types";
import {
  calculateMean,
  calculateStandardDeviation,
  isAValidSensorType,
} from "./utils";

describe("Utility Functions", () => {
  test("calculateMean", () => {
    expect(calculateMean([1, 2, 3, 4, 5])).toBe(3);
    expect(calculateMean([0, 10])).toBe(5);
    expect(calculateMean([-5, 5])).toBe(0);
    expect(calculateMean([1.5, 2.5, 3.5])).toBe(2.5);
  });

  test("calculateStandardDeviation", () => {
    expect(calculateStandardDeviation([2, 4, 4, 4, 5, 5, 7, 9])).toBeCloseTo(
      2.0,
      1
    );
    expect(calculateStandardDeviation([1, 1, 1, 1])).toBe(0);
    expect(calculateStandardDeviation([-2, 2])).toBe(2);
  });

  test("isAValidSensorType", () => {
    expect(isAValidSensorType(SensorType.THERMOMETER)).toBe(true);
    expect(isAValidSensorType('Random Test Type')).toBe(false);
  });
});
