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
    type="search"
    autoComplete="off"
    aria-label="Buscar actividades"
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    placeholder="Busca un Språkkafé, barrio o nivel..."
    className="..."
/>


            </div>


        </form>

    )

}