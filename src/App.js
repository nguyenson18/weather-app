import { useState, useEffect } from 'react';
import './App.css'

const api={
  key: "b5e668a19a2efcb1106eaef4e4eecc5f",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [searchInput, setSearchInput] = useState("")
  const [searchCity, setSearchCity] = useState("")
  const [weatherInfo, setWeatherInfo] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)

  
    useEffect(()=>{
      const fetchWeatherData =async()=>{
          if(!searchCity) return;
          setLoading(true)
          try{
            const url = `${api.base}weather?q=${searchCity}&units=metrc&APPID=${api.key}`
            const response = await fetch(url)
            const data = await response.json();
            if(response.ok){
              setWeatherInfo(data)
              setErrorMessage("")
            }else{
              setErrorMessage(data.message)

            }
            
          }catch (error){
              setErrorMessage(error.message)
          }
          setLoading(false)
      }; 
      fetchWeatherData();
    },[searchCity])
    const handleSubmit=(e)=>{
          e.preventDefault();
          setSearchCity(searchInput)      
    }


    const dataBuilder = (d)=>{
      let months = ["January", "February", "March", "April", "May", "June", "Junly", "August",
        "September", "October", "November", "December"];
      let days = ["Sunday", "Monday", "Tuesday", "wednesday", "Thursday",
         "Friday", "Saturday" ];
      
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
      return `${day} ${date} ${month} ${year}`
    }
    
   
    return(
      <>
      <div className='app'>
      <main>
      <form onSubmit={handleSubmit}>
        <input
        className='search-bar'
        type="text"
        placeholder='search...'
        onChange={(e)=> setSearchInput(e.target.value)}
        />
        <button className='btn-weather'>search</button>
      </form>
      {loading ? (<div>loading...</div>) : (
        <>
        {errorMessage ? (<div style={{color:"red"}}> {errorMessage}</div>) : 
        (((typeof weatherInfo.main != "undefined") ? (
          <div>
          <div className='date'>{dataBuilder(new Date())}</div>
          
          <div className='weather'>{weatherInfo.name}</div>
          <div className='weather'>{weatherInfo.sys?.country}</div>
           {/* <div className='weather'>{weatherInfo.weather[0]?.description}</div> */}
          <div className='temp'>{Math.round(weatherInfo.main?.temp)/10}°c</div> 
        </div>
        ):( ""))
          )}
        </>
      )}
      </main>
      </div>
      
      
      </>
    )
};

export default App;
