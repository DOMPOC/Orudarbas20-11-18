var siandien = new  Date();
var date =siandien.getFullYear()+'-'+(siandien.getMonth()+1)+'-'+siandien.getDate();

let dataList = document.getElementById("miestai");
let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function (){
    if (xhr.readyState === 4 && xhr.status === 200){
        let miestas = JSON.parse(xhr.responseText);
        for (let i = 0; i < miestas.length; i++){
            let option = document.createElement("option");
            option.value = miestas[i].name;
            dataList.appendChild(option);
        }
    }
}

xhr.open("GET", "https://api.meteo.lt/v1/places");
xhr.send();

const btn = document.querySelector(".button");
const conditions = document.querySelector(".oras");
btn.addEventListener('click',getWeather)

function getWeather() {
    conditions.innerHTML = "";
    let xhr1 = new XMLHttpRequest();
    xhr1.onreadystatechange = function() {
        if (xhr1.readyState === 4 && xhr1.status === 200) {
            let weather = JSON.parse(xhr1.responseText);
            let tempsum = 0;
            let tempamount = 0;
            let header1 = document.createElement('h2');
            let textH1 = document.createTextNode(miestas.value + " " +date + " " + "Prognoze:")
            header1.appendChild(textH1);
            conditions.appendChild(header1);
            for (let i = 0; i < weather.forecastTimestamps.length; i++) {
                if (date === weather.forecastTimestamps[i].forecastTimeUtc.slice(0,10)) {
                    let para = document.createElement('p');
                    let textP = document.createTextNode(weather.forecastTimestamps[i].forecastTimeUtc.slice(10,30) + " " + ":" + " " + weather.forecastTimestamps[i].airTemperature + " " + '\u00B0C' + " " + translate(weather.forecastTimestamps[i].conditionCode));
                    para.appendChild(textP);
                    conditions.appendChild(para);
                    tempsum = tempsum + weather.forecastTimestamps[i].airTemperature;
                    tempamount = tempamount + 1;
                }
            }
            let para = document.createElement('p');
            let textP = document.createTextNode("Vidutine Temperatura:" + " " +(tempsum/tempamount).toFixed(1)+" "+"\u00B0C");
            para.appendChild(textP);
            conditions.appendChild(para);
        }
    }

    xhr1.open("GET", "https://api.meteo.lt/v1/places/"+kurismiestas()+"/forecasts/long-term");
    xhr1.send();
    }
function translate(name) {
    if (name === "clear") {name = "giedra"}
    else if (name === "isolated-clouds") {name = "mazai debesuota"}
    else if (name === "scattered-clouds") {name = "debesuota su pragiedruliais"}
    else if (name === "overcast") {name = "debesuota"}
    else if (name === "light-rain") {name = "nedidelis lietus"}
    else if (name === "moderate-rain") {name = "lietus"}
    else if (name === "heavy-rain") {name = "smarkus lietus"}
    else if (name === "sleet") {name = "slapdriba"}
    else if (name === "light-snow") {name = "nedidelis sniegas"}
    else if (name === "moderate-snow") {name = "sniegas"}
    else if (name === "heavy-snow") {name = "smarkus sniegas"}
    else if (name === "fog") {name = "rukas"}
    else if (name === "na") {name = "oro salygos nenustatytos."}
    else {name = "Neatpazinta."}
    return name;
}
function kurismiestas (){
    let which = "";
    let townnames = JSON.parse(xhr.responseText);

    for (let i = 0; i<townnames.length; i++){
        if (townnames[i].name=== miestas.value){
            which = townnames[i].code;
        }
    }
    return which;
    for (let i=0; i<weather.forecastTimestamps.length;i++){
        if (dataSelected === weather.forecastTimestamps[i].forecastTimeUtc.slice(0,10)){
            let tbody = document.createTextNode(weather.forecastTimestamps[i].forecastTimeUtc.slice(10,30));
            let temperatura = document.createTextNode(weather.forecastTimestamps[i].airTemperature+"C");

            let col = document.createElement('td');
            let col10 = document.createElement('td');
            let col11 = document.createElement('td');

            row.appendChild(col);
            row.appendChild(col10);
            row.appendChild(col11);

            col.appendChild(laikas);
            col10.appendChild(temperatura);

            let oras = document.createElement('i');
            switch (weather.forecastTimestamps[i].conditionCode){
                case "clear":
                    oras.classList.add("fas","fa-sun");
                    break;
                case "isolated-clouds":
                    oras.classList.add("fas","fa-cloud");
                    break;
                case "scattered-clouds":
                    oras.classList.add("fas","fa-cloud-sun");
                    break;
                case "overcast":
                    oras.classList.add("fas","fa-cloud-sun");
                    break;
                case "light-rain":
                    oras.classList.add("fas","fa-cloud-rain");
                    break;
                case "moderate-rain":
                    oras.classList.add("fas","fa-cloud-showers-heavy");
                    break;
                case "heavy-rain":
                    oras.classList.add("fas","fa-cloud-showers-heavy");
                    break;
                case "sleet":
                    oras.classList.add("fas","fa-cloud-meatball");
                    break;
                case "light-snow":
                    oras.classList.add("fas","fa-snowflake");
                    break;
                case "moderate-snow":
                    oras.classList.add("fas","fa-snowflake");
                    break;
                case "heavy-snow":
                    oras.classList.add("fas","fa-snowflake");
                    break;
                case "fog":
                    oras.classList.add("fas","fa-smog");
                    break;
                case "na":
                    oras.classList.add("fas","fa-question");
                    break;
            }
        col11.appendChild(oras);
        }
    }
}

