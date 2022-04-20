const raindropSubtitle = document.querySelectorAll('.raindrop__item .raindrop__subtitle');
const raindropButton = document.querySelectorAll('.raindrop__button');
const container = document.querySelector('.container');

const cityImage = {
    '臺北市': './images/taipei.jpg',
    '高雄市': './images/kaohsiung.jpg',
    '新北市': './images/NewTaipeiCity.jpg',
    '臺中市': './images/taichung.jpg',
    '臺南市': './images/tainan.jpg',
    '桃園市': './images/taoyuan.jpg',
}

// 預先載入臺北市的背景圖片
const image = document.createElement('img')
image.className = "background__image";
image.src = './images/taipei.jpg'
container.appendChild(image);

let city
raindropButton.forEach((item, index, array) => {
    item.addEventListener('click', function () {
        city = raindropSubtitle[index];
        imagePath = cityImage[city.textContent];
        image.src = imagePath;
        container.appendChild(image);
    })
})
