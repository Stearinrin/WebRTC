async function GetHttp(url, queries){
    const targetURL = (()=>{
        if(queries){
            const queryStrings = Object.entries(queries).map(([key, value]) => `${key}=${value}`)
            const queryString = queryStrings.reduce((prev,cur)=>`${prev}&${cur}`)
            return `${url}?${queryString}`
        }
        return url
    })()

    console.log(targetURL)

  console.log(url);

  fetch(targetURL)
    .then(function (data) {
      return data.json(); // 読み込むデータをJSONに設定
    })
    .then(function (json) {
      console.log(json)
    });


    // const getData = async () => {
    //     try {
    //       /*const response = await fetch(targetURL, { 
    //         mode: 'no-cors'
    //       });*/
    //       xhr = new XMLHttpRequest();
    //       //xhr.setRequestHeader('Content-Type', 'application/json');
    //       xhr.open("GET", targetURL, true);
    //       xhr.send();
    //       const response = xhr.responseText;
    //       xhr.abort();
    //       if (response.status == 200) {
    //         const jsonResponse = JSON.parse(response); //await response.json();
    //         return jsonResponse
    //       }else{
    //         console.log(response)
    //       }
    //       throw new Error('Request done!');
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    // return await getData();
}

async function PostHttp(url){
    const getData = async () => {
        try {
          /*const response = await fetch(url, {
            method:"POST",
            mode: 'no-cors'
          });*/
          xhr = new XMLHttpRequest();
          //xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.open("POST", targetURL, true);
          xhr.send();
          const response = xhr.responseText;
          xhr.abort();
          if (response.status == 200) {
            const jsonResponse = JSON.parse(response); //await response.json();
            return jsonResponse
          } else {
            console.log(response)
          }
          throw new Error('Request failed!');
        } catch (error) {
          console.log(error);
        }
      }
    return await getData();
}

//const endpoint = "http://localhost:8080"
const endpoint = "https://gcp.pfpfdev.net"

async function getDevicesList(){
    const url = `${endpoint}/devices`
    return await GetHttp(url)
}

async function getDeviceDetail(deviceName){
    const url = `${endpoint}/devices/${deviceName}`
    return await GetHttp(url)
}

async function getUnitsList(){
    const url = `${endpoint}/units`
    return await GetHttp(url)
}

var UnitName;
var Token;

function getToken(unitName){
    UnitName = unitName;
    const url = `${endpoint}/units/${unitName}`
    const res = PostHttp(url);
    console.log(res);
    //Token = res.Token;
    //alert(Token);
}

async function updateToken(){
    const url = `${endpoint}/units/${UnitName}`
    return await GetHttp(url,{"token":Token})
}

async function getUnitDetail(unitName){
    const url = `${endpoint}/units/${UnitName}`
    return await GetHttp(url)
}

async function sendOperate(stationname,operableName,cmd,arg){
  const url = `${endpoint}/units/${stationname}/${operableName}`
    return await GetHttp(url,{cmd,arg,"token":Token})
}

var logOffset = 0;
async function getLog(){
    const url = `${endpoint}/units/${UnitName}/${operableName}`
    const res = GetHttp(url,{offset:logOffset})
    logOffset = res.offset
    return res
}

