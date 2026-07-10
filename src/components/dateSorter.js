/**
 * Ordena las actividades empezando por un día específico de la semana.
 * @param {Array} activities - Lista de actividades desde el JSON.
 * @param {number} startDayIndex - Index del día inicial (0 = Domingo, 1 = Lunes, etc.)
 * @returns {Array} Actividades ordenadas dinámicamente.
 */
export function sortActivitiesByUpcomingDay(activities, startDayIndex) {
    // Mapeo de los días tal como vienen escritos en tu activities.json
    const daysMap = {
        "domingo": 0,
        "lunes": 1,
        "martes": 2,
        "miércoles": 3,
        "jueves": 4,
        "viernes": 5,
        "sábado": 6
    };

    return [...activities].sort((a, b) => {
        const dayA = daysMap[a.dia.toLowerCase().trim()] ?? 0;
        const dayB = daysMap[b.dia.toLowerCase().trim()] ?? 0;

        // Calculamos la distancia de días respecto al "día objetivo"
        const distanceA = (dayA - startDayIndex + 7) % 7;
        const distanceB = (dayB - startDayIndex + 7) % 7;

        // Si las distancias son iguales (mismo día), podemos desempatar por hora si se desea
        return distanceA - distanceB;
    });
}