function initMap() {
    let url= "https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/O-A0002-001?Authorization=CWB-90659942-2307-4DC2-9510-FB641B82269F&format=JSON&elementName=DAY_3";

    fetch(url)
    .then(res => res.json())
    .then(res => {

    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center: {
        lat: 23.833090,
        lng: 121.563438
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

      // 把雨量作為權重
      let weight = () => {

        // 1：60分鐘。 2：10分鐘。 3：3小時。 4：6小時。 5：12小時。 6：24小時。 7：今天。 8：2天內。 9：3天內。
        let w = Number(element.weatherElement[9].elementValue.value.split('.')[0]);

        // 遇到 -998、-999 時，表雨量為 0
        if(w === -998 || w === -999) { 
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
        'rgba(23, 120, 189, 0.1)',
        'rgba(23, 120, 189, 0.2)',
        'rgba(23, 120, 189, 0.3)',
        'rgba(23, 120, 189, 0.4)',
        'rgba(23, 120, 189, 0.5)',
        'rgba(23, 120, 189, 0.6)',
        'rgba(23, 120, 189, 0.7)',
        'rgba(23, 120, 189, 0.8)',
        'rgba(23, 120, 189, 0.9)',
        'rgba(75, 97, 255, 1)',
        'rgba(29, 35, 255, 1)'
      ],
      // 個別資料點的影響半徑，以像素為單位
      radius: 15
    });

    // 把 heatmap 放上 google map
    heatmap.setMap(map);

  });
}
