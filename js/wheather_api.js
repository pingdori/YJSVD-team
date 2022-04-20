const url = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0002-001?";


const period = {
    10: "MIN_10",
    3: "HOUR_3",
    24: "HOUR_24"
}

const station_in_city = {
    "臺北市": 0,
    "新北市": 0,
    "桃園市": 0,
    "臺中市": 0,
    "臺南市": 0,
    "高雄市": 0
}//各直轄市的觀測站數量


const precipitation_in_city = {
    "臺北市": 0,
    "新北市": 0,
    "桃園市": 0,
    "臺中市": 0,
    "臺南市": 0,
    "高雄市": 0
}// 雨量單位：毫米

let info = {
    "Authorization": "CWB-90659942-2307-4DC2-9510-FB641B82269F",
    "format": "JSON",
    "offset": 0,
    "elementName": "HOUR_24",
    "parameterName": "CITY",
}

let dist = {}//各區降雨量

get_precipitation_in_Municipality(null, 24)
console.log('station_in_city :>> ', station_in_city);
console.log('precipitation_in_city :>> ', precipitation_in_city);

function formatUrl(info) {
    return JSON.stringify(info).replace(/\:/g, "=").replace(/\,/g, "&").replace(/\{/g, "").replace(/\}/g, "").replace(/\"/g, "");//將json變為字串
}


async function get_precipitation_in_Municipality(district, p) {
    info["elementName"] = period[p];
    //拿所有資料
    const url_api = url + formatUrl(info)
    const res = await (await fetch(url_api)).json()
    const data = res.records.location
    //篩選
    if (district) {
        filterRainData(data, district)
    } else {
        for (const key in station_in_city) {
            filterRainData(data, key)
        }
    }
}

function filterRainData(data, district) {
    const filterData = data.filter(item => item.parameter[0].parameterValue === district)
    console.log('filterData :>> ', district, filterData);
    const sum = filterData.reduce((pre, cur) => {
        let curValue = cur.weatherElement[0]?.elementValue < 0 ? 0 : Number(cur.weatherElement[0]?.elementValue)
        return pre + curValue
    }, 0)
    const averageRainDrop = sum / filterData.length
    station_in_city[district] = filterData.length
    precipitation_in_city[district] = averageRainDrop
}


