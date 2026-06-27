export default function Header() {

    return (

        <header className="
bg-white
border-b
">

            <div className="
max-w-5xl
mx-auto
px-6
py-5
flex
items-center
justify-between
">


                <div>

                    <h1 className="
text-xl
font-semibold
text-gray-900
">
                        Språkkafé Oslo
                    </h1>

                    <p className="
text-sm
text-gray-500
">
                        Norsk for alle
                    </p>

                </div>


                <nav className="
hidden
md:flex
gap-6
text-sm
text-gray-600
">

                    <a href="/">
                        Inicio
                    </a>

                    <a href="#">
                        Cómo funciona
                    </a>

                    <a href="#">
                        Organizaciones
                    </a>

                </nav>


            </div>

        </header>

    )

}