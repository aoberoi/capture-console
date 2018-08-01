const mocha = require('mocha');
const chai = require('chai');
const { CaptureConsole } = require('../capture-console');

// const logger = require('pino')();

const expect = chai.expect;
const describe = mocha.describe;
const it = mocha.it;

describe('CaptureConsole', () => {
  it('should capture nothing when startCapture is not called', () => {
    const captureConsole = new CaptureConsole();
    const msg = 'OMG! It killed Kenny!';

    console.error(msg);
    captureConsole.stopCapture();
    const output = captureConsole.getCapturedText();
    captureConsole.clearCaptureText();

    expect(output).has.lengthOf(0);
  });

  it('should capture messages when startCapture is called', () => {
    const captureConsole = new CaptureConsole();
    const msg1 = 'OMG! It killed Kenny!';
    const msg2 = 'The bastard!';

    captureConsole.startCapture();
    console.log(msg1);
    console.error(msg2);
    captureConsole.stopCapture();
    const output = captureConsole.getCapturedText();
    captureConsole.clearCaptureText();

    expect(output).has.lengthOf(2);
    expect(output[0]).equals(msg1);
    expect(output[1]).equals(msg2);
  });

  it('should stop capturing message when stopCapture is called', () => {
    const captureConsole = new CaptureConsole();
    const msg1 = 'OMG! It killed Kenny!';
    const msg2 = 'The bastard!';

    captureConsole.startCapture();
    console.info(msg1);
    captureConsole.stopCapture();
    console.error(msg2);
    const output = captureConsole.getCapturedText();
    captureConsole.clearCaptureText();

    expect(output).has.lengthOf(1);
  });

  it('should allow multiple start/stop capturing without clearing capture text', () => {
    const captureConsole = new CaptureConsole();
    const msg1 = 'OMG! It killed Kenny!';
    const msg2 = 'The bastard!';
    const msg3 = 'All your base';
    const msg4 = 'Are belong to us!';

    captureConsole.startCapture();
    console.info(msg1);
    captureConsole.stopCapture();
    console.error(msg2);
    captureConsole.startCapture();
    console.warn(msg3);
    captureConsole.stopCapture();
    console.info(msg4);
    const output = captureConsole.getCapturedText();
    captureConsole.clearCaptureText();

    expect(output).has.lengthOf(2);
    expect(output[0]).equals(msg1);
    expect(output[1]).equals(msg3);
  });
});

