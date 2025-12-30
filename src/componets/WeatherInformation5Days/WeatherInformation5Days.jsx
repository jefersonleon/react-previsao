import './WeatherInformation5Days.css'

function WeatherInformation5Days({ weather5Days }) {
    
    // 1. Trava de segurança: Se os dados ainda não chegaram ou a lista não existe, não renderiza nada
    if (!weather5Days || !weather5Days.list) {
        return null;
    }

    // 2. Lógica para agrupar as previsões por dia (visto que a API envia de 3 em 3 horas)
    let dailyForecast = {}

    for (let forecast of weather5Days.list) {
        const date = new Date(forecast.dt * 1000).toLocaleDateString();

        if (!dailyForecast[date]) {
            dailyForecast[date] = forecast;
        }
    }

    // Transformamos o objeto em array e pegamos os próximos 5 dias (excluindo o atual)
    const next5DaysForecast = Object.values(dailyForecast).slice(1, 6);

    // 3. Função para converter a data no nome do dia (ex: "segunda-feira")
    function convertDate(date) {
        const newDate = new Date(date.dt * 1000).toLocaleDateString('pt-BR', { weekday: 'long' });
        return newDate;
    }

    return (
        <div className="weather-container">
            <h3>Previsão para os próximos 5 dias</h3>
            
            <div className="weather-list">
                {next5DaysForecast.map(forecast => (
                    <div key={forecast.dt} className="weather-item">
                        {/* Mostra o dia da semana real dinamicamente */}
                        <p className="forecast-day">{convertDate(forecast)}</p>
                        
                        <img 
                            src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`} 
                            alt={forecast.weather[0].description} 
                        />
                        
                        <p className="forecast-description">{forecast.weather[0].description}</p>
                        
                        <p className="forecast-temp">
                            {Math.round(forecast.main.temp)}°C Máx / {Math.round(forecast.main.feels_like)}°C Mín
                        </p>    
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WeatherInformation5Days;