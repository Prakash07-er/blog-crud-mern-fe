import React, { useState, useEffect } from 'react'
import '../styles/food.css'
import axios from 'axios'

export default function Food() {

    const [foodName, setFoodName] = useState('')
    const [days, setDays] = useState(0)
    const [foodList, setFoodList] = useState([])
    const [newFoodName, setNewFoodName] = useState('')

    const addToList = () => {
             axios.post("/insert", {
                foodName,
                days
        })
    }

    const onUpdate =(id) => {
        axios.put('/update',{
            id:id,
            newFoodName: newFoodName
        })
    }

    const onDelete =(id) => {
        axios.delete(`/delete/${id}`)
    }

    useEffect( () => {
        const fetchData = async () => {
               const res=await axios.get('/read')
               setFoodList(res.data)           
        }
        fetchData()
    }, [])

    return (
        <div>
            <h1 className="heading">Crud app with mern</h1>
            <div className="input_fields">
            <label htmlFor="foodName" className="lable_name">  Food Name</label>
            <input type="text" id='foodName' className="foodName_input" onChange={(e) => {setFoodName(e.target.value)}} />

            <label htmlFor="foodName" className="lable_name"> Days since you ate it </label>
            <input type="number" id='foodName' className="foodName_input" onChange={(e) => {setDays(e.target.value)}} />

            <button type="submit"  className="button" onClick={addToList} > Add to List </button>
            </div>
            <hr />
            <h1>Food List </h1> 
            {
                foodList.map((value, key) => {
                    return (
                    <div key={key}>
                        <h1> {value.foodName} </h1>
                        <h1> {value.daysSinceIEat} </h1>
                        <input type="text" placeholder="enter text to update"  onChange={(e) => {setNewFoodName(e.target.value)}} />
                        <button onClick={() => onUpdate(value._id)} > Update </button>
                        <button  onClick={() => onDelete(value._id)} > Delete </button>
                    </div>
                    )
                })
            }
        </div>
    )
}
