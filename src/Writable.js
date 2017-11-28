const GLib = imports.gi.GLib;
const Gio = imports.gi.Gio;
const EventEmitter = imports.cgjs.core.module(require, 'events');

class Writable extends EventEmitter {
  constructor() {
    super();
    this._stream = new Gio.BufferedOutputStream({});
    this._queue = [];
    this._streaming = false;
  }
  get _streaming() {
    return this._isStreaming;
  }
  set _streaming(value) {
    this._isStreaming = value;
    if (!value && this._isEnding) {
      endWrite.call(this);
    }
  }
  _end() {}
  write(data, ...args) {
    let buffer = data;
    if (typeof data === 'string') {
      buffer = new Uint8Array(data.length);
    }
    const info = {
      data: buffer,
      encoding: typeof data === 'string' && typeof args[0] === 'string' ? args[0] : 'utf8',
      callback: typeof args[args.length - 1] === 'function' ? args.pop() : null
    };
    addWrite.call(this, info);
  }
  end() {
    this._isEnding = true;
    if (!this._streaming) {
      endWrite.call(this);
    }
  }
}

function addWrite(info) {
  this._queue.push(info);
  if (!this._streaming) stream.call(this);
}

function endWrite() {
  this._stream.close_async(
    GLib.PRIORITY_DEFAULT,
    null,
    () => {
      console.log('end');
    }
  );
}

function stream() {
  const data = this._queue.shift();
  this._streaming = true;
  this._stream.write_async(
    data,
    GLib.PRIORITY_DEFAULT,
    null,
    () => {
      if (this._queue.length) stream.call(this);
      else this._streaming = false;
    }
  );
}

module.exports = Writable;
