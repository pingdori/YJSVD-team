# 六都即時雨量資訊

## 簡介

本專案透過中央氣象局開放資料平臺之資料，擷取[API](https://opendata.cwb.gov.tw/dist/opendata-swagger.html)以文字的方式展示六都的即時雨量

專案需求：（待更新）

範例：（待更新）

## 目錄

> * [前端架構](#前端架構)
>   * [前端開發](#前端開發)
>   * [開發工具](#開發工具)
>   * [專案資料夾目錄](#專案資料夾目錄)
>   * [程式碼規範](#程式碼規範)
>   * [參數說明](#參數說明)
> * [開發流程](#開發流程)
>   * [小組討論](#小組討論)
>   * [撰寫前端程式碼](#撰寫前端程式碼)
>   * [合併程式碼](#合併程式碼)
> * [網頁功能](#網頁功能)
> * [參考資料](#參考資料)
> * [Contributors](#Contributors)

## 前端架構

### 前端開發

- HTML
- CSS：採BEM命名法、以Grid實踐RWD
- JavaScript：串接中央氣象局開放資料平臺之資料API

### 開發工具
- 採 Git/GitHub 來進行版本控管

### 專案資料夾目錄
#### css:
- document-reset
- customize-reset
- index

#### js:

- index
- weather_api

#### images:
- logo.png

### 程式碼規範(待更新)

### 參數說明(待更新)

## 開發流程
### 小組討論
#### 分工如下：

- API 串接 : 尹騰慶
- 前端畫面切版 ：蔡明達
- 定義框架、製作與報告 PPT：黃上科
- Code Review、參數說明、READEME彙整 ：郭德荃
- 寫說明文件 document、開Repository：李蕙萍
#### 網頁畫面與功能參考：
- 請參閱參考資料之[數據看台灣，台灣即時雨量資訊](https://www.taiwanstat.com/)
#### 目標確認：
- 運用`Git/GitHub`來建立團隊合作流程，並藉由討論、分享、實作等使團隊成員能增加團隊合作之經驗。
### 撰寫前端程式碼：
- 畫面切版
- API串接
### 合併程式碼
- 從本機`develop`分支上傳至`GitHub`並創建`New pull requests`，待小組成員`Review`畢，再`Merge`至`main`分支
## 網頁功能
- 網頁即時呈現六都即時雨量：

   - 10分鐘平均累積雨量0.00
   - 3小時平均累積雨量0.00
   - 日平均累積雨量0.00

- 滑鼠單擊「點擊觀看」即可呈現當直轄市各區即時雨量

- 點擊不同直轄市，背景城市畫面會進行更動
## 參考資料
[氣象資料開放平台-開發指南](https://opendata.cwb.gov.tw/devManual/insrtuction)

[中央氣象局開放資料平臺之資料擷取API](https://opendata.cwb.gov.tw/dist/opendata-swagger.html)

[數據看台灣，台灣即時雨量資訊](https://www.taiwanstat.com/)


## Contributors

1. [TWcamel](https://github.com/TWcamel)
   - Build project structure
   - code review
2. [Doris](https://github.com/pingdori)
   - Build this repository
   - code review
3. [Jeff](https://github.com/JackTsai890405)
   - Front-end developer
   - code review