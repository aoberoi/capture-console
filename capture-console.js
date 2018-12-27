/**
 * This class captures the stdout and stores each write in an array of strings.
 */
class CaptureConsole {
  constructor() {
    this._capturedText = [];
    this._orig_stdout_write = null;
    this._orig_stderr_write = null;
  }

  /**
   * Starts capturing the writes to process.stdout
   */
  startCapture() {
    this._orig_stdout_write = process.stdout.write;
    this._orig_stderr_write = process.stderr.write;
    process.stdout.write = this._writeCapture.bind(this);
    process.stderr.write = this._writeCapture.bind(this);
  }

  /**
   * Stops capturing the writes to process.stdout.
   */
  stopCapture() {
    if (this._orig_stdout_write) {
      process.stdout.write = this._orig_stdout_write;
      this._orig_stdout_write = null;
    }
    if (this._orig_stderr_write) {
      process.stderr.write = this._orig_stderr_write;
      this._orig_stderr_write = null;
    }
  }

  /**
   * Private method that is used as the replacement write function for process.stdout
   * @param string
   * @private
   */
  _writeCapture(string) {
    this._capturedText.push(string);
  }

  /**
   * Retrieve the text that has been captured since creation or since the last clear call
   * @returns {Array} of Strings
   */
  getCapturedText() {
    return this._capturedText;
  }

  /**
   * Clears all of the captured text
   */
  clearCaptureText() {
    this._capturedText = [];
  }
}

exports.CaptureConsole = CaptureConsole;
