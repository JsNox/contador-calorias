import { useState } from "react"
import { Activity } from "../types"
import { categories } from "../data/categories"



export default function Form() {

    const [activity,setActivity] = useState<Activity>({
        category: 1,
        name: '',
        calories: 0
    })

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement> |React.ChangeEvent<HTMLInputElement>) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id)

        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })

    }


    return (
        <form
            className="space-y-5 bg-white shadow p-10 rounded-lg"
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
                text-white cursor-pointer "
            
            />

        </form>
    )
}
