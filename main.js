let localStream;
navigator.mediaDevices.getUserMedia({video:true, audio:true})
    .then( stream => {
        const videoElm = document.getElementById('my-video');
        videoElm.srcObject = stream;
        videoElm.play();
        localStream = stream;
    }).catch( error => {
        console.error('mediaDevice.getUserMedia() error:', error);
        return;
    });

let g_peer_id = "";

// make peer
const peer = new Peer({
    key: '1ef665fb-d3b0-41c6-9d95-8a4aa0fabd9e',
    debug: 3
});

// get peer id
peer.on('open', () => {
    document.getElementById('my-id').textContent = g_peer_id = peer.id;
});

// 発信処理
document.getElementById('make-call').onclick = () => {
    const theirID = document.getElementById('their-id').value;
    const mediaConnection = peer.call(theirID, localStream);
    setEventListener(mediaConnection);
};

// イベントリスナを設置する関数
const setEventListener = mediaConnection => {
    mediaConnection.on('stream', stream => {
        // video要素にカメラ映像をセットして再生
        const videoElm = document.getElementById('their-video')
        videoElm.srcObject = stream;
        videoElm.play();
    });
}

// 着信処理
peer.on('call', mediaConnection => {
    mediaConnection.answer(localStream);
    setEventListener(mediaConnection);
});

// 発信処理
document.getElementById('register').onclick = () => {
    const cameraID = document.getElementById('camera-id').value;
    console.log(cameraID);
    const url = 'https://us-central1-koken-key.cloudfunctions.net/registrationCamera?camera='+cameraID+'&peer_id='+g_peer_id;

    fetch(url)
    .then(function (data) {
      return data.json();
    })
    .then(function (json) {
        console.log(json)
        alert("登録が完了しました")
    });
};
