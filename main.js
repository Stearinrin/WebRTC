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
let station_operables = {};

const stations = {
    "":{},
    chofu:{
        stops:{
            s1:{text:"1番線進行",status:false,on_text:"1番線停車",off_text:"1番線進行",on_image:"",off_image:""},
            s2:{text:"2番線進行",status:false,on_text:"2番線停車",off_text:"2番線進行",on_image:"",off_image:""},
            s3:{text:"3番線進行",status:false,on_text:"3番線停車",off_text:"3番線進行",on_image:"",off_image:""},
            s4:{text:"4番線進行",status:false,on_text:"4番線停車",off_text:"4番線進行",on_image:"",off_image:""}
        },
        branchs:{
            b1:{text:"２番線入線",status:false,on_text:"１番線入線",off_text:"２番線入線",on_image:"",off_image:""},
            b2:{text:"橋本方面",status:false,on_text:"京王八王子・高尾山口方面",off_text:"橋本方面",on_image:"",off_image:""},
            b3:{text:"４番線入線",status:false,on_text:"３番線入線",off_text:"４番線入線",on_image:"",off_image:""}
        }
    },
    meidaimae:{
        stops:{
            s1:{text:"1番線停車",status:false,on_text:"1番線停車",off_text:"1番線進行",on_image:"",off_image:""},
            s2:{text:"2番線停車",status:false,on_text:"2番線停車",off_text:"2番線進行",on_image:"",off_image:""}
        },
        branchs:{
        }
    },
    sasazuka:{},
    kitano:{}
}

const vue = new Vue({
    el:'#app',
    data:{
        selected_station:"",
        stations:stations
    },
    methods:{
        push_btn:function(station,is_stop,operable_id){
            console.log(operable_id)
            if(is_stop){
                stations[station].stops[operable_id].status = !stations[station].stops[operable_id].status;
                stations[station].stops[operable_id].text = (stations[station].stops[operable_id].status ? stations[station].stops[operable_id].on_text:stations[station].stops[operable_id].off_text);
            } else {
                stations[station].branchs[operable_id].status = !stations[station].branchs[operable_id].status;
                stations[station].branchs[operable_id].text = (stations[station].branchs[operable_id].status ? stations[station].branchs[operable_id].on_text:stations[station].branchs[operable_id].off_text);
            }
        }
    }
});

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
    document.getElementById("layer1").src = img["chofu_b1_off"].src;
    document.getElementById("layer1").hidden = false;
    document.getElementById("layer2").src = img["chofu_b2_off"].src;
    document.getElementById("layer2").hidden = false;
    document.getElementById("layer3").src = img["chofu_b3_off"].src;
    document.getElementById("layer3").hidden = false;
    document.getElementById("layer4").src = img["chofu_s1_off"].src;
    document.getElementById("layer4").hidden = false;
    document.getElementById("layer5").src = img["chofu_s2_off"].src;
    document.getElementById("layer5").hidden = false;
    document.getElementById("layer6").src = img["chofu_s3_off"].src;
    document.getElementById("layer6").hidden = false;
    document.getElementById("layer7").src = img["chofu_s4_off"].src;
    document.getElementById("layer7").hidden = false;
    setStationButtonHidden(true);
    setImagetbPadding("0");
    vue.selected_station = "chofu";
}

function loadMeidaimae() {
    //client_image_height_keio = document.getElementById("image").clientHeight;
    document.getElementById("image").src = img["meidaimae"].src; 
    document.getElementById("layer1").src = img["meidaimae_s1_off"].src;
    document.getElementById("layer1").hidden = false;
    document.getElementById("layer2").src = img["meidaimae_s2_off"].src;
    document.getElementById("layer2").hidden = false;
    setStationButtonHidden(true);
    setImagetbPadding("0");
    vue.selected_station = "meidaimae";
}

function loadKitano() {
    //client_image_height_keio = document.getElementById("image").clientHeight;
    document.getElementById("image").src = img["kitano"].src;
    document.getElementById("layer1").src = img["kitano_b1_off"].src;
    document.getElementById("layer1").hidden = false;
    document.getElementById("layer2").src = img["kitano_s2_off"].src;
    document.getElementById("layer2").hidden = false;
    document.getElementById("layer3").src = img["kitano_s3_off"].src;
    document.getElementById("layer3").hidden = false;
    setStationButtonHidden(true);
    setImagetbPadding("0");
    vue.selected_station = "kitano";
}

function loadSasazuka() {
    //client_image_height_keio = document.getElementById("image").clientHeight;
    document.getElementById("image").src = img["sasazuka"].src;
    document.getElementById("layer1").src = img["sasazuka_b1_off"].src;
    document.getElementById("layer1").hidden = false;
    document.getElementById("layer2").src = img["sasazuka_s1_off"].src;
    document.getElementById("layer2").hidden = false;
    document.getElementById("layer3").src = img["sasazuka_s2_off"].src;
    document.getElementById("layer3").hidden = false;
    document.getElementById("layer4").src = img["sasazuka_s4_off"].src;
    document.getElementById("layer4").hidden = false;
    setStationButtonHidden(true);
    setImagetbPadding("0");
    vue.selected_station = "sasazuka";
}

function backToWholeImage() {    
    //client_image_height_sta = document.getElementById("image").clientHeight;
    document.getElementById("image").src = img["keio"].src;
    document.getElementById("layer1").hidden = true;
    document.getElementById("layer2").hidden = true;
    document.getElementById("layer3").hidden = true;
    document.getElementById("layer4").hidden = true;
    document.getElementById("layer5").hidden = true;
    document.getElementById("layer6").hidden = true;
    document.getElementById("layer7").hidden = true;
    setStationButtonHidden(false);
    setImagetbPadding("17.1%");
    vue.selected_station = "";
}
