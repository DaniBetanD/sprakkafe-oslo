export default function CommunityCTA({ onClick }) {
    return (
        <div className="mt-20 rounded-3xl bg-blue-600 px-8 py-12 text-center text-white">
            <h2 className="text-3xl font-bold">
                Únete a la comunidad
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-blue-100 leading-relaxed">
                Recibe nuevas actividades, recursos útiles y
                experiencias de personas que también están
                construyendo su vida en Noruega.
            </p>

            <button
                onClick={onClick}
                className="
                    mt-8
                    rounded-xl
                    bg-white
                    px-6
                    py-3
                    font-semibold
                    text-blue-700
                    transition
                    hover:bg-blue-50
                "
            >
                Quiero formar parte
            </button>
        </div>
    );
}