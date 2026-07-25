import ActivityCard from "./ActivityCard";
import HorizontalCarousel from "./HorizontalCarousel";

export default function TodayActivities({ activities, getOrganization, setSelected, selected }) {
  if (activities.length === 0) return null;

  return (
    <div className="py-2">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900 md:text-2xl">Actividades para hoy</h2>
        <p className="mt-1 text-sm text-gray-500">
          Estas actividades están programadas para hoy. Revisa los detalles antes de salir.
        </p>
      </div>
      {activities.length === 1 ? (
        <div className="max-w-sm">
          <ActivityCard
            activity={activities[0]}
            organization={getOrganization(activities[0].organizationId)}
            onClick={() => setSelected(selected?.id === activities[0].id ? null : activities[0])}
            isSelected={selected?.id === activities[0].id}
          />
        </div>
      ) : (
        <HorizontalCarousel>
          {activities.map((activity) => (
            <div key={activity.id} className="min-w-[280px] snap-center p-1 sm:min-w-[320px]">
              <ActivityCard
                activity={activity}
                organization={getOrganization(activity.organizationId)}
                onClick={() => setSelected(selected?.id === activity.id ? null : activity)}
                isSelected={selected?.id === activity.id}
              />
            </div>
          ))}
        </HorizontalCarousel>
      )}
    </div>
  );
}
