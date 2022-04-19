const raindropSubtitle = document.querySelectorAll('.raindrop__item .raindrop__subtitle');
const raindropButton = document.querySelectorAll('.raindrop__button');
const container = document.querySelector('.container');

const cityImage = {
    '臺北市': '../images/taipei.jpg',
    '高雄市': '../images/kaohsiung.jpg',
    '新北市': '../images/NewTaipeiCity.jpg',
    '臺中市': '../images/taichung.jpg',
    '臺南市': '../images/tainan.jpg',
    '桃園市': '../images/taoyuan.jpg',
}

let city
raindropButton.forEach((item, index, array) => {
    item.addEventListener('click', function () {
        const image = document.createElement('img')
        image.className = "background__image";
        city = raindropSubtitle[index];
        imagePath = cityImage[city.textContent];
        image.src = imagePath;
        container.appendChild(image);
    })
})