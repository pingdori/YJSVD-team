# ☔ 六都即時雨量資訊

## 🍹 簡介

本專案透過中央氣象局開放資料平臺之資料，擷取[API](https://opendata.cwb.gov.tw/dist/opendata-swagger.html)以文字的方式展示六都的即時雨量，並呈現24小時內的台灣整體觀測雨量

![screen shot](./images/screen%20shot.gif "screen shot")
![screen shot](./images/Screen%20Shot%202022-04-21%20at%209.06.00%20PM.png)

## 🛠️ 功能

### 網頁即時呈現六都即時雨量

⛱️ 10 分鐘平均累積雨量 0.00<br>
⛱ 3 小時平均累積雨量 0.00<br>
⛱ 日平均累積雨量 0.00<br>

🖱️ 滑鼠單擊「點擊觀看」即可呈現當直轄市各區即時雨量

🖼️ 點擊不同直轄市，背景城市畫面會進行更動

🌏 另有24小時內的台灣整體觀測雨量

## 📂 目錄

>   - [☔ 六都即時雨量資訊](#-六都即時雨量資訊)
>     - [🍹 簡介](#-簡介)
>     - [🛠️ 功能](#️-功能)
>       - [網頁即時呈現六都即時雨量](#網頁即時呈現六都即時雨量)
>     - [📂 目錄](#-目錄)
>     - [✨ 架構](#-架構)
>       - [前端開發](#前端開發)
>       - [開發工具](#開發工具)
>       - [程式碼規範](#程式碼規範)
>       - [參數說明](#參數說明)
>     - [📑 開發流程](#-開發流程)
>       - [網頁畫面與功能參考](#網頁畫面與功能參考)
>       - [目標確認](#目標確認)
>       - [專案管理](#專案管理)
>       - [專案分支整併](#專案分支整併)
>     - [🖇️ 參考資料](#️-參考資料)
>     - [😎 Contributors](#-contributors)


## ✨ 架構

### 前端開發

- HTML
- CSS：採 BEM 命名法、以 Grid 實踐 RWD
- JavaScript：串接中央氣象局開放資料平臺之資料 API、Google Maps APIs的串接應用

### 開發工具

- 採 Git/GitHub 來進行版本控管

### 程式碼規範
- CSS：採 BEM 命名法。如：`raindrop__intro--hint` 
- Javascript：
   - Variable, Arguments: 蛇型命名法(Snake case)。如： `station_in_city`
   - Function: 蛇型命名法(Snake case)。如：`get_precipitation_in_municipality()`

### 參數說明

| 參數名稱              | 資料類型  | 取值範圍 | 說明                         |
| --------------------- | --------- | -------- | ---------------------------- |
| url                   | string    | -        | API 前綴                     |
| info                  | key/value | -        | API 授權內容                 |
| station_in_city       | key/value | -        | 各直轄市的觀測站數量         |
| precipitation_in_city | key/value | -        | 雨量單位：毫米               |
| dist                  | Object    | -        | 放各區降雨量                 |
| info_to_string        | string    | -        | 將 json 變為字串             |
| map                   | Object    | -        | new google map object       |
| locations             | array     | -        | 觀測站地點                    |
| heatmap_data           | array     | -        | 放 Heatmap 的資料陣列         |
| rain_data              | Object    | -        | 放入權重至指定地點             |
| heatmap               | string    | -        | new heatmap object          |

## 📑 開發流程

### 網頁畫面與功能參考

- 參閱參考資料之[數據看台灣，台灣即時雨量資訊](https://www.taiwanstat.com/)

### 目標確認

- 使用網頁技術串接氣象資料開放平台API，即時呈現六都即時雨量
- 運用`Git/GitHub`來建立團隊合作流程，並藉由討論、分享、實作等使團隊成員能增加團隊合作之經驗

### 專案管理
- [此專案管理連結請點此](https://www.notion.so/a9aaa5066ce34dd9b5c7c078119d4161)
- 流程圖
![screen shot](./images/Flowchart.png)
- 甘特圖
![screen shot](./images/Gantt_Char.png)

### 專案分支整併

- 從各個 downstream `develop` 分支上傳至個人 `GitHub` 帳號底下並於 Upstream 新建 `Pull Requests`，待小組成員 `Review` 完畢，再 `Merge` 至`main` 分支

## 🖇️ 參考資料

[氣象資料開放平台-開發指南](https://opendata.cwb.gov.tw/devManual/insrtuction)

[中央氣象局開放資料平臺之資料擷取 API](https://opendata.cwb.gov.tw/dist/opendata-swagger.html)

[數據看台灣，台灣即時雨量資訊](https://www.taiwanstat.com/)

[Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/overview#maps_map_simple-javascript)

## 😎 Contributors

1. [Sam](https://github.com/TWcamel)
   - 定義專案框架
   - 彙整並簡報此專案
   - Code Review
2. [Doris](https://github.com/pingdori)
   - 專案建立人
   - 梳理專案說明文件 
   - 專案管理
   - Code Review
3. [Jack](https://github.com/JackTsai890405)
   - 完成畫面切版
   - 樣式表建立
   - Code Review
4. [Vicky](https://github.com/vicky-playground)
   - 彙整專案 README
   - 熱點圖建立
   - Code Review
5. [Yin](https://github.com/Yintc123)
   - API 串接 
   - 完成前端 View 整合
   - Code Review
