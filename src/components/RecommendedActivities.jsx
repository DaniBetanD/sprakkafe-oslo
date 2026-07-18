import ActivityCard from "./ActivityCard";
import HorizontalCarousel from "./HorizontalCarousel";

export default function RecommendedActivities({ activities, getOrganization, setSelected, selected }) {
  const todayIndex = new Date().getDay();
  const tomorrowIndex = (todayIndex + 1) % 7;
  const dayOrder = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const sorted = [...activities].sort((first, second) => {
    const firstIndex = dayOrder.indexOf(first.day);
    const secondIndex = dayOrder.indexOf(second.day);
    const firstDistance = (firstIndex - tomorrowIndex + 7) % 7;
    const secondDistance = (secondIndex - tomorrowIndex + 7) % 7;
    if (firstDistance === secondDistance) return first.time.localeCompare(second.time);
    return firstDistance - secondDistance;
  });

  return (
    <div className="py-2">
      <div className="mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Actividades recomendadas</h2>
        <p className="mt-1 text-sm text-gray-500">Las más próximas esta semana.</p>
      </div>
      <HorizontalCarousel>
        {sorted.slice(0, 5).map((activity) => (
          <div key={activity.id} className="min-w-[280px] sm:min-w-[320px] snap-center p-1">
            <ActivityCard
              activity={activity}
              organization={getOrganization(activity.organizationId)}
              onClick={() => setSelected(selected?.id === activity.id ? null : activity)}
              isSelected={selected?.id === activity.id}
            />
          </div>
        ))}
      </HorizontalCarousel>
    </div>
  );
}
