import { Activity } from "../types"
import { categories } from "../data/categories"
import { useMemo } from "react"

type ActivityListProps = {
    activities: Activity[]
}

export default function ActivityList({ activities }: ActivityListProps) {

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
                    <div>

                    </div>
                    
                </div>
            ))}
        </>
    )
}
