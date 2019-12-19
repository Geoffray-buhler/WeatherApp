const nameOfCities = document.getElementById('cities__Name'),
      infoOfCities = document.getElementById('info__Cities'),
      btnOfCities = document.getElementById('input__meteo'),
      contcard = document.getElementById('cont-card'),
      infod1 = document.getElementById('day-1'),
      infod2 = document.getElementById('day-2'),
      infod3 = document.getElementById('day-3'),
      infod4 = document.getElementById('day-4'),
      videoBg = document.getElementById('bg-video'),
      bgVideoCard1 = document.getElementById('bg-card1-video'),
      bgVideoCard2 = document.getElementById('bg-card2-video'),
      bgVideoCard3 = document.getElementById('bg-card3-video'),
      bgVideoCard4 = document.getElementById('bg-card4-video');

const daysElements = [infod1, infod2, infod3, infod4];
const daysVideos = [bgVideoCard1, bgVideoCard2, bgVideoCard3, bgVideoCard4]

function ask_weather() {
    const valueOfCities = btnOfCities.value;
    fetch(`https://www.prevision-meteo.ch/services/json/${valueOfCities}`)
        .then(res => res.json())
        .then(data => {
            videoBg.setAttribute("src", getBackground(data.current_condition.condition_key));

            infoOfCities.innerHTML = `
            <h3>${data.current_condition.date}</h3>
            <img src="${data.current_condition.icon_big}">
            <h3>${data.current_condition.condition}</h3>
            <h2>${data.current_condition.tmp}º</h2>
            <h5>Lever du soleil : ${data.city_info.sunrise}.</h5>
            <h5>Coucher du soleil : ${data.city_info.sunset}.</h5>` ;

            nameOfCities.innerHTML = `<h2>${data.city_info.name}</h2>` ;
             for (let i = 1; i < 5; i++) {
                let nmb = `fcst_day_${i}`;
                 
                daysVideos[i-1].setAttribute("src", getBackground(data[nmb].condition_key));
            
                daysElements[i-1].innerHTML = `<h5>${data[nmb].day_long}</h5>
                                <p>${data[nmb].date}</p>
                                <h3>${data[nmb].tmin}º - ${data[nmb].tmax}º</h3>
                                <img src="${data[nmb].icon}">
                                <p>${data[nmb].condition}</p>`;

            }                    
        })
        .catch(err => console.error(err))
}

const dict = {
    ensoleille: "img.PNG"
}

function getBackground(conditionKey){
    // return dict[conditionKey] || "default.PNG";

    switch(conditionKey){
        case "ensoleille":
        case "eclaircies":
            return "./video/Aerial.mp4"; //@TODO
        case "pluie-faible":
        case "pluie-forte":
        case "pluie-moderee":
        case "faiblement-orageux":
            return "./video/Rain.mp4";
        case "ciel-voile":
        case "fortement-nuageux":
        case "brouillard":
        case "stratus":
            return "./video/Clouds.mp4";
        case "":
            return "./video/Landscape.mp4";
        default:
            return "#" //@TODO
    }
}

// function searchcity() {
//     fetch(`https://cors-anywhere.herokuapp.com/https://www.prevision-meteo.ch/services/json/list-cities`)
//         .then(res => res.json())
//         .then(data => {
//             data.forEach(data => {
//                 nameOfCities.push(data.name)
//             });
//         })
//     .catch(err => console.error(err))
// }

// btnOfCities.addEventListener("change", function(e){
//     e.preventDefault();
//     searchcity();
//     $('.dropdown-toggle').dropdown()
// })

btnOfCities.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        e.preventDefault();
        ask_weather()
    }
})