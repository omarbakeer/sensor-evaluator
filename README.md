# CMG - Audition Assignment


## 🚀 How to use

- Run `yarn`
- Run `yarn start` to try it out. The output will be a console log.
- Run the tests cases with `yarn test`.

## Modifications applied to the data logs
I added the name of the sensor to the first line (references) to remove the ambiguity behind which values are representing which sensors

## Technologies
- Typescript
- Jest

## Structure and design
To achieve the goal from this task, I chose in my implementation to split the solution into 3 parts:

- **Utils**: Have the simple functionalities for calculating mean, standard deviation, and validating the sensor type.
- **Parser**: convert the lines into meaningful data, mainly the sensors data, and environment references
- **SensorEvaluation**: I implemented this class to have a method for each sensor, that tells how it should evaluate this specific sensor, and a public method that can be run them all.

The reasons behind this design, are to make it easier to test smaller modules of the library, and also to easily extend the class to have different sensors with different implementation for evaluation, without affecting other sensors.

## ⏳ Backlog
- Use ```fs.createReadStream(filePath)``` to read line by line in large log files.
- Accept the file name in the command line.
- Build and distribute the package.

