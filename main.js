// When the page was loaded :: from here
let localStream;
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then( stream => {
        const videoElm = document.getElementById('video');
        videoElm.srcObject = stream;
        videoElm.play();
        localStream = stream;
    }).catch( error => {
        console.error('mediaDevice.getUserMedia() error:', error);
        return;
    });

// make peer
const peer = new Peer({
    key: '1ef665fb-d3b0-41c6-9d95-8a4aa0fabd9e',
    debug: 3
});

// get peer id
peer.on('open', () => {
    //document.getElementById('server-id').textContent = peer.id;
    // get server id here
    const theirID = /* server id */ peer.id;
    const mediaConnection = peer.call(theirID, localStream);
    setEventListener(mediaConnection);
});

// 発信処理
/*
function makeCall() {
    const theirID = document.getElementById('their-id').value;
    const mediaConnection = peer.call(theirID, localStream);
    setEventListener(mediaConnection);
};
*/

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

peer.on('error', err => {
    alert(err.message);
});

peer.on('close', () => {
    alert('Connection closed.')
})

let img = new Map();
loadImages(img);

let client_image_height_sta = 0;   // 駅詳細を表示するときのイメージ高さ
let client_image_height_keio = 0;   // 駅全体を表示するときのイメージ高さ

// :: to here

// functions
function setStationButtonHidden(value) {
    document.getElementById("chofusta").hidden = value;
    document.getElementById("meidaista").hidden = value;
    document.getElementById("kitanosta").hidden = value;
    document.getElementById("sasasta").hidden = value;
    document.getElementById("backtokeio").hidden = !value;
}

function setImagetbPadding(value) {
    document.getElementById("imagebox").style.setProperty('padding-top', value);
    document.getElementById("imagebox").style.setProperty('padding-bottom', value);
}

function loadChofu() {
    //client_image_height_keio = document.getElementById("image").clientHeight;
    document.getElementById("image").src = img["chofu"].src; 
    setStationButtonHidden(true);
    setImagetbPadding("0");
}

function loadMeidaimae() {
    //client_image_height_keio = document.getElementById("image").clientHeight;
    document.getElementById("image").src = img["meidaimae"].src; 
    setStationButtonHidden(true);
    setImagetbPadding("0");
}

function loadKitano() {
    //client_image_height_keio = document.getElementById("image").clientHeight;
    document.getElementById("image").src = img["kitano"].src; 
    setStationButtonHidden(true);
    setImagetbPadding("0");
}

function loadSasazuka() {
    //client_image_height_keio = document.getElementById("image").clientHeight;
    document.getElementById("image").src = img["sasazuka"].src; 
    setStationButtonHidden(true);
    setImagetbPadding("0");
}

function backToWholeImage() {    
    //client_image_height_sta = document.getElementById("image").clientHeight;
    document.getElementById("image").src = img["keio"].src; 
    setStationButtonHidden(false);
    setImagetbPadding("17.1%");
}
