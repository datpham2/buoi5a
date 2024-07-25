import { Button, Container, Input } from 'reactstrap'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "./styles.css"

export default function Weather1() {
    const [temp, setTemp] = useState(0)
    const [city, setCity] = useState("")
    const [icon, setIcon] = useState("")
    const [text, setText] = useState("")
    const [message, setMessage] = useState("")
    const apiKey = '0d6025140c28d1690907ab810b4e09fa'
    function getWeather(city) {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        axios.get(url)
        .then(function(response) {
            console.log(response)
            setCity(response.data.name)
            setTemp(Math.round(response.data.main.temp))
            setIcon(response.data.weather[0].icon)
        })
        .catch(function(error) {
            setMessage('Not found.')
        })
    }
    // useEffect(function() {
    //     getWeather()
    // }, []);
  return (
    <div>
        <Container className='mt-5 p-5 text-center'>
            <form class="d-flex justify-content-center">
                <Input autoComplete='off' autoFocus id="city" className='w-50' onChange={function(event) {
                    setText(event.target.value) 
                }}  onKeyDown={function(event) {
                    if (event.key === 'Enter') {
                        setTemp(0)
                        if (text !== "") {
                            getWeather(text)
                            setText("")
                            setMessage("")
                            event.preventDefault()
                        }
                    }
                }} placeholder="Search" type="text" value={text}/><br />
            </form>
            <div id="result">
                {
                    message && message 
                }
                {
                    
                    temp !== 0 && 
                    <div>
                        <div class="pt-5">
                            <h1 class="opacity-75">{ city }</h1>
                            <div className='d-flex justify-content-center align-items-center'>
                                <img src={`http://openweathermap.org/img/w/${icon}.png`} />
                                <span class="display-6 text-primary mx-2">{ temp }&deg;c</span>
                            </div>
                        </div>
                        
                    </div>
                    
                }
                
            </div>
        </Container>
    </div>
  )
}
