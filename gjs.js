const BufferedInputStream = imports.gi.Gio.BufferedInputStream;

class InputStream extends imports.gi.GObject.Object {
  read() {
    console.log('read');
  }
  read_all() {
    console.log('read_all');
  }
  read_all_async() {
    console.log('read_all_async');
  }
  read_all_finish() {
    console.log('read_all_finish');
  }
  skip() {
    console.log('skip');
  }
  close() {
    console.log('close');
  }
  read_async() {
    console.log('read_async');
  }
  read_finish() {
    console.log('read_finish');
  }
  skip_async() {
    console.log('skip_async');
  }
  skip_finish() {
    console.log('skip_finish');
  }
  close_async() {
    console.log('close_async');
  }
  close_finish() {
    console.log('close_finish');
  }
  is_closed() {
    console.log('is_closed');
  }
  has_pending() {
    console.log('has_pending');
  }
  set_pending() {
    console.log('set_pending');
  }
  clear_pending() {
    console.log('clear_pending');
  }
  read_bytes() {
    console.log('read_bytes');
  }
  read_bytes_async() {
    console.log('read_bytes_async');
  }
  read_bytes_finish() {
    console.log('read_bytes_finish');
  }
}

const s = new InputStream;
const bs = new BufferedInputStream({base_stream: s});