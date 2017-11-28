// const loop = imports.cgjs.mainloop;
// const MemoryInputStream = imports.gi.Gio.MemoryInputStream;
const Duplex = require('./Duplex.js');
const Stream = require('./Stream.js');
const ReadableState = require('./ReadableState.js');

module.exports = class Readable extends Stream {
  constructor(options = null) {
    super();
    this._readableState = new ReadableState(options, this);    
    this.readable = true;
    if (options) {
      if (typeof options.read === 'function') this._read = options.read;
      if (typeof options.destroy === 'function') this._destroy = options.destroy;
    }
  }
  get destroyed() {
    return this._readableState === void 0 ?
            false : this._readableState.destroyed;
  }
  set destroyed(value) {
    if (!this._readableState) return;
    this._readableState.destroyed = value;
  }
  destroy() {}
  _undestroy() {}
  _destroy(err, cb) {
    this.push(null);
    cb(err);
  }
  push(chunk, encoding) {
    const state = this._readableState;
    let skipChunkCheck;
  
    if (!state.objectMode) {
      if (typeof chunk === 'string') {
        encoding = encoding || state.defaultEncoding;
        if (encoding !== state.encoding) {
          chunk = Buffer.from(chunk, encoding);
          encoding = '';
        }
        skipChunkCheck = true;
      }
    } else {
      skipChunkCheck = true;
    }
  
    // return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
  }
  unshift() {}
  isPaused() {}
  setEncoding() {}
  read() {}
  _read() {}
  pipe() {}
  unpipe() {}
  on(type, fn) {
    if (type === 'data') {}
    return super.on(type, fn);
  }
  addListener(...args) { return this.on(...args); }
  resume() {}
  pause() {}
  wrap() {}
};

// TODO: https://github.com/nodejs/readable-stream/blob/master/lib/_stream_readable.js
function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
  const state = stream._readableState;
  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else {
    var er;
    if (!skipChunkCheck) er = chunkInvalid(state, chunk);
    if (er) {
      stream.emit('error', er);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (typeof chunk !== 'string' && !state.objectMode && chunk instanceof !== Buffer) {
        chunk = _uint8ArrayToBuffer(chunk);
      }

      if (addToFront) {
        if (state.endEmitted) stream.emit('error', new Error('stream.unshift() after end event'));else addChunk(stream, state, chunk, true);
      } else if (state.ended) {
        stream.emit('error', new Error('stream.push() after EOF'));
      } else {
        state.reading = false;
        if (state.decoder && !encoding) {
          chunk = state.decoder.write(chunk);
          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
        } else {
          addChunk(stream, state, chunk, false);
        }
      }
    } else if (!addToFront) {
      state.reading = false;
    }
  }

  return needMoreData(state);
}