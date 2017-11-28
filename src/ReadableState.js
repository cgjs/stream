const Duplex = require('./Duplex.js');
const StringDecoder = require('./StringDecoder.js');

module.exports = class ReadableState {
  constructor(options = {}, stream) {
    this.objectMode = !!options.objectMode;
    if (stream instanceof Duplex) {
      this.objectMode = this.objectMode || !!options.readableObjectMode;
    }

    let hwm = options.highWaterMark;
    let defaultHwm = this.objectMode ? 16 : 16 * 1024;
    this.highWaterMark = Math.floor(hwm || hwm === 0 ? hwm : defaultHwm);

    this.buffer = new BufferList();
    this.length = 0;
    this.pipes = null;
    this.pipesCount = 0;
    this.flowing = null;
    this.ended = false;
    this.endEmitted = false;
    this.reading = false;

    this.sync = true;

    this.needReadable = false;
    this.emittedReadable = false;
    this.readableListening = false;
    this.resumeScheduled = false;

    this.destroyed = false;

    this.defaultEncoding = options.defaultEncoding || 'utf8';

    this.awaitDrain = 0;

    this.readingMore = false;

    this.decoder = options.encoding ? new StringDecoder(options.encoding) : null;
    this.encoding = options.encoding || null;
  }
};
