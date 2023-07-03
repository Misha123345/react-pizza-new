import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

const FullPizza = () => {
  const { id }  = useParams()
  const [pizza, setPizza] = useState()

  useEffect(() => {
    axios.get(`https://6439579c4660f26eb1b08e62.mockapi.io/pizzas/${id}`)
    .then(response => response.data)
    .then(data => setPizza(data))
  }, [id])

  if (!pizza) {
    return (
      <h2 style={{textAlign: "center"}}>Loading...</h2>
    )
  }  
  
  return (
    <div className='container'>
      <Link to="/"><button className='fullpizza-back-button'>{"<"} Вернуться назад</button></Link>
      <img src={pizza.imageUrl} alt="Pizza" className="fullpizza-img"/>
      <div className="fullpizza-wrapper">
        <h2 className='fullpizza-name'>{pizza.name}</h2>
        <h3 className='fullpizza-price'>от {pizza.price} ₽</h3>
      </div>
      <p className='fullpizza-ingredients-list'><b>Состав:</b> {pizza.ingridients.join(", ")};</p>

    </div>
  )
}

export default FullPizza