import { Dispatch, FormEvent, useState } from "react"
import { v4 as uuidv4 } from 'uuid'
import type { Activity } from "../types"
import { categories } from "../data/categories"
import { ActivityActions } from "../reducers/activity-reducer"

type FormProps = {
    dispatch: Dispatch<ActivityActions>
}

const InitialState : Activity = {
    id: uuidv4(),
    category: 1,
    name: '',
    calories: 0
}


export default function Form({dispatch} : FormProps) {

    const [activity,setActivity] = useState<Activity>(InitialState)

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement> |React.ChangeEvent<HTMLInputElement>) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id)

        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })

    }

    const isValiActivity = () => {
        const { name, calories } = activity 
        console.log(name.trim() !== '' && calories > 0)
        return name.trim() !== '' && calories > 0
    }

    const handleSubmit = ( e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({ type: "save-activity", payload: {newActivity: activity}})

        setActivity(InitialState)
    }


    return (
        <form
            className="space-y-5 bg-white shadow p-10 rounded-lg"
            onSubmit={handleSubmit}
        >
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category">Categoría: </label>
                <select className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    id="category"
                    value={activity.category}
                    onChange={handleChange}
                >
                    {categories.map(category => (
                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}

                </select>

                <div className="grid grid-cols-1 gap-3">
                    <label htmlFor="name">Actividad: </label>
                    <input type="text" 
                        id="name"
                        className="border border-slate-300 p-2 rounded-lg"
                        placeholder=" Ej. Comida, Jugo de naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
                        value={activity.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="grid grid-cols-1 gap-3">
                    <label htmlFor="calories">Calorías: </label>
                    <input type="number" 
                        id="calories"
                        className="border border-slate-300 p-2 rounded-lg"
                        placeholder=" Ej. Calorías. ej 300, 500"
                        value={activity.calories}
                        onChange={handleChange}
                        
                    />
                </div>
            </div>

            <input type="submit" 
                className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase
                text-white cursor-pointer disabled:opacity-10"
                value={ activity.category === 1 ? 'Guardar comida' : 'Guardar Ejercicio'}
                disabled={!isValiActivity()}
            
            />

        </form>
    )
}
