import organizationsData from "../data/organizations.json";
import { DAYS, LEVELS } from "../utils/translations";

export default function Filters({
    filters,
    setFilters,
    activities
}) {


    const districts = [
        ...new Set(
            activities.map(a => a.district)
        )
    ];


    const levels = [
        ...new Set(
            activities.map(a => a.level)
        )
    ];


    const days = [
        ...new Set(
            activities.map(a => a.day)
        )
    ];


    const organizationList = organizationsData;



    function update(field, value) {

        setFilters({
            ...filters,
            [field]: value
        })

    }



    return (

        <div className="space-y-4">


            <div className="
grid
grid-cols-2
md:grid-cols-4
gap-3
">


                <select
                    name="district"
                    value={filters.district}
                    onChange={e => update("district", e.target.value)}
                    className="
                        rounded-xl            
                        border
                        bg-white
                        px-4
                        py-3
                    "
                >

                    <option value="">
                        Barrio
                    </option>

                    {
                        districts.map(d => (
                            <option key={d} value={d}>
                                {d}
                            </option>
                        ))
                    }

                </select>



                <select
                    name="day"
                    value={filters.day}
                    onChange={e => update("day", e.target.value)}
                    className="
rounded-xl
border
bg-white
px-4
py-3
"
                >

                    <option value="">
                        Día
                    </option>

                    {
                        days.map(d => (
                            <option key={d} value={d}>
                                {DAYS[d]}
                            </option>
                        ))
                    }

                </select>



                <select
                    name="level"
                    value={filters.level}
                    onChange={e => update("level", e.target.value)}
                    className="
rounded-xl
border
bg-white
px-4
py-3
"
                >

                    <option value="">
                        Nivel
                    </option>

                    {
                        levels.map(l => (
                            <option key={l} value={l}>
                                {LEVELS[l]}
                            </option>
                        ))
                    }

                </select>



                <select
                    name="organization"
                    value={filters.organization}
                    onChange={e => update("organization", e.target.value)}
                    className="rounded-xl border bg-white px-4 py-3"
                >

                    <option value="">
                        Organización
                    </option>

                    {
                        organizationList.filter(Boolean).map(o => (

                            <option
                                key={o.id}
                                value={o.id}
                            >
                                {o.name}
                            </option>
                        ))
                    }

                </select>


            </div>



            <button

                onClick={() => setFilters({

                    district: "",
                    day: "",
                    level: "",
                    organization: ""

                })}

                className="
mt-2
rounded-xl
bg-blue-600
px-5
py-3
text-white
text-sm
font-medium
hover:bg-blue-700
"

            >

                Limpiar filtros

            </button>


        </div>

    )

}