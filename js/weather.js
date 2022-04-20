async function get_precipitation_in_Municipality(district, p) {
    info["elementName"] = period[p];
    let info_to_string = JSON.stringify(info).replace(/\:/g, "=").replace(/\,/g, "&").replace(/\{/g, "").replace(/\}/g, "").replace(/\"/g, "");//將json變為字串
    let url_api = url + info_to_string;
    return await fetch(url_api).then(response => {
        return response.json();
    }).then(result => {
        return result["records"]["location"];
    }).then(data => {
        for (let i = 0; i < data.length; i++) {//跑全部資料
            if (district) {
                if (data[i]["parameter"][0]["parameterValue"] == district) {//判斷是否為指定直轄市資料
                    if (data[i]["weatherElement"][0]["elementValue"] < 0) {//當指定直轄市中的雨量小於0
                        continue;//進入下一個迴圈(剔除異常資訊)
                    }
                    dist[data[i]["locationName"]] = Number(data[i]["weatherElement"][0]["elementValue"]);//各觀測站雨量
                }
            } else {
                if (data[i]["parameter"][0]["parameterValue"] in precipitation_in_city) {//判斷是否為6都資料
                    if (data[i]["weatherElement"][0]["elementValue"] < 0) {//當6都資料中的雨量小於0
                        continue;//進入下一個迴圈(剔除異常資訊)
                    }
                    precipitation_in_city[data[i]["parameter"][0]["parameterValue"]] += Number(data[i]["weatherElement"][0]["elementValue"]);//計算六都總雨量
                    station_in_city[data[i]["parameter"][0]["parameterValue"]]++;//觀測站數量+1
                }
            }
        }
        if (district) {
            return dist;
        } else {
            for (key in precipitation_in_city) {//將總雨量除以觀測站數量得到六都24H平均雨量
                precipitation_in_city[key] = precipitation_in_city[key] / station_in_city[key];
            }
            return precipitation_in_city;
        }
    })
}