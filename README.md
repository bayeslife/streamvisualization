# Query, Process and Visualize a data Stream via a Functional Pipeline approach

Please see [Query, Process and Visualize a data Stream via a Functional Pipeline approach](https://beta.observablehq.com/@bayeslife/stream-query-process-and-visualize-via-a-functional-pipeli)

## Build

```
npm install
```

## Run 
```
npm start
```

## Usage

After starting the back end you can use the [observable page](https://beta.observablehq.com/@bayeslife/stream-query-process-and-visualize-via-a-functional-pipeli) 
as the front end or browse to http://localhost:3000 which serves the index.html which provides the dynamic visualization.

## Customizing
### Running against mongo or a test generator

The index.js has a pair of lines which comment out either the test generator or the mongo generator.

Edit the src/generator/mongo-generator as required for your projection

### Data Processing

The src/processor/statsprocessor has logic for computing averages for individual assets.

