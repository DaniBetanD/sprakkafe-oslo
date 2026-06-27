import { useState } from "react";

import activities from "../data/activities.json";

import ActivityCard from "../components/ActivityCard";
import SearchBar from "../components/SearchBar";
import Header from "../components/Header";
import Filters from "../components/Filters";
import organizations from "../data/organizations.json";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Globe, Mail, Phone } from "lucide-react";

export default function Home() {


    const [query, setQuery] = useState("");

    const [filters, setFilters] = useState({

        district: "",
        day: "",
        level: "",
        organization: ""

    });

    function getOrganization(id) {

        return organizations.find(
            org => org.id === id
        );

    }


    const results = activities.filter(activity => {


        const text = (

            activity.name +
            getOrganization(activity.organizationId)?.name +
            activity.district +
            activity.level

        ).toLowerCase();



        const matchesSearch =
            text.includes(query.toLowerCase());



        const matchesDistrict =
            !filters.district ||
            activity.district === filters.district;



        const matchesDay =
            !filters.day ||
            activity.day === filters.day;



        const matchesLevel =
            !filters.level ||
            activity.level === filters.level;



        const matchesOrg =
            !filters.organization ||
            activity.organizationId === filters.organization;



        return (

            matchesSearch &&
            matchesDistrict &&
            matchesDay &&
            matchesLevel &&
            matchesOrg

        );


    });





    return (

        <div className="min-h-screen bg-gray-50">


            <Header />


            <main>


                <section className="
max-w-5xl
mx-auto
px-6
pt-14
">


                    <h1 className="
text-5xl
font-bold
text-gray-900
">

                        Encuentra tu språkkafé

                    </h1>



                    <p className="
mt-4
text-gray-600
text-lg
">

                        Practica noruego y conecta con personas en Oslo.

                    </p>



                    <div className="mt-8">


                        <SearchBar

                            onSearch={setQuery}

                        />


                        <Filters

                            filters={filters}

                            setFilters={setFilters}

                            activities={activities}

                        />


                    </div>


                </section>





                <section className="
max-w-5xl
mx-auto
px-6
py-10
">


                    <div className="
flex
justify-between
mb-5
">


                        <h2 className="
font-semibold
text-xl
">

                            Actividades

                        </h2>



                        <span className="text-gray-500">

                            {results.length} resultados

                        </span>


                    </div>





                    <div className="
grid
md:grid-cols-2
gap-5
">


                        {
                            results.map(activity => (

                                <ActivityCard

                                    key={activity.id}

                                    activity={activity}

                                    organization={
                                        getOrganization(
                                            activity.organizationId
                                        )
                                    }

                                />

                            ))
                        }


                    </div>


                </section>


            </main>


        </div>

    )

}