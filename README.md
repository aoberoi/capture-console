# Capture Console

[![Build Status](https://travis-ci.org/aoberoi/capture-console.svg?branch=master)](https://travis-ci.org/aoberoi/capture-console)

This is a utility, mostly used for testing, to capture string data written to both the stdout and stderr streams in
Node.js applications.

_NOTE_: This project is forked from Randy Carver's [capture-stdout](https://github.com/BlueOtterSoftware/capture-stdout).
Many thanks to him and the others who helped that make that project exist. I forked it because I had more specialized
needs, but might one day want to merge the fork back in.

## Installation

```
npm install @aoberoi/capture-console
```

## Usage

```javascript
const { CaptureConsole } = require('@aoberoi/capture-console');

// Consider testing this function...
function withMinOfFive(x) {
  if (x < 5) {
    console.warn('rounding up to 5');
    return 5;
  } else {
    console.log('already more than 5');
    return x;
  }
}

// Let's pretend the logging behavior is very meaningful, and you want to verify it
it('should log when the value is already greater than 5', function() {
  // Start capturing
  const captureConsole = new CaptureConsole();
  captureConsole.startCapture();

  // invoke the function
  const result = withMinOfFive(10);

  // Stop capturing and read the output
  captureStdout.stopCapture();
  const output = captureStdout.getCapturedText();

  assert.equal(result, 10);

  // Verify that there's exactly one log line
  assert.equal(output.length, 1);
});

// `console.warn()` writes to stderr, but you can use the same methods to find that output as well
it('should warn when the value is less than 5', function() {
  // Start capturing
  const captureConsole = new CaptureConsole();
  captureConsole.startCapture();

  // invoke the function
  const result = withMinOfFive(3);

  // Stop capturing and read the output
  captureStdout.stopCapture();
  const output = captureStdout.getCapturedText();

  assert.equal(result, 5);

  // Verify that there's exactly one log line
  assert.equal(output.length, 1);
});
```

### Methods

#### startCapture()

Starts capturing the writes to `process.stdout` and `process.stderr`.

#### stopCapture()

Stops capturing the writes to `process.stdout` and `process.stderr`.

#### clearCaptureText()

Clears all of the captured text.

#### getCapturedText() → {Array} of String

Returns all of the captured text.

## Changes since Capture Stdout

*  In addition to capturing stdout, also captures stderr
*  Exports a namespace instead of a value (better interop with ESM imports)
*  Made the README more generic
*  Stated support back to currently active LTS (v6)
*  Removes `pino` from tests
*  Allows newline character in captured output strings
