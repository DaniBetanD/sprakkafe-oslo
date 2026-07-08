export default function MobileCarousel({ children }) {
    return (
        <>
            {/* Móvil */}
            <div className="md:hidden -mx-6 px-6 overflow-x-auto snap-x snap-mandatory">
                <div className="flex gap-4 pb-2">
                    {Array.isArray(children)
                        ? children.map((child, index) => (
                              <div
                                  key={index}
                                  className="snap-center shrink-0 w-[85%]"
                              >
                                  {child}
                              </div>
                          ))
                        : (
                            <div className="snap-center shrink-0 w-[85%]">
                                {children}
                            </div>
                        )}
                </div>
            </div>

            {/* Desktop */}
            <div className="hidden md:grid md:grid-cols-3 gap-8">
                {children}
            </div>
        </>
    );
}