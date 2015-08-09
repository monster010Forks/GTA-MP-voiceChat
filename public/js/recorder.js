'use strict';

(function(window) {

  const WORKER_PATH = 'js/recorderWorker.js';

  let Recorder = function(source) {
    let socket = io.connect('http://127.0.0.1:1337');

    let bufferLen = 16384;

    this.context = source.context;
    this.node = (this.context.createScriptProcessor ||
                 this.context.createJavaScriptNode).call(this.context,
                 bufferLen, 1, 1);
    let worker = new Worker(WORKER_PATH);
    worker.postMessage({
      command: 'init'
    });

    let au = document.createElement('audio');

    let recording = false;
    var currCallback = function() {};

    socket.on('audioData', function(data) {
      let buffer = [new Float32Array(data)];
      worker.postMessage({command: 'record', buffer});

      exportMP3(function(blob) {
        var url = URL.createObjectURL(blob);

        au.src = url;
        au.play();
      });
    });

    this.node.onaudioprocess = function(e) {

      // We need some way to send the Float32Array to the other side.
      // Since socket.io does not support every kind of binary data but buffers,
      // we just send the buffer and recreate the array on the other side
      let array = new Float32Array(e.inputBuffer.getChannelData(0));
      socket.emit('audioData', array.buffer);
    };

    this.record = function() {
      recording = true;
    };

    this.stop = function() {
      recording = false;
    };

     function exportMP3(cb, type) {
      currCallback = cb;
      worker.postMessage({
        command: 'exportMP3'
      });
    }

    worker.onmessage = function(e) {
      let blob = e.data;
      currCallback(blob);
    };

    source.connect(this.node);
    this.node.connect(this.context.destination);
  };

  window.Recorder = Recorder;

})(window);
