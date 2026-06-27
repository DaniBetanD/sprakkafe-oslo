import { Link } from "react-router-dom";
import { DAYS, LEVELS } from "../utils/translations";

export default function ActivityCard({ activity, organization }) {

    return (
        <article className="bg-white rounded-3xl border border-gray-200 p-6 hover:shadow-lg transition">
            <div className="flex justify-between gap-4">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                        {activity.name}
                    </h2>
                    <p className="text-gray-600 mt-1">
                        {organization?.name}
                    </p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full h-fit ${organization?.verified
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                    {organization?.verified ? "Verificado" : "En pausa"}
                </span>
            </div>

            <div className="mt-4 text-sm text-gray-700 space-y-1">
                <p>📍 {activity.district}</p>
                <p>🕒 {DAYS[activity.day]} · {activity.time}</p>
                <p>{LEVELS[activity.level]}</p>
            </div>

            <div className="mt-3 flex gap-4">
                <Link
                    to={`/activity/${activity.id}`}
                    className="text-sm text-blue-600 font-medium hover:underline"
                >
                    Ver detalles →
                </Link>
                <Link
                    to={`/organization/${organization?.id}`}
                    className="text-sm text-gray-500 hover:underline"
                >
                    {organization?.name}
                </Link>
            </div>
        </article>
    );
}