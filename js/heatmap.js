function initMap() {
    let url= "https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/O-A0002-001?Authorization=CWB-90659942-2307-4DC2-9510-FB641B82269F&format=JSON&elementName=HOUR_24";

    fetch(url)
    .then(res => res.json())
    .then(res => {

    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 6.65,
      center: {
        lat: 23.7281136,
        lng: 118.6260081
      },
      mapTypeId: 'hybrid',
      zoomControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false
    });

    
    // 地點 
    let locations = res.cwbopendata.location;
    //console.log(locations)

    // 放 Heatmap 的資料陣列
    let heatmapData = [];

    // 處理每個資料
    locations.forEach(element => {

      //console.log(element)

      // 把雨量作為權重
      let weight = () => {

        /*
        0: {elementName: 'ELEV', elementValue: {…}}
        1: {elementName: 'RAIN', elementValue: {…}}
        2: {elementName: 'MIN_10', elementValue: {…}}
        3: {elementName: 'HOUR_3', elementValue: {…}}
        4: {elementName: 'HOUR_6', elementValue: {…}}
        5: {elementName: 'HOUR_12', elementValue: {…}}
        6: {elementName: 'HOUR_24', elementValue: {…}}
        7: {elementName: 'NOW', elementValue: {…}}
        8: {elementName: 'latest_2days', elementValue: {…}}
        9: {elementName: 'latest_3days', elementValue: {…}}
        */
        let w = Number(element.weatherElement[6].elementValue.value);

        // 遇到 -998、-999 時，表雨量為 0
        if(w == -998.00 || w == -999.00) { 
          return 0 
        }
        else { return w }

      };

      let rainData = {
        location: new google.maps.LatLng(element.lat, element.lon),
        weight: weight()
      };

      heatmapData.push(rainData);

    });

    // 生成 heatmap 
    let heatmap = new google.maps.visualization.HeatmapLayer({
      data: heatmapData,
      // 地圖放大縮小時，熱點圖是否要跟著加強。 false 就是會， true 就是不會
      dissipating: true, 
      // 外往內(密度低 -> 高)漸層
      gradient:  [
        'rgba(0, 0, 255, 0)',
        'rgba(50, 40, 255, 0.1)',
        'rgba(50, 40, 255, 0.2)',
        'rgba(50, 40, 255, 0.3)',
        'rgba(50, 40, 255, 0.4)',
        'rgba(50, 40, 255, 0.5)',
        'rgba(50, 40, 255, 0.6)',
        'rgba(50, 40, 255, 0.7)',
        'rgba(50, 40, 255, 0.8)',
        'rgba(50, 40, 255, 0.9)',
        'rgba(23, 120, 189, 1)',
        'rgba(60, 40, 255, 1)',
        'rgba(29, 35, 255, 1)'
      ],
      // 個別資料點的影響半徑，以像素為單位
      radius: 20,
      opacity:1
    });

    // 把 heatmap 放上 google map
    heatmap.setMap(map);

  });
}
