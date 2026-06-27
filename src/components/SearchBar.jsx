import { useState } from "react";


export default function SearchBar({ onSearch }) {


    const [query, setQuery] = useState("");


    function submit(e) {

        e.preventDefault();

        onSearch(query.trim());

    }



    return (

        <form
            onSubmit={submit}
            className="w-full"
        >


            <div className="
relative
">


                <input

                    id="search"
                    name="search"

                    value={query}

                    onChange={(e) => setQuery(e.target.value)}

                    placeholder="
Busca un språkkafé, barrio o nivel...
"


                    className="
w-full
rounded-2xl
border
bg-white
px-6
py-5
text-lg
shadow-sm

focus:outline-none
focus:ring-2
focus:ring-blue-300
"

                />


            </div>


        </form>

    )

}