import { useState, useRef } from 'react'
import axios from 'axios'
import WeatherInformation from './componets/WeatherInformations/WeatherInformation.jsx'
import WeatherInformation5Days from './componets/WeatherInformation5Days/WeatherInformation5Days.jsx'
import './App.css'

function App() {
  // CORREÇÃO 1: Inicializar com null é boa prática para facilitar a verificação condicional
  const [weather, setWeather] = useState(null)
  const [weather5Days, setWeather5Days] = useState(null) // Usei o 'D' maiúsculo para seguir o padrão CamelCase
  
  const inputRef = useRef()
  
  async function searchCity() {
      const city = inputRef.current.value
      const key = '75ee17211c10cb2039cb88d2b66a4b92'
      
      // URLs das duas APIs
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`
      const url5Days = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=pt_br&units=metric` 

      try {
          // CORREÇÃO 2: Fazendo as duas chamadas de API
          const apiInfo = await axios.get(url)
          const apiInfo5Days = await axios.get(url5Days)

          // CORREÇÃO 3: Atualizando os estados com os nomes corretos das variáveis
          setWeather(apiInfo.data)
          setWeather5Days(apiInfo5Days.data)
      } catch (error) {
          console.error("Erro ao buscar dados da API:", error)
          alert("Cidade não encontrada ou erro na API")
      }
  }

  return (
      <div className="container">
        <h1>Previsão do Tempo</h1>
        <input ref={inputRef} type="text" placeholder="Digite o nome da cidade" />
        <button onClick={searchCity}>Buscar</button>

        {/* CORREÇÃO 4: Verificação condicional correta */}
        {/* Só renderiza se o estado não for null */}
        {weather && <WeatherInformation weather={weather}/>}
        
        {/* Verifique se o nome da prop 'weather5Days' bate com o que você desestruturou no componente */}
        {weather5Days && <WeatherInformation5Days weather5Days={weather5Days}/>}
      </div>
  )
}

export default App