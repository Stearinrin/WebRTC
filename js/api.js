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

    const getData = async () => {
        try {
          const response = await fetch(targetURL, { 
            mode: 'no-cors'
          });
          if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse
          }
          throw new Error('Request failed!');
        } catch (error) {
          console.log(error);
        }
      }
    return await getData();
}

async function PostHttp(url){
    const getData = async () => {
        try {
          const response = await fetch(url, {
            method:"POST",
            mode: 'no-cors'
          });
          if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse
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

async function getToken(unitName){
    UnitName = unitName;
    const url = `${endpoint}/units/${unitName}`
    const res = await PostHttp(url)
    Token = res.Token
    console.log(Token);
}

async function updateToken(){
    const url = `${endpoint}/units/${UnitName}`
    GetHttp(url,{"token":Token})
}

async function getUnitDetail(unitName){
    const url = `${endpoint}/units/${UnitName}`
    return await GetHttp(url)
}

async function sendOperate(operableName,cmd,arg){
    const url = `${endpoint}/units/${UnitName}/${operableName}`
    return await GetHttp(url,{cmd,arg,"token":Token})
}

var logOffset = 0;
async function getLog(){
    const url = `${endpoint}/units/${UnitName}/${operableName}`
    const res = GetHttp(url,{offset:logOffset})
    logOffset = res.offset
    return res
}

