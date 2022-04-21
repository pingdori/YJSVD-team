const city_subtitle=document.getElementsByClassName("raindrop__subtitle mb-15");
const raindrop__button=document.getElementsByClassName("raindrop__button");

async function init(district){
    clean_content();
    let data_10m=await get_precipitation_in_Municipality(district, 10);
    let data_3h=await get_precipitation_in_Municipality(district, 3);
    let data_24h=await get_precipitation_in_Municipality(district, 24);

    for (let i=0;i<Object.keys(data_10m).length;i++){
        create_raindrop_item();
    }
    for (let i=0;i<city_subtitle.length;i++){
        if (district==null){
            raindrop__button[i].textContent="觀看資訊";
        }
        change_subtitle(data_10m, i);
        show_precipitation(data_10m, i, 0);
        show_precipitation(data_3h, i, 1);
        show_precipitation(data_24h, i, 2);
        
    }

    init_map();

    for (let i=0;i<raindrop__button.length;i++){
        raindrop__button[i].addEventListener("click", ()=>{
            if(raindrop__button[i].textContent=="返回"){
                window.location=window.location.href;
            }
            const title=document.getElementsByClassName("raindrop__subtitle mb-15")[i];
            city = raindropSubtitle[i];
            imagePath = cityImage[city.textContent];
            image.src = imagePath;
            container.appendChild(image);
            init(title.textContent);
        }) 
    }
}

function clean_content(){
    const raindrop=document.querySelector(".raindrop");
    while(raindrop.firstChild){
        raindrop.removeChild(raindrop.firstChild);
    }
}

function create_raindrop_item(){
    const raindrop=document.querySelector(".raindrop");
    const html=`
        <li class="raindrop__item">
            <h3 class="raindrop__subtitle mb-15">臺北市</h3>
            <ul class="raindrop__intro mb-15">
                <li class="mb-8">10分鐘平均累積雨量<span class="raindrop__intro--hint">0.00</span></li>
                <li class="mb-8">3小時平均累積雨量<span class="raindrop__intro--hint">0.00</span></li>
                <li>日平均累積雨量<span class="raindrop__intro--hint">0.00</span></li>
            </ul>
            <button class="raindrop__button">返回</button>
        </li>
    `
    raindrop.innerHTML+=html;
}

function change_subtitle(data, district_index){
    const title=document.getElementsByClassName("raindrop__subtitle mb-15")[district_index];
    title.textContent=Object.keys(data)[district_index];
}

function show_precipitation(data, district_index, list_index){
    const each_city=city_subtitle[district_index];
    const precipitation_value=document.getElementsByClassName("raindrop__intro--hint")[3*district_index+list_index];
    precipitation_value.textContent=data[each_city.textContent];
}

init(null);