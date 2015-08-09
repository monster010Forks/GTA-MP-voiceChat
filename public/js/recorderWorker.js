importScripts('lame.all.js');

var mp3codec, mp3encoder, data=[];

this.onmessage = function(e){
  switch(e.data.command){
    case 'init':
      init();
      break;
    case 'record':
      record(e.data.buffer);
      break;
    case 'exportMP3':
      exportMP3();
      break;
  }
};

function init() {
  mp3codec = new lamejs();
  mp3encoder = new mp3codec.Mp3Encoder(1, 44100, 128);
}

function record(inputBuffer) {
  var buf = mp3encoder.encodeBuffer(inputBuffer);
  var len = buf.size;
  for(var i=0;i<len;i++)	data.push(buf.data[i]);
}

function exportMP3() {
  var audioBlob = new Blob([new Uint8Array(data)], { type: 'audio/mp3' });
	this.postMessage(audioBlob);
  mp3encoder.flush();
  data=[];
}
