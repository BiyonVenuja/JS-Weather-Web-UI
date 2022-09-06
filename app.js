var date = new Date();
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


document.querySelector('.day').innerText = days[date.getDay()]
document.querySelector('.date').innerText = date.getDate() + " " + month[date.getMonth()] + " " + date.getFullYear();



var req = new XMLHttpRequest();
var API_key = 'fbf83a131af9d067d60f6e1a6a7d32e9';
req.onreadystatechange = () => {
    if (req.readyState == 4) {
        let res = JSON.parse(req.responseText);
        if (res) {
            //front data
            document.querySelector('.weather-container').setAttribute('data','loaded');
            document.querySelector('.after').classList.add('none');
            document.querySelector('.loc').innerText = res['name'] + ", " + res['sys']['country'];
            document.querySelector('.temp').innerText = Math.floor(res['main']['temp']) + "°C";
            document.querySelector('.condition').innerText = res['weather'][0]['main'];
            document.querySelector('.emoticon').setAttribute('src', `http://openweathermap.org/img/wn/${res['weather'][0]['icon']}@4x.png`)

            //back data
            document.querySelector('.precip').innerText = res['rain']['1h']+"%";
            document.querySelector('.humid').innerText =res['main']['humidity']+"%";
            document.querySelector('.wind').innerText =res['wind']['speed']+" km/h";
        }
        

    }
}

navigator.geolocation.getCurrentPosition((loc) => {
    req.open('GET', `https://api.openweathermap.org/data/2.5/weather?lat=${loc.coords.latitude}&lon=${loc.coords.longitude}&units=metric&appid=c8a1912e4e5fe1199d97e53095d77db4`, true);
    req.send();
});


