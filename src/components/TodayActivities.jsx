import ActivityCard from "./ActivityCard";
import HorizontalCarousel from "./HorizontalCarousel";

export default function TodayActivities({ activities, getOrganization, setSelected, selected }) {
    // 1. Mapeamos el índice de JS (0-6) a los días de la semana en noruego tal como vienen en activities.json
    const daysOfWeek = ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"];
    const currentDayName = daysOfWeek[new Date().getDay()];

    // 2. Filtramos las actividades que coinciden con el día actual
    const todayActivities = activities.filter(
        (activity) => activity.day.toLowerCase() === currentDayName
    );

    // 3. Fallback amigable: si hoy no hay actividades (por ejemplo, fin de semana), 
    // mostramos las primeras 6 para que la sección nunca quede vacía ni rota
    const activitiesToDisplay = todayActivities.length > 0 
        ? todayActivities 
        : activities.slice(0, 6);

    return (
        <div className="py-4">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                    {todayActivities.length > 0 ? "Språkkafé hoy" : "Actividades recomendadas"}
                </h2>
                <p className="text-gray-600 mt-2 text-sm">
                    {todayActivities.length > 0 
                        ? "Aprovecha el día de hoy para dar tu primer paso y practicar noruego." 
                        : "No hay eventos programados para hoy, pero mira estas sugerencias para tus próximos días."}
                </p>
            </div>

            {activitiesToDisplay.length === 0 ? (
                <p className="text-sm text-gray-500 italic">No hay actividades disponibles de momento.</p>
            ) : (
                <HorizontalCarousel>
                    {activitiesToDisplay.map((activity) => (
                        <div key={activity.id} className="min-w-[280px] sm:min-w-[320px] snap-center p-1">
                            <ActivityCard
                                activity={activity}
                                organization={getOrganization(activity.organizationId)}
                                onClick={() => setSelected(
                                    selected?.id === activity.id ? null : activity
                                )}
                                isSelected={selected?.id === activity.id}
                            />
                        </div>
                    ))}
                </HorizontalCarousel>
            )}
        </div>
    );
}