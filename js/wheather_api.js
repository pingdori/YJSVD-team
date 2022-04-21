const url="https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0002-001?";

const period={
        10:"MIN_10",
        3:"HOUR_3",
        24:"HOUR_24"
    }

const info={
    "Authorization":"CWB-90659942-2307-4DC2-9510-FB641B82269F",
    "format":"JSON",
    "offset":0,
    "elementName":"HOUR_24",
    "parameterName":"CITY",
}

async function get_precipitation_in_Municipality(district, p){
    const station_in_city={
        "臺北市":0,
        "新北市":0,
        "桃園市":0,
        "臺中市":0,
        "臺南市":0,
        "高雄市":0
    }//各直轄市的觀測站數量
    
    const precipitation_in_city={
        "臺北市":0,
        "高雄市":0,
        "新北市":0,
        "臺中市":0,
        "臺南市":0,
        "桃園市":0
    }// 雨量單位：毫米
    
    const dist={}//各區降雨量

    info["elementName"]=period[p];
    let info_to_string=JSON.stringify(info).replace(/\:/g, "=").replace(/\,/g, "&").replace(/\{/g, "").replace(/\}/g, "").replace(/\"/g, "");//將json變為字串
    let url_api=url+info_to_string;
    return await fetch(url_api).then(response=>{
        return response.json();
    }).then(result=>{
        return result["records"]["location"];
    }).then(data=>{
            for (let i=0;i<data.length;i++){//跑全部資料
                if(data[i]["weatherElement"][0]["elementValue"]<0){//當6都資料中的雨量小於0
                    data[i]["weatherElement"][0]["elementValue"]=0;//進入下一個迴圈(剔除異常資訊)
                }
                if (district){
                    if (data[i]["parameter"][0]["parameterValue"] == district){//判斷是否為指定直轄市資料
                        dist[data[i]["locationName"]]=Number(data[i]["weatherElement"][0]["elementValue"]).toFixed(2);//各觀測站雨量
                    }
                }else{
                    if (data[i]["parameter"][0]["parameterValue"] in precipitation_in_city){//判斷是否為6都資料
                        precipitation_in_city[data[i]["parameter"][0]["parameterValue"]]+=Number(data[i]["weatherElement"][0]["elementValue"]);//計算六都總雨量
                        station_in_city[data[i]["parameter"][0]["parameterValue"]]++;//觀測站數量+1
                    }
                }   
            }
            if (district){
                return dist;
            }else{
                for (key in precipitation_in_city){//將總雨量除以觀測站數量得到六都24H平均雨量
                    precipitation_in_city[key]=isNaN(precipitation_in_city[key]/station_in_city[key])?0:(precipitation_in_city[key]/station_in_city[key]).toFixed(2);
                }
                return precipitation_in_city;
            }       
    })
}