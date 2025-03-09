import { Activity } from "../types"
import { categories } from "../data/categories"
import { useMemo } from "react"
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { ActivityActions } from "../reducers/activity-reducer"

type ActivityListProps = {
    activities: Activity[],
    dispatch: React.Dispatch<ActivityActions>
}

export default function ActivityList({ activities, dispatch}: ActivityListProps) {

    // Mapeo de categorías en un objeto para mejorar el rendimiento
    const categoryMap = useMemo(() => {
        return categories.reduce((acc, category) => {
            acc[category.id] = category.name;
            return acc;
        }, {} as Record<number, string>);
    }, []);

    return (
        <>
            <h2 className="text-4xl font-bold text-slate-600 text-center">Comida y Actividades</h2>

            {activities.map(activity => (
                <div key={activity.id} className="px-5 py-10 bg-white mt-5 flex justify-between">
                    <div className="space-y-2 relative">
                        <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${activity.category === 1 ? 'bg-lime-500': 'bg-orange-500'}`}>
                            {categoryMap[+activity.category] || "Desconocido"}
                        </p>
                        <p className="text-2xl font-bold pt-5">{activity.name}</p>
                        <p className="font-black text-4xl text-lime-500">
                            {activity.calories}{''}
                            <span></span>
                        </p>

                    </div>
                    <div className=" flex gap-5 items-center">
                        <button
                            onClick={() => dispatch({type: "set-activeId", payload: {id: activity.id}})}
                            className="cursor-pointer"
                        >
                            <PencilSquareIcon 
                                className="h-8 w-8 text-gray-800"
                            />
                        </button>

                    </div>
                    
                </div>
            ))}
        </>
    )
}
