import './WeatherInformation.css'
function WeatherInformation({ weather }) {
    // Se por algum motivo o weather não tiver a lista de clima, não mostre nada
    if (!weather || !weather.weather || weather.weather.length === 0) {
        return null;
    }

    return (
        <div className="weather-container">
            <h2>{weather.name}</h2>
            <div className="weather-info">
                <img 
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} 
                    alt={weather.weather[0].description} 
                />
            </div>
            {/* O ?. garante que se main não existir, ele não trava o navegador */}
            <p className="temperature">{weather.main?.temp ? Math.round(weather.main.temp) : "--"}°C</p>
            <p className="description">{weather.weather[0].description}</p>
            <div className="details">
                <p>Umidade: {weather.main?.humidity}%</p>
                <p>Sensação térmica: {weather.main?.feels_like ? Math.round(weather.main.feels_like) : "--"}°C</p>
                <p>Pressão: {weather.main?.pressure} hPa</p>
                <p>Ventos: {weather.wind?.speed} m/s</p>
            </div>
        </div>
    );
}

export default WeatherInformation;