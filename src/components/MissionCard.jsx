export default function MissionCard({
    icon,
    title,
    description,
}) {
    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                {icon}
            </div>

            <h3 className="mb-3 text-lg font-semibold text-gray-900">
                {title}
            </h3>

            <p className="text-sm leading-6 text-gray-600">
                {description}
            </p>
        </div>
    );
}