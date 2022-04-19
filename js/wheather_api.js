const url="https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0002-001?";
const info={
    "Authorization":"CWB-90659942-2307-4DC2-9510-FB641B82269F",
    "format":"JSON",
    "offset":0,
    "elementName":"HOUR_24",
    "parameterName":"CITY",
}

let station_in_city={
    "臺北市":0,
    "新北市":0,
    "桃園市":0,
    "臺中市":0,
    "臺南市":0,
    "高雄市":0
}//各直轄市的觀測站數量


let precipitation_in_city={
    "臺北市":0,
    "新北市":0,
    "桃園市":0,
    "臺中市":0,
    "臺南市":0,
    "高雄市":0
}// 雨量單位：毫米

let info_to_string=JSON.stringify(info).replace(/\:/g, "=").replace(/\,/g, "&").replace(/\{/g, "").replace(/\}/g, "").replace(/\"/g, "");
let url_api=url+info_to_string

export async function get_precipitation_in_Municipality(){
    return await fetch(url_api).then(response=>{
        return response.json();
    }).then(result=>{
        return result["records"]["location"];
    }).then(data=>{
        for (let i=0;i<data.length;i++){
            if (data[i]["parameter"][0]["parameterValue"] in precipitation_in_city){
                if(data[i]["weatherElement"][0]["elementValue"]<0){
                    continue;
                }
                precipitation_in_city[data[i]["parameter"][0]["parameterValue"]]+=Number(data[i]["weatherElement"][0]["elementValue"]);
                station_in_city[data[i]["parameter"][0]["parameterValue"]]++;
            }
        }
        for (key in precipitation_in_city){
            precipitation_in_city[key]=precipitation_in_city[key]/station_in_city[key];
        }
        console.log(precipitation_in_city);
    })
}

get_precipitation_in_Municipality();