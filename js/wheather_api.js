const url="https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0002-001?";
let info={
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

let dist={}//各區降雨量

let info_to_string=JSON.stringify(info).replace(/\:/g, "=").replace(/\,/g, "&").replace(/\{/g, "").replace(/\}/g, "").replace(/\"/g, "");//將json變為字串
let url_api=url+info_to_string;

export async function get_24h_precipitation_in_Municipality(district){
    info["elementName"]="HOUR_24";
    return await fetch(url_api).then(response=>{
        return response.json();
    }).then(result=>{
        return result["records"]["location"];
    }).then(data=>{
        if(district){
            for (let i=0;i<data.length;i++){//跑全部資料
                if (data[i]["parameter"][0]["parameterValue"] == district){//判斷是否為6都資料
                    if(data[i]["weatherElement"][0]["elementValue"]<0){//當6都資料中的雨量小於0
                        continue;//進入下一個迴圈(剔除異常資訊)
                    }
                    dist[data[i]["locationName"]]=Number(data[i]["weatherElement"][0]["elementValue"]);//個觀測站雨量
                }
            }
            console.log(dist);
            return dist;
        }else{
            for (let i=0;i<data.length;i++){//跑全部資料
                if (data[i]["parameter"][0]["parameterValue"] in precipitation_in_city){//判斷是否為6都資料
                    if(data[i]["weatherElement"][0]["elementValue"]<0){//當6都資料中的雨量小於0
                        continue;//進入下一個迴圈(剔除異常資訊)
                    }
                    precipitation_in_city[data[i]["parameter"][0]["parameterValue"]]+=Number(data[i]["weatherElement"][0]["elementValue"]);//計算六都總雨量
                    station_in_city[data[i]["parameter"][0]["parameterValue"]]++;//觀測站數量+1
                }
            }
            for (key in precipitation_in_city){//將總雨量除以觀測站數量得到六都24H平均雨量
                precipitation_in_city[key]=precipitation_in_city[key]/station_in_city[key];
            }
            console.log(precipitation_in_city);
            return precipitation_in_city;
        }
    })
}

export async function get_3h_precipitation_in_Municipality(district){
    info["elementName"]="HOUR_3";
    return await fetch(url_api).then(response=>{
        return response.json();
    }).then(result=>{
        return result["records"]["location"];
    }).then(data=>{
        if(district){
            for (let i=0;i<data.length;i++){//跑全部資料
                if (data[i]["parameter"][0]["parameterValue"] == district){//判斷是否為6都資料
                    if(data[i]["weatherElement"][0]["elementValue"]<0){//當6都資料中的雨量小於0
                        continue;//進入下一個迴圈(剔除異常資訊)
                    }
                    dist[data[i]["locationName"]]=Number(data[i]["weatherElement"][0]["elementValue"]);//計算六都總雨量
                }
            }
            console.log(dist);
            return dist;
        }else{
            for (let i=0;i<data.length;i++){//跑全部資料
                if (data[i]["parameter"][0]["parameterValue"] in precipitation_in_city){//判斷是否為6都資料
                    if(data[i]["weatherElement"][0]["elementValue"]<0){//當6都資料中的雨量小於0
                        continue;//進入下一個迴圈(剔除異常資訊)
                    }
                    precipitation_in_city[data[i]["parameter"][0]["parameterValue"]]+=Number(data[i]["weatherElement"][0]["elementValue"]);//計算六都總雨量
                    station_in_city[data[i]["parameter"][0]["parameterValue"]]++;//觀測站數量+1
                }
            }
            for (key in precipitation_in_city){//將總雨量除以觀測站數量得到六都24H平均雨量
                precipitation_in_city[key]=precipitation_in_city[key]/station_in_city[key];
            }
            console.log(precipitation_in_city);
            return precipitation_in_city;
        }
    })
}

export async function get_10m_precipitation_in_Municipality(district){
    info["elementName"]="MIN_10";
    return await fetch(url_api).then(response=>{
        return response.json();
    }).then(result=>{
        return result["records"]["location"];
    }).then(data=>{
        if(district){
            for (let i=0;i<data.length;i++){//跑全部資料
                if (data[i]["parameter"][0]["parameterValue"] == district){//判斷是否為6都資料
                    if(data[i]["weatherElement"][0]["elementValue"]<0){//當6都資料中的雨量小於0
                        continue;//進入下一個迴圈(剔除異常資訊)
                    }
                    dist[data[i]["locationName"]]=Number(data[i]["weatherElement"][0]["elementValue"]);//計算六都總雨量
                }
            }
            console.log(dist);
            return dist;
        }else{
            for (let i=0;i<data.length;i++){//跑全部資料
                if (data[i]["parameter"][0]["parameterValue"] in precipitation_in_city){//判斷是否為6都資料
                    if(data[i]["weatherElement"][0]["elementValue"]<0){//當6都資料中的雨量小於0
                        continue;//進入下一個迴圈(剔除異常資訊)
                    }
                    precipitation_in_city[data[i]["parameter"][0]["parameterValue"]]+=Number(data[i]["weatherElement"][0]["elementValue"]);//計算六都總雨量
                    station_in_city[data[i]["parameter"][0]["parameterValue"]]++;//觀測站數量+1
                }
            }
            for (key in precipitation_in_city){//將總雨量除以觀測站數量得到六都24H平均雨量
                precipitation_in_city[key]=precipitation_in_city[key]/station_in_city[key];
            }
            console.log(precipitation_in_city);
            return precipitation_in_city;
        }
    })
}

// get_24h_precipitation_in_Municipality(null);
// get_3h_precipitation_in_Municipality(null);
// get_10m_precipitation_in_Municipality(null);

// get_24h_precipitation_in_Municipality("桃園市");
// get_3h_precipitation_in_Municipality("桃園市");
// get_10m_precipitation_in_Municipality("桃園市");