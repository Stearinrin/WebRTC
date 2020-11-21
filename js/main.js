// When the page was loaded :: from here
let localStream;
/*
navigator.mediaDevices.getUserMedia({ video: false, audio: false })
    .then( stream => {
        const videoElm = document.getElementById('video');
        videoElm.srcObject = stream;
        videoElm.play();
        localStream = stream;
    }).catch( error => {
        console.error('mediaDevice.getUserMedia() error:', error);
        return;
    });
    */

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
function makeCall(theirID) {
    // document.getElementById('their-id').value;
    const mediaConnection = peer.call(theirID, localStream);
    setEventListener(mediaConnection);
};

// イベントリスナを設置する関数
const setEventListener = mediaConnection => {
    mediaConnection.on('stream', stream => {
        // video要素にカメラ映像をセットして再生
        const videoElm = document.getElementById('video')
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

let canvas = document.getElementById("freezelayer");
let context = canvas.getContext('2d');
context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

// :: to here
let gotChofuToken = false;
let gotMeidaiToken = false;
let gotSasazukaToken = false;
let gotKitanoToken = false;
let gotTrainToken = false;

let station_operables = {};

const stations = {
    "":{},
    chofu:{
        stops:{
            s1: { text: "1番線進行", status: false, on_text: "1番線停車", off_text: "1番線進行", image: "image/chofu_s1_off.png", on_image: "image/chofu_s1_on.png", off_image:"image/chofu_s1_off.png", class:"btn btn-outline-info control-btn" },
            s2: { text: "2番線進行", status: false, on_text: "2番線停車", off_text: "2番線進行", image: "image/chofu_s2_off.png", on_image: "image/chofu_s2_on.png", off_image:"image/chofu_s2_off.png", class:"btn btn-outline-info control-btn" },
            s3: { text: "3番線進行", status: false, on_text: "3番線停車", off_text: "3番線進行", image: "image/chofu_s3_off.png", on_image: "image/chofu_s3_on.png", off_image:"image/chofu_s3_off.png", class:"btn btn-outline-info control-btn" },
            s4: { text: "4番線進行", status: false, on_text: "4番線停車", off_text: "4番線進行", image: "image/chofu_s4_off.png", on_image: "image/chofu_s4_on.png", off_image:"image/chofu_s4_off.png", class:"btn btn-outline-info control-btn" }
        },
        branchs:{
            b1: { text: "２番線入線", status: false, on_text: "１番線入線", off_text: "２番線入線", image: "image/chofu_b1_off.png", on_image: "image/chofu_b1_on.png", off_image: "image/chofu_b1_off.png", class:"btn btn-outline-dark control-btn" },
            b2: { text: "橋本方面", status: false, on_text: "京王八王子・高尾山口方面", off_text: "橋本方面", image: "image/chofu_b2_off.png", on_image: "image/chofu_b2_on.png", off_image:"image/chofu_b2_off.png", class:"btn btn-outline-dark control-btn" },
            b3: { text: "４番線入線", status: false, on_text: "３番線入線", off_text: "４番線入線", image: "image/chofu_b3_off.png", on_image: "image/chofu_b3_on.png", off_image:"image/chofu_b3_off.png", class:"btn btn-outline-dark control-btn" }
        }
    },
    meidaimae:{
        stops:{
            s1: { text: "1番線停車", status: false, on_text: "1番線停車", off_text: "1番線進行", image: "image/meidaimae_s1_off.png", on_image: "image/meidaimae_s1_on.png", off_image:"image/meidaimae_s1_off.png", class:"btn btn-outline-info control-btn" },
            s2: { text: "2番線停車", status: false, on_text: "2番線停車", off_text: "2番線進行", image: "image/meidaimae_s2_off.png", on_image: "image/meidaimae_s2_on.png", off_image:"image/meidaimae_s2_off.png", class:"btn btn-outline-info control-btn" }
        },
        branchs:{
        }
    },
    sasazuka:{
        stops:{
            s1: { text: "1番線進行", status: false, on_text: "1番線停車", off_text: "1番線進行", image: "image/sasazuka_s1_off.png", on_image: "image/sasazuka_s1_on.png", off_image: "image/sasazuka_s1_off.png", class:"btn btn-outline-info control-btn" },
            s2: { text: "2番線進行", status: false, on_text: "2番線停車", off_text: "2番線進行", image: "image/sasazuka_s2_off.png", on_image: "image/sasazuka_s2_on.png", off_image: "image/sasazuka_s2_off.png", class:"btn btn-outline-info control-btn" },
            s4: { text: "4番線進行", status: false, on_text: "4番線停車", off_text: "4番線進行", image: "image/sasazuka_s4_off.png", on_image: "image/sasazuka_s4_on.png", off_image: "image/sasazuka_s4_off.png", class:"btn btn-outline-info control-btn" }
        },
        branchs:{
            b1: { text: "新宿方面", status: false, on_text: "本八幡方面", off_text: "新宿方面", image: "image/sasazuka_b1_off.png", on_image: "image/sasazuka_b1_on.png", off_image: "image/sasazuka_b1_off.png", class:"btn btn-outline-dark control-btn" }
        }
    },
    kitano:{
        stops:{
            s2: { text: "2番線進行", status: false, on_text: "2番線停車", off_text: "2番線進行", image: "image/kitano_s2_off.png", on_image: "image/kitano_s2_on.png", off_image: "image/kitano_s2_off.png", class:"btn btn-outline-info control-btn" },
            s3: { text: "3番線進行", status: false, on_text: "3番線停車", off_text: "3番線進行", image: "image/kitano_s3_off.png", on_image: "image/kitano_s3_on.png", off_image: "image/kitano_s3_off.png", class:"btn btn-outline-info control-btn" }
        },
        branchs:{
            b1: { text: "京王八王子方面", status: false, on_text: "高尾山口方面", off_text: "京王八王子方面", image: "image/kitano_b1_off.png", on_image: "image/kitano_b1_on.png", off_image: "image/kitano_b1_off.png", class:"btn btn-outline-dark control-btn" }
        }
    }
}

const vue = new Vue({
    el:'#app',
    data:{
        selected_station:"",
        stations:stations,
        camera_peerids:{},
        theirID:"all"
    },
    methods:{
        push_btn:async function(station,is_stop,operable_id) {
            console.log(operable_id)
            if (is_stop) {
                stations[station].stops[operable_id].status = !stations[station].stops[operable_id].status;
                stations[station].stops[operable_id].image = (stations[station].stops[operable_id].status ? stations[station].stops[operable_id].on_image : stations[station].stops[operable_id].off_image);
                stations[station].stops[operable_id].text = (stations[station].stops[operable_id].status ? stations[station].stops[operable_id].on_text : stations[station].stops[operable_id].off_text);
                stations[station].stops[operable_id].class = (stations[station].stops[operable_id].status ? "btn btn-info control-btn" : "btn btn-outline-info control-btn");
                
                await sendOperate(station,station + "_" + operable_id, "switch", (stations[station].stops[operable_id].status ? "On" : "Off"));
            } 
            else {
                stations[station].branchs[operable_id].status = !stations[station].branchs[operable_id].status;
                stations[station].branchs[operable_id].image = (stations[station].branchs[operable_id].status ? stations[station].branchs[operable_id].on_image : stations[station].branchs[operable_id].off_image);
                stations[station].branchs[operable_id].text = (stations[station].branchs[operable_id].status ? stations[station].branchs[operable_id].on_text:stations[station].branchs[operable_id].off_text);
                stations[station].branchs[operable_id].class = (stations[station].branchs[operable_id].status ? "btn btn-dark control-btn" : "btn btn-outline-dark control-btn");
                
                await sendOperate(station,station + "_" + operable_id, "switch", (stations[station].branchs[operable_id].status ? "On" : "Off"));
            }
        }
    },
    mounted:function(){
        const url = 'https://us-central1-koken-key.cloudfunctions.net/referPeerid';

        fetch(url)
        .then(function (data) {
            return data.json(); // 読み込むデータをJSONに設定
        })
        .then(function (json) {
            this.camera_peerids = json
        });
    },
    watch:{
        selected_station:function(selected_station){
            makeCall(camera_peerids[selected_station].peer_id)
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
    document.getElementById("describe-text").hidden = value;
}

function setImagetbPadding(value) {
    document.getElementById("imagebox").style.setProperty('padding-top', value);
    document.getElementById("imagebox").style.setProperty('padding-bottom', value);
}

async function loadChofu() {
    //client_image_height_keio = document.getElementById("image").clientHeight;
    document.getElementById("image").src = img["chofu"].src;
    // document.getElementById("layer1").src = img["chofu_b1_off"].src;
    // document.getElementById("layer1").hidden = false;
    // document.getElementById("layer2").src = img["chofu_b2_off"].src;
    // document.getElementById("layer2").hidden = false;
    // document.getElementById("layer3").src = img["chofu_b3_off"].src;
    // document.getElementById("layer3").hidden = false;
    // document.getElementById("layer4").src = img["chofu_s1_off"].src;
    // document.getElementById("layer4").hidden = false;
    // document.getElementById("layer5").src = img["chofu_s2_off"].src;
    // document.getElementById("layer5").hidden = false;
    // document.getElementById("layer6").src = img["chofu_s3_off"].src;
    // document.getElementById("layer6").hidden = false;
    // document.getElementById("layer7").src = img["chofu_s4_off"].src;
    // document.getElementById("layer7").hidden = false;
    setStationButtonHidden(true);
    setImagetbPadding("0");

    vue.selected_station = "chofu";
    //await getToken("chofu");
    //setInterval("(async () => { await updateToken(); })()", 10000);
}

async function loadMeidaimae() {
    //client_image_height_keio = document.getElementById("image").clientHeight;
    document.getElementById("image").src = img["meidaimae"].src; 
    // document.getElementById("layer1").src = img["meidaimae_s1_off"].src;
    // document.getElementById("layer1").hidden = false;
    // document.getElementById("layer2").src = img["meidaimae_s2_off"].src;
    // document.getElementById("layer2").hidden = false;
    setStationButtonHidden(true);
    setImagetbPadding("0");

    vue.selected_station = "meidaimae";
    //await getToken("meidaimae");
    //setInterval("(async () => { await updateToken(); })()", 10000);
}

async function loadKitano() {
    //client_image_height_keio = document.getElementById("image").clientHeight;
    document.getElementById("image").src = img["kitano"].src;
    // document.getElementById("layer1").src = img["kitano_b1_off"].src;
    // document.getElementById("layer1").hidden = false;
    // document.getElementById("layer2").src = img["kitano_s2_off"].src;
    // document.getElementById("layer2").hidden = false;
    // document.getElementById("layer3").src = img["kitano_s3_off"].src;
    // document.getElementById("layer3").hidden = false;
    setStationButtonHidden(true);
    setImagetbPadding("0");

    vue.selected_station = "kitano";
    //await getToken("kitano");
    //setInterval("(async () => { await updateToken(); })()", 10000);
}

async function loadSasazuka() {
    //client_image_height_keio = document.getElementById("image").clientHeight;
    document.getElementById("image").src = img["sasazuka"].src;
    // document.getElementById("layer1").src = img["sasazuka_b1_off"].src;
    // document.getElementById("layer1").hidden = false;
    // document.getElementById("layer2").src = img["sasazuka_s1_off"].src;
    // document.getElementById("layer2").hidden = false;
    // document.getElementById("layer3").src = img["sasazuka_s2_off"].src;
    // document.getElementById("layer3").hidden = false;
    // document.getElementById("layer4").src = img["sasazuka_s4_off"].src;
    // document.getElementById("layer4").hidden = false;
    setStationButtonHidden(true);
    setImagetbPadding("0");

    vue.selected_station = "sasazuka";
    //await getToken("sasazuka");
    //setInterval("(async () => { await updateToken(); })()", 10000);
}

async function backToWholeImage() {    
    //client_image_height_sta = document.getElementById("image").clientHeight;
    document.getElementById("image").src = img["keio"].src;
    // document.getElementById("layer1").hidden = true;
    // document.getElementById("layer2").hidden = true;
    // document.getElementById("layer3").hidden = true;
    // document.getElementById("layer4").hidden = true;
    // document.getElementById("layer5").hidden = true;
    // document.getElementById("layer6").hidden = true;
    // document.getElementById("layer7").hidden = true;
    setStationButtonHidden(false);
    setImagetbPadding("17.1%");
    vue.selected_station = "";
 
    const url = 'https://us-central1-koken-key.cloudfunctions.net/referPeerid';
    fetch(url)
    .then(function (data) {
        return data.json(); // 読み込むデータをJSONに設定
    })
    .then(function (json) {
        this.camera_peerids = json
    });
}

async function checkToken() {
    let order = await updateToken();
    if (order['Order'] == 1) {
        stations.forEach(station => {
            station.stops.forEach(operable => {
                operable.status = false;
                operable.image = operable.off_image;
                operable.text = operable.off_text;
                operable.class = "btn btn-outline-info control-btn";
            });
            station.branchs.forEach(operable => {
                operable.status = false;
                operable.image = operable.off_image;
                operable.text = operable.off_text;
                operable.class = "btn btn-outline-dark control-btn";
            });
        });
        await sendOperate("train", "speed", 49);
    }
    else {
        alert("他の人が使用中です！");
        console.error("Another person is in operation!");
    }
}

//alert(getLog());
(async () => {
    //await getToken("train");
    //setInterval("(async () => { await checkToken(); })()", 10000);
})();
async function displaySpeed(obj) {
    document.getElementById('speedvalue').value = obj.value;
    await sendOperate("train", "train", "speed", parseInt(obj.value) + 50);
}