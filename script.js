const input = document.querySelector('input');
const button = document.querySelector('button');
const img = document.querySelector('img');

const city = document.querySelector("#city");
const degree = document.querySelector("#degree");

const content = document.querySelector(".content");

button.addEventListener("click", () => {
    if(!input.value) return;
    getWeatherData();
});
async function getWeatherData(){
    let urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input.value)}&units=metric&APPID=c01ae4515823a6004626c2e9d5ead192`
    try{
        await fetch(urlApi)
        .then((res)=> res.json())
        .then((data)=>{
            if(data?.cod && data.cod === "404"){
                return alert("Cidade não encontrada.");
            }
            localWeatherInfo(data);
        })
    }catch (error){
        alert(error);
    }
}
function localWeatherInfo(data){
    city.innerHTML = `${data.name}, ${data.sys.country}`;
    degree.innerHTML = `Temperatura: ${Math.floor(data.main.temp)}º C`;
    img.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    content.style.display = "flax";
}