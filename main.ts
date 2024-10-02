import fs from "fs";
import { parseLogFile } from "./src/parser/parser";
import { SensorEvaluator } from "./src/SensorEvaluator/SensorEvaluator";

export function processLogFile(filePath: string): Record<string, string> {
  const content = fs.readFileSync(filePath, "utf-8");
  const { reference, sensors } = parseLogFile(content);
  const evaluator = new SensorEvaluator(reference);

  return sensors.reduce((acc, sensor) => {
    acc[sensor.id] = evaluator.evaluateSensor(sensor);
    return acc;
  }, {} as Record<string, string>);
}

const results = processLogFile("input.txt");
console.log(results);
